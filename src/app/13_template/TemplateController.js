const TemplateService = require('./TemplateService');
const EstabelecimentoService = require('../03_estabelecimento/EstabelecimentoService');
const validate = require('../../utils/validateYup');

module.exports = {
    async getNative(req, res) {
        try {
            const result = await TemplateService.getNative();

            res.status(200).json(result)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async get(req, res) {
        try {
            const result = await TemplateService.get(req.params.estabelecimento);

            res.status(200).json(result)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async create(req, res) {
        try {
            const bodyIsValid = await validate.templateCreate(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            if (!await EstabelecimentoService.getById(req.body.estabelecimento))
                return res.status(400).json({ info: 'Não existe estabelecimento para a id informada.' });

            const result = await TemplateService.create(req.body);

            res.status(200).json(result)

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async edit(req, res) {
        try {
            if (!await TemplateService.getById(req.params.id))
                return res.status(400).json({ info: 'Não existe template para a id informada.' });

            const bodyIsValid = await validate.templateCreate(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await TemplateService.edit(req.body, req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Template atualizado com sucesso.' });

        } catch (error) {
            res.status(400).json(error);
        }
    }
}