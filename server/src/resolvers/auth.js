import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('You must be authed');

export const isMessageOwner = async (
  parent,
  { id },
  { models, me },
) => {
  console.log('@isMessageOwner');
  const message = await models.Message.findByPk(id, { raw: true });

  console.log({ message }, { me });

  if (message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner');
  }

  return skip;
};
