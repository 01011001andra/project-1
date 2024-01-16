const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require('../models/userModel');

exports.protect = async (req, res, next) => {
    let token;
    token = req.cookies.token_key;
    if (!token) {
        return res
            .status(401)
            .json({ success: false, msg: `Anda tidak memiliki Akses!` });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findOne({ where: { username: decoded.username } });
        next();
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};