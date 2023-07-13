const UsuarioService = require('./UsuarioService');
const token = require('../../utils/token');
const validate = require('../../utils/validateYup');

module.exports = {
    async getUsers(req, res) {
        try {
            const result = await UsuarioService.get();
            result.forEach(u => u.senha = undefined);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getUserById(req, res) {
        try {
            const result = await UsuarioService.getDadosUser(res.usuarioId);
            result.senha = undefined;
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getQtdeEcsByUser(req, res) {
        try {
            const result = await UsuarioService.getEcs(res.usuarioId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async saveUser(req, res) {
        try {
            const bodyIsValid = await validate.usuarioSave(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await UsuarioService.save(req.body);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({
                info: `Bem vindo ${result.result[0].nome}!`,
                token: token.generate({ id: result.result[0].id }),
                ecs: result.ecs,
                usuario: result.result[0]
            });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async editUser(req, res) {
        try {
            if (!await UsuarioService.getById(req.params.id))
                return res.status(400).json({ info: 'Não existe usuário para a ID informada.' });

            const bodyIsValid = await validate.usuarioEdit(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await UsuarioService.edit(req.body, req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Usuário atualizado com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async editIdEstabelecimento(req, res) {
        try {
            if (!await UsuarioService.getById(req.params.id))
                return res.status(400).json({ info: 'Não existe usuário para a ID informada.' });

            const result = await UsuarioService.setEstabelecimento(req.params.id, req.params.idestabelecimento);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Usuário atualizado com sucesso.' });

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async loginUser(req, res) {
        try {
            const bodyIsValid = await validate.usuarioLogin(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await UsuarioService.login(req.body.email, req.body.senha);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({
                info: `Bem vindo ${result.result[0].nome}!`,
                token: token.generate({ id: result.result[0].id }),
                ecs: result.ecs,
                usuario: result.result[0]
            });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async deleteUser(req, res) {
        try {
            if (!await UsuarioService.getById(req.params.id))
                return res.status(400).json({ info: 'Não existe usuário para a ID informada.' });

            const result = await UsuarioService.delete(req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Usuário deletado com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    }
};