const PessoaService = require('./PessoaService');
const EstabelecimentoService = require('../03_estabelecimento/EstabelecimentoService');
const validate = require('../../utils/validateYup');

module.exports = {
    async getPeople(req, res) {
        try {
            const result = await PessoaService.get();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getPeoplePaginate(req, res) {
        try {
            const {limit, offset} = req.query;

            if(!limit || !offset) return res.status(400).json({info: 'Informe limit e offset para sua pesquisa.'})

            const result = await PessoaService.getPaginate(limit, offset);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getPersonForDocument(req, res) {
        try {
            const result = await PessoaService.getByDoc(req.params.documento);

            if(result.length == 0) return res.status(400).json({info: 'Não existe cadastro para o documento informado.'})

            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getPersonComplet(req, res) {
        try {
            const result = await PessoaService.getAllDadosPerson(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getPeopleForEstabelecimento(req, res) {
        if (!await EstabelecimentoService.getById(req.params.estabelecimento))
            return res.status(400).json({ info: 'Não existe estabelecimento para a ID informada.' });

        try {
            const result = await PessoaService.getForEc(req.params.estabelecimento);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async savePerson(req, res) {
        try {
            const bodyIsValid = await validate.personSave(req.body);

            if(await PessoaService.getByDocument(req.body.documento)){
                let msgRetorno;
                if(req.body.documento.length == 11){
                    msgRetorno = 'Já existe cliente para o CPF informado.';
                }else{
                    msgRetorno = 'Já existe cliente para o CNPJ informado.';
                }                                                                                            
                return res.status(400).json({info: msgRetorno})
            }
                

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await PessoaService.save(req.body);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Cadastro realizado com sucesso.', idPessoa: result[0].id });

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async editPerson(req, res) {
        try {
            if (!await PessoaService.getById(req.params.id))
                return res.status(400).json({ info: 'Não existe pessoa para a ID informada.' });

            const bodyIsValid = await validate.personEdit(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await PessoaService.edit(req.body, req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Pessoa atualizada com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async deletePerson(req, res) {
        try {
            if (!await PessoaService.getById(req.params.id))
                return res.status(400).json({ info: 'Não existe usuário para a ID informada.' });

            const result = await PessoaService.delete(req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Cliente removido com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    }
};