const GatewayService = require('./GatewayService');
const validate = require('../../utils/validateYup');

module.exports = {
    async getGateway(req, res){
        try {

            const result = await GatewayService.get();
            res.status(200).json(result)

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getGatewayById(req, res){
        try {
            const result = await GatewayService.getById(req.params.id);
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async getSeller(req, res){
        try {
            const { documento, marketplace_id, seller_id } = req.body;

            if( !documento || !marketplace_id || !seller_id) return res.status(400).json({info: "Informe documento, marketplace_id e seller_id."})
            
            const result = await GatewayService.getSeller(marketplace_id, seller_id);

            if(result.status == 404) return res.status(400).json({info: result.message})

            if(result.data.document != documento) return res.status(400).json({info: "Credenciais inválidas! Documento informado é diferente do cadastrado na Zoop."})

            res.status(200).json(result.data)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async createSeller(req, res) {
        try {
            if(!req.body) return res.status(400).json({info: "Informe os dados para cadastro."})

            const result = await GatewayService.createSeller(req.body);

            if(result.error) return res.status(result.status).json(result.error)

            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async editGateway(req, res) {
        try {
            const result = await GatewayService.edit(req.body, req.params.id);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json({info: 'Gateway alterado com sucesso.'})

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async saveGateway(req, res) {
        try {
            const bodyIsValid = await validate.gatewaySave(req.body);

            if (bodyIsValid.length > 0)
                return res.status(400).json({ info: bodyIsValid[0] });

            const result = await GatewayService.save(req.body);

            if (result.error)
                return res.status(400).json({ info: result.error });

            res.status(200).json(result)

        } catch (error) {
            res.status(400).json(error);
        }
    },

    async deleteGateway(req, res) {
        try {
            const result = await GatewayService.delete(req.params.id);

            if (result.error)
            return res.status(400).json({ info: result.error });

            res.status(200).json({ info: 'Gateway deletada com sucesso.' });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}