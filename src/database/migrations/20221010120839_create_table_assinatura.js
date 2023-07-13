const { onUpdateTrigger } = require('../../../knexfile');

exports.up = knex => knex.schema.createTable('assinatura', table => {
    table.increments('id').primary();
    table.jsonb('observacoes', 240);
    table.string('data_inicio', 240);
    table.string('data_fim', 240);
    table.string('status', 14);
    table.integer('estabelecimento')
        .references('estabelecimento.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.integer('pessoa')
        .references('pessoa.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.integer('plano')
        .references('plano.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.boolean('deleted').defaultTo(false);
}).then(() => knex.raw(onUpdateTrigger('assinatura')));

exports.down = knex => knex.schema.dropTable('assinatura');