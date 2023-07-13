const estabelecimentoRoutes = require('express').Router();
const EstabelecimentoController = require('./EstabelecimentoController');

estabelecimentoRoutes
    .get('/estabelecimento', EstabelecimentoController.getEcs)
    .get('/estabelecimentocompleto/:id', EstabelecimentoController.getEcAllDados)
    .get('/estabelecimento/usuario/:id', EstabelecimentoController.getEstabelecimentoPorUsuario)
    .get('/estabelecimento/:id', EstabelecimentoController.getEcById)
    .get('/estabelecimentoverificar/:documento', EstabelecimentoController.getEcByDocument)
    .get('/dadosempresa/:cnpj', EstabelecimentoController.consultaCnpj)
    .post('/estabelecimento', EstabelecimentoController.saveEstabelecimento)
    .put('/estabelecimento/:id', EstabelecimentoController.editEstabelecimento)
    .patch('/estabelecimento/:id/:gateway', EstabelecimentoController.setGatewayAoEstabelecimento)
    .patch('/estabelecimentosetconfig/:estabelecimento', EstabelecimentoController.setConfig)
    .delete('/estabelecimento/:id', EstabelecimentoController.deleteEstabelecimento)

module.exports = estabelecimentoRoutes;