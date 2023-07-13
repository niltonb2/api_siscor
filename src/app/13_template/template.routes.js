const templateRoutes = require('express').Router();
const TemplateController = require('./TemplateController');

templateRoutes
    .get('/templatenative', TemplateController.getNative)
    .get('/template/:estabelecimento', TemplateController.get)
    .post('/template', TemplateController.create)
    .put('/template/:id', TemplateController.edit)

module.exports = templateRoutes;