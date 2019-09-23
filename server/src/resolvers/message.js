import uuidv4 from 'uuid/v4';
import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated, isMessageOwner } from './auth';

export default {
  Query: {
    messages: async (parent, args, { models }) => {
      return await models.Message.findAll();
    },
    messagesPaged: async (
      parent,
      { offset = 0, limit = 100 },
      { models },
    ) => {
      return await models.Message.findAll({
        offset,
        limit,
      });
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findByPk(id);
    },
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { me, models }) => {
        try {
          return await models.Message.create({
            text,
            userId: me.id,
          });
        } catch (error) {
          throw new Error(error);
        }
      },
    ),

    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => {
        return await models.Message.destroy({ where: { id } });
      },
    ),

    updateMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id, text }, { models }) => {
        try {
          return await models.Message.update(
            { text },
            { returning: true, where: { id } },
          );
        } catch (error) {
          throw new Error(error);
        }
      },
    ),
  },

  Message: {
    user: async (message, args, { models }) => {
      return await models.User.findOne({
        where: { id: message.userId },
      });
    },
  },
};
