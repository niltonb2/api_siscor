const reguaRoutes = require('express').Router();
const ReguaController = require('./ReguaController');

reguaRoutes
    .get('/regua', ReguaController.getRules)
    .post('/regua', ReguaController.createRule)
    .put('/regua/:id', ReguaController.editRule)
    .delete('/regua/:id', ReguaController.deleteRule)

module.exports = reguaRoutes;