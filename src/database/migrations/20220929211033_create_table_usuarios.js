const { onUpdateTrigger } = require('../../../knexfile');

exports.up = knex => knex.schema.createTable('usuario', table => {
    table.increments('id').primary();
    table.string('nome', 150).notNullable();
    table.string('email', 150).notNullable();
    table.string('senha', 150).notNullable();
    table.integer('estabelecimento_selecionado');
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.boolean('deleted').defaultTo(false);
}).then(() => knex.raw(onUpdateTrigger('usuario')));

exports.down = knex => knex.schema.dropTable('usuario');