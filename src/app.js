require('dotenv-flow').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes');
const knex = require('./database');

knex.context.client.pool.creator()
    .then(c => console.log('🟢️ Database connection successful.'))
    .catch(e => console.log(`🔴️ No connection to the database. ${e}`));

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

module.exports = app;