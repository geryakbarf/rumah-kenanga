const express = require('express')
const router = express.Router()
const Vendor = require('../controller/vendor')

//Area Vendor
router.get('/get-all-vendor', Vendor.getAllVendor)
router.post('/insert-vendor', Vendor.insertVendor)

module.exports = router