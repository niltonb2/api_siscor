const app = require('../../app');
const supertest = require('supertest');
const request = supertest(app);
const knex = require('../../database');

const { PessoaSave, PessoaEdit } = require('../../../__tests__/stubs/PessoaStub');
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
    await request.post('/estabelecimento').send(EstabelecimentoSave).set('Authorization', `Bearer ${token}`);
})

describe('Requisições válidas', () => {
    test('Deve cadastrar uma pessoa.', async () => {
        const res = await request.post('/pessoa/save').send(PessoaSave).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve pesquisar as pessoas cadastradas.', async () => {
        const res = await request.get('/pessoa').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve editar uma pessoa.', async () => {
        const res = await request.put('/pessoa/1').send(PessoaEdit).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve deletar uma pessoa (soft delete).', async () => {
        const res = await request.delete('/pessoa/1').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })
})

afterAll(async () => {
    await knex.migrate.rollback(true, true);
    await knex.destroy();
})