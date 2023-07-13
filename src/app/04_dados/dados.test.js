const app = require('../../app');
const supertest = require('supertest');
const request = supertest(app);
const knex = require('../../database');

const { ContatoSave, ContatoEdit } = require('../../../__tests__/stubs/ContatoStub');
const { EnderecoSave, EnderecoEdit } = require('../../../__tests__/stubs/EnderecoStub');
const { BancariosSave, BancariosEdit } = require('../../../__tests__/stubs/BancariosStub');
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
    await request.post('/pessoa/save').send(PessoaSave).set('Authorization', `Bearer ${token}`);
})

describe('Requisições válidas', () => {
    test('Deve cadastrar um contato e vincular a um estabelecimento.', async () => {
        const res = await request.post('/dados/contato/estabelecimento/1').send(ContatoSave).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve cadastrar um contato e vincular a uma pessoa.', async () => {
        const res = await request.post('/dados/contato/pessoa/1').send(ContatoSave).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve editar um contato.', async () => {
        const res = await request.put('/dados/contato/1').send(ContatoEdit).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve cadastrar um endereço e vincular a um estabelecimento.', async () => {
        const res = await request.post('/dados/endereco/estabelecimento/1').send(EnderecoSave).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve cadastrar um endereço e vincular a uma pessoa.', async () => {
        const res = await request.post('/dados/endereco/pessoa/1').send(EnderecoSave).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve editar um endereço.', async () => {
        const res = await request.put('/dados/endereco/1').send(EnderecoEdit).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve cadastrar um dados bancário e vincular a um estabelecimento.', async () => {
        const res = await request.post('/dados/bancarios/estabelecimento/1').send(BancariosSave).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve cadastrar um dados bancário e vincular a uma pessoa.', async () => {
        const res = await request.post('/dados/bancarios/pessoa/1').send(BancariosSave).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve editar um dados bancário.', async () => {
        const res = await request.put('/dados/bancarios/1').send(BancariosEdit).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve deletar um dado (contato, endereço, bancários).', async () => {
        const res = await request.delete('/dados/bancarios/1').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    })
})

afterAll(async () => {
    await knex.migrate.rollback(true, true);
    await knex.destroy();
})