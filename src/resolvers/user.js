export default {
  Query: {
    user: async (parent, { id }, { models }) => {
      return await models.User.findOne({ where: { id: id } });
    },
    users: async (parent, args, { models }) => {
      return models.User.findAll();
    },
    me: async (parent, args, { models, me }) => {
      return await models.User.findOne({ where: { id: me.id } });
    },
  },

  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: user.id,
        },
      });
    },
  },
};
