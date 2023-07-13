const knex = require('../../database');
const UsuarioService = require('../01_usuario/UsuarioService');
const EstabelecimentoService = require('../03_estabelecimento/EstabelecimentoService');
const PessoaService = require('../05_pessoa/PessoaService');
const axios = require('axios');

module.exports = {
    async get() {
        try {
            return await knex('cobranca').where('deleted', false);
        } catch (error) {
            console.log(error)
        }
    },

    async getAllCobComplet(id) {
        try {
            const result = await knex('cobranca')
                .join('pessoa', 'cobranca.pessoa', '=', 'pessoa.id')
                .select('*')
                .where('cobranca.estabelecimento', id)
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    async getDashboard(estabelecimento, dataFrom, dataTo) {
        try {

            let pagosQuery = await knex.raw(`
                SELECT 
                    id,
                    valor,
                    valor_original,
                    tipo,
                    data_vencimento,
                    status,
                    estabelecimento,
                    pessoa,
                    created_at::date
                    FROM cobranca
                    WHERE 
                    created_at::date between '${dataFrom}' and '${dataTo}'
                    AND status = 'pago'
                    AND estabelecimento = ${estabelecimento}
                    
            `)

            let abertosQuery = await knex.raw(`
                SELECT 
                    id,
                    valor,
                    valor_original,
                    tipo,
                    data_vencimento,
                    status,
                    estabelecimento,
                    pessoa,
                    created_at::date
                    FROM cobranca
                    WHERE 
                    created_at::date between '${dataFrom}' and '${dataTo}'
                    AND status = 'aberto'
                    AND estabelecimento = ${estabelecimento}
                
        `)

            let vencidosQuery = await knex.raw(`
                SELECT 
                    id,
                    valor,
                    valor_original,
                    tipo,
                    data_vencimento,
                    status,
                    estabelecimento,
                    pessoa,
                    created_at::date
                    FROM cobranca
                    WHERE 
                    created_at::date between '${dataFrom}' and '${dataTo}'
                    AND status = 'vencido'
                    AND estabelecimento = ${estabelecimento}
                
        `)

            let pendentesQuery = await knex.raw(`
                SELECT 
                    id,
                    valor,
                    valor_original,
                    tipo,
                    data_vencimento,
                    status,
                    estabelecimento,
                    pessoa,
                    created_at::date
                    FROM cobranca
                    WHERE 
                    created_at::date between '${dataFrom}' and '${dataTo}'
                    AND status = 'pendente'
                    AND estabelecimento = ${estabelecimento}
                
        `)

            pagosQuery.rows.forEach(query => {
                let data_formatada = new Intl.DateTimeFormat('pt-br').format(query.created_at)
                query.created_at = data_formatada;
            });

            abertosQuery.rows.forEach(query => {
                let data_formatada = new Intl.DateTimeFormat('pt-br').format(query.created_at)
                query.created_at = data_formatada;
            });

            vencidosQuery.rows.forEach(query => {
                let data_formatada = new Intl.DateTimeFormat('pt-br').format(query.created_at)
                query.created_at = data_formatada;
            });

            pendentesQuery.rows.forEach(query => {
                let data_formatada = new Intl.DateTimeFormat('pt-br').format(query.created_at)
                query.created_at = data_formatada;
            });

            return { pagos: pagosQuery.rows, abertos: abertosQuery.rows, vencidos: vencidosQuery.rows, pendentes: pendentesQuery.rows };
        } catch (error) {
            console.log(error);
        }
    },

    async getDashboardMonth(estabelecimento, dataFrom, dataTo) {
        try {

            const pagos = await knex.raw(`
                SELECT 
                    id,
                    valor,
                    valor_original,
                    tipo,
                    data_vencimento,
                    status,
                    estabelecimento,
                    pessoa,
                    created_at
                    FROM cobranca
                    WHERE
                    extract (day from created_at::timestamp) >= ${dataFrom[0]}
                    AND
                    extract (month from created_at::timestamp) >= ${dataFrom[1]}
                    AND
                    extract (year from created_at::timestamp) >= ${dataFrom[2]}
                    AND
                    extract (day from created_at::timestamp) <= ${dataFrom[0]}
                    AND
                    extract (month from created_at::timestamp) <= ${dataTo[1]}
                    AND
                    extract (year from created_at::timestamp) <= ${dataTo[2]}
                    AND status = 'pago'
                    AND estabelecimento = ${estabelecimento}
                    
            `)

            const abertos = await knex.raw(`
            SELECT 
                id,
                valor,
                valor_original,
                tipo,
                data_vencimento,
                status,
                estabelecimento,
                pessoa,
                created_at
                FROM cobranca
                WHERE 
                extract (day from created_at::timestamp) <= ${dataFrom[0]}
                AND
                extract (year from created_at::timestamp) >= ${dataFrom[2]}
                AND
                extract (month from created_at::timestamp) >= ${dataFrom[1]}
                AND
                extract (day from created_at::timestamp) >= ${dataFrom[0]}
                AND
                extract (year from created_at::timestamp) <= ${dataTo[2]}
                AND
                extract (month from created_at::timestamp) <= ${dataTo[1]}
                AND status = 'aberto'
                AND estabelecimento = ${estabelecimento}
                
        `)

            const vencidos = await knex.raw(`
            SELECT 
                id,
                valor,
                valor_original,
                tipo,
                data_vencimento,
                status,
                estabelecimento,
                pessoa,
                created_at
                FROM cobranca
                WHERE 
                extract (month from created_at::timestamp) >= ${dataFrom[1]}
                AND
                extract (year from created_at::timestamp) >= ${dataFrom[2]}
                AND
                extract (month from created_at::timestamp) <= ${dataTo[1]}
                AND
                extract (year from created_at::timestamp) <= ${dataTo[2]}
                AND status = 'pago'
                AND estabelecimento = ${estabelecimento}
                
        `)

            const pendentes = await knex.raw(`
            SELECT 
                id,
                valor,
                valor_original,
                tipo,
                data_vencimento,
                status,
                estabelecimento,
                pessoa,
                created_at
                FROM cobranca
                WHERE 
                extract (month from created_at::timestamp) >= ${dataFrom[1]}
                AND
                extract (year from created_at::timestamp) >= ${dataFrom[2]}
                AND
                extract (month from created_at::timestamp) <= ${dataTo[1]}
                AND
                extract (year from created_at::timestamp) <= ${dataTo[2]}
                AND status = 'pendente'
                AND estabelecimento = ${estabelecimento}
                
        `)


            return { pagos: pagos.rows, abertos: abertos.rows, vencidos: vencidos.rows, pendentes: pendentes.rows };
        } catch (error) {
            console.log(error);
        }
    },

    async getByDocument(documento) {
        try {
            const result = await knex('cobranca')
                .join('pessoa', 'cobranca.pessoa', '=', 'pessoa.id')
                .join('estabelecimento', 'cobranca.estabelecimento', 'estabelecimento.id')
                .join('contato', 'pessoa.contato', '=', 'contato.id')
                .join('endereco', 'pessoa.endereco', '=', 'endereco.id')
                .join('gateway', 'estabelecimento.gateway', '=', 'gateway.id')
                .select(
                    '*',
                    'estabelecimento.nome as estabelecimento_nome',
                    'estabelecimento.documento as estabelecimento_documento',
                    'pessoa.nome as cliente_nome',
                    'pessoa.documento as cliente_documento',
                    'cobranca.id as cobranca_id',
                    'gateway.nome as gateway_nome'
                )
                .where('pessoa.documento', documento)

            return result;
        } catch (error) {
            console.log(error)
        }
    },

    async getForTransaction(cobrancaId) {
        try {
            const result = await knex('cobranca')
                .join('pessoa', 'cobranca.pessoa', '=', 'pessoa.id')
                .join('estabelecimento', 'cobranca.estabelecimento', '=', 'estabelecimento.id')
                .join('gateway', 'estabelecimento.gateway', '=', 'gateway.id')
                .join('endereco', 'pessoa.endereco', '=', 'endereco.id')
                .select(
                    '*',
                    'pessoa.documento as documento_cliente'
                )
                .where('cobranca.id', cobrancaId)
            return result;
        } catch (error) {
            console.log(error)
        }
    },

    async createBuyer(dados) {
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
            const res = await http.post('buyers', data);

            return res;
        } catch (error) {
            console.log(error)
        }
    },

    async updateBuyerWithCard(dados, marketplace_id) {
        try {
            const http = axios.create({
                baseURL: process.env.URL_API_PAGAMENTO,
                headers: {
                    'api_key': process.env.API_KEY,
                    'marketplace_id': marketplace_id,
                    'Content-Type': 'application/json'
                }
            });
            const res = await http.put(`buyers/${dados.buyer_id}/add_card/${dados.card_token}`);
            return res;
        } catch (error) {
            console.log(error)
        }
    },

    async createCard(dados, marketplace_id) {
        try {
            const data = dados;
            const http = axios.create({
                baseURL: process.env.URL_API_PAGAMENTO,
                headers: {
                    'api_key': process.env.API_KEY,
                    'marketplace_id': marketplace_id,
                    'Content-Type': 'application/json'
                }
            });
            const res = await http.post('cards', data);
            return res;
        } catch (error) {
            console.log(error)
        }
    },

    async createTransaction(dados, marketplace_id) {
        try {

            const data = dados;
            const http = axios.create({
                baseURL: process.env.URL_API_PAGAMENTO,
                headers: {
                    'api_key': process.env.API_KEY,
                    'marketplace_id': marketplace_id,
                    'Content-Type': 'application/json'
                }
            });
            const res = await http.post('transactions', data);
            return res;
        } catch (error) {
            console.log(error)
            return { haveError: true, message: error.response.data.message }
        }
    },

    async getById(id) {
        try {
            const result = await knex('cobranca').where('id', id);
            return result.length > 0 ? true : false;
        } catch (error) {
            console.log(error);
        }
    },

    async getDadosById(id) {
        try {
            const result = await knex('cobranca').where('id', id);
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    async create(cobranca) {
        if (!await UsuarioService.getById(cobranca.usuario)) return { error: 'Não existe usuário para a ID informada.' };
        if (!await EstabelecimentoService.getById(cobranca.estabelecimento)) return { error: 'Não existe estabelecimento para a ID informada.' };
        if (!await PessoaService.getById(cobranca.pessoa)) return { error: 'Não existe pessoa para a ID informada.' };

        try {
            const result = await knex('cobranca').insert(cobranca);

            if (!result.rowCount)
                return { error: 'Erro no cadastro de cobrança.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    },

    async edit(cobranca, id) {
        try {
            const result = await knex('cobranca').update(cobranca).where('id', id);

            if (!result)
                return { error: 'Erro na atualização de cobrança.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    },

    async pay(id) {
        try {
            const result = await knex('cobranca').update('status', 'pago').where('id', id);

            if (!result)
                return { error: 'Erro na atualização de cobrança.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    },

    async delete(id) {
        try {
            const result = await knex('cobranca').update({
                deleted_at: new Date(),
                deleted: true
            }).where('id', id);

            if (result.length > 0)
                return { error: 'Erro na deleção de cobrança.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    }
}