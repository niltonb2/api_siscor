const knex = require('../../database');
const axios = require('axios');

module.exports = {
    async get(){
        try {
            return await knex('gateway').where('deleted', false);
        } catch (error) {
            console.log(error)
        }
    },

    async getById(id){
        try {
            return await knex('gateway').where('id', id).andWhere('deleted', false);
        } catch (error) {
            console.log(error)
        }
    },

    async getSeller(marketplace_id, gateway_seller_id){
        const http = axios.create({
            baseURL: process.env.URL_API_PAGAMENTO,
            headers: {
                'marketplace_id': marketplace_id
            }
        });
        const res = await http.get(`sellers/zoop/find?gateway_seller_id=${gateway_seller_id}`)

        return res;
    },

    async createSeller(dados){
        try {
            const data = dados;
            const http = axios.create({
                baseURL: process.env.URL_API_PAGAMENTO,
                headers: {
                    'api_key': process.env.API_KEY,
                    'marketplace_id': dados.gateway_marketplace_id,
                    'Content-Type': 'application/json'
                }
            });
            const res = await http.post('sellers', data);

            return res;
        } catch (error) {
            return {status: 400, error: error.response.data};
        }
    },

    async edit(gateway, id) {
        try {
            const result = await knex('gateway').update(gateway).where('id', id);

            if (!result)
                return { error: 'Erro na atualização de gateway.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    },

    async save(gateway) {
        try {
            const result = await knex('gateway').insert(gateway, ['*']);

            if (result.length == 0)
                return { error: 'Erro no cadastro de gateway.' };

            return result;
        } catch (error) {
            console.log(error);
        }
    },

    async delete(id) {
        try {
            const result = await knex('gateway').update({
                deleted_at: new Date(),
                deleted: true
            }).where('id', id);

            if (result.length > 0)
                return { error: 'Erro na deleção de gateway.' };

            return true;
        } catch (error) {
            console.log(error)
        }
    }
}