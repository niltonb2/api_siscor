const permissaoRoutes = require('express').Router();
const PermissaoController = require('./PersmissaoController');

permissaoRoutes
    .post('/permissao/:user', PermissaoController.savePermission)
    .delete('/permissao/:user', PermissaoController.deletePermission)

module.exports = permissaoRoutes;