const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No token or invalid format provided");
    return res
      .status(401)
      .json({ status: "error", message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.log("❌ Token is missing after 'Bearer'");
    return res
      .status(401)
      .json({ status: "error", message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Authenticated User:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);

    if (err.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({
          status: "error",
          message: "Token expired, please log in again",
        });
    }

    return res.status(401).json({ status: "error", message: "Invalid token" });
  }
};
