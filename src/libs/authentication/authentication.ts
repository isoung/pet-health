import * as bcrypt from 'bcrypt';

export async function generatePassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const saltedPassword = await bcrypt.hash(password, salt);

  return saltedPassword;
}

export async function validatePassword(password: string, hash: string) {
  const resultPassword = await bcrypt.compare(password, hash);

  return resultPassword;
}
