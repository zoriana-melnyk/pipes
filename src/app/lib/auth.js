import { hash } from 'bcryptjs';
const { compare } = require('bcryptjs');

const SALT_ROUNDS = 12;

export async function hashPassword(password) {
  const hashedPassword = await hash(password, SALT_ROUNDS);
  return hashedPassword;
}

// verify password with hashed password
export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}