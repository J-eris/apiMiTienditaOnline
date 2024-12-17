import { hash, compare } from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  const passwordHash = await hash(password, 10);
  return passwordHash;
};

const compararPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const passwordIsCorrect = await compare(password, hash);
  return passwordIsCorrect;
};

export { hashPassword, compararPassword };
