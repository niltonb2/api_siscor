const { onUpdateTrigger } = require('../../../knexfile');

exports.up = knex => knex.schema.createTable('regua', table => {
    table.increments('id').primary();
    table.string('nome', 50).notNullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.boolean('deleted').defaultTo(false);
}).then(() => knex.raw(onUpdateTrigger('regua')));

exports.down = knex => knex.schema.dropTable('regua');