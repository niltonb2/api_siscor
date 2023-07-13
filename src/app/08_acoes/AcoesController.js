const AcoesService = require('./AcoesService');
const validate = require('../../utils/validateYup');

module.exports = {
    async createAction(req, res) {
        try {
            const bodyIsValid = await validate.actionsCreate(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await AcoesService.create(req.body);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Cadastro realizado com sucesso.' })
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getActions(req, res) {
        try {
            const result = await AcoesService.get();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async editAction(req, res) {
        try {
            if (!await CobrancaService.getById(req.params.id))
                return res.status(400).json({ info: 'Não existe ação para a ID informada.' });

            const bodyIsValid = await validate.actionsEdit(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await AcoesService.edit(req.body, req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Ação atualizada com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async deleteAction(req, res) {
        try {
            if (!await AcoesService.getById(req.params.id))
                return res.status(400).json({ info: 'Não existe régua para a ID informada.' });

            const result = await AcoesService.delete(req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Régua deletada com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}