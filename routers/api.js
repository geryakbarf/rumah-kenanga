const express = require('express')
const router = express.Router()
const Vendor = require('../controller/vendor')
const Package = require('../controller/package')
const Upload = require('../upload')

//Area Vendor
router.get('/vendor', Vendor.getAllVendor)
router.get('/vendor/:id', Vendor.getOneVendor)
router.post('/vendor', Vendor.insertVendor)
router.put('/vendor', Vendor.updateVendor)

//Area Package
router.get('/package/:id', Package.getVendorPackage)
router.post('/package', Package.insertVendorPackage)

//Area Upload File
router.post('/upload-image', Upload.uploadImage)

module.exports = router