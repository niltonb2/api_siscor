exports.up = knex => knex.schema.createTable('funcionalidade', table => {
    table.increments('id').primary();
    table.string('descricao', 150).notNullable();
})

exports.down = knex => knex.schema.dropTable('funcionalidade');