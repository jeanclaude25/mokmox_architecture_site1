

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
        fov:{
            mobile:5,
            pc:5
        }
        
    },
    responsive:{
        resizeTime:1
    },
    assets:{
        enableTriangleAnim: !false,
        defaultColor:'grey',
        textSize: 10 ,
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
        time:0.5,
        timeForLine:0.4,
        lineThickness: 0.05,
        glitchTime: 0.3,
        color:{
            line:'blue',
            gradientA:'#939393',
            gradientB:'#2e363a'
        },
        colorHover:{
            gradientA:'#2e363a',
            gradientB:'#939393'
        }
    },
    debug:{
        commandLine:'?debug'
        }

}