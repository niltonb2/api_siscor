const { onUpdateTrigger } = require('../../../knexfile');

exports.up = knex => knex.schema.createTable('estabelecimento', table => {
    table.increments('id').primary();
    table.string('nome', 150).notNullable();
    table.string('documento', 150).notNullable();
    table.string('fantasia', 150);
    table.string('tipo_documento', 1);
    table.jsonb('configuracoes');
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
    table.integer('gateway')
        .references('gateway.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.boolean('deleted').defaultTo(false);
}).then(() => knex.raw(onUpdateTrigger('estabelecimento')));

exports.down = knex => knex.schema.dropTable('estabelecimento');