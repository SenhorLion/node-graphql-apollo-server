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
  context: async () => ({
    models,
    me: await models.User.findByLogin('lionela'),
  }),
});

// Add Express as middleware, and specify path to graphql API
server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'lionela',
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
