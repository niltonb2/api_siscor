const { onUpdateTrigger } = require('../../../knexfile');

exports.up = knex => knex.schema.createTable('bancarios', table => {
    table.increments('id').primary();
    table.string('bancarios', 150).notNullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.boolean('deleted').defaultTo(false);
}).then(() => knex.raw(onUpdateTrigger('bancarios')));

exports.down = knex => knex.schema.dropTable('bancarios');