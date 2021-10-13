const express = require('express')
const router = express.Router()
const Vendor = require('../controller/vendor')
const Upload = require('../upload')

//Area Vendor
router.get('/vendor', Vendor.getAllVendor)
router.get('/vendor/:id', Vendor.getOneVendor)
router.post('/vendor', Vendor.insertVendor)
router.put('/vendor', Vendor.updateVendor)

//Area Upload File
router.post('/upload-image', Upload.uploadImage)

module.exports = router