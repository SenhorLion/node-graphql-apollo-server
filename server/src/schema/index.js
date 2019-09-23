import { gql } from 'apollo-server-express';

// All schema now moved to Domain specific files
// - user
// - message

import userSchema from './user';
import messageSchema from './message';

const linkSchema = gql`
  # custom date scalar
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, messageSchema];
