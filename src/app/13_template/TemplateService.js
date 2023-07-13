const knex = require('../../database');

module.exports = {
    async getNative(){
        try {
            return await knex('template');
        } catch (error) {
            console.log(error)
        }
    },

    async get(estabelecimento){
        try {
            return await knex('template').where('template.estabelecimento', estabelecimento);
        } catch (error) {
            console.log(error)
        }
    },

    async getById(estabelecimentoId){
        try {
            const result = await knex('template').where('template.id', estabelecimentoId);
            return result.length > 0 ? true : false;
        } catch (error) {
            console.log(error)
        }
    },

    async create(template){
        try {
            return await knex('template').insert(template, ['*']);
        } catch (error) {
            console.log(error);
        }
    },

    async edit(template, id) {
        try {
            const result = await knex('template').update(template).where('id', id);

            if (!result)
                return { error: 'Erro na atualização de template.' };

            return true;
        } catch (error) {
            console.log(error);
        }
    },

    async creatTemplatesForEc(id_estabelecimento){
        try {
            const templates = await knex('template');
            templates.forEach(async template => {
                let templateCadastroEc = {
                    "tipo": template.tipo,
                    "titulo": template.titulo,
                    "assunto": template.assunto,
                    "mensagem": template.mensagem,
                    "estabelecimento": id_estabelecimento
                }
                try {
                    await knex('template').insert(templateCadastroEc)
                } catch (error) {
                    console.log(error);
                }
            })

            return true;
            
        } catch (error) {
            console.log(error);
        }
    }
}