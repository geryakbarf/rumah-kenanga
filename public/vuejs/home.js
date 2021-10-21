var app = new Vue({
    el: '#home',
    data: {
        source: "https://kuula.co/share/NG13P?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
        gambar1: "https://kuula.co/share/7rt99/collection/7YykL?fs=1&vr=1&zoom=1&sd=1&initload=0&thumbs=1&info=0&logo=1&logosize=162",
        gambar2: "https://kuula.co/share/NG13P?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
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
                this.source = this.gambar1
            } else {
                this.source = this.gambar2
            }
        }
    },//endmethod
    mounted() {
    }
})