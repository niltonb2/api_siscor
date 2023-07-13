const knex = require('../../database');
const EstabelecimentoService = require('../03_estabelecimento/EstabelecimentoService');
const PessoaService = require('../05_pessoa/PessoaService');

module.exports = {
    async saveContact(contato, tipo, entidade, id) {
        try {
            const result = await knex('contato').insert(contato, ['*'])

            if (result.length == 0)
                return { error: 'Erro no cadastro de contato.' };

            if (entidade == 'estabelecimento') {
                return await EstabelecimentoService.insertDados(id, tipo, result[0].id);
            }

            if (entidade == 'pessoa') {
                return await PessoaService.insertDados(id, tipo, result[0].id);
            }
        } catch (error) {
            console.log(error);
        }
    },

    async editContact(contato, id) {
        try {

            const searchId = await knex('contato').where('id', id);

            if (searchId.length == 0) return { error: 'Não existe contato para a ID informada.' };

            const result = await knex('contato').update(contato).where('id', id);

            if (!result)
                return { error: 'Erro na atualização de contato.' };

            return { info: 'Contato atualizado com sucesso.' };
        } catch (error) {
            console.log(error);
        }
    },

    async getContact(id) {
        try {
            return await knex('contato').where('id', id).andWhere('deleted', false);
        } catch (error) {
            return error.message
        }
    },

    async saveAddress(endereco, tipo, entidade, id) {
        try {
            const result = await knex('endereco').insert(endereco, ['*'])

            if (result.length == 0)
                return { error: 'Erro no cadastro de endereco.' };

            if (entidade == 'estabelecimento') {
                return await EstabelecimentoService.insertDados(id, tipo, result[0].id);
            }

            if (entidade == 'pessoa') {
                return await PessoaService.insertDados(id, tipo, result[0].id);
            }
        } catch (error) {
            console.log(error);
        }
    },

    async editAddress(endereco, id) {
        try {

            const searchId = await knex('endereco').where('id', id);

            if (searchId.length == 0) return { error: 'Não existe endereco para a ID informada.' };

            const result = await knex('endereco').update(endereco).where('id', id);

            if (!result)
                return { error: 'Erro na atualização de endereço.' };

            return { info: 'Endereço atualizado com sucesso.' };
        } catch (error) {
            console.log(error);
        }
    },

    async getAddress(id) {
        try {
            return await knex('endereco').where('id', id).andWhere('deleted', false);
        } catch (error) {
            return error.message
        }
    },

    async saveBanking(bancarios, tipo, entidade, id) {
        try {
            const result = await knex('bancarios').insert(bancarios, ['*'])

            if (result.length == 0)
                return { error: 'Erro no cadastro de dados bancários.' };

            if (entidade == 'estabelecimento') {
                return await EstabelecimentoService.insertDados(id, tipo, result[0].id);
            }

            if (entidade == 'pessoa') {
                return await PessoaService.insertDados(id, tipo, result[0].id);
            }
        } catch (error) {
            console.log(error);
        }
    },

    async editBanking(bancarios, id) {
        try {

            const searchId = await knex('bancarios').where('id', id);

            if (searchId.length == 0) return { error: 'Não existe dados bancários para a ID informada.' };

            const result = await knex('bancarios').update(bancarios).where('id', id);

            if (!result)
                return { error: 'Erro na atualização de dados bancários.' };

            return { info: 'Dados bancários atualizados com sucesso.' };
        } catch (error) {
            console.log(error);
        }
    },

    async getBanking(id) {
        try {
            return await knex('bancarios').where('id', id).andWhere('deleted', false);
        } catch (error) {
            return error.message
        }
    },

    async delete(tabela, id) {
        try {

            const searchId = await knex(tabela).where('id', id);

            if (searchId.length == 0) return { error: `Não existe dados ${tabela} para a ID informada.` };

            const result = await knex(tabela).update({
                deleted_at: new Date(),
                deleted: true
            }).where('id', id);

            if (result.length > 0)
                return { error: `Erro na atualização de ${tabela}.` };

            return true;

        } catch (error) {
            console.log(error);
        }
    }
}