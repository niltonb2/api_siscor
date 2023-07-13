# SISCOR API

API do SISCOR.  
> Versão Node: 16.17.0x  
---
## 💾 Instalação:
### Requisitos:

-   [Git](https://git-scm.com/downloads)
-   [Nodejs 16.17.0x](https://nodejs.org/en/)
-   [PostgreSQL](https://www.postgresql.org/)

> Após instalação do PostgreSQL, será necessário criar o banco e preencher as variáveis de ambiente no arquivo ***.env*** com os dados de conexão.


---
- Instalação de dependências:
    ```bash
    npm install
    ```

- Criação de tabelas:
    ```bash
    npm run all
    ```

- Execução da API:
    ```bash
    npm start
    ```

- Testes:
    ```bash
    npm test
    ```

- **Deletar tabelas (recomendado apenas em ambiente de desenvolvimento):**
    ```bash
    npm run rollback
    ```
---

## ⌨️ Execuções no Banco de Dados

- **npx knex migrate:list** (listar as migrações concluídas e pendentes)
- **npx knex migrate:latest** (criar tabelas)
- **npx knex seed:run** (preencher tabelas)
- **npx knex migrate:rollback** (reverter o último lote de migrações)
> Para mais detalhes sobre migrações e adendos, leia a [documentação do knex.](https://knexjs.org/guide/)

---

## 📃️ Documentação

Acessar a rota http://localhost:8000/api-docs/ com api ligada. Neste link será possível entender a sequência de CRUDS e realizar testes.

---
## 💻 Tecnologias Utilizadas

- NodeJS
- Express
- BD
    - PostgreSQL
    - Knex
- Testes
    - Jest
    - Supertest
- Segurança/ Performance/ Registro(Log)
    - Cors
    - Helmet
    - Compression
    - Morgan-body
- Token e Hash
    - Jsonwebtoken
    - bcryptjs
- Validação de request body
    - Yup
- Documentação
    - Swagger

---
