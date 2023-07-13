const validate = require('../../utils/validateYup');
const DadosService = require('./DadosService');

module.exports = {
    async getContato(req, res) {
        try {
            const result = await DadosService.getContact(req.params.id);
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getEndereco(req, res) {
        try {
            const result = await DadosService.getAddress(req.params.id);
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getBancarios(req, res) {
        try {
            const result = await DadosService.getBanking(req.params.id);
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async saveDados(req, res) {
        try {

            let bodyValidate;

            const { tipo, entidade, id } = req.params;

            switch (tipo) {
                case 'contato':
                    bodyValidate = await validate.contatoDados(req.body)
                    break;
                case 'endereco':
                    bodyValidate = await validate.enderecoDados(req.body)
                    break;
                case 'bancarios':
                    bodyValidate = await validate.bancariosDados(req.body)
                    break;
                default:
                    break;
            }

            if (!bodyValidate.tipo) return res.status(400).json({ info: bodyValidate[0] });

            if (bodyValidate.tipo == 'contato') {
                const result = await DadosService.saveContact(req.body, tipo, entidade, id);
                return res.status(200).json(result);
            }

            if (bodyValidate.tipo == 'endereco') {
                const result = await DadosService.saveAddress(req.body, tipo, entidade, id);
                return res.status(200).json(result);
            }

            if (bodyValidate.tipo == 'bancarios') {
                const result = await DadosService.saveBanking(req.body, tipo, entidade, id);
                return res.status(200).json(result);
            }

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async editDados(req, res) {
        let bodyValidate;

        const { tipo, id } = req.params;

        switch (tipo) {
            case 'contato':
                bodyValidate = await validate.contatoDados(req.body)
                break;
            case 'endereco':
                bodyValidate = await validate.enderecoDados(req.body)
                break;
            case 'bancarios':
                bodyValidate = await validate.bancariosDados(req.body)
                break;
            default:
                break;
        }

        if (bodyValidate.result == false) return res.status(400).json({ info: 'Erro! Verifique os dados preenchidos.' });

        if (bodyValidate.tipo == 'contato') {
            const result = await DadosService.editContact(req.body, id);
            return res.status(200).json(result);
        }

        if (bodyValidate.tipo == 'endereco') {
            const result = await DadosService.editAddress(req.body, id);
            return res.status(200).json(result);
        }

        if (bodyValidate.tipo == 'bancarios') {
            const result = await DadosService.editBanking(req.body, id);
            return res.status(200).json(result);
        }


    },

    async deleteDados(req, res) {

        try {
            const { tipo, id } = req.params;

            const result = await DadosService.delete(tipo, id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: `${tipo} deletada com sucesso.` });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}