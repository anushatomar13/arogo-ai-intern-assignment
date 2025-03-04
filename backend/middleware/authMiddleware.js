const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");

const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];

            if (!token) {
                return res.status(401).json({ message: "Not authorized, token missing" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password") || await Doctor.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User/Doctor not found in database!" });
            }

            req.role = decoded.role; 
            next();
        } else {
            res.status(401).json({ message: "Not authorized, no token provided" });
        }
    } catch (error) {
        console.error("Error in protect middleware:", error.message);
        res.status(401).json({ message: "Not authorized, invalid token" });
    }
};

module.exports = protect;
