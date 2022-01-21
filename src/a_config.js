

export const config = {
    html:{
        canvas:'#container'
    },
    scene:{
        antialias:{
            enable: true
        },
        alpha: true,
        pixelRatio: 1

    },
    camera:{
        fov:6
    },
    responsive:{
        resizeTime:1
    },
    assets:{
        defaultColor:'white',
        texts:['CAREERS', 'CLIENTS', 'BROCHURES', 'CONTACTS', 'ABOUT+US', 'NEWS', 'GALLERY', 'OUR+WORK'],
        links:[
            'https://profilerz.mokmo.solutions/career/',
            'https://profilerz.mokmo.solutions/clients/',
            'https://profilerz.mokmo.solutions/brochures-demo-reels/',
            'https://profilerz.mokmo.solutions/contact-us/',
            'https://profilerz.mokmo.solutions/about-us/',
            'https://profilerz.mokmo.solutions/portfolio/',
            'https://profilerz.mokmo.solutions/news/',
            'https://profilerz.mokmo.solutions/movies/'
            ]
    },
    onHover:{
        enable: true,
        enableChangeColor: true,
        hoverColor:'red',
        time:0.5
    },
    debug:{
        commandLine:'?debug'
    }

}


