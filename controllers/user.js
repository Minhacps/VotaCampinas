var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var User = require('../models/User');
var Vereador = require('../models/Vereador');

function generateToken (user) {
  var payload = {
    iss: 'my.domain.com',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}

/**
 * Login required middleware
 */
exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};
  /**
   * POST /login
   * Sign in with email and password
   */
  exports.loginPost = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    var errors = req.validationErrors();

    if (errors) {
      return res.status(400).send(errors);
    }

    new User({ email: req.body.email })
      .fetch()
      .then(function (user) {
        if (!user) {
          return res.status(401).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account. ' +
          'Double-check your email address and try again.'
          });
        }
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (!isMatch) {
            return res.status(401).send({ msg: 'Invalid email or password' });
          }
          res.send({ token: generateToken(user), user: user.toJSON() });
        });
      });
  };

/**
 * POST /signup
 */
exports.signupPost = function (req, res, next) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  User.forge({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    birthDate: moment(req.body.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    ehVereador: req.body.ehVereador
  }).save()
    .then(function (user) {
      if (!req.body.ehVereador) {
        return res.send({ token: generateToken(user), user: user });
      }

      Vereador.forge({
        userId: user.id,
        codigoJusticaEleitoral: req.body.vereador.codigoJusticaEleitoral,
        partido: req.body.vereador.partido,
        numero: req.body.vereador.numero,
        descricao: req.body.vereador.descricao
      }).save().then((vereador) => {
        console.log(vereador);
        res.send({ token: generateToken(user), user: user });
      });
    })
    .catch(function (err) {
      console.log(err);
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
      }
    });
};

/**
 * PUT /account
 * Update profile information OR change password.
 */
exports.accountPut = function (req, res, next) {
  if ('password' in req.body) {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirm', 'Passwords must match').equals(req.body.password);
  } else {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });
  }

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  var user = new User({ id: req.user.id });
  if ('password' in req.body) {
    user.save({ password: req.body.password }, { patch: true });
  } else {
    user.save({
      email: req.body.email,
      name: req.body.name,
      gender: req.body.gender,
      location: req.body.location,
      website: req.body.website
    }, { patch: true });
  }
  user.fetch().then(function (user) {
    if ('password' in req.body) {
      res.send({ msg: 'Your password has been changed.' });
    } else {
      res.send({ user: user, msg: 'Your profile information has been updated.' });
    }
    res.redirect('/account');
  }).catch(function (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).send({ msg: 'The email address you have entered is already associated with another account.' });
    }
  });
};

/**
 * DELETE /account
 */
exports.accountDelete = function (req, res, next) {
  new User({ id: req.user.id }).destroy().then(function (user) {
    res.send({ msg: 'Your account has been permanently deleted.' });
  });
};

/**
 * GET /unlink/:provider
 */
exports.unlink = function (req, res, next) {
  new User({ id: req.user.id })
    .fetch()
    .then(function (user) {
      switch (req.params.provider) {
        case 'facebook':
          user.set('facebook', null);
          break;
        case 'google':
          user.set('google', null);
          break;
        case 'twitter':
          user.set('twitter', null);
          break;
        case 'vk':
          user.set('vk', null);
          break;
        default:
        return res.status(400).send({ msg: 'Invalid OAuth Provider' });
      }
      user.save(user.changed, { patch: true }).then(function () {
      res.send({ msg: 'Your account has been unlinked.' });
      });
    });
};

/**
 * POST /forgot
 */
exports.forgotPost = function (req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  async.waterfall([
    function (done) {
      crypto.randomBytes(16, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      new User({ email: req.body.email })
        .fetch()
        .then(function (user) {
          if (!user) {
        return res.status(400).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account.' });
          }
          user.set('passwordResetToken', token);
          user.set('passwordResetExpires', new Date(Date.now() + 3600000)); // expire in 1 hour
          user.save(user.changed, { patch: true }).then(function () {
            done(null, token, user.toJSON());
          });
        });
    },
    function (token, user, done) {
      var transporter = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
          user: process.env.MAILGUN_USERNAME,
          pass: process.env.MAILGUN_PASSWORD
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'support@yourdomain.com',
        subject: '✔ Reset your password on Mega Boilerplate',
        text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      transporter.sendMail(mailOptions, function (err) {
        res.send({ msg: 'An email has been sent to ' + user.email + ' with further instructions.' });
        done(err);
      });
    }
  ]);
};

/**
 * POST /reset
 */
exports.resetPost = function (req, res, next) {
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirm', 'Passwords must match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
      return res.status(400).send(errors);
  }

  async.waterfall([
    function (done) {
      new User({ passwordResetToken: req.params.token })
        .where('passwordResetExpires', '>', new Date())
        .fetch()
        .then(function (user) {
          if (!user) {
          return res.status(400).send({ msg: 'Password reset token is invalid or has expired.' });
          }
          user.set('password', req.body.password);
          user.set('passwordResetToken', null);
          user.set('passwordResetExpires', null);
          user.save(user.changed, { patch: true }).then(function () {
          done(err, user.toJSON());
          });
        });
    },
    function (user, done) {
      var transporter = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
          user: process.env.MAILGUN_USERNAME,
          pass: process.env.MAILGUN_PASSWORD
        }
      });
      var mailOptions = {
        from: 'support@yourdomain.com',
        to: user.email,
        subject: 'Your Mega Boilerplate password has been changed',
        text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      transporter.sendMail(mailOptions, function (err) {
        res.send({ msg: 'Your password has been changed successfully.' });
      });
    }
  ]);
};

/**
 * POST /auth/facebook
 * Sign in with Facebook
 */
exports.authFacebook = function (req, res) {
  var profileFields = ['id', 'name', 'email', 'gender', 'location'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + profileFields.join(',');

  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.FACEBOOK_SECRET,
    redirect_uri: req.body.redirectUri
  };

  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, function (err, response, accessToken) {
    if (accessToken.error) {
      return res.status(500).send({ msg: accessToken.error.message });
    }

    // Step 2. Retrieve user's profile information.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function (err, response, profile) {
      if (profile.error) {
        return res.status(500).send({ msg: profile.error.message });
      }

      // Step 3a. Link accounts if user is authenticated.
      if (req.isAuthenticated()) {
        new User({ facebook: profile.id })
          .fetch()
          .then(function (user) {
            if (user) {
              return res.status(409).send({ msg: 'There is already an existing account linked with Facebook that belongs to you.' });
            }
            user = req.user;
            user.set('name', user.get('name') || profile.name);
            user.set('gender', user.get('gender') || profile.gender);
            user.set('picture', user.get('picture') || 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
            user.set('facebook', profile.id);
            user.save(user.changed, { patch: true }).then(function () {
              res.send({ token: generateToken(user), user: user });
            });
          });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        new User({ facebook: profile.id })
          .fetch()
          .then(function (user) {
            if (user) {
              return res.send({ token: generateToken(user), user: user });
            }
            new User({ email: profile.email })
              .fetch()
              .then(function (user) {
                if (user) {
                  return res.status(400).send({ msg: user.get('email') + ' is already associated with another account.' })
                }
                user = new User();
                user.set('name', profile.name);
                user.set('email', profile.email);
                user.set('gender', profile.gender);
                user.set('location', profile.location && profile.location.name);
                user.set('picture', 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
                user.set('facebook', profile.id);
                user.save().then(function (user) {
                  return res.send({ token: generateToken(user), user: user });
                });
              });
          });
      }
    });
  });
};

exports.authFacebookCallback = function (req, res) {
  res.send('Loading...');
};
