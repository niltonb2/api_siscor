const PessoaService = require('../app/05_pessoa/PessoaService');

module.exports = async (req, res, next) => {

    if(req.params.entidade == 'pessoa') {
        const result = await PessoaService.getById(req.params.id);
        if(!result) return res.status(400).json({info: 'Não existe pessoa cadastrada para o ID informado.'})
        return next();
    }

    return next();
}