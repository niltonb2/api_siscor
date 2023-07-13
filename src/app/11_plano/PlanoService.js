const knex = require('../../database');

module.exports = {
    async get(estabelecimento){
        try {
            return await knex('plano').where('deleted', false).andWhere('plano.estabelecimento', estabelecimento);
        } catch (error) {
            console.log(error)
        }
    },

    async getById(id){
        try {
            return await knex('plano').where('id', id).andWhere('deleted', false);
        } catch (error) {
            console.log(error)
        }
    },

    async save(plano){
        try {
            return await knex('plano').insert(plano, ['*']);
        } catch (error) {
            console.log(error);
        }
    },

    async edit(plano, id){
        try {
            const result = await knex('plano').update(plano).where('id', id);

            if (!result)
            return { error: 'Erro na atualização de plano.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    },

    async delete(id) {
        try {
            const result = await knex('plano').update({
                deleted_at: new Date(),
                deleted: true
            }).where('id', id);

            if (result.length > 0)
                return { error: 'Erro na deleção de plano.' };

            return true;
        } catch (error) {
            console.log(error)
        }
    }
}