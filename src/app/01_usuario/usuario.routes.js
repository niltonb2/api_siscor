const usuarioRoutes = require('express').Router();
const UsuarioController = require('./UsuarioController');

usuarioRoutes
    .get('/usuarios', UsuarioController.getUsers)
    .get('/usuariodados', UsuarioController.getUserById)
    .get('/usuarioestabelecimento', UsuarioController.getQtdeEcsByUser)
    .post('/usuarios/save', UsuarioController.saveUser)
    .post('/usuarios/login', UsuarioController.loginUser)
    .put('/usuarios/:id', UsuarioController.editUser)
    .put('/usuarios/:id/:idestabelecimento', UsuarioController.editIdEstabelecimento)
    .delete('/usuarios/:id', UsuarioController.deleteUser)

module.exports = usuarioRoutes;