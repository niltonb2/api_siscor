const { onUpdateTrigger } = require('../../../knexfile');

exports.up = knex => knex.schema.createTable('pessoa', table => {
    table.increments('id').primary();
    table.string('tipo', 2); // CL - cliente, PC - parceiro
    table.string('nome').notNullable();
    table.string('documento', 14).notNullable();
    table.string('tipo_documento', 1).notNullable();
    table.integer('estabelecimento')
        .references('estabelecimento.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.integer('endereco')
        .references('endereco.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.integer('contato')
        .references('contato.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.integer('bancarios')
        .references('bancarios.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.boolean('deleted').defaultTo(false);
}).then(() => knex.raw(onUpdateTrigger('pessoa')));

exports.down = knex => knex.schema.dropTable('pessoa');