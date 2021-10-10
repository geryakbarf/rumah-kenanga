var app = new Vue({
    el: '#form-login',
    data: {
        form :{
            email: "",
            password: ""
        }
    },//enddata
    methods: {
        inputVerification: function () {
            let status = false
            if (this.form.email == null || this.form.email === "")
                status = true
            if (this.form.password == null || this.form.password === "")
                status = true
            return status
        },
        login: async function () {
            if (this.inputVerification()) {
                toastr.warning("Email dan password tidak boleh kosong!")
                return
            }
            toastr.info("Harap tunggu...")
            console.log(this.form)
            const result = await fetch('/admin/login', {
                method: 'POST',
                body: JSON.stringify(this.form),
                headers: {'Content-Type': "application/json"}
            })
            const data = await result.json()
            this.checkLoginResponse(data)
        },
        checkLoginResponse: function (data) {
            if (data.code === 0) {
                toastr.error(data.message)
                return
            } else {
                toastr.success(data.message)
                let context = this
                setTimeout(() => {
                    window.removeEventListener('beforeunload', context.leaving, true)
                    window.location = "/admin";
                }, 1000);
            }
        }
    } //endmethods
})