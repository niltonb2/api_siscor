const knex = require('../../database');
const ReguaService = require('../07_regua/ReguaService');

module.exports = {
    async get() {
        try {
            return await knex('acoes').where('deleted', false);
        } catch (error) {
            console.log(error)
        }
    },

    async getById(id) {
        try {
            const result = await knex('acoes').where('id', id);
            return result.length > 0 ? true : false;
        } catch (error) {
            console.log(error);
        }
    },

    async create(acao) {

        if(!await ReguaService.getById(acao.regua)) return {error: 'Não existe régua para a ID informada.'};

        try {
            const result = await knex('acoes').insert(acao);

            if (!result.rowCount)
                return { error: 'Erro no cadastro de ações.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    },

    async edit(acoes, id) {
        try {
            const result = await knex('acoes').update(acoes).where('id', id);

            if (!result)
                return { error: 'Erro na atualização de ação.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    },

    async delete(id) {
        try {
            const result = await knex('acoes').where('id', id).del();

            if (result.length > 0)
                return { error: 'Erro na deleção de ações.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    }
}