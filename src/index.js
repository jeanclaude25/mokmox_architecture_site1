import './style.css'


window.onload = () => {

    setTimeout( () => {
        const render = require('./i_draw').render
        const callNextFunction = require('./m_tween').callNextFunction
        
        const events = require('./k_events').events
        const create_logo = require('./l_logo').createLogo

        create_logo();
        render();
        callNextFunction()
        events()
        const updt_tris = require('./j_animation').updateBoxesPosition
        updt_tris()
    }, 1000);

}

