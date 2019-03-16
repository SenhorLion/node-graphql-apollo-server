import 'dotenv/config';

const userCredentials = { firstname: 'Lionel' };
const userDetails = { nationality: 'Dual' };

const user = {
  ...userCredentials,
  ...userDetails,
};

console.log(user);

console.log(process.env.SOME_ENV_VARIABLE);
