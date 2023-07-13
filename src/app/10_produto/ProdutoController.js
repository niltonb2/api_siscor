const ProdutoService = require('./ProdutoService');
const validate = require('../../utils/validateYup');

module.exports = {
    async get(req, res) {
        try {
            if(!req.params.estabelecimento)return res.status(400).json({info: 'Informe a id estabelecimento.'})

            const result = await ProdutoService.get(req.params.estabelecimento);
            res.status(200).json(result)

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getById(req, res) {
        try {
            if (!req.params.id) return res.status(400).json({ info: 'Informe a id do produto que deseja pesquisar.' })

            const result = await ProdutoService.getById(req.params.id);

            if (!result || result.length == 0)
                return res.status(400).json({ info: 'Não existe produto para a id informada.' })

            res.status(200).json(result)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async verificarProdutoPlano(req, res){
        try {
            if (!req.params.id) return res.status(400).json({ info: 'Informe a id do produto que deseja pesquisar.' })

            const result = await ProdutoService.getProdutoPlano(req.params.id);

            res.status(200).json(result)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async save(req, res) {
        try {
            const bodyIsValid = await validate.produtoSave(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await ProdutoService.save(req.body);

            res.status(200).json(result)

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async edit(req, res) {
        try {
            if (!req.params.id) return res.status(400).json({ info: 'Informe a id do produto que deseja atualizar.' })

            const buscaProduto = await ProdutoService.getById(req.params.id);

            if (!buscaProduto || buscaProduto.length == 0)
                return res.status(400).json({ info: 'Não existe produto para a id informada.' })

            const bodyIsValid = await validate.produtoEdit(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await ProdutoService.edit(req.body, req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Produto alterado com sucesso.' })

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async delete(req, res) {
        try {
            if (!req.params.id) return res.status(400).json({ info: 'Informe a id do produto que deseja deletar.' })

            const buscaProduto = await ProdutoService.getById(req.params.id);

            if (!buscaProduto || buscaProduto.length == 0)
                return res.status(400).json({ info: 'Não existe produto para a id informada.' })

            const result = await ProdutoService.delete(req.params.id);

            if (result.error)
            return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Produto deletado com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}