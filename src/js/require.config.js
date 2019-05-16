require({
    baseUrl:"/",
    paths :{
        "jquery":"libs/jquery/jquery-3.2.1",
        "header" :"js/module/header",
        "footer" : "js/module/footer",
        "url" :"js/module/url",
        "template":"libs/art-template/template-web",
        "zoom":"libs/jquery-Plugins/jquery.elevateZoom-3.0.8.min",
        "swiper" : "libs/swiper/js/swiper",
        "cookie" :"libs/jquery-plugins/jquery.cookie"

    },
    //垫片  给不满足AMD的插件又要依赖其他模块
    shim:{
        "zoom":{
            deps :['jquery']
        },
        "cookie":{
            deps :['jquery']
        }
    }


})