const Vendor = require("../models/vendor")

const getAllVendor = async (req, res) => {
    try {
        let data = await Vendor.find()
        return res.json({code: 1, data})
    } catch (error) {
        console.log(error)
        return res.json({code: 0, message: "Terjadi kesalahan, periksa jaringan anda!"})
    }
}

const insertVendor = async (req, res) => {
    try {
        const vendor = await Vendor.create(req.body)
        return res.json({
            code: 1,
            message: "Berhasil menambahkan vendor baru"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            code: 0,
            message: "Terjadi kesalahan!"
        })
    }
}

module.exports = {
    getAllVendor,
    insertVendor
}