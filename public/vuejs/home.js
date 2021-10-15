var app = new Vue({
    el: '#home',
    data: {
        gambar1: "https://pannellum.org/images/cerro-toco-0.jpg",
        gambar2: "https://pannellum.org/images/alma.jpg",
        gambarLoad: "https://pannellum.org/images/cerro-toco-0.jpg"
    },//enddata
    methods: {
        load360: async function () {
            console.log("Testing")
            pannellum.viewer('360', {
                "type": "equirectangular",
                "panorama": this.gambarLoad,
                "autoLoad": true
            })
        },
        gantigambar: function (params) {
            if (params === 1) {
             this.gambarLoad = this.gambar1
             this.load360()
            } else{
                this.gambarLoad = this.gambar2
                this.load360()
            }
        }
    },//endmethod
    mounted() {
        this.load360()
    }
})