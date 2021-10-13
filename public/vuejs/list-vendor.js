var app = new Vue({
    el: '#list-vendor',
    data: {
        listVendor: []
    }, //endata
    methods: {
        loadVendor: async function () {
            const result = await fetch('/api/vendor')
            const data = await result.json()
            if (data.code === 1)
                this.listVendor = data.data
            else
                toastr.error("Terjadi kesalahan saat memuat daftar vendor!")
        }
    }, //endmethods
    mounted() {
        this.loadVendor()
    }// endmounted
})