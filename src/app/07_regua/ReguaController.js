const ReguaService = require('./ReguaService');
const validate = require('../../utils/validateYup');

module.exports = {
    async getRules(req, res) {
        try {
            const result = await ReguaService.get();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async createRule(req, res) {
        try {
            const bodyIsValid = await validate.ruleCreate(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await ReguaService.create(req.body);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Cadastro realizado com sucesso.' })
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async editRule(req, res) {
        try {
            if (!await ReguaService.getById(req.params.id))
                return res.status(400).json({ info: 'Não existe régua para a ID informada.' });

            const bodyIsValid = await validate.ruleCreate(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await ReguaService.edit(req.body, req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Régua atualizada com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async deleteRule(req, res) {
        try {
            if (!await ReguaService.getById(req.params.id))
                return res.status(400).json({ info: 'Não existe régua para a ID informada.' });

            const result = await ReguaService.delete(req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Régua deletada com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    }
};