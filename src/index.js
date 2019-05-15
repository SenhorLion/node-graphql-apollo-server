import 'dotenv/config';

import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import uuidv4 from 'uuid/v4';

const app = express();

app.use(cors());

let users = {
  1: {
    id: '1',
    username: 'Lionel Kung Fu',
    email: 'lion@kungfu.com',
    messageIds: [1],
  },
  2: {
    id: '2',
    username: 'Bruce Lee',
    email: 'mr@kungfu.com',
    messageIds: [2],
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello message one',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'Hello message two',
    userId: '2',
  },
  3: {
    id: '3',
    text: 'Hello message Three, by user 1',
    userId: '1',
  },
};

// const me = users[1];

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]
    messages: [Message!]!
    message(id: ID!): Message!
  }

  type Mutation {
    createMessage(text: String!): Message
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID!, text: String!): Boolean!
  }

  type User {
    id: ID!
    username: String!
    email: String
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;

const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      console.log('me', me, 'parent', parent, 'args', args);
      return me;
    },
    user: (parent, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    },

    messages: () => Object.values(messages),
    message: (parent, { id }) => messages[id],
  },

  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };

      // update / mutate data
      messages[id] = message;
      users[me.id].messageIds.push(id);

      return message;
    },

    deleteMessage: (parent, { id }) => {
      const { [id]: message, ...otherMessages } = messages;

      console.log('MESAGE', message);
      console.log('OTHER', otherMessages);

      if (!message) {
        return false;
      }

      messages = otherMessages;
      return true;
    },

    updateMessage: (parent, { id, text }) => {
      const { [id]: message } = messages;

      console.log('MESSAGE TO UPDATE', message);

      if (!message) {
        return false;
      }

      message.text = text;

      return true;
    },
  },

  User: {
    messages: user => {
      return Object.values(messages).filter(
        message => message.userId === user.id,
      );
    },
  },

  Message: {
    user: message => users[message.userId],
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});

// Add Express as middleware, and specify path to graphql API
server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
