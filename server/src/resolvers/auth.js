import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';
import { resolveSoa } from 'dns';

export const ROLES = {
  ADMIN: 'ADMIN',
};

export const isAuthenticated = (parent, args, { me }) =>
  me
    ? skip
    : new ForbiddenError('You must be authenticated, please signin.');

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === ROLES.ADMIN
      ? skip
      : new ForbiddenError('Not authorized as admin'),
);

export const isMessageOwner = async (
  parent,
  { id },
  { models, me },
) => {
  console.log('@isMessageOwner');
  const message = await models.Message.findByPk(id, { raw: true });

  console.log({ message }, { me });

  if (message.userId !== me.id) {
    throw new ForbiddenError(
      'You are not authenticated as the owner, please signin to continue.',
    );
  }

  return skip;
};
