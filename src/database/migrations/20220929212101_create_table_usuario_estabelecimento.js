exports.up = knex => knex.schema.createTable('usuario_estabelecimento', table => {
    table.integer('usuario')
        .references('usuario.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.integer('estabelecimento')
        .references('estabelecimento.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
})

exports.down = knex => knex.schema.dropTable('usuario_estabelecimento');