var app = new Vue({
    el: '#form-vendor',
    data: {
        sideBarIndex: 0,
        defaultImage: "",
        defaultPackageImage: "",
        defaultCategoryImage: "",
        defaultSubCategoryImage: "",
        isLoadingPackage: true,
        addPackageMode: false,
        addCategoryMode: false,
        addSubCategoryMode: false,
        index: 0,
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
        formSubCategory: {
            _id: null,
            category_id: null,
            items: [],
            name: "",
            price: "",
            image: null
        },
        package: [],
        subcategory: []
    }, //enddata
    methods: {
        //Vendor Area
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
        //Package Area
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
        togglePackageMode: function (status) {
            this.onCancelPackage()
            document.getElementById("packagetitle").innerHTML = "Tambah Package Baru"
            this.addPackageMode = status
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
            this.defaultPackageImage = ""
            document.getElementById("labelphotopackage").innerHTML = "Pilih File"
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
        onDeletePackage: async function () {
            toastr.info("Sedang Menghapus, harap tunggu...")
            try {
                let formData = {...this.formPackage}
                const result = await fetch('/api/package', {
                    method: 'DELETE',
                    body: JSON.stringify(formData),
                    headers: {'Content-Type': "application/json"}
                })
                const data = await result.json()
                if (data.code === 1) {
                    toastr.success(data.message)
                    this.loadPackage()
                    this.onCancelPackage()
                } else
                    toastr.error(data.message)
            } catch (e) {
                toastr.error("Terjadi kesalahan!")
                console.log(e)
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
        //Category Area
        categoryValidation: function () {
            let status = false
            if (this.formCategory.name === "")
                status = true
            if (this.formCategory.price === "" || isNaN(this.formCategory.price))
                status = true
            return status
        },
        toggleCategoryMode: function (status) {
            this.onCancelCategory()
            document.getElementById("categorytitle").innerHTML = "Tambah Kategori Baru"
            this.addCategoryMode = status
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
        onCancelCategory: function () {
            this.addCategoryMode = false
            this.formCategory.id = null
            this.formCategory.name = ""
            this.formCategory.price = ""
            this.formCategory.image = null
            this.defaultCategoryImage = ""
            this.index = 0
            document.getElementById("labelphotocategory").innerHTML = "Pilih File"
        },
        onSelectCategory: function (index) {
            this.onCancelCategory()
            this.index = index
            document.getElementById("categorytitle").innerHTML = "Ubah Data Kategori"
            this.formCategory.id = this.form.category[index].id
            this.formCategory.name = this.form.category[index].name
            this.formCategory.price = this.form.category[index].price
            if (this.form.category[index].image) {
                this.formCategory.image = this.form.category[index].image
                this.defaultCategoryImage = this.form.category[index].image
                document.getElementById("labelphotocategory").innerHTML =
                    this.form.category[index].image.substring(1, this.form.category[index].image.length)
            }
            this.addCategoryMode = true
            window.scrollTo(0, 0)
        },
        onSaveCategory: async function () {
            const status = this.categoryValidation()
            if (status) {
                toastr.warning("Harap isi semua form isian yang wajib diisi!")
                return
            }
            if (this.formCategory.id === null) {
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
                    this.loadVendor()
                }
            } else {
                if (this.formCategory.image !== null && this.formCategory.image !== this.defaultCategoryImage)
                    this.formCategory.image = await this.photoUpload("Category")
                this.form.category[this.index] = this.formCategory
                const insert = await this.onUpdate()
                if (insert.code === 0)
                    toastr.error(insert.message)
                else {
                    toastr.success(insert.message)
                    this.onCancelCategory()
                    this.loadVendor()
                }
            }
        },
        onDeleteCategory: async function () {
            this.form.category.splice(this.index, 1)
            const onDelete = await this.onUpdate()
            if (onDelete.code === 0)
                toastr.error(onDelete.message)
            else {
                toastr.success("Berhasil Menghapus Kategori!")
                this.onCancelCategory()
                this.loadVendor()
            }
        },
        //SubCategory Area
        subCategoryValidation: function () {
            let status = false
            if (this.formSubCategory.name === "")
                status = true
            if (this.formSubCategory.price === "" || isNaN(this.formSubCategory.price))
                status = true
            return status
        },
        loadSubCategory: async function (event) {
            if (event.target.value === undefined) return
            try {
                const category_id = event.target.value
                this.formSubCategory.category_id = category_id
                const result = await fetch(`/api/sub-category/${category_id}`)
                const data = await result.json()
                this.subcategory = data.result
            } catch (e) {
                toastr.error("Terjadi kesalahan saat memuat Sub-Category!")
                console.log(e)
            }
        },
        onCancelSubCategory: function () {
            this.addSubCategoryMode = false
            this.formSubCategory._id = null
            this.formSubCategory.name = ""
            this.formSubCategory.price = ""
            this.formSubCategory.image = null
            this.defaultSubCategoryImage = ""
            document.getElementById("labelphotosubcategory").innerHTML = "Pilih File"
        },
        onSelectSubCategory: function (index) {
            this.onCancelSubCategory()
            this.index = index
            document.getElementById("subcategorytitle").innerHTML = "Ubah Data Kategori"
            this.formSubCategory._id = this.subcategory[index]._id
            this.formSubCategory.name = this.subcategory[index].name
            this.formSubCategory.price = this.subcategory[index].price
            if (this.subcategory[index].image) {
                this.formSubCategory.image = this.subcategory[index].image
                this.defaultSubCategoryImage = this.subcategory[index].image
                document.getElementById("labelphotosubcategory").innerHTML =
                    this.subcategory[index].image.substring(1, this.subcategory[index].image.length)
            }
            this.addCategoryMode = true
            window.scrollTo(0, 0)
        },
        toggleSubCategoryMode: function (status) {
            this.onCancelSubCategory()
            document.getElementById("subcategorytitle").innerHTML = "Tambah Sub-Kategori Baru"
            this.addSubCategoryMode = status
        },
        onSaveSubCategory: async function () {
            const status = this.subCategoryValidation()
            if (status) {
                toastr.warning("Harap isi semua form isian yang wajib diisi!")
                return
            }
            toastr.info("Harap Tunggu...")
            try {
                if (this.formSubCategory._id === null) {
                    let formData = {...this.formSubCategory}
                    if (formData.image !== null)
                        formData.image = await this.photoUpload("SubCategory")
                    console.log(formData)
                    const result = await fetch('/api/sub-category', {
                        method: 'POST',
                        body: JSON.stringify(formData),
                        headers: {'Content-Type': "application/json"}
                    })
                    const data = await result.json()
                    const code = data.code
                    const message = data.message
                    if (code === 1) {
                        toastr.success(message)
                        this.onCancelSubCategory()
                        const result = await fetch(`/api/sub-category/${this.formSubCategory.category_id}`)
                        const data = await result.json()
                        this.subcategory = data.result
                    } else
                        toastr.error(message)
                } else {

                }
            } catch (e) {
                console.log(e)
            }
        },
        onSubCategoryImageChange: function (e) {
            try {
                let [file] = e.target.files
                if (!file)
                    throw Error("File tidak dipilih")
                this.formSubCategory.image = file
                document.getElementById("labelphotosubcategory").innerHTML = this.formSubCategory.image.name;
            } catch (error) {
                console.log(error)
            }
        },
        //Others Area
        generateID: function () {
            return Math.floor(Math.random() * Date.now())
        },
        setSideBarIndex: function (index) {
            this.sideBarIndex = index
            console.log(this.sideBarIndex)
        },
        activeSideBarIndex: function (idx) {
            return this.sideBarIndex === idx
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
                else if (type === "SubCategory")
                    formData.append('file', this.formSubCategory.image)
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
        this.loadVendor()
        this.loadPackage()
    }, //endMounted
    components: {
        'tinymce': VueEasyTinyMCE
    }
})