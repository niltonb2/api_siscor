const { onUpdateTrigger } = require('../../../knexfile');

exports.up = knex => knex.schema.createTable('contato', table => {
    table.increments('id').primary();
    table.string('telefone', 150);
    table.string('celular', 150).notNullable();
    table.string('telefone_comercial', 150);
    table.string('email', 150).notNullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.boolean('deleted').defaultTo(false);
}).then(() => knex.raw(onUpdateTrigger('contato')));

exports.down = knex => knex.schema.dropTable('contato');