const produtoRoutes = require('express').Router();
const ProdutoController = require('./ProdutoController');

produtoRoutes
    .get('/produto/:estabelecimento', ProdutoController.get)
    .get('/produtobyid/:id', ProdutoController.getById)
    .get('/produtovificarplano/:id', ProdutoController.verificarProdutoPlano)
    .post('/produto', ProdutoController.save)
    .put('/produto/:id', ProdutoController.edit)
    .delete('/produto/:id', ProdutoController.delete)

module.exports = produtoRoutes;