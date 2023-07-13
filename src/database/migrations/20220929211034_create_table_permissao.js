exports.up = knex => knex.schema.createTable('permissao', table => {
    table.integer('usuario')
        .references('usuario.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.integer('funcionalidade')
        .references('funcionalidade.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
})

exports.down = knex => knex.schema.dropTable('permissao');