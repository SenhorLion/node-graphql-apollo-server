import uuidv4 from 'uuid/v4';

export default {
  Query: {
    messages: (parent, args, { models }) =>
      Object.values(models.messages),
    message: (parent, { id }, { models }) => models.messages[id],
  },

  Mutation: {
    createMessage: (parent, { text }, { me, models }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };

      // update / mutate data
      models.messages[id] = message;
      models.users[me.id].messageIds.push(id);

      return message;
    },

    deleteMessage: (parent, { id }, { models }) => {
      const { [id]: message, ...otherMessages } = models.messages;

      if (!message) {
        return false;
      }

      models.messages = otherMessages;
      return true;
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
    user: (message, args, { models }) => models.users[message.userId],
  },
};
