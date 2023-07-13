const knex = require('../../database');

module.exports = {
    async get(estabelecimento) {
        try {
            return await knex('assinatura').where('deleted', false).andWhere('assinatura.estabelecimento', estabelecimento);
        } catch (error) {
            console.log(error)
        }
    },

    async getDados(cliente){
        try {
            return await knex('assinatura')
                .join('plano', 'assinatura.plano', '=', 'plano.id')
                .where('assinatura.pessoa', cliente);
        } catch (error) {
            console.log(error)
        }
    },

    async save(assinatura) {
        try {
            const result = await knex('assinatura').insert(assinatura, ['*']);

            if (!result)
                return { error: 'Erro no cadastro de assinatura.' };

            return result;
        } catch (error) {
            console.log(error);
        }
    }
}