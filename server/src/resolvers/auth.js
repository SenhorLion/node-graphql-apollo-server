import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthed = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('You must be authed');
