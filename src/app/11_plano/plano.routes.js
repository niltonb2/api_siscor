const planoRoutes = require('express').Router();
const PlanoController = require('./PlanoController');

planoRoutes
    .get('/plano/:estabelecimento', PlanoController.get)
    .get('/planobyid/:id', PlanoController.getById)
    .post('/plano', PlanoController.save)
    .put('/plano/:id', PlanoController.edit)
    .delete('/plano/:id', PlanoController.delete)

module.exports = planoRoutes;