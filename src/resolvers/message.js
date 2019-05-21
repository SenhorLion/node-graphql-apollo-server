import uuidv4 from 'uuid/v4';

export default {
  Query: {
    messages: async (parent, args, { models }) => {
      return await models.Message.findAll();
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findOne({ where: { id } });
    },
  },

  Mutation: {
    createMessage: async (parent, { text }, { me, models }) => {
      // update / mutate data
      // models.messages[id] = message;
      // models.users[me.id].messageIds.push(id);

      return await models.Message.create({
        text,
        userId: me.id,
      });
    },

    deleteMessage: async (parent, { id }, { models }) => {
      return await models.Message.destroy({ where: { id } });
    },

    updateMessage: (parent, { id, text }, { models }) => {
      const { [id]: message } = models.messages;

      console.log('MESSAGE TO UPDATE', message);

      if (!message) {
        return false;
      }

      message.text = text;

      return true;
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
