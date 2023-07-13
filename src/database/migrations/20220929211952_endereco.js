const { onUpdateTrigger } = require('../../../knexfile');

exports.up = knex => knex.schema.createTable('endereco', table => {
    table.increments('id').primary();
    table.string('tipo_endereco', 1);
    table.string('cep', 15).notNullable();
    table.string('cidade', 150).notNullable();
    table.string('uf', 2).notNullable();
    table.string('logradouro', 150).notNullable();
    table.string('numero', 10);
    table.string('bairro', 150).notNullable();
    table.string('estado', 150);
    table.string('complemento', 150);
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.boolean('deleted').defaultTo(false);
}).then(() => knex.raw(onUpdateTrigger('endereco')));

exports.down = knex => knex.schema.dropTable('endereco');