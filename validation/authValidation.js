const UserModel = require("../models/userModel");

exports.loginValidation = async (req, res, next) => {
    try {
        if (req.body.username === '') {
            return res.status(400).json({ success: false, msg: 'Username tidak boleh kosong!' });
        }
        if (req.body.password === '') {
            return res.status(400).json({ success: false, msg: 'Password tidak boleh kosong!' });
        }
        const check = await UserModel.findOne({ where: { username: req.body.username, password: req.body.password } });
        if (check === null) {
            return res.status(400).json({ success: false, msg: 'Login Gagal!' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message })
    };
}