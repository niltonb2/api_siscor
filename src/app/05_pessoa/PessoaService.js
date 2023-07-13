const knex = require('../../database');

module.exports = {
    async get() {
        try {
            return await knex('pessoa').where('deleted', false);
        } catch (error) {
            console.log(error)
        }
    },

    async getPaginate(limit, offset) {
        try {
            return await knex('pessoa')
                .limit(limit)
                .offset(offset)
                .where('deleted', false);
        } catch (error) {
            console.log(error)
        }
    },

    async getById(id) {
        try {
            const result = await knex('pessoa').where('id', id);
            return result.length > 0 ? true : false;
        } catch (error) {
            console.log(error);
        }
    },

    async getByDoc(documento) {
        try {
            const result = await knex('pessoa').where('documento', documento);
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    async getByDocument(documento) {
        try {
            const result = await knex('pessoa').where('documento', documento);
            return result.length > 0 ? true : false;
        } catch (error) {
            console.log(error);
        }
    },

    async getAllDadosPerson(id) {
        try {
            const result = await knex('pessoa')
                .join('contato', 'pessoa.contato', '=', 'contato.id')
                .join('endereco', 'pessoa.endereco', '=', 'endereco.id')
                .select(
                    'pessoa.nome',
                    'pessoa.documento',
                    'contato.celular',
                    'contato.email',
                    'endereco.cep',
                    'endereco.logradouro',
                    'endereco.numero',
                    'endereco.complemento',
                    'endereco.bairro',
                    'endereco.uf',
                    'endereco.cidade',
                    'endereco.estado'
                )
                .where('pessoa.id', id)
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    async getForEc(estabelecimento) {
        try {
            const result = await knex('pessoa').where('estabelecimento', estabelecimento).andWhere('deleted', false);
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    async save(pessoa) {
        try {
            const result = await knex('pessoa').insert(pessoa, ['*']);

            if (result.length == 0)
                return { error: 'Erro no cadastro de pessoa.' };

            return result;
        } catch (error) {
            console.log(error);
        }
    },

    async edit(pessoa, id) {
        try {
            const result = await knex('pessoa').update(pessoa).where('id', id);

            if (!result)
                return { error: 'Erro na atualização de pessoa.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    },

    async delete(id) {
        try {
            const result = await knex('pessoa').update({
                deleted_at: new Date(),
                deleted: true
            }).where('id', id);

            if (result.length > 0)
                return { error: 'Erro na deleção de pessoa.' };

            return true;

        } catch (error) {
            console.log(error);
        }
    },

    async insertDados(id, coluna, dadosId) {
        try {
            const result = await knex('pessoa').update(coluna, dadosId).where('id', id);
            if (result.length == 0) return false;
            return { info: `Dados de ${coluna} cadastrados e vinculados a entidade de Pessoa.` };
        } catch (error) {
            console.log(error)
        }
    }
}