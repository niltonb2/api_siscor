const { onUpdateTrigger } = require('../../../knexfile');

exports.up = knex => knex.schema.createTable('acoes', table => {
    table.increments('id').primary();
    table.integer('regua')
        .references('regua.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.integer('acao').notNullable();
    table.integer('dias_pre').notNullable();
    table.integer('dias_pos').notNullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.boolean('deleted').defaultTo(false);
}).then(() => knex.raw(onUpdateTrigger('acoes')));

exports.down = knex => knex.schema.dropTable('acoes');