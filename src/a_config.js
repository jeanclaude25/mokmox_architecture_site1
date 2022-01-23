

export const config = {
    html:{
        canvas:'#container'
    },
    scene:{
        antialias:{
            enable: true
        },
        alpha: true,
        pixelRatio: 2

    },
    camera:{
        fov:5
    },
    responsive:{
        resizeTime:1
    },
    assets:{
        defaultColor:'grey',
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
        enableLightEffect: true,
        lightEffectColor: 'blue',
        enableRails : true,
        hoverColor:'white',
        time:0.5,
        timeForLine:0.4,
        lineThickness: 0.1
    },
    debug:{
        commandLine:'?debug'
    }

}


