const EMAILS_DEFAULTS = require('../../utils/emails-defaults.json');

exports.seed = async knex => {
  await knex('template').del()
  await knex('template').insert([
    {
      tipo: 'nova_fatura',
      titulo: EMAILS_DEFAULTS.NEW_INVOICE.title,
      assunto: EMAILS_DEFAULTS.NEW_INVOICE.subject,
      mensagem: EMAILS_DEFAULTS.NEW_INVOICE.html
    },
    {
      tipo: 'fatura_atrasada',
      titulo: EMAILS_DEFAULTS.OVERDUE_INVOICE.title,
      assunto: EMAILS_DEFAULTS.OVERDUE_INVOICE.subject,
      mensagem: EMAILS_DEFAULTS.OVERDUE_INVOICE.html
    },
    {
      tipo: 'novo_usuario',
      titulo: EMAILS_DEFAULTS.NEW_USER.title,
      assunto: EMAILS_DEFAULTS.NEW_USER.subject,
      mensagem: EMAILS_DEFAULTS.NEW_USER.html
    },
    {
      tipo: 'novo_cliente',
      titulo: EMAILS_DEFAULTS.NEW_CUSTOMER.title,
      assunto: EMAILS_DEFAULTS.NEW_CUSTOMER.subject,
      mensagem: EMAILS_DEFAULTS.NEW_CUSTOMER.html
    },
    {
      tipo: 'cobrar_fatura',
      titulo: EMAILS_DEFAULTS.CHARGE_INVOICE.title,
      assunto: EMAILS_DEFAULTS.CHARGE_INVOICE.subject,
      mensagem: EMAILS_DEFAULTS.CHARGE_INVOICE.html
    }
  ]);
};