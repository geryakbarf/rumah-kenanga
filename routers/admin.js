const express = require('express');
const router = express.Router();
const auth = require("../middleware/authentification");

router.get('/login', (req, res) => {
    const loadJS = [
        {src: "https://code.jquery.com/jquery-3.6.0.min.js"},
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
    const route = "Main"
    const loadJS = [
        {src: "https://code.jquery.com/jquery-3.6.0.min.js"},
        {src: "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"},
        {src: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0-rc/js/adminlte.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.39.0/js/tempusdominus-bootstrap-4.min.js"}
    ]
    const loadCSS = [
        {src: "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"}
    ]
    return res.render('admin/index', {title: 'Admin - Home', loadCSS, loadJS, route});
});

router.get('/vendor', (req, res) => {
    const route = "Main"
    const loadJS = [
        {src: "https://code.jquery.com/jquery-3.6.0.min.js"},
        {src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"},
        {src: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0-rc/js/adminlte.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"},
        {src: "/assets/vuejs/list-vendor.js"}
    ]
    const loadCSS = [
        {src: "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"}
    ]
    return res.render('admin/vendor', {title: 'Admin - Vendor', loadJS, loadCSS, route})
})

router.get('/tambah-vendor', (req, res) => {
    const route = "Sub"
    const loadJS = [
        {src: "https://code.jquery.com/jquery-3.6.0.min.js"},
        {src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"},
        {src: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0-rc/js/adminlte.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"},
        {src: "/assets/vuejs/form-vendor.js"}
    ]
    const loadCSS = [
        {src: "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"}
    ]
    return res.render('admin/tambah-vendor', {title: "Admin - Tambah Vendor", loadCSS, loadJS, route})
})

router.get('/edit-vendor/:id', (req, res) => {
    const route = "Sub"
    const id = req.params.id
    const loadJS = [
        {src: "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.7.4/tinymce.min.js"},
        {src: "https://code.jquery.com/jquery-3.6.0.min.js"},
        {src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"},
        {src: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0-rc/js/adminlte.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"},
        {src: "https://cdn.jsdelivr.net/npm/vue-easy-tinymce/dist/vue-easy-tinymce.min.js"},
        {src: "/assets/vuejs/form-vendor.js"}
    ]
    const loadCSS = [
        {src: "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"}
    ]
    return res.render('admin/edit-vendor', {title: "Admin - Tambah Vendor", loadCSS, loadJS, route, id})
})


module.exports = router;