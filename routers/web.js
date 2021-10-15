const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    const loadJS = [
        {src: "https://code.jquery.com/jquery-3.6.0.min.js"},
        {src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"},
        {src: "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"},
        {src: "/assets/vuejs/home.js"}
    ]
    const loadCSS = [
        {src: "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"}
    ]

    return res.render('index', {loadJS, loadCSS})
})

module.exports = router;