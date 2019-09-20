import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAdmin } from './auth';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;

  console.log(
    '@createToken',
    { id },
    { email },
    { username },
    { role },
  );

  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};

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
      { models, secret },
    ) => {
      const user = await models.User.create({
        username,
        email,
        password,
      });

      return {
        token: createToken(user, secret, '30s'),
      };
    },
    signIn: async (
      parent,
      { login, password },
      { models, secret },
    ) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new AuthenticationError(
          'No user found, please check your credentials',
        );
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new UserInputError('Cant signin, invalid password');
      }

      console.log({ user });

      return {
        token: createToken(user, secret, '30m'),
      };
    },
    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.User.destroy({
          where: { id },
        });
      },
    ),
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
