import { SignJWT, jwtVerify } from "jose";

// Create a JWT
export async function createToken(payload, secret) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(secret));

  return token;
}

// Verify a JWT
export async function verifyToken(token, secret) {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload;
}
