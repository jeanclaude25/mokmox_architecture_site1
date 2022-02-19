import { create_background } from './p_background';
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
        // create_background()
    }, 1000);

}

