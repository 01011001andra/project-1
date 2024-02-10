const UserModel = require("../models/UserModels");
const { body } = require("express-validator");

exports.loginValidation = [
    body("username", "Username Wajib Diisi!").not().isEmpty(),
    body("password").not().isEmpty(),
];

exports.diskonValidation = [
    body("total").not().isEmpty().withMessage("Total tidak boleh kosong").isNumeric().withMessage("Total harus berupa angka"),
    body("persen").not().isEmpty().withMessage("Persen tidak boleh kosong").isNumeric().withMessage("Persen harus berupa angka"),
];

exports.pelangganValidation = [
    body("nama").not().isEmpty().withMessage('Nama tidak boleh kosong!'),
    body("nama").custom(value => {
        // Menjalankan validasi kustom untuk memastikan tidak ada angka dalam nama
        if (/\d/.test(value)) {
            throw new Error("Nama tidak boleh mengandung angka!");
        }
        return true;
    }),
    body("alamat").not().isEmpty().withMessage('Alamat tidak boleh Kosong!'),
    body("no_telp").isNumeric().withMessage("No_telp Wajib Angka!"),
    body("totalKg").isNumeric().withMessage("Total KG Wajib Angka!"),
];

exports.rekapValidation = [
    body("harga").not().isEmpty().withMessage('Harga tidak boleh Kosong!').isNumeric().withMessage("Harga tidak boleh kosong!"),
    body("alamat").not().isEmpty().withMessage('Alamat tidak boleh Kosong!'),
    body("no_telp").isNumeric().withMessage("No_telp Wajib Angka!"),
    body("totalKg").isNumeric().withMessage("Total KG Wajib Angka!"),
    body("harga").isNumeric().withMessage("Harga KG Wajib Angka!"),
];

exports.searchRekapValidation = [
    body("no_telp").not().isEmpty().withMessage("No Telp tidak boleh kosong!").isNumeric().withMessage("No_telp Wajib Angka!"),
];
