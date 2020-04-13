import bcrypt from 'bcryptjs';

type HashedPassword = {
  hashedPassword: string;
  hashedConfirmPassword: string;
};

export async function encryptPassword(password: string, confirmPassword: string): Promise<HashedPassword> {
  const salt: string = await bcrypt.genSalt(10);

  const hashedPassword: string = await bcrypt.hash(password, salt);
  const hashedConfirmPassword: string = await bcrypt.hash(confirmPassword, salt);

  const hashedPasswords: HashedPassword = { hashedPassword, hashedConfirmPassword };
  return hashedPasswords;
}

export async function comparePassword(password: string, userPassword: string): Promise<string> {
  return await bcrypt.compare(password, userPassword);
}
