const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    console.error("Authentication Error: No token provided");
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    console.error("Authentication Error: Invalid token format");
    return res.status(401).json({ error: "Invalid token format" });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // ✅ Attach user ID
    console.log("User Authenticated:", req.user);
    next();
  } catch (error) {
    console.error("JWT Verification Failed:", error.message);
    res.status(400).json({ error: "Invalid token" });
  }
};
