exports.seed = async knex => {
  await knex('funcionalidade').del()
  await knex('funcionalidade').insert([
    {descricao: 'Visualizar/Cadastrar/Alterar/Deletar Usuários e Permissões de Acesso'},
    {descricao: 'Visualizar/Cadastrar/Alterar/Deletar Estabelecimentos'},
    {descricao: 'Visualizar/Cadastrar/Alterar/Deletar Pessoas'},
    {descricao: 'Visualizar/Cadastrar/Alterar/Deletar Dados de Contato'},
    {descricao: 'Visualizar/Cadastrar/Alterar/Deletar Dados de Endereço'},
    {descricao: 'Visualizar/Cadastrar/Alterar/Deletar Dados Bancários'},
  ]);
};