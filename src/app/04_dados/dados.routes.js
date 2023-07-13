const dadosRoutes = require('express').Router();
const DadosController = require('./DadosController');
const PessoaMiddleware = require('../../middlewares/PessoaDadosMiddleware');
const EstabelecimentoMiddleware = require('../../middlewares/EstabelecimentoDadosMiddleware');

dadosRoutes
    .get('/dados/contato/:id', DadosController.getContato)
    .get('/dados/endereco/:id', DadosController.getEndereco)
    .get('/dados/bancarios/:id', DadosController.getBancarios)
    .post('/dados/:tipo/:entidade/:id', PessoaMiddleware, EstabelecimentoMiddleware, DadosController.saveDados)
    .put('/dados/:tipo/:id', DadosController.editDados)
    .delete('/dados/:tipo/:id', DadosController.deleteDados)

module.exports = dadosRoutes;