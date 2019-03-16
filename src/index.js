import 'dotenv/config';

import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';

const app = express();

app.use(cors());

let users = {
  1: {
    id: '1',
    username: 'Lionel Kung Fu',
    email: 'lion@kungfu.com',
  },
  2: {
    id: '2',
    username: 'Bruce Lee',
    email: 'mr@kungfu.com',
  },
};

const me = users[1];

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }

  type User {
    id: ID!
    username: String!
    email: String
  }
`;

const resolvers = {
  Query: {
    me: () => {
      return me;
    },
    user: (parent, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

// Add Express as middleware, and specify path to graphql API
server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
