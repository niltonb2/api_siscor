const EstabelecimentoService = require('../app/03_estabelecimento/EstabelecimentoService');

module.exports = async (req, res, next) => {

    if(req.params.entidade == 'estabelecimento') {
        const result = await EstabelecimentoService.getById(req.params.id);
        if(!result) return res.status(400).json({info: 'Não existe estabelecimento cadastrada para o ID informado.'})
        return next();
    }

    return next();
}