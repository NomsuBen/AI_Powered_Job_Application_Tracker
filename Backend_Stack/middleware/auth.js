const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Attach full decoded user object
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
