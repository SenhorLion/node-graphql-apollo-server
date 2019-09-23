import { GraphQLDateTime } from 'graphql-iso-date';

import userResolver from './user';
import messageResolver from './message';

const customDateScalar = {
  Date: GraphQLDateTime,
};

export default [customDateScalar, userResolver, messageResolver];
