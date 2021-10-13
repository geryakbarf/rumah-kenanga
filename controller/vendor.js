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

const getOneVendor = async (req, res) => {
    try {
        let id = req.params.id
        let data = await Vendor.findOne({_id: id})
        return res.json({code: 1, data})
    } catch (e) {
        console.log(e)
        return res.json({code: 0, message: "Terjadi kesalahan, periksa jaringan anda!"})
    }
}

const insertVendor = async (req, res) => {
    try {
        const vendor = await Vendor.create(req.body)
        const result = await Vendor.findOne({createdAt: vendor.createdAt})
        return res.json({
            code: 1,
            message: "Berhasil menambahkan vendor baru",
            id: result._id
        })
    } catch (error) {
        console.log(error)
        return res.json({
            code: 0,
            message: "Terjadi kesalahan!"
        })
    }
}

const updateVendor = async (req, res) => {
    try {
        const vendor = await Vendor.updateOne({_id: req.body._id}, req.body)
        return res.json({
            code: 1,
            message: "Berhasil memperbarui data vendor!",
            id: req.body._id
        })
    } catch (e) {
        console.log(e)
        return res.json({code: 0, message: "Terjadi kesalahan, periksa jaringan anda!"})
    }
}

module.exports = {
    getAllVendor,
    insertVendor,
    getOneVendor,
    updateVendor
}