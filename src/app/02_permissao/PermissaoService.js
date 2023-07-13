const knex = require('../../database');

module.exports = {
    save(usuario, array) {

        if (array.lenght == 0) return { error: 'Array de permissões vazio.' }

        array.forEach(async funcionalidade => {
            try {
                await knex('permissao').insert({ usuario, funcionalidade })
            } catch (error) {
                return { error: `Erro ao vincular funcionalidade ${funcionalidade} ao usuário ${usuario}` }
            }
        });

        return true;
    },

    delete(usuario, array) {

        if (array.lenght == 0) return { error: 'Array de permissões vazio.' }

        array.forEach(async funcionalidade => {
            try {
                await knex('permissao')
                    .where('usuario', usuario)
                    .andWhere('funcionalidade', funcionalidade)
                    .del()
            } catch (error) {
                return { error: `Erro ao desvincular funcionalidade ${funcionalidade} do usuário ${usuario}` }
            }
        });

        return true;
    }
}