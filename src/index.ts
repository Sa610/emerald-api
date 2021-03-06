import express      from 'express';
import path         from 'path';
import fs           from 'fs';
import { Model }    from 'objection';

import Emerald      from './lib/core/emerald';
import KnexConfig   from './config/db';

import Knex         from 'knex';

const app           = express();
const emerald       = new Emerald(__dirname);
const knex          = Knex(KnexConfig.DEVELOPMENT);

const PORT          = process.env.port || 8080;

Model.knex(knex);

// Create main service
app.use('/*', (req, res) => {
    emerald.call(req, res);
});

console.log(`Running server on port: http://localhost:${PORT}\n`);
app.listen(PORT);
