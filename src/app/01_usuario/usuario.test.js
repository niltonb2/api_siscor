const app = require('../../app');
const supertest = require('supertest');
const request = supertest(app);
const knex = require('../../database');

const { UsuarioSave, UsuarioEdit } = require('../../../__tests__/stubs/UsuarioStub');
let token;

beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
})

describe('Requisições válidas', () => {
    test('Deve cadastrar um usuário.', async () => {
        const res = await request.post('/usuarios/save').send(UsuarioSave);
        expect(res.statusCode).toEqual(200);
    })

    test('Deve permitir o login de um usuário', async () => {
        const res = await request.post('/usuarios/login').send({
            "email": UsuarioSave.email,
            "senha": UsuarioSave.senha
        })
        token = res._body.token;
        expect(res.statusCode).toEqual(200)
        expect(res.text).toContain("token")
    })

    test('Deve pesquisar os usuários cadastrados', async () => {
        const res = await request.get('/usuarios').set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200)
    })

    test('Deve editar um usuário', async () => {
        const res = await request.put('/usuarios/1').send(UsuarioEdit).set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200)
    })

    test('Deve deletar um usuário (soft delete)', async () => {
        const res = await request.delete('/usuarios/1').set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200)
    })
})

describe('Requisições inválidas', () => {
    test('Deve recusar o cadastro de usuário por falta de dados', async () => {
        const res = await request.post('/usuarios/save');
        expect(res.statusCode).toEqual(400);
    })

    test('Deve recusar o login de usuário por falta de dados', async () => {
        const res = await request.post('/usuarios/login');
        expect(res.statusCode).toEqual(400);
    })

    test('Deve recusar a edição de usuário por não estar cadastrado.', async () => {
        const res = await request.put('/usuarios/2').send(UsuarioEdit).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(400);
        expect(res.text).toContain("Não existe usuário para a ID informada.")
    })

    test('Deve recusar a deleção de usuário por não estar cadastrado.', async () => {
        const res = await request.delete('/usuarios/2').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(400);
        expect(res.text).toContain("Não existe usuário para a ID informada.")
    })
})

describe('Auth Middleware', () => {
    test('Deve solicitar o token', async () => {
        const res = await request.get('/usuarios')
        expect(res.statusCode).toEqual(400)
        expect(res.text).toContain("O token não foi informado!")
    })

    test('Deve recusar o token informado', async () => {
        const res = await request.get('/usuarios').set('Authorization', `${token}`);
        expect(res.statusCode).toEqual(400)
        expect(res.text).toContain("Erro na validação do token!")
    })

    test('Deve recusar o token no formato inválido', async () => {
        const res = await request.get('/usuarios').set('Authorization', `Beare ${token}`);
        expect(res.statusCode).toEqual(400)
        expect(res.text).toContain("Token em formato inválido!")
    })
})

afterAll(async () => {
    await knex.migrate.rollback(true, true);
    await knex.destroy();
})