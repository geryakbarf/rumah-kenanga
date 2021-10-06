const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    return res.render('index',{pageTitle : 'All of it just works'});
});

module.exports = router;