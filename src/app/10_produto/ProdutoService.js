const knex = require('../../database');

module.exports = {
    async get(estabelecimento){
        try {
            return await knex('produto').where('deleted', false).andWhere('produto.estabelecimento', estabelecimento);
        } catch (error) {
            console.log(error)
        }
    },

    async getById(id){
        try {
            return await knex('produto').where('id', id).andWhere('deleted', false);
        } catch (error) {
            console.log(error)
        }
    },

    async getProdutoPlano(id){
        try {
            const planos = await knex('plano').where('deleted', false);

            let result = false;

            planos.forEach(plano => {
                let temProduto = plano.informacoes.produto.includes(parseInt(id))
                if(temProduto){
                    result = temProduto;
                }
            })

            return result;

        } catch (error) {
            console.log(error)
        }
    },

    async save(produto){
        try {
            return await knex('produto').insert(produto, ['*']);
        } catch (error) {
            console.log(error);
        }
    },

    async edit(produto, id){
        try {
            const result = await knex('produto').update(produto).where('id', id);

            if (!result)
            return { error: 'Erro na atualização de produto.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    },

    async delete(id) {
        try {
            const result = await knex('produto').update({
                deleted_at: new Date(),
                deleted: true
            }).where('id', id);

            if (result.length > 0)
                return { error: 'Erro na deleção de produto.' };

            return true;
        } catch (error) {
            console.log(error)
        }
    }
}