import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your-secret-key";

export async function encrypt(payload: any) {
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
}

export async function decrypt(token: string) {
  return jwt.verify(token, secretKey);
}

export async function verifyAuth(token: string) {
  try {
    const verified = await decrypt(token);
    return verified;
  
  } catch (err) {
    return null;
  }
}
