import * as bcrypt from 'bcrypt';

export async function generatePassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const saltedPassword = await bcrypt.hash(password, salt);

  return saltedPassword;
}
