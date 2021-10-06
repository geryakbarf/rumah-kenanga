module.exports = (app) => {
    app.use(require('./web'))
    app.use('/admin',require('./admin'))
    //404
    app.use((req,res) => {
        return res.render('404');
    })
}