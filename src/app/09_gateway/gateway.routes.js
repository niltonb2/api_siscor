const gatewayRoutes = require('express').Router();
const GatewayController = require('./GatewayController');

gatewayRoutes
    .get('/gateway', GatewayController.getGateway)
    .get('/gateway/:id', GatewayController.getGatewayById)
    .get('/sellers', GatewayController.getSeller)
    .post('/sellers', GatewayController.createSeller)
    .post('/gateway', GatewayController.saveGateway)
    .put('/gateway/:id', GatewayController.editGateway)
    .delete('/gateway/:id', GatewayController.deleteGateway)

module.exports = gatewayRoutes;