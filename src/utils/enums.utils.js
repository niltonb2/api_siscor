const EMAILS_DEFAULTS = require('./emails-defaults.json')

const STATUS = {
    PENDENTE: -2,
    ATRASADO: -1,
    SEM_STATUS: 0,
    INICIADO: 1,
    BOLETO_IMPRESSO: 2,
    CANCELADO: 3,
    EM_ANALISE: 4,
    APROVADO: 5,
    APROVADO_VALOR_PARCIAL: 6,
    RECUSADO: 7,
    APROVADO_E_CAPTURADO: 8,
    CHARGEBACK: 9,
    EM_DISPUTA: 10,
};

const STATUS_LIST = [
    {
        description: 'A vencer',
        code: STATUS.SEM_STATUS,
    },
    {
        description: 'Iniciado',
        code: STATUS.INICIADO,
    },
    {
        description: 'Boleto impresso',
        code: STATUS.BOLETO_IMPRESSO,
    },
    {
        description: 'Cancelado',
        code: STATUS.CANCELADO,
    },
    {
        description: 'Em análise',
        code: STATUS.EM_ANALISE,
    },
    {
        description: 'Aprovado',
        code: STATUS.APROVADO,
    },
    {
        description: 'Aprovado valor parcial',
        code: STATUS.APROVADO_VALOR_PARCIAL,
    },
    {
        description: 'Recusado',
        code: STATUS.RECUSADO,
    },
    {
        description: 'Aprovado e Capturado',
        code: STATUS.APROVADO_E_CAPTURADO,
    },
    {
        description: 'Chargeback',
        code: STATUS.CHARGEBACK,
    },
    {
        description: 'Em Disputa',
        code: STATUS.EM_DISPUTA,
    },
];

//#region  EMAIL 

const TAGS_EMAIL = {
    URL_SERVIDOR: '@url',
    URL_FRONTEND: '@frontEndUrl',

    NOME_USUARIO: '@nomeUsuario',
    EMAIL_USUARIO: '@emailUsuario',
    TOKEN_RECUPERACAO: '@tokenRecuperacao',

    NOME_CLIENTE: '@nomeCliente',
    EMAIL_CLIENTE: '@emailCliente',
    DOCUMENTO_CLIENTE: '@documentoCliente',
    ID_FATURA: '@idFatura',

    NOME_CREDOR: '@nomeCredor',
    EMAIL_CREDOR: '@emailCredor',
    DOCUMENTO_CREDOR: '@documentoCredor',

    VALOR_FATURA: '@valorFatura',
    DATA_VENCIMENTO_FATURA: '@dataVencimentoFatura',
}

const LIST_TAGS_EMAIL = Object.values(TAGS_EMAIL);

const EMAIL_TYPES = {
    NEW_INVOICE: {
        description: 'Nova Fatura',
        key: 'NEW_INVOICE',
        templateDefault: EMAILS_DEFAULTS.NEW_INVOICE,
        tags: [
            TAGS_EMAIL.URL_FRONTEND,
            TAGS_EMAIL.NOME_CLIENTE,
            TAGS_EMAIL.NOME_CREDOR,
            TAGS_EMAIL.DOCUMENTO_CLIENTE,
            TAGS_EMAIL.DOCUMENTO_CREDOR,
            TAGS_EMAIL.EMAIL_CREDOR,
            TAGS_EMAIL.VALOR_FATURA,
            TAGS_EMAIL.DATA_VENCIMENTO_FATURA,
            TAGS_EMAIL.ID_FATURA,
        ]
    },
    OVERDUE_INVOICE: {
        description: 'Fatura Atrasada',
        key: 'OVERDUE_INVOICE',
        templateDefault: EMAILS_DEFAULTS.OVERDUE_INVOICE,
        tags: [
            TAGS_EMAIL.URL_FRONTEND,
            TAGS_EMAIL.NOME_CLIENTE,
            TAGS_EMAIL.NOME_CREDOR,
            TAGS_EMAIL.DOCUMENTO_CLIENTE,
            TAGS_EMAIL.DOCUMENTO_CREDOR,
            TAGS_EMAIL.EMAIL_CREDOR,
            TAGS_EMAIL.VALOR_FATURA,
            TAGS_EMAIL.DATA_VENCIMENTO_FATURA,
            TAGS_EMAIL.ID_FATURA,
        ]
    },
    NEW_USER: {
        description: 'Novo Usuário',
        key: 'NEW_USER',
        templateDefault: EMAILS_DEFAULTS.NEW_USER,
        tags: [
            TAGS_EMAIL.URL_FRONTEND,
            TAGS_EMAIL.NOME_USUARIO,
            TAGS_EMAIL.EMAIL_USUARIO,
        ]
    },
    NEW_CUSTOMER: {
        description: 'Novo Cliente',
        key: 'NEW_CUSTOMER',
        templateDefault: EMAILS_DEFAULTS.NEW_CUSTOMER,
        tags: [
            TAGS_EMAIL.URL_FRONTEND,
            TAGS_EMAIL.NOME_CLIENTE,
            TAGS_EMAIL.EMAIL_CLIENTE,
        ]
    },
    CHARGE_INVOICE: {
        description: 'Cobrar Fatura',
        key: 'CHARGE_INVOICE',
        templateDefault: EMAILS_DEFAULTS.CHARGE_INVOICE,
        tags: [
            TAGS_EMAIL.URL_FRONTEND,
            TAGS_EMAIL.NOME_CLIENTE,
            TAGS_EMAIL.NOME_CREDOR,
            TAGS_EMAIL.DOCUMENTO_CLIENTE,
            TAGS_EMAIL.DOCUMENTO_CREDOR,
            TAGS_EMAIL.EMAIL_CREDOR,
            TAGS_EMAIL.VALOR_FATURA,
            TAGS_EMAIL.ID_FATURA,
        ]
    }
}

const STATUS_LOG = {
    ERRO: 0,
    SUCESSO: 1,
    ALERTA: 2,
}

const TYPE_LOG = {
    FATURA: 0,
    CLIENTE: 1,
    PEFIN: 2,
}

//#endregion EMAIL 

const LIST_EMAIL_TYPES = Object.values(EMAIL_TYPES);

module.exports = { STATUS, STATUS_LIST, EMAIL_TYPES, LIST_EMAIL_TYPES, LIST_TAGS_EMAIL, TAGS_EMAIL, TYPE_LOG, STATUS_LOG };
