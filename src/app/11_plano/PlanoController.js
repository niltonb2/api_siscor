const PlanoService = require('./PlanoService');
const validate = require('../../utils/validateYup');

module.exports = {
    async get(req, res) {
        try {
            if(!req.params.estabelecimento)return res.status(400).json({info: 'Informe a id estabelecimento.'})

            const result = await PlanoService.get(req.params.estabelecimento);

            res.status(200).json(result)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getById(req, res) {
        try {
            if (!req.params.id) return res.status(400).json({ info: 'Informe a id do plano que deseja pesquisar.' })

            const result = await PlanoService.getById(req.params.id);

            if (!result || result.length == 0)
                return res.status(400).json({ info: 'Não existe plano para a id informada.' })

            res.status(200).json(result)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async save(req, res) {
        try {
            const bodyIsValid = await validate.planoSave(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await PlanoService.save(req.body);

            res.status(200).json(result)

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async edit(req, res) {
        try {
            if (!req.params.id) return res.status(400).json({ info: 'Informe a id do plano que deseja atualizar.' })

            const buscaProduto = await PlanoService.getById(req.params.id);

            if (!buscaProduto || buscaProduto.length == 0)
                return res.status(400).json({ info: 'Não existe plano para a id informada.' })

            const bodyIsValid = await validate.planoEdit(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await PlanoService.edit(req.body, req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Plano alterado com sucesso.' })

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async delete(req, res) {
        try {
            if (!req.params.id) return res.status(400).json({ info: 'Informe a id do plano que deseja deletar.' })

            const buscaProduto = await PlanoService.getById(req.params.id);

            if (!buscaProduto || buscaProduto.length == 0)
                return res.status(400).json({ info: 'Não existe plano para a id informada.' })

            const result = await PlanoService.delete(req.params.id);

            if (result.error)
            return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Plano deletado com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}