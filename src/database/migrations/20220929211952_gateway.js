const { onUpdateTrigger } = require('../../../knexfile');

exports.up = knex => knex.schema.createTable('gateway', table => {
    table.increments('id').primary();
    table.string('nome', 24).notNullable();
    table.string('marketplace_id', 150).notNullable();
    table.string('seller_id', 150).notNullable();
    table.boolean('pagamento_cartao', false);
    table.string('valor_min_parcelas', 10);
    table.string('qtde_max_parcelas', 10);
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.boolean('deleted').defaultTo(false);
}).then(() => knex.raw(onUpdateTrigger('gateway')));

exports.down = knex => knex.schema.dropTable('gateway');