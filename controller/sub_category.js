const Sub = require('../models/sub_category')

const getSubCategory = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Sub.findOne({category_id: id})
        return res.json({code: 1, result})
    } catch (e) {
        console.log(e)
        return res.json({code: 0, message: "Terjadi keslahan!"})
    }
}

module.exports = {
    getSubCategory
}