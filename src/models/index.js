let users = {
  1: {
    id: '1',
    username: 'Lionel Kung Fu',
    email: 'lion@kungfu.com',
    messageIds: [1],
  },
  2: {
    id: '2',
    username: 'Bruce Lee',
    email: 'mr@kungfu.com',
    messageIds: [2],
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello message one',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'Hello message two',
    userId: '2',
  },
  3: {
    id: '3',
    text: 'Hello message Three, by user 1',
    userId: '1',
  },
};

export default {
  users,
  messages,
};
