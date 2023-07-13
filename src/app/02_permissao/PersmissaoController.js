const PermissaoService = require('./PermissaoService');
const UsuarioService = require('../01_usuario/UsuarioService');
const validate = require('../../utils/validateYup');

module.exports = {
    async savePermission(req, res) {
        try {
            if (!await UsuarioService.getById(req.params.user))
                return res.status(400).json({ info: 'Não existe usuário para a ID informada.' });

            const bodyIsValid = await validate.arrayPermissao(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await PermissaoService.save(req.params.user, req.body.ids);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Permissões atualizadas com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async deletePermission(req, res) {
        try {
            if (!await UsuarioService.getById(req.params.user))
                return res.status(400).json({ info: 'Não existe usuário para a ID informada.' });

            if (!await validate.arrayPermissao(req.body))
                return res.status(400).json({ info: 'Erro! Verifique os dados preenchidos.' });

            const result = await PermissaoService.delete(req.params.user, req.body.ids);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Permissões deletadas com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}