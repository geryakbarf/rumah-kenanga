var app = new Vue({
    el: '#form-vendor',
    data: {
        sideBarIndex: 0,
        defaultImage: "",
        defaultPackageImage: "",
        defaultCategoryImage: "",
        isLoadingPackage: true,
        addPackageMode: false,
        addCategoryMode: false,
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
        },
        formPackage: {
            _id: null,
            vendorId: null,
            name: "",
            price: "",
            note: "",
            image: null,
            composition: ""
        },
        formCategory: {
            id: null,
            name: "",
            price: "",
            image: null
        },
        package: []
    }, //enddata
    methods: {
        checkResponse: function (data) {
            if (data.code === 0)
                toastr.error(data.message)
            else {
                toastr.success(data.message)
                let context = this
                if (this.form._id === null)
                    this.redirectToEditPage(context, data)
            }
        },
        redirectToEditPage: function (context, data) {
            setTimeout(() => {
                window.removeEventListener('beforeunload', context.leaving, true)
                window.location = "/admin/edit-vendor/" + data.id;
            }, 1000);
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
        packageValidation: function () {
            let status = false
            if (this.formPackage.name === "")
                status = true
            if (this.formPackage.price === "" || isNaN(this.formPackage.price))
                status = true
            if (this.formPackage.composition === "")
                status = true
            return status
        },
        categoryValidation: function () {
            let status = false
            if (this.formCategory.name === "")
                status = true
            if (this.formCategory.price === "" || isNaN(this.formCategory.price))
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
                const update = await this.onUpdate()
                this.checkResponse(update)
            }
        },
        onInsert: async function () {
            try {
                let formData = {...this.form}
                if (formData.image !== null)
                    formData.image = await this.photoUpload("Vendor")
                const result = await fetch('/api/vendor', {
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
        onUpdate: async function () {
            try {
                let formData = {...this.form}
                if (formData.image !== null && formData.image !== this.defaultImage)
                    formData.image = await this.photoUpload("Vendor")
                const result = await fetch('/api/vendor', {
                    method: 'PUT',
                    body: JSON.stringify(formData),
                    headers: {'Content-Type': "application/json"}
                })
                const data = await result.json()
                return Promise.resolve(data)
            } catch (e) {
                console.log(e)
                return Promise.reject(e)
            }
        },
        setSideBarIndex: function (index) {
            this.sideBarIndex = index
            console.log(this.sideBarIndex)
        },
        activeSideBarIndex: function (idx) {
            return this.sideBarIndex === idx
        },
        togglePackageMode: function (status) {
            this.onCancelPackage()
            document.getElementById("packagetitle").innerHTML = "Tambah Package Baru"
            this.addPackageMode = status
        },
        toggleCategoryMode: function (status) {
            this.onCancelPackage()
            document.getElementById("categorytitle").innerHTML = "Tambah Kategori Baru"
            this.addCategoryMode = status
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
        photoUpload: async function (type) {
            try {
                let formData = new FormData();
                if (type === "Vendor")
                    formData.append('file', this.form.image)
                else if (type === "Package")
                    formData.append('file', this.formPackage.image)
                else if (type === "Category")
                    formData.append('file', this.formCategory.image)
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
        },
        loadVendor: async function () {
            try {
                if (vendorID) {
                    this.form._id = vendorID
                    const result = await fetch(`/api/vendor/${this.form._id}`)
                    const data = await result.json()
                    this.form = data.data
                    //Pengubahan data gambar
                    if (data.data.image) {
                        document.getElementById("labelphoto").innerHTML = data.data.image.substring(1, data.data.image.length);
                        this.defaultImage = data.data.image
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
        onPackageImageChange: function (e) {
            try {
                let [file] = e.target.files
                if (!file)
                    throw Error("File tidak dipilih")
                this.formPackage.image = file
                document.getElementById("labelphotopackage").innerHTML = this.formPackage.image.name;
            } catch (error) {
                console.log(error)
            }
        },
        onCategoryImageChange: function (e) {
            try {
                let [file] = e.target.files
                if (!file)
                    throw Error("File tidak dipilih")
                this.formCategory.image = file
                document.getElementById("labelphotocategory").innerHTML = this.formCategory.image.name;
            } catch (error) {
                console.log(error)
            }
        },
        loadPackage: async function () {
            try {
                if (vendorID) {
                    this.formPackage.vendorId = vendorID
                    const result = await fetch(`/api/package/${this.form._id}`)
                    const data = await result.json()
                    this.package = data.data
                    this.isLoadingPackage = false
                }
            } catch (e) {
                console.log(e)
            }
        },
        onCancelPackage: function () {
            this.addPackageMode = false
            this.formPackage._id = null
            this.formPackage.name = ""
            this.formPackage.price = ""
            this.formPackage.image = null
            this.formPackage.composition = ""
            this.formPackage.note = ""
            document.getElementById("labelphotopackage").innerHTML = "Pilih File"
        },
        onCancelCategory: function () {
            this.addCategoryMode = false
            this.formCategory.id = null
            this.formCategory.name = ""
            this.formCategory.price = ""
            this.formCategory.image = null
            document.getElementById("labelphotocategory").innerHTML = "Pilih File"
        },
        onSelectPackage: function (index) {
            this.onCancelPackage()
            this.isLoadingPackage = true
            document.getElementById("packagetitle").innerHTML = "Ubah Data Package"
            this.formPackage._id = this.package[index]._id
            this.formPackage.name = this.package[index].name
            this.formPackage.price = this.package[index].price
            this.formPackage.note = this.package[index].note
            this.formPackage.composition = this.package[index].composition
            if (this.package[index].image) {
                this.formPackage.image = this.package[index].image
                this.defaultPackageImage = this.package[index].image
                document.getElementById("labelphotopackage").innerHTML =
                    this.package[index].image.substring(1, this.package[index].image.length)
            }
            this.isLoadingPackage = false
            this.addPackageMode = true
            window.scrollTo(0, 0)
        },
        onSaveCategory: async function () {
            const status = this.categoryValidation()
            if (status) {
                toastr.warning("Harap isi semua form isian yang wajib diisi!")
                return
            }
            this.formCategory.id = this.generateID()
            if (this.formCategory.image !== null)
                this.formCategory.image = await this.photoUpload("Category")
            this.form.category.push(this.formCategory)
            const insert = await this.onUpdate()
            if (insert.code === 0)
                toastr.error(insert.message)
            else {
                toastr.success(insert.message)
                this.onCancelCategory()
            }
        },
        onSavePackage: async function () {
            const status = this.packageValidation()
            if (status) {
                toastr.warning("Harap isi semua form isian yang wajib diisi!")
                return
            }
            toastr.info("Harap tunggu...")
            if (this.formPackage._id === null) {
                const insert = await this.onInsertPackage()
                if (insert.code === 0)
                    toastr.error(insert.message)
                else {
                    toastr.success(insert.message)
                    this.onCancelPackage()
                    this.loadPackage()
                }
            } else {
                const update = await this.onUpdatePackage()
                if (update.code === 0)
                    toastr.error(update.message)
                else {
                    toastr.success(update.message)
                    this.onCancelPackage()
                    this.loadPackage()
                }
            }
        },
        onInsertPackage: async function () {
            try {
                let formData = {...this.formPackage}
                if (formData.image !== null)
                    formData.image = await this.photoUpload("Package")
                const result = await fetch('/api/package', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {'Content-Type': "application/json"}
                })
                const data = await result.json()
                return Promise.resolve(data)
            } catch (e) {
                console.log(e)
                return Promise.reject(e)
            }
        },
        onUpdatePackage: async function () {
            try {
                let formData = {...this.formPackage}
                if (formData.image !== null && formData.image !== this.defaultPackageImage)
                    formData.image = await this.photoUpload("Package")
                const result = await fetch('/api/package', {
                    method: 'PUT',
                    body: JSON.stringify(formData),
                    headers: {'Content-Type': "application/json"}
                })
                const data = await result.json()
                return Promise.resolve(data)
            } catch (e) {
                console.log(e)
                return Promise.reject(e)
            }
        },
        generateID: function () {
            return Math.floor(Math.random() * Date.now())
        }
    }, //endmethods
    mounted() {
        this.loadVendor()
        this.loadPackage()
    }, //endMounted
    components: {
        'tinymce': VueEasyTinyMCE
    }
})