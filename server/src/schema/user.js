import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }

  extend type Mutation {
    signUp(
      username: String!
      password: String!
      email: String!
    ): Token
    signIn(login: String!, password: String!): Token
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    messages: [Message!]
  }
`;
