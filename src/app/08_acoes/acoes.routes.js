const acoesRoutes = require('express').Router();
const AcoesController = require('./AcoesController');

acoesRoutes
    .get('/acoes', AcoesController.getActions)
    .post('/acoes', AcoesController.createAction)
    .put('/acoes/:id', AcoesController.editAction)
    .delete('/acoes/:id', AcoesController.deleteAction)

module.exports = acoesRoutes;