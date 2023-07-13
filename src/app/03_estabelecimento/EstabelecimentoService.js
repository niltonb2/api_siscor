const knex = require('../../database');
const axios = require('axios');
const TemplateService = require('../13_template/TemplateService');

module.exports = {
    async get() {
        try {
            return await knex('estabelecimento').where('deleted', false);
        } catch (error) {
            console.log(error);
        }
    },

    async getById(id) {
        try {
            const result = await knex('estabelecimento').where('id', id);
            return result.length > 0 ? true : false;
        } catch (error) {
            console.log(error);
        }
    },

    async verififyExistsEc(documento) {
        try {
            const result = await knex('estabelecimento').where('documento', documento);
            return result.length > 0 ? true : false;
        } catch (error) {
            console.log(error);
        }
    },

    async getComplet(id) {
        try {
            const estabelecimento = await this.getDadosEcById(id);
            if (!estabelecimento) return { error: 'Não existe estabelecimento para a ID informada.' }

            if (estabelecimento[0].gateway) {
                const result = await knex('contato')
                    .join('estabelecimento', 'estabelecimento.contato', '=', 'contato.id')
                    .join('endereco', 'estabelecimento.endereco', '=', 'endereco.id')
                    .join('gateway', 'estabelecimento.gateway', '=', 'gateway.id')
                    .select(
                        '*',
                        'gateway.nome as nome_gateway',
                        'estabelecimento.nome as nome_estabelecimento',
                        'estabelecimento.id as id_estabelecimento'
                    )
                    .where('estabelecimento.id', id)
                return result;
            } else {
                const result = await knex('contato')
                    .join('estabelecimento', 'estabelecimento.contato', '=', 'contato.id')
                    .join('endereco', 'estabelecimento.endereco', '=', 'endereco.id')
                    .select(
                        '*',
                        'estabelecimento.nome as nome_estabelecimento',
                        'estabelecimento.id as id_estabelecimento'
                    )
                    .where('estabelecimento.id', id)
                return result;
            }
        } catch (error) {
            console.log(error);
        }
    },

    async getByDocument(documento) {
        try {
            const result = await knex('estabelecimento').where('documento', documento);
            return result.length > 0 ? true : false;
        } catch (error) {
            console.log(error);
        }
    },

    async getEcByUser(usuario) {
        try {
            const result = await knex('estabelecimento')
                .join('usuario_estabelecimento', 'usuario_estabelecimento.estabelecimento', '=', 'estabelecimento.id')
                .select('*')
                .where('usuario_estabelecimento.usuario', usuario)
                .andWhere('deleted', false)
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    async getDadosEcById(id) {
        try {
            const result = await knex('estabelecimento').where('id', id);
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    async save(estabelecimento, usuario_id) {
        try {
            const result = await knex('estabelecimento').insert(estabelecimento, ['*']);
            if (result.length == 0)
                return { error: 'Erro no cadastro de estabelecimento.' };

            const usuario_estabelecimento = await knex('usuario_estabelecimento').insert({ usuario: usuario_id, estabelecimento: result[0].id });

            if (!usuario_estabelecimento.rowCount)
                return { error: 'Erro ao vincular estabelecimento ao usuário.' };

            const criarTemplatesDeEmail = await TemplateService.creatTemplatesForEc(result[0].id);

            if (!criarTemplatesDeEmail)
                return { error: 'Erro ao criar templates de e-mail.' }

            return result;
        } catch (error) {
            console.log(error);
        }
    },

    async edit(estabelecimento, id) {
        try {
            const result = await knex('estabelecimento').update(estabelecimento).where('id', id);

            if (!result)
                return { error: 'Erro na atualização de estabelecimento.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    },

    async delete(id) {
        try {
            const result = await knex('estabelecimento').update({
                deleted_at: new Date(),
                deleted: true
            }).where('id', id);

            if (result.length > 0)
                return { error: 'Erro na deleção de estabelecimento.' };

            return true;

        } catch (error) {
            console.log(error);
        }
    },

    async insertDados(id, coluna, dadosId) {
        try {
            const result = await knex('estabelecimento').update(coluna, dadosId).where('id', id);
            if (result.length == 0) return false;
            return { info: `Dados de ${coluna} cadastrados e vinculados a entidade de Estabelecimento.` };
        } catch (error) {
            console.log(error)
        }
    },

    async getDadosCnpj(cnpj) {

        try {
            const res = await axios.get(`${process.env.URL_RECEITAWS}/${cnpj}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.RECEITAWS_API_TOKEN}`
                }
            })

            return res.data;
        } catch (error) {
            console.log(error)
        }
    },

    async setGateway(estabelecimento, gateway) {
        try {
            const result = await knex('estabelecimento').update('gateway', gateway).where('id', estabelecimento);

            if (!result)
                return { error: 'Erro na atualização de estabelecimento.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    },

    async setConfig(estabelecimento, config) {
        try {
            const result = await knex('estabelecimento').update('configuracoes', config).where('id', estabelecimento);

            if (!result)
                return { error: 'Erro na atualização de estabelecimento.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    }
}