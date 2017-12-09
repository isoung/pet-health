import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as expressGraphql from 'express-graphql';
import * as morgan from 'morgan';
import * as path from 'path';

import { GraphQLSchema } from 'api/graphql/merger';
import { Scope } from 'api/scope';
import { connectDb } from 'config/connectDb';

const config = require('./config/db.json');
const databaseConfig = config['database'][process.env.NODE_ENV];
const databaseURL = databaseConfig['mongoUrl'];
connectDb(databaseURL);

const app = express();

// logging
app.use(morgan('short', {
    skip: (req: express.Request, res: express.Response) =>  res.statusCode !== 200
}));

app.use(bodyParser.json());

app.use('/testing', (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: 'testing' });
});

app.use('/graphql',
// jwt({ secret: process.env.JWT_SECRET_KEY }),
// Authentication.handleErrors,
// decryptId,
(req, res, next) => {
  // Development only... authentication should be handled here
  // req.params.user = require('./_config/user.json')['userId'];
  // console.log(req.body.query);
  next();
},
async (req: any, res, next) => {
  // console.log(req.params.user);
  // req.params.user = require('./_config/user.json')['userId'];
  const scope = new Scope();
  try {
    await scope.initializeScope(req);
  }
  catch (err) {
    next(err);
  }

  req.scope = scope;
  next();
},
expressGraphql(() => ({
  schema: GraphQLSchema,
  graphiql: true
})));

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.statusCode || 500).send({ error: err.message });
});

app.use('/resources', express.static(path.join(__dirname, '../app/resources')));
app.use('/webfonts', express.static('webfonts'));
app.use('/css', express.static('css'));

if (process.env.NODE_ENV === 'development') {
  app.get('*', (req: express.Request, res: express.Response, next: any) => {
    // console.log(path.join(__dirname, '_client/index.development.html'));
    res.status(200).sendFile(path.join(__dirname, '_client/index.development.html'));
  });
}
else {
  app.get('*', (req: express.Request, res: express.Response, next: any) => {
    res.status(200).sendFile(path.join(__dirname, '../app/index.production.html'));
  });
}

app.listen(process.env.PORT || 3000, () => {
  console.log(`\u001b[37m====================================================\u001b[39m`);
  console.log(`\u001b[37mpet-health server STARTED\u001b[39m`);
  console.log(`\u001b[37m====================================================\u001b[39m`);
  console.log(`\u001b[37mServer PORT:   ${process.env.PORT || 3000}\u001b[39m`);
  console.log(`\u001b[37mDatabase ENV:  ${process.env.NODE_ENV}\u001b[39m`);
  console.log(`\u001b[37mDatabase URL:  ${databaseURL}\u001b[39m`);
  console.log(`\u001b[37m====================================================\u001b[39m`);
});
