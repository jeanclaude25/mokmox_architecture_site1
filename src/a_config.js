

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
    responsive:{
        resizeTime:1
    },
    assets:{
        texts:['CAREERS', 'CLIENTS', 'BROCHURES', 'CONTACTS', 'ABOUT+US', 'NEWS', 'GALLERY', 'OUR+WORK']
    },
    onHover:{
        enableChangeColor: !false,
        defaultColor:'grey',
        hoverColor:'red'
    },
    debug:{
        commandLine:'?debug'
    }

}


