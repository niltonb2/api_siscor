const knex = require('../../database');
const bcrypt = require('bcryptjs');

module.exports = {
    async get() {
        try {
            return await knex('usuario').where('deleted', false);
        } catch (error) {
            return error.message
        }
    },

    async getById(id) {
        try {
            const result = await knex('usuario').where('id', id).andWhere('deleted', false);
            return result.length > 0 ? true : false;
        } catch (error) {
            return error.message
        }
    },

    async getDadosUser(id) {
        try {
            const result = await knex('usuario').where('id', id).andWhere('deleted', false);
            return result[0];
        } catch (error) {
            return error.message
        }
    },

    async getEcs(id) {
        try {
            const result = await knex('usuario_estabelecimento')
                .join('estabelecimento', 'usuario_estabelecimento.estabelecimento', 'estabelecimento.id')
                .where('usuario_estabelecimento.usuario', id)
                .andWhere('deleted', false)
                .select('*')

            return result;
        } catch (error) {
            return error.message
        }
    },

    async save(usuario) {
        try {
            const u = await knex('usuario').where('email', usuario.email)
            if (u.length > 0)
                return { error: 'Já existe usuário para o email informado.' };

            const hash = await bcrypt.hash(usuario.senha, 10)

            const result = await knex('usuario').insert({ ...usuario, senha: hash }, ['*']);

            const ecs = await knex('usuario_estabelecimento').where('usuario', result[0].id)

            if (result.length == 0)
                return { error: 'Erro no cadastro de usuário.' };

            const usuarioSalvo = {
                result,
                ecs: ecs.length
            }

            return usuarioSalvo;

        } catch (error) {
            console.log(error);
        }
    },

    async login(email, senha) {
        try {
            const result = await knex('usuario').where('email', email);
            if (result.length == 0)
                return { error: 'Não existe usuário para o email informado.' };

            const ecs = await knex('usuario_estabelecimento').where('usuario', result[0].id)

            if (!await bcrypt.compare(senha, result[0].senha))
                return { error: 'Senha incorreta.' };

            const usuarioSalvo = {
                result,
                ecs: ecs.length
            }
            return usuarioSalvo;
        } catch (error) {
            console.log(error);
        }
    },

    async edit(usuario, id) {
        try {
            const u = await knex('usuario').where('email', usuario.email)
            if (u.length > 0)
                return { error: 'Já existe usuário para o email informado.' };

            const result = await knex('usuario').update(usuario).where('id', id);

            if (!result)
                return { error: 'Erro na atualização de usuário.' };

            return true;

        } catch (error) {
            console.log(error);
        }
    },

    async setEstabelecimento(usuario, estabelecimento) {
        try {

            const result = await knex('usuario')
                .update('estabelecimento_selecionado', estabelecimento).where('id', usuario);

            if (!result)
                return { error: 'Erro na atualização de usuário.' };

            return true;

        } catch (error) {
            console.log(error);
        }
    },

    async delete(id) {
        try {
            const result = await knex('usuario').update({
                deleted_at: new Date(),
                deleted: true
            }).where('id', id);

            if (result.length > 0)
                return { error: 'Erro na deleção de usuário.' };

            return true;

        } catch (error) {
            console.log(error);
        }
    }
};