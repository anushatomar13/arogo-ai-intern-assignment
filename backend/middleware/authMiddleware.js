const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  try {
    let token;

   
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 

      // Finding user from token payload
      req.user = await User.findById(decoded.id).select("-password"); 
      next(); 
    } else {
      res.status(401).json({ message: "Not authorized, token missing" });
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = protect;
