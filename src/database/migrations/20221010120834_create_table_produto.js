const { onUpdateTrigger } = require('../../../knexfile');

exports.up = knex => knex.schema.createTable('produto', table => {
    table.increments('id').primary();
    table.integer('tipo').notNullable(); //1 - produto, 2 - servico
    table.string('descricao').notNullable();
    table.float('valor').notNullable();
    table.integer('estabelecimento')
        .references('estabelecimento.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.boolean('deleted').defaultTo(false);
}).then(() => knex.raw(onUpdateTrigger('produto')));

exports.down = knex => knex.schema.dropTable('produto');