import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './user.model';

dotenv.config();

async function authenticate({ email, password }) {
  const user = await User.getUser({ email });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ email }, process.env.JWT_KEY, {
      expiresIn: '12h'
    });
    return {
      token
    };
  }
  return user;
}

async function create(userParam) {
  // validate
  if (await User.getUser({ email: userParam.email })) {
    throw new Error(`email "${userParam.email}" is already taken`);
  }

  const newUser = { ...userParam };
  newUser.hash = bcrypt.hashSync(userParam.password, 10);

  const user = new User(newUser);

  // save user
  await user.save();
  const token = jwt.sign({ email: userParam.email }, process.env.JWT_KEY, {
    expiresIn: '12h'
  });
  return {
    token
  };
}

async function update(id, userParam) {
  const user = await User.getUserById(id);

  // validate
  if (!user) throw new Error('User not found');
  if (
    user.email !== userParam.email &&
    (await User.getUser({ email: userParam.email }))
  ) {
    throw new Error(`Email "${userParam.email}" is already taken`);
  }

  // hash password if it was entered
  if (userParam.password) {
    // eslint-disable-next-line no-param-reassign
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }
}

async function getUserById(id) {
  await User.getUserById(id);
}

export default { create, update, authenticate, getUserById };
