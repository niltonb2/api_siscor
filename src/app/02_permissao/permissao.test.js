const app = require('../../app');
const supertest = require('supertest');
const request = supertest(app);
const knex = require('../../database');

const { UsuarioSave, UsuarioEdit } = require('../../../__tests__/stubs/UsuarioStub');
const { PermissaoSave, PermissaoDelete } = require('../../../__tests__/stubs/PermissaoStub');
let token;

beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
    await request.post('/usuarios/save').send(UsuarioSave);
    const res = await request.post('/usuarios/login').send({
        "email": UsuarioSave.email,
        "senha": UsuarioSave.senha
    })
    token = res._body.token;
})

describe('Requisições válidas', () => {
    test('Deve vincular funcionalidades a um usuário(PERMISSÃO).', async () => {
        const res = await request.post('/permissao/1').send(PermissaoSave).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve desvincular funcionalidades de um usuário(PERMISSÃO).', async () => {
        const res = await request.delete('/permissao/1').send(PermissaoSave).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })
})

afterAll(async () => {
    await knex.migrate.rollback(true, true);
    await knex.destroy();
})