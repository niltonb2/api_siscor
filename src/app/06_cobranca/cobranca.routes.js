const cobrancaRoutes = require('express').Router();
const CobrancaController = require('./CobrancaController');
const EnsureAuth = require('../../middlewares/EnsureAuth');

cobrancaRoutes
    .get('/cobranca', CobrancaController.getInvoices)
    .get('/cobrancacompleta/:estabelecimento', CobrancaController.getAllComplet)
    .get('/cobranca/dashboard/:estabelecimento', CobrancaController.dashboard)
    .get('/cobranca/dashboardmes/:estabelecimento', CobrancaController.dashboardMonth)
    .post('/cobranca', CobrancaController.createInvoice)
    .put('/cobranca/:id', CobrancaController.editInvoice)
    .delete('/cobranca/:id', CobrancaController.deleteInvoice)
    .post('/checkout/transaction', EnsureAuth, CobrancaController.transaction)

module.exports = cobrancaRoutes;