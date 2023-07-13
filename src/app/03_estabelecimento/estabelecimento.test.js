const app = require('../../app');
const supertest = require('supertest');
const request = supertest(app);
const knex = require('../../database');

const { EstabelecimentoSave, EstabelecimentoEdit } = require('../../../__tests__/stubs/EstabelecimentoStub');
const { UsuarioSave, UsuarioEdit } = require('../../../__tests__/stubs/UsuarioStub');
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
    test('Deve cadastrar um estabelecimento.', async () => {
        const res = await request.post('/estabelecimento').send(EstabelecimentoSave).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve pesquisar os estabelecimentos cadastrados.', async () => {
        const res = await request.get('/estabelecimento').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve editar um estabelecimento.', async () => {
        const res = await request.put('/estabelecimento/1').send(EstabelecimentoEdit).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve deletar um estabelecimento (soft delete).', async () => {
        const res = await request.delete('/estabelecimento/1').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })
})

afterAll(async () => {
    await knex.migrate.rollback(true, true);
    await knex.destroy();
})