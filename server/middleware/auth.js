import jwt from "jsonwebtoken";
import jwksRsa from "jwks-rsa";

const client = jwksRsa({
  jwksUri: `https://caupzjedlkeotofkdxnd.supabase.co/auth/v1/keys`,
});


export const verifySupabaseToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided or invalid format." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SUPABASE_LEGACY_JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.error("JWT verification error", error);
    return res.status(401).json({ message: "Unauthorized: Invalid  token" });
  }
};
