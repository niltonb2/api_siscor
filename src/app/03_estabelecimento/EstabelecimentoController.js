const EstabelecimentoService = require('./EstabelecimentoService');
const UsuarioService = require('../01_usuario/UsuarioService');
const validate = require('../../utils/validateYup');

module.exports = {
    async getEcs(req, res) {
        try {
            const result = await EstabelecimentoService.get();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error)
        }
    },

    async getEcAllDados(req, res) {
        try {
            const result = await EstabelecimentoService.getComplet(req.params.id);
            if (result.error)
                return res.status(400).json({ info: result.error });
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error)
        }
    },

    async getEstabelecimentoPorUsuario(req, res) {
        if (!await UsuarioService.getById(req.params.id))
            return res.status(400).json({ info: 'Não existe usuário para a ID informada.' });

        try {
            const result = await EstabelecimentoService.getEcByUser(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getEcById(req, res) {
        try {
            const result = await EstabelecimentoService.getDadosEcById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error)
        }
    },

    async getEcByDocument(req, res) {
        try {
            if(!req.params.documento) return res.status(400).json({info: 'Informe um documento para verificar se existe no banco.'})
            const result = await EstabelecimentoService.verififyExistsEc(req.params.documento);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error)
        }
    },

    async saveEstabelecimento(req, res) {
        try {
            const bodyIsValid = await validate.estabelecimentoSave(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            if (await EstabelecimentoService.getByDocument(req.body.documento))
                return res.status(400).json({ info: 'Já existe estabelecimento para o documento informado.' })

            const result = await EstabelecimentoService.save(req.body, res.usuarioId);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Cadastro realizado com sucesso.', idEstabelecimento: result[0].id });

        } catch (error) {
            res.status(400).json(error)
        }
    },

    async editEstabelecimento(req, res) {
        try {
            if (!await EstabelecimentoService.getById(req.params.id))
                return res.status(400).json({ info: 'Não existe estabelecimento para a ID informada.' });

            const bodyIsValid = await validate.estabelecimentoEdit(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await EstabelecimentoService.edit(req.body, req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Estabelecimento alterado com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async deleteEstabelecimento(req, res) {
        try {
            if (!await EstabelecimentoService.getById(req.params.id))
                return res.status(400).json({ info: 'Não existe estabelecimento para a ID informada.' });

            const result = await EstabelecimentoService.delete(req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Estabelecimento deletado com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async consultaCnpj(req, res) {
        try {
            const result = await EstabelecimentoService.getDadosCnpj(req.params.cnpj)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async setGatewayAoEstabelecimento(req, res) {
        try {
            const result = await EstabelecimentoService.setGateway(req.params.id, req.params.gateway)

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Estabelecimento atualizado com sucesso.' })
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async setConfig(req, res) {
        try {
            const result = await EstabelecimentoService.setConfig(req.params.estabelecimento, req.body)

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Configuração no Estabelecimento atualizada com sucesso.' })
        } catch (error) {
            res.status(400).json(error);
        }
    }
}