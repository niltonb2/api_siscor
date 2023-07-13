const Yup = require('yup');

module.exports = {
    async usuarioSave(usuario) {
        const schema = Yup.object({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            senha: Yup.string().required()
        });

        try {
            await schema.validate(usuario);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async usuarioEdit(usuario) {
        const schema = Yup.object({
            nome: Yup.string().required(),
            email: Yup.string().email().required()
        });

        try {
            await schema.validate(usuario);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async usuarioLogin(usuario) {
        const schema = Yup.object({
            email: Yup.string().email(),
            senha: Yup.string().required()
        });

        try {
            await schema.validate(usuario);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async estabelecimentoSave(estabelecimento) {
        const schema = Yup.object({
            nome: Yup.string().required(),
            documento: Yup.string().required()
        });

        try {
            await schema.validate(estabelecimento);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async estabelecimentoEdit(estabelecimento) {
        const schema = Yup.object({
            nome: Yup.string().required(),
            documento: Yup.string().required()
        });

        try {
            await schema.validate(estabelecimento);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async personSave(pessoa) {
        const schema = Yup.object({
            nome: Yup.string().required(),
            tipo: Yup.mixed().oneOf(['PC', 'CL']).required(),
            documento: Yup.string().min(11).max(14).required(),
            tipo_documento: Yup.mixed().oneOf(['F', 'J']).required(),
            estabelecimento: Yup.number().required()
        });

        try {
            await schema.validate(pessoa);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async personEdit(pessoa) {
        const schema = Yup.object({
            tipo: Yup.mixed().oneOf(['PC', 'CL']).required(),
            nome: Yup.string().required(),
            documento: Yup.string().min(11).max(14).required(),
            tipo_documento: Yup.mixed().oneOf(['F', 'J']).required(),
        });

        try {
            await schema.validate(pessoa);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async contatoDados(contato) {
        const schema = Yup.object({
            celular: Yup.string().required(),
            email: Yup.string().email().required(),
        });

        try {
            await schema.validate(contato);
            return { tipo: 'contato' };
        } catch (error) {
            return error.errors;
        }
    },

    async enderecoDados(contato) {
        const schema = Yup.object({
            tipo_endereco: Yup.mixed().oneOf(['P', 'C']).required(),
            cep: Yup.string().required(),
            cidade: Yup.string().required(),
            uf: Yup.string().required(),
            logradouro: Yup.string().required(),
            bairro: Yup.string().required()
        });

        try {
            await schema.validate(contato);
            return { tipo: 'endereco' };
        } catch (error) {
            return error.errors;
        }
    },

    async bancariosDados(contato) {
        const schema = Yup.object({
            bancarios: Yup.string().required()
        });

        try {
            await schema.validate(contato);
            return { tipo: 'bancarios' };
        } catch (error) {
            return error.errors;
        }
    },

    async arrayPermissao(array) {
        const schema = Yup.object({
            ids: Yup.array().min(1).of(Yup.number().required())
        });

        try {
            await schema.validate(array);
            return true;
        } catch (error) {
            return error.errors;
        };
    },

    async invoiceCreate(cobranca) {
        const schema = Yup.object({
            valor: Yup.number().required(),
            valor_original: Yup.number().required(),
            tipo: Yup.mixed().oneOf([1, 2, 3]).required(),
            data_vencimento: Yup.string().required(),
            forma_pagamento: Yup.mixed()
                .oneOf(['boleto', 'credito']),
            parcelas: Yup.number()
                .min(1)
                .when('forma_pagamento', (forma_pagamento, schema) => forma_pagamento === 'credito' ? schema.max(12) : schema.max(1)),
            intervalo_cobranca: Yup.mixed()
                .oneOf(['semanal', 'quinzenal', 'mensal', 'semestral', 'anual']),
            juros: Yup.string(),
            multa: Yup.string(),
            desconto: Yup.string(),
            status: Yup.mixed()
                .oneOf(['aberto', 'aprovado', 'pago', 'vencido', 'cancelado', 'estorno']),
            usuario: Yup.number().required(),
            estabelecimento: Yup.number().required(),
            pessoa: Yup.number().required()
        });

        try {
            await schema.validate(cobranca);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async invoiceEdit(cobranca) {
        const schema = Yup.object({
            valor: Yup.number().required(),
            valor_original: Yup.number().required(),
            tipo: Yup.mixed().oneOf([1, 2, 3]).required(),
            data_vencimento: Yup.string().required(),
            forma_pagamento: Yup.mixed()
                .oneOf(['boleto', 'credito'])
                .required(),
            parcelas: Yup.number()
                .min(1)
                .when('forma_pagamento', (forma_pagamento, schema) => forma_pagamento === 'credito' ? schema.max(12) : schema.max(1))
                .required(),
            intervalo_cobranca: Yup.mixed()
                .oneOf(['semanal', 'quinzenal', 'mensal', 'semestral', 'anual'])
                .required(),
            juros: Yup.string().required(),
            multa: Yup.string().required(),
            desconto: Yup.string().required(),
            status: Yup.mixed()
                .oneOf([
                    'aberto',
                    'aprovado',
                    'pago',
                    'cancelado',
                    'estorno',
                    'baixado',
                    'novo',
                    'falhou',
                    'pendente',
                    'pre_authorizado',
                    'invertido',
                    'reembolso_parcial',
                    'em_disputa',
                    'cobrado_de_volta',
                    'cancelado',
                    'devolvido',
                    'em_analise'
                ])
                .required()
        });

        try {
            await schema.validate(cobranca);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async ruleCreate(regua) {
        const schema = Yup.object({
            nome: Yup.string().min(3).required()
        });

        try {
            await schema.validate(regua);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async actionsCreate(acao) {
        const schema = Yup.object({
            regua: Yup.number().required(),
            acao: Yup.mixed().oneOf([1, 2, 3, 4, 5, 6]).required(), //para cada número uma ação: envio de e-mail, wpp..
            dias_pre: Yup.number().required(),
            dias_pos: Yup.number().required()
        });

        try {
            await schema.validate(acao);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async actionsEdit(acao) {
        const schema = Yup.object({
            acao: Yup.mixed().oneOf([1, 2, 3, 4, 5, 6]).required(), //para cada número uma ação: envio de e-mail, wpp..
            dias_pre: Yup.number().required(),
            dias_pos: Yup.number().required()
        });

        try {
            await schema.validate(acao);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async gatewaySave(gateway) {
        const schema = Yup.object({
            nome: Yup.string().required(),
            marketplace_id: Yup.string().required(),
            seller_id: Yup.string().required()
        });

        try {
            await schema.validate(gateway);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async produtoSave(produto) {
        const schema = Yup.object({
            tipo: Yup.number().required(),
            descricao: Yup.string().required(),
            valor: Yup.number().required(),
            estabelecimento: Yup.number().required()
        });

        try {
            await schema.validate(produto);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async produtoEdit(produto) {
        const schema = Yup.object({
            tipo: Yup.number().required(),
            descricao: Yup.string().required(),
            valor: Yup.number().required()
        });

        try {
            await schema.validate(produto);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async planoSave(plano) {
        const schema = Yup.object({
            tipo: Yup.number().required(),
            descricao: Yup.string().required(),
            estabelecimento: Yup.number().required()
        });

        try {
            await schema.validate(plano);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async planoEdit(plano) {
        const schema = Yup.object({
            tipo: Yup.number().required(),
            descricao: Yup.string().required(),
            valor: Yup.number().required()
        });

        try {
            await schema.validate(plano);
            return true;
        } catch (error) {
            return error.errors;
        }
    },

    async templateCreate(template) {
        const schema = Yup.object({
            tipo: Yup.mixed()
                .oneOf(['nova_fatura', 'fatura_atrasada', 'novo_usuario', 'novo_cliente', 'cobrar_fatura']),
            titulo: Yup.string().required(),
            assunto: Yup.string().required(),
            mensagem: Yup.string().required(),
            estabelecimento: Yup.number().required()
        });

        try {
            await schema.validate(template);
            return true;
        } catch (error) {
            return error.errors;
        }
    }
}