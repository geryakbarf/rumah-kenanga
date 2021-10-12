const express = require('express')
const router = express.Router()
const Vendor = require('../controller/vendor')
const Upload = require('../upload')

//Area Vendor
router.get('/get-all-vendor', Vendor.getAllVendor)
router.post('/insert-vendor', Vendor.insertVendor)

//Area Upload File
router.post('/upload-image', Upload.uploadImage)

module.exports = router