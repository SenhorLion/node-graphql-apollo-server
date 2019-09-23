import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    messages: [Message!]!
    messagesPaged(offset: Int!, limit: Int!): [Message!]!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID!, text: String!): Boolean!
  }

  type Message {
    id: ID!
    text: String!
    createdAt: Date! #String!
    user: User!
  }
`;
