const { onUpdateTrigger } = require('../../../knexfile');

exports.up = knex => knex.schema.createTable('template', table => {
    table.increments('id').primary();
    table.string('tipo', 20).notNullable();
    table.string('titulo', 240).notNullable();
    table.string('assunto', 240).notNullable();
    table.string('mensagem', 1024).notNullable();
    table.integer('estabelecimento')
        .references('estabelecimento.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.boolean('deleted').defaultTo(false);
}).then(() => knex.raw(onUpdateTrigger('template')));

exports.down = knex => knex.schema.dropTable('template');