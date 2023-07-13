const routes = require('express').Router();
const AuthMiddleware = require('./middlewares/AuthMiddleware');
const os = require('os');
const networkInterfaces = os.networkInterfaces();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const CobrancaController = require('./app/06_cobranca/CobrancaController');
const PessoaController = require('./app/05_pessoa/PessoaController');

const usuarioRoutes = require('./app/01_usuario/usuario.routes');
const permissaoRoutes = require('./app/02_permissao/permissao.routes');
const estabelecimentoRoutes = require('./app/03_estabelecimento/estabelecimento.routes');
const dadosRoutes = require('./app/04_dados/dados.routes');
const pessoaRoutes = require('./app/05_pessoa/pessoa.routes');
const cobrancaRoutes = require('./app/06_cobranca/cobranca.routes');
const reguaRoutes = require('./app/07_regua/regua.routes');
const acoesRoutes = require('./app/08_acoes/acoes.routes');
const gatewayRoutes = require('./app/09_gateway/gateway.routes');
const produtoRoutes = require('./app/10_produto/produto.routes');
const planoRoutes = require('./app/11_plano/plano.routes');
const assinaturaRoutes = require('./app/12_assinatura/assinatura.routes');
const templateRoutes = require('./app/13_template/template.routes');

//PORTAL DO CLIENTE
routes.get('/', (req, res) => res.status(200).json({descricao: 'API do Sistema SISCOR.'}))
routes.get('/ping', (req, res) => res.status(200).json({date: new Date(), networkInterfaces}));
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.get('/cobranca/:documento', CobrancaController.getInvoicesForDocument);
routes.get('/pessoadocumento/:documento', PessoaController.getPersonForDocument);
routes.patch('/cobranca/pagar/:id', CobrancaController.payInvoice)
routes.post('/postback', CobrancaController.postback)
//PORTAL DO CLIENTE

routes.use(
    AuthMiddleware,
    usuarioRoutes,
    pessoaRoutes,
    estabelecimentoRoutes,
    dadosRoutes,
    permissaoRoutes,
    cobrancaRoutes,
    reguaRoutes,
    acoesRoutes,
    gatewayRoutes,
    produtoRoutes,
    planoRoutes,
    assinaturaRoutes,
    templateRoutes
    );

module.exports = routes;