const createToken = async user => {};

export default {
  Query: {
    user: async (parent, { id }, { models }) => {
      // return await models.User.findOne({ where: { id: id } });
      return await models.User.findByPk(id);
    },
    users: async (parent, args, { models }) => {
      return models.User.findAll();
    },
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }
      return await models.User.findOne({ where: { id: me.id } });
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models },
    ) => {
      const user = await models.User.create({
        username,
        email,
        password,
      });

      return {
        token: createToken(user),
      };
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
