const express = require('express');
const router = express.Router();
const auth = require("../middleware/authentification");

router.get('/login', (req, res) => {
    const loadJS = [
        {src : "https://code.jquery.com/jquery-3.6.0.min.js"},
        {src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"},
        {src: "https://cdn.jsdelivr.net/npm/admin-lte@3.1/dist/js/adminlte.min.js"},
        {src: "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"},
        {src: "/assets/vuejs/form-login.js"}
    ]
    const loadCSS = [
        {src: "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"}
    ]
    return res.render('admin/login', {title: "Admin - Login", loadJS, loadCSS})
})

router.post('/login', (req, res) => {
    const {email, password} = req.body
    if (email === "admin@rumahkenanga.com" && password === "bbc12345") {
        req.session.isLoggedIn = true
        return res.json({code: 1, message: "Berhasil masuk ke admin panel!"})
    } else
        return res.json({code: 0, message: "Email atau password salah!"})
})

router.use(auth)

router.get('/', (req, res) => {
    return res.render('index', {pageTitle: 'All of it just works'});
});

module.exports = router;