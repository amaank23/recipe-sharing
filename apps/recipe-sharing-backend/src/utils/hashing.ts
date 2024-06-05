import bcrypt from "bcrypt";

export async function generateHashedPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export async function compareHashes(
  plaintextPassword: string,
  hashedPassword: string
) {
  const match = await bcrypt.compare(plaintextPassword, hashedPassword);
  return match;
}
