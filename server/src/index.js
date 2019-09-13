import 'dotenv/config';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import models, { sequelize } from './models';
import schema from './schema';
import resolvers from './resolvers';

const app = express();

app.use(cors());

// const me = users[1];

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the sequelize error messages
    // and just leave the importnat validation errors
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async () => ({
    models,
    me: await models.User.findByLogin('lionela'),
    secret: process.env.TOKEN_SECRET,
  }),
});

// Add Express as middleware, and specify path to graphql API
server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = false;

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'lionela',
      email: 'lion@me.com',
      password: '1234567',
      messages: [
        {
          text: 'Lorem ipsum dolor sitamec',
        },
      ],
    },
    { include: [models.Message] },
  );

  await models.User.create(
    {
      username: 'zavi',
      email: 'zavi@me.com',
      password: '1234567',
      messages: [
        {
          text: 'Booba is King!',
        },
        {
          text: 'The ghosty one!',
        },
      ],
    },
    { include: [models.Message] },
  );
};

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }
  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});
