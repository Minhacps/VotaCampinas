# Vota Campinas
Esse repositório contem o código do programa que auxilia os eleitores e eleitoras de Campinas a escolherem o seu candidato ou candidata a vereadora de Campinas para as eleiçoes de 2016


## Criando um novo módulo

1. Abra o diretório src/modules/
2. Crie uma para para o seu novo módulo
3. Crie uma view (.html) e um controller (.js) para este novo módulo
4. abra o arquivo src/app.js
5. Adicione o seguinte trecho de código:
```
.when('/rota-do-novo-modulo', {
  templateUrl: 'modules/novo-modulo/novo-modulo.html',
  controller: 'novoModuloController'
});
```
6. adiciona o caminho do controller no index.html
```
<script src="modules/login/novoModuloController.js"></script>
```