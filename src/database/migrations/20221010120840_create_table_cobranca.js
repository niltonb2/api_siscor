const { onUpdateTrigger } = require('../../../knexfile');

exports.up = knex => knex.schema.createTable('cobranca', table => {
    table.increments('id').primary();
    table.float('valor', 14).notNullable();
    table.float('valor_original', 14).notNullable();
    table.string('observacao', 240);
    table.integer('tipo').notNullable(); // avulso, parcelado, assinatura
    table.string('data_vencimento', 240).notNullable();
    table.string('forma_pagamento', 240);
    table.string('parcelas', 240);
    table.string('intervalo_cobranca', 240);
    table.string('data_fim', 240);
    table.string('juros', 14);
    table.string('multa', 14);
    table.string('desconto', 14);
    table.string('status', 14);
    table.string('url_boleto', 1024);
    table.jsonb('response_data');
    table.string('metadados_descricao', 240);
    table.string('metadados_valor', 240);
    table.integer('assinatura')
        .references('assinatura.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.integer('usuario')
        .references('usuario.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.integer('estabelecimento')
        .references('estabelecimento.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.integer('pessoa')
        .references('pessoa.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.integer('regua')
        .references('regua.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    table.timestamps(true, true);
    table.timestamp('deleted_at');
    table.boolean('deleted').defaultTo(false);
}).then(() => knex.raw(onUpdateTrigger('cobranca')));

exports.down = knex => knex.schema.dropTable('cobranca');