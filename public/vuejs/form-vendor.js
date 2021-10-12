var app = new Vue({
    el: '#form-vendor',
    data: {
        sideBarIndex: 0,
        form: {
            _id: null,
            name: "",
            type: "",
            instagram: "",
            youtube: "",
            web: "",
            phone: "",
            image: null,
            category: []
        }
    }, //enddata
    methods: {
        checkResponse: function (data) {
            if (data.code === 0)
                toastr.error(data.message)
            else {
                toastr.success(data.message)
                let context = this
                setTimeout(() => {
                    window.removeEventListener('beforeunload', context.leaving, true)
                    window.location = "/admin/edit-vendor/" + data.id;
                }, 1000);
            }
        },
        validation: function () {
            let status = false
            if (this.form.name === "")
                status = true
            if (this.form.type === "")
                status = true
            if (this.form.phone === "" || isNaN(this.form.phone))
                status = true
            return status
        },
        onSave: async function () {
            if (this.validation()) {
                toastr.warning("Harap isi semua form yang wajib diisi!")
                return
            }
            toastr.info("Harap tunggu....")
            if (this.form._id === null) {
                const insert = await this.onInsert()
                this.checkResponse(insert)
            } else {
                //TODO Ketika pengguna mengupdate data vendor
            }
        },
        onUpdate: async function () {

        },
        onInsert: async function () {
            try {
                let formData = {...this.form}
                if (formData.image !== null)
                    formData.image = await this.photoUpload()
                const result = await fetch('/api/insert-vendor', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {'Content-Type': "application/json"}
                })
                const data = await result.json()
                return Promise.resolve(data)
            } catch (error) {
                console.log(error)
                return Promise.reject(error)
            }
        },
        setSideBarIndex: function (index) {
            this.sideBarIndex = index
            console.log(this.sideBarIndex)
        },
        activeSideBarIndex: function (idx) {
            return this.sideBarIndex === idx
        },
        onPhotoChange: function (e) {
            try {
                let [file] = e.target.files
                if (!file)
                    throw Error("File tidak dipilih")
                this.form.image = file
                document.getElementById("labelphoto").innerHTML = this.form.image.name;
            } catch (error) {
                console.log(error)
            }
        },
        photoUpload: async function () {
            try {
                let formData = new FormData();
                formData.append('file', this.form.image)
                const res = await fetch('/api/upload-image', {
                    method: 'POST',
                    body: formData
                });
                if (res.status != 200) throw Error("Upload photo gagal!");
                const data = await res.json();
                return Promise.resolve(data.path);
            } catch (err) {
                return Promise.reject(err);
            }
        }
    }, //endmethods
    mounted() {
        console.log(this.sideBarIndex)
    } //endMounted
})