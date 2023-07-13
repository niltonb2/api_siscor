const AssinaturaService = require('./AssinaturaService');

module.exports = {
    async get(req, res) {
        try {
            if(!req.params.estabelecimento)return res.status(400).json({info: 'Informe a id do estabelecimento.'})

            const result = await AssinaturaService.get(req.params.estabelecimento);

            res.status(200).json(result)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getByCliente(req, res) {
        try {
            if(!req.params.cliente)return res.status(400).json({info: 'Informe a id do cliente.'})

            const result = await AssinaturaService.getDados(req.params.cliente);

            res.status(200).json(result)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async save(req, res) {
        try {
            const result = await AssinaturaService.save(req.body);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json(result)

        } catch (error) {
            res.status(400).json(error);
        }
    }
}