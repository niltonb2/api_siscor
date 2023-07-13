const formatarDadosCliente = (data) => {
    const { nome } = data;
    const name = nome;
    const first_name = nome.trim().split(' ')[0];
    const last_name = nome.trim().split(' ').pop();
    return {
        name,
        first_name,
        last_name,
        document: data.documento,
        email: data.email,
        phone_number: data.celular,
        address: {
            line1: data.endereco,
            neighborhood: data.bairro,
            city: data.cidade,
            state: data.estado,
            postal_code: data.cep.replace(/\D/g, ''),
            country_code: data.pais || 'BR',
        },
    };
};

const formatDataCartao = (data) => {
    const installment_plan =
        data.parcelas && data.parcelas > 1
            ? {
                  mode: 'interest_free',
                  number_installments: data.parcelas,
              }
            : null;
    return {
        amount: parseInt(data.valor * 100),
        payment_type: 'credit',
        gateway: 'zoop',
        metadata: data.metadata,
        url_postback: data.url_postback,
        description: data.description,
        seller_id: data.seller_id,
        buyer_id: data.buyer_id,
        card: {
            id: data.card_id,
            token: data.card_token,
        },
        installment_plan,
    };
};

const formatDataBoleto = (data) => {
    let dataArray = data.boletoExpirationDate.split('/');
    const expiration_date = `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`
    const payment_method = {
        body_instructions: ['Boleto de cobrança', '', ''],
        expiration_date,
    };
    return {
        gateway: 'zoop',
        amount: parseInt(data.valor * 100),
        seller_id: data.seller_id,
        buyer_id: data.buyer_id,
        currency: 'BRL',
        customer: data.buyer_zoop_id,
        description: data.description,
        metadata: data.metadata,
        on_behalf_of: data.seller_id,
        payment_method,
        url_postback: data.url_postback,
        payment_type: 'boleto',
    };
};

const formatarDadosTransacao = (data) => {
    if(data.gateway == "zoop"){
        if (data.payment_type === 'credit') {
            return formatDataCartao(data);
        } else {
            return formatDataBoleto(data);
        }
    }else{
        return data;
    }
}

module.exports = { formatarDadosCliente, formatarDadosTransacao };