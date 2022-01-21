

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
        texts:['CAREERS', 'CLIENTS', 'BROCHURES', 'CONTACTS', 'ABOUT+US', 'NEWS', 'GALLERY', 'OUR+WORK']
    },
    onHover:{
        enable: true,
        enableChangeColor: true,
        defaultColor:'grey',
        hoverColor:'red',
        time:0.5
    },
    debug:{
        commandLine:'?debug'
    }

}


