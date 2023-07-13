const pessoaRoutes = require('express').Router();
const PessoaController = require('./PessoaController');

pessoaRoutes
    .get('/pessoa', PessoaController.getPeople)
    .get('/pessoapaginate', PessoaController.getPeoplePaginate)
    .get('/pessoacompleta/:id', PessoaController.getPersonComplet)
    .get('/pessoa/:estabelecimento', PessoaController.getPeopleForEstabelecimento)
    .post('/pessoa/save', PessoaController.savePerson)
    .put('/pessoa/:id', PessoaController.editPerson)
    .delete('/pessoa/:id', PessoaController.deletePerson)

module.exports = pessoaRoutes;