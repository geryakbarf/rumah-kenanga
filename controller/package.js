const Package = require('../models/package')

const getVendorPackage = async (req, res) => {
    try {
        const vendorId = req.params.id
        const result = await Package.find({vendorId: vendorId})
        return res.json({code: 1, data: result})
    } catch (e) {
        console.log(e)
        return res.json({code: 0, message: "Terjadi kesalahan saat memuat data package!"})
    }
}

const insertVendorPackage = async (req, res) => {
    try {
        const result = await Package.create(req.body)
        return res.json({code: 1, message: "Berhasil menambahkan data package baru!"})
    } catch (e) {
        console.log(e)
        return res.json({code: 0, message: "Terjadi kesalahan, periksa internet anda!"})
    }
}

module.exports = {
    getVendorPackage,
    insertVendorPackage
}