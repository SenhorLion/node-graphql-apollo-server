import uuidv4 from 'uuid/v4';
import { combineResolvers } from 'graphql-resolvers';

import { isAuthed } from './auth';

export default {
  Query: {
    messages: async (parent, args, { models }) => {
      return await models.Message.findAll();
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findByPk(id);
    },
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthed,
      async (parent, { text }, { me, models }) => {
        // update / mutate data
        // models.messages[id] = message;
        // models.users[me.id].messageIds.push(id);

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

    deleteMessage: async (parent, { id }, { models }) => {
      return await models.Message.destroy({ where: { id } });
    },

    updateMessage: async (parent, { id, text }, { models }) => {
      console.log('MESSAGE TO UPDATE', id, text);

      try {
        return await models.Message.update(
          { text },
          { returning: true, where: { id } },
        );
      } catch (error) {
        throw new Error(error);
      }

      // Book.update(
      //   {title: req.body.title},
      //   {returning: true, where: {id: req.params.bookId} }
      // )
    },
  },

  Message: {
    user: async (message, args, { models }) => {
      return await models.User.findOne({
        where: { id: message.userId },
      });
    },
  },
};
