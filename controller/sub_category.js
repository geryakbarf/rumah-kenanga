const Sub = require('../models/sub_category')

const getSubCategory = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Sub.find({category_id: id})
        return res.json({code: 1, result})
    } catch (e) {
        console.log(e)
        return res.json({code: 0, message: "Terjadi keslahan!"})
    }
}

const insertSubCategory = async (req, res) => {
    try {
        const result = await Sub.create(req.body)
        return res.json({code: 1, message: "Sukses menambahkan sub kategori!"})
    } catch (e) {
        console.log(e)
        return res.json({code: 0, message: "Terjadi kesalahan!"})
    }
}

const updateSubCategory = async (req, res) => {
    try {
        const result = await Sub.updateOne({_id: req.body._id}, req.body)
        return res.json({code: 1, message: "Berhasil memperbarui sub kategori!"})
    } catch (e) {
        console.log(e)
        return res.json({code: 0, message: "Terjadi Kesalahan!"})
    }
}

const deleteSubCategory = async (req, res) => {
    try {
        const result = await Sub.deleteOne({_id: req.body._id})
        return res.json({code: 1, message: "Berhasil menghapus sub kategori!"})
    } catch (e) {
        console.log(e)
        return res.json({code: 0, message: "Terjadi Kesalahan!"})
    }
}

module.exports = {
    getSubCategory,
    insertSubCategory,
    updateSubCategory,
    deleteSubCategory
}