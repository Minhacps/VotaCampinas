angular.module("votaCampinas").run(["$templateCache",function(n){n.put("partials/404.html",'<div class="container text-center">\n  <h1>404</h1>\n  <p>Page Not Found</p>\n</div>'),n.put("partials/contact.html",'<div class="container">\n  <h3>Contact Form</h3>\n  <div ng-if="messages.error" role="alert" class="text-danger">\n    <div ng-repeat="error in messages.error">{{error.msg}}</div>\n  </div>\n  <div ng-if="messages.success" role="alert" class="text-success">\n    <div ng-repeat="success in messages.success">{{success.msg}}</div>\n  </div>\n  <form ng-submit="sendContactForm()">\n    <label for="name">Name</label>\n    <input type="text" name="name" id="name" ng-model="contact.name" autofocus>\n    <label for="email">Email</label>\n    <input type="email" name="email" id="email" ng-model="contact.email">\n    <label for="message">Body</label>\n    <textarea name="message" id="message" rows="7" ng-model="contact.message"></textarea>\n    <br>\n    <button type="submit">Send</button>\n  </form>\n</div>\n'),n.put("partials/footer.html",'<div class="footer-copyright">\n  <div class="container">\n    © 2016 Copyright Text\n  </div>\n</div>\n'),n.put("partials/forgot.html",'<div class="container">\n  <div ng-if="messages.error" role="alert" class="text-danger">\n    <div ng-repeat="error in messages.error">{{error.msg}}</div>\n  </div>\n  <div ng-if="messages.success" role="alert" class="text-success">\n    <div ng-repeat="success in messages.success">{{success.msg}}</div>\n  </div>\n  <form ng-submit="forgotPassword()">\n    <h4>Forgot Password</h4>\n    <p>Enter your email address below and we\'ll send you password reset instructions.</p>\n    <label for="email">Email</label>\n    <input type="email" name="email" id="email" placeholder="Email" ng-model="user.email" autofocus>\n    <br>\n    <button type="submit">Reset Password</button>\n  </form>\n</div>\n'),n.put("partials/header.html",'<nav class="page-header" ng-controller="HeaderCtrl">\n  <div class="nav-wrapper container">\n      <a href="/" class="brand-logo" style="height: 100%;">\n          <img src="http://placehold.it/200x100" alt="" style="height: 100%;">\n      </a>\n\n      <ul ng-if="isAuthenticated()" class="right hide-on-med-and-down">\n        <li><a href="/account" ng-class="{ active: isActive(\'/account\')}">My Account</a></li>\n        <li><a href="#" ng-click="logout()">Logout</a></li>\n      </ul>\n      <ul ng-if="!isAuthenticated()" class="right hide-on-med-and-down">\n        <li><a href="/" ng-class="{ active: isActive(\'/\')}">Entrar</a></li>\n        <li><a href="/cadastro" ng-class="{ active: isActive(\'/cadastro\')}">Cadastre-se</a></li>\n      </ul>\n  </div>\n  <div class="col s10"></div>\n</nav>\n'),n.put("partials/home.html",'<div class="container">\n  <div class="row">\n    <div class="col-sm">\n      <h3>AAA</h3>\n      <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris\n        condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.\n        Donec sed odio dui.</p>\n      <a href="#" role="button">View details</a>\n    </div>\n    <div class="col-sm">\n      <h3>Heading</h3>\n      <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris\n        condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.\n        Donec sed odio dui.</p>\n      <a href="#" role="button">View details</a>\n    </div>\n    <div class="col-sm">\n      <h3>Heading</h3>\n      <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris\n        condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.\n        Donec sed odio dui.</p>\n      <a href="#" role="button">View details</a>\n    </div>\n  </div>\n</div>\n'),n.put("partials/login.html",'<div class="container">\n  <div ng-if="messages.error" role="alert" class="text-danger">\n    <div ng-repeat="error in messages.error">{{error.msg}}</div>\n  </div>\n\n  <h4>Log In</h4>\n\n  <form ng-submit="login()">\n    <label for="email">Email</label>\n    <input type="email" name="email" id="email" placeholder="Email" ng-model="user.email" autofocus>\n    <label for="password">Password</label>\n    <input type="password" name="password" id="password" placeholder="Password" ng-model="user.password">\n    <p><a href="/forgot">Forgot your password?</a></p>\n    <button type="submit">Log in</button>\n  </form>\n\n  <hr>\n\n  <button ng-click="authenticate(\'facebook\')">Sign in with Facebook</button>\n  <br>\n\n  <p>Don\'t have an account? <a href="/signup">Sign up</a></p>\n</div>\n'),n.put("partials/profile.html",'<div class="container">\n  <div ng-if="messages.error" role="alert" class="text-danger">\n    <div ng-repeat="error in messages.error">{{error.msg}}</div>\n  </div>\n  <div ng-if="messages.success" role="alert" class="text-success">\n    <div ng-repeat="success in messages.success">{{success.msg}}</div>\n  </div>\n\n  <h4>Profile Information</h4>\n\n  <form ng-submit="updateProfile()">\n    <label for="email">Email</label>\n    <input type="email" name="email" id="email" ng-model="profile.email">\n    <label for="name">Name</label>\n    <input type="text" name="name" id="name" ng-model="profile.name">\n    <label>Gender</label>\n    <input type="radio" name="gender" id="male" value="male" ng-checked="profile.gender === \'male\'">\n    <label for="male">Male</label>\n    <input type="radio" name="gender" id="female" value="female" ng-checked="profile.gender === \'female\'">\n    <label for="female">Female</label>\n    <label for="location">Location</label>\n    <input type="text" name="location" id="location" ng-model="profile.location">\n    <label for="website">Website</label>\n    <input type="text" name="website" id="website" ng-model="profile.website">\n    <label>Gravatar</label>\n    <img ng-src="{{profile.gravatar}}" class="gravatar" width="100" height="100">\n    <br>\n    <button type="submit">Update Profile</button>\n  </form>\n\n  <h4>Change Password</h4>\n\n  <form ng-submit="changePassword()">\n    <label for="password">New Password</label>\n    <input type="password" name="password" id="password" ng-model="profile.password">\n    <label for="confirm">Confirm Password</label>\n    <input type="password" name="confirm" id="confirm" ng-model="profile.confirm">\n    <br>\n    <button type="submit">Change Password</button>\n  </form>\n\n  <h4>Linked Accounts</h4>\n\n  <p>\n    <a href="#" ng-click="unlink(\'facebook\')" ng-if="currentUser.facebook" class="text-danger">Unlink your Facebook account</a>\n    <a href="#" ng-click="link(\'facebook\')" ng-if="!currentUser.facebook">Link your Facebook account</a>\n  </p>\n\n  <h4>Delete Account</h4>\n\n  <form ng-submit="deleteAccount()">\n    <p>You can delete your account, but keep in mind this action is irreversible.</p>\n    <button type="submit">Delete my account</button>\n  </form>\n</div>\n'),n.put("partials/reset.html",'<div class="container">\n  <div ng-if="messages.error" role="alert" class="text-danger">\n    <div ng-repeat="error in messages.error">{{error.msg}}</div>\n  </div>\n  <div ng-if="messages.success" role="alert" class="text-success">\n    <div ng-repeat="success in messages.success">{{success.msg}}</div>\n  </div>\n\n  <h4>Reset Password</h4>\n\n  <form ng-submit="resetPassword()">\n    <label for="password">New Password</label>\n    <input type="password" name="password" id="password" placeholder="New password" ng-model="user.password" autofocus>\n    <label for="confirm">Confirm Password</label>\n    <input type="password" name="confirm" id="confirm" placeholder="Confirm password" ng-model="user.confirm">\n    <br>\n    <button type="submit">Change Password</button>\n  </form>\n</div>\n'),n.put("partials/signup.html",'<div class="container">\n  <div ng-if="messages.error" role="alert" class="text-danger">\n    <div ng-repeat="error in messages.error">{{error.msg}}</div>\n  </div>\n\n  <h4>Create an account</h4>\n\n  <form ng-submit="signup()">\n    <label for="email">Email</label>\n    <input type="email" name="email" id="email" placeholder="Email" ng-model="user.email" autofocus>\n    <label for="name">Name</label>\n    <input type="text" name="name" id="name" placeholder="Name" ng-model="user.name">\n    <label for="password">Password</label>\n    <input type="password" name="password" id="password" placeholder="Password" ng-model="user.password">\n    <p>By signing up, you agree to the <a href="/">Terms of Service</a>.</p>\n    <button type="submit">Create an account</button>\n  </form>\n\n  <hr>\n\n  <button ng-click="authenticate(\'facebook\')">Sign in with Facebook</button>\n  <br>\n\n  <p>Already have an account? <a href="/login">Log in</a></p>\n</div>\n'),n.put("partials/cadastro/cadastro.html",'<div class="row">\n  <div class="col s12">\n      <h1>Cadastro</h1>\n  </div>\n\n  <div class="col s12">\n    <form ng-submit="enviar()">\n      <div class="dados-pessoais">\n        <h4>Pessoais</h4>\n        <div class="row">\n          <div class="input-field col s12">\n            <input id="nome" type="text" class="validate" name="name" data-ng-model="user.name">\n            <label for="nome">Nome</label>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="input-field col s12">\n            <input id="data-nascimento" type="text" class="validate" data-ng-model="user.birthDate">\n            <label for="data-nascimento">Data de Nascimento</label>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="input-field col s12">\n            <select id="sexo" data-ng-model="user.gender">\n              <option value="" selected>Selecione</option>\n              <option value="F">Feminino</option>\n              <option value="M">Masculino</option>\n            </select>\n             <label>Sexo</label>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="col s12">\n            <input type="checkbox" id="sou-candidato" data-ng-model="user.ehVereador"/>\n            <label for="sou-candidato">Sou Candidato</label>\n          </div>\n        </div>\n\n        <div class="exclusivo-candidato" data-ng-show="user.ehVereador">\n          <div class="row">\n            <div class="input-field col s6">\n              <input id="cod-j-e" type="text" class="validate" data-ng-model="user.vereador.partido" maxlength="5">\n              <label for="cod-j-e">Partido</label>\n            </div>\n            <div class="input-field col s6">\n              <input id="cod-j-e" type="number" class="validate" data-ng-model="user.vereador.numero">\n              <label for="cod-j-e">Número</label>\n            </div>\n          </div>\n\n           <div class="row">\n             <div class="input-field col s12">\n               <input id="cod-j-e" type="number" class="validate" data-ng-model="user.vereador.codigoJusticaEleitoral">\n               <label for="cod-j-e">Cod. Justiça Eleitoral</label>\n             </div>\n           </div>\n\n           <div class="row">\n            <div class="input-field col s12">\n              <textarea id="descricao" class="materialize-textarea" length="120" data-ng-model="user.vereador.descricao"></textarea>\n              <label for="descricao">Descrição</label>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class="dados-conta">\n        <h4>Conta</h4>\n\n        <div class="row">\n          <div class="input-field col s12">\n            <input id="email" type="email" class="validate" data-ng-model="user.email">\n            <label for="email">E-mail</label>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="input-field col s12">\n            <input id="senha" type="password" class="validate" data-ng-model="user.password">\n            <label for="senha">Senha</label>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="input-field col s12">\n            <input id="confirme-senha" type="password" class="validate" data-ng-model="user.password">\n            <label for="confirme-senha">Confirme sua Senha</label>\n          </div>\n        </div>\n\n      </div>\n\n      <a href="/login">Voltar</a>\n      <button class="btn right waves-effect waves-light" type="submit" name="action">Cadastrar\n          <i class="material-icons right">send</i>\n      </button>\n    </form>\n  </div>\n</div>\n'),n.put("partials/login/login.html",'<div class="row">\n  <div class="col s12">\n    <h1>Login</h1>\n  </div>\n  <div class="col s12">\n    <button class="btn">Logar com Facebook</button>\n  </div>\n\n  <div class="col s12 center-align">\n    <hr>\n  </div>\n\n  <form data-ng-submit="enviar()">\n    <div class="col s12 input-field">\n      <label for="">E-mail</label>\n      <input type="text" data-ng-model="user.email">\n    </div>\n\n    <div class="col s12 input-field">\n      <label for="">Senha</label>\n      <input type="password" data-ng-model="user.password">\n    </div>\n\n    <div class="col s12 input-field">\n      <button class="btn">Entrar</button>\n    </div>\n  </form>\n\n  <div class="col s12">\n    <a data-ng-href="/cadastro">Cadastre-se</a>\n  </div>\n  <div class="col s12">\n    <a data-ng-href="">Esqueci minha senha</a>\n  </div>\n</div>\n'),n.put("partials/perfil/perfil.html",'<div class="row">\n  <div class="col s12">\n      <h1>Perfil do Candidato</h1>\n  </div>\n</div>\n'),n.put("partials/prioridades/prioridades.html",'<div class="row">\n  <div class="col s12">\n      <h1>Questões</h1>\n      <h2>Para você, quais são as principais prioridades para Campinas?</h2>\n  </div>\n  <div class="col s12">\n    <form novalidate>\n      <div>\n        <input name="prioridade" type="radio" id="prioridade-1" />\n        <label for="prioridade-1">Prioridade 1</label>\n      </div>\n\n      <div>\n        <input name="prioridade" type="radio" id="prioridade-2" />\n        <label for="prioridade-2">Prioridade 2</label>\n      </div>\n\n      <div>\n        <input name="prioridade" type="radio" id="prioridade-3" />\n        <label for="prioridade-3">Prioridade 3</label>\n      </div>\n\n      <div>\n        <input name="prioridade" type="radio" id="prioridade-4" />\n        <label for="prioridade-4">Prioridade 4</label>\n      </div>\n    </form>\n  </div>\n</div>'),n.put("partials/ranking/ranking.html",'<div class="row">\n  <div class="col s12">\n    <h1>Ranking</h1>\n  </div>\n  <div class="col s12">\n    Aqui estão os candidatos que combina com suas escolhas\n  </div>\n\n  <div class="col s12">\n    <ul class="collection">\n      <li class="collection-item">\n        <div class="row">\n          <div class="col s12 m2 center-align">\n            <img src="http://placehold.it/150x150" alt="" style="width: 100%;">\n          </div>\n          <div class="col s12 m10">\n            <h4>Nome</h4>\n            <p>Partido - Numero: 1234</p>\n            <p>% Afinidade: 80%</p>\n\n          </div>\n\n          <div class="col s12 offset-m9 m3">\n            <button class="btn" style="width: 100%;">Ver Perfil</button>\n          </div>\n        </div>\n      </li>\n    </ul>\n  </div>\n</div>')}]);