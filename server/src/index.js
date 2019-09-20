import 'dotenv/config';

import express from 'express';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import models, { sequelize } from './models';
import schema from './schema';
import resolvers from './resolvers';
import { ROLES } from './resolvers/auth';

const app = express();

app.use(cors());

const getMe = async req => {
  const token = req.headers['x-token'];
  console.log('@getMe', { token });

  if (token) {
    try {
      return await jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
      throw new AuthenticationError('Token not valid please sign in');
    }
  }
};

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
  context: async ({ req }) => {
    const me = await getMe(req);

    console.log('@context', { me });
    return {
      models,
      me,
      secret: process.env.TOKEN_SECRET,
    };
  },
});

// Add Express as middleware, and specify path to graphql API
server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'lionela',
      email: 'lion@me.com',
      password: '1234567',
      role: ROLES.ADMIN,
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
