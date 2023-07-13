const { onUpdateTrigger } = require('../../../knexfile');

exports.up = knex => knex.schema.createTable('plano', table => {
    table.increments('id').primary();
    table.integer('tipo').notNullable(); //1 - mensal, 2 - anual
    table.string('descricao').notNullable();
    table.float('valor').notNullable();
    table.jsonb('informacoes'); //produtos, servicos
    table.integer('estabelecimento')
        .references('estabelecimento.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.boolean('deleted').defaultTo(false);
}).then(() => knex.raw(onUpdateTrigger('plano')));

exports.down = knex => knex.schema.dropTable('plano');