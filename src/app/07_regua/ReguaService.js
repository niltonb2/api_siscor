const knex = require('../../database');

module.exports = {
    async get() {
        try {
            return await knex('regua').where('deleted', false);
        } catch (error) {
            console.log(error)
        }
    },

    async getById(id) {
        try {
            const result = await knex('regua').where('id', id);
            return result.length > 0 ? true : false;
        } catch (error) {
            console.log(error);
        }
    },

    async create(regua) {
        try {
            const result = await knex('regua').insert(regua);

            if (!result.rowCount)
                return { error: 'Erro no cadastro de régua.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    },

    async edit(regua, id) {
        try {
            const result = await knex('regua').update(regua).where('id', id);

            if (!result)
                return { error: 'Erro na atualização de régua.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    },

    async delete(id) {
        try {
            const result = await knex('regua').update({
                deleted_at: new Date(),
                deleted: true
            }).where('id', id);

            if (result.length > 0)
                return { error: 'Erro na deleção de régua.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    }
};