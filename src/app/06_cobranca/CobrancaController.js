const CobrancaService = require('./CobrancaService');
const PessoaService = require('../05_pessoa/PessoaService');
const validate = require('../../utils/validateYup');
const { formatarDadosCliente, formatarDadosTransacao } = require('../../utils/checkout-utils');

module.exports = {
    async getInvoices(req, res) {
        try {
            const result = await CobrancaService.get();

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getInvoicesForDocument(req, res) {
        try {

            if (!await PessoaService.getByDocument(req.params.documento))
                return res.status(400).json({ info: 'Não existe cliente para o documento informado.' });

            const result = await CobrancaService.getByDocument(req.params.documento);

            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getAllComplet(req, res) {
        try {
            const result = await CobrancaService.getAllCobComplet(req.params.estabelecimento);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async dashboard(req, res) {
        try {
            const {data_from, data_to} = req.query
            const result = await CobrancaService.getDashboard(req.params.estabelecimento, data_from, data_to);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async dashboardMonth(req, res) {
        try {
            const {data_from, data_to} = req.query
            const dataFromArray = data_from.split('-')
            const dataToArray = data_to.split('-')
            const result = await CobrancaService.getDashboardMonth(req.params.estabelecimento, dataFromArray, dataToArray);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async createInvoice(req, res) {
        try {
            const bodyIsValid = await validate.invoiceCreate(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await CobrancaService.create(req.body);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Cadastro realizado com sucesso.' });

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async editInvoice(req, res) {
        try {
            if (!await CobrancaService.getById(req.params.id))
                return res.status(400).json({ info: 'Não existe cobrança para a ID informada.' });

            const bodyIsValid = await validate.invoiceEdit(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await CobrancaService.edit(req.body, req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Cobrança atualizada com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async payInvoice(req, res) {
        try {
            const result = await CobrancaService.pay(req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Cobrança paga com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async deleteInvoice(req, res) {
        try {
            if (!await CobrancaService.getById(req.params.id))
                return res.status(400).json({ info: 'Não existe cobrança para a ID informada.' });

            const result = await CobrancaService.delete(req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Cobrança deletada com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async transaction(req, res) {
        try {

            const { body } = req;

            const { id, forma_pagamento: payment_type, valor: amount, parcelas: installments } = body;

            if (!['credit', 'boleto'].includes(payment_type))
                return res.status(400).json({ info: 'Uma transação deve possuir forma_pagamento igual boleto ou credit.' })

            if (!id)
                return res.status(400).json({ info: 'Uma cobrança deve possuir ids.' })

            let cobrancas = await CobrancaService.getForTransaction(id);

            const buyerData = await formatarDadosCliente(body);

            let buyer = await CobrancaService.createBuyer({
                seller_id: cobrancas[0].seller_id,
                gateway_marketplace_id: cobrancas[0].marketplace_id,
                document: cobrancas[0].documento_cliente,
                name: buyerData.name,
                first_name: buyerData.first_name,
                last_name: buyerData.last_name,
                address: buyerData.address
            })

            if (!buyer) return res.status(400).json({ info: 'Erro ao cadastrar BUYER.' })

            let card;
            let cardData;

            if (payment_type == 'credit') {
                card = await CobrancaService.createCard({
                    seller_id: cobrancas[0].seller_id,
                    holder_name: body.nome_cartao,
                    expiration_month: body.mes_cartao,
                    expiration_year: body.ano_cartao,
                    security_code: body.cvv_cartao,
                    card_number: body.num_cartao,
                }, cobrancas[0].marketplace_id);

                if (!card) return res.status(400).json({ info: 'Erro ao cadastrar CARD.' })

                cardData = { card_token: card.data.id, card_id: card.data.card.id };

                const buyerWithCard = await CobrancaService.updateBuyerWithCard({
                    card_token: card.data.id,
                    buyer_id: buyer.data._id,
                }, cobrancas[0].marketplace_id);
            }

            const transactionData = {
                seller_id: cobrancas[0].seller_id,
                buyer_id: buyer.data._id,
                url_postback: `${process.env.URL_POSTBACK_SISCOR}/postback/?id=${id}`,
                buyer_zoop_id: buyer.data.buyer_find.gateway_buyer_id,
                payment_type,
                boletoExpirationDate: cobrancas[0].data_vencimento,
                gateway: body.gateway || 'zoop',
                ...cardData,
                ...body,
            };

            const transactionDataFormated = await formatarDadosTransacao(transactionData);

            const transaction = await CobrancaService.createTransaction(transactionDataFormated, cobrancas[0].marketplace_id);

            if (transaction.haveError) return res.status(400).json({ info: transaction.message })

            const status = transaction.data.status;
            const url_boleto = transaction.data.url_short_payment;
            const response_data_transaction = transaction.data.reponse_data;

            let cobranca = await CobrancaService.getDadosById(id);

            cobranca[0].status = status;
            cobranca[0].url_boleto = url_boleto;
            cobranca[0].response_data = response_data_transaction;

            await CobrancaService.edit(cobranca[0], cobranca[0].id);

            return res.status(200).json(cobranca);


        } catch (error) {
            res.status(400).json(error);
        }
    },

    async postback(req, res) {
        try {

            const { query, body } = req;

            const id = query.id;
    
            const { status, reponse_data } = body;
    
            let cobranca = await CobrancaService.getDadosById(id);
    
            cobranca[0].status = status;
            cobranca[0].reponse_data = reponse_data;
    
            await CobrancaService.edit(cobranca[0], cobranca[0].id);

            res.status(200).json(cobranca);

        } catch (error) {
            res.status(400).json(error);
        }
    }
}