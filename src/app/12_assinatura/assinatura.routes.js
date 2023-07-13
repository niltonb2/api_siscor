const assinaturaRoutes = require('express').Router();
const AssinaturaController = require('./AssinaturaController');

assinaturaRoutes
    .get('/assinatura/:estabelecimento', AssinaturaController.get)
    .get('/assinaturacliente/:cliente', AssinaturaController.getByCliente)
    .post('/assinatura', AssinaturaController.save)

module.exports = assinaturaRoutes;