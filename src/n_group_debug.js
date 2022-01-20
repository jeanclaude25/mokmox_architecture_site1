import { config } from "./a_config";
import { myScene, myScene2, otherGroup, tGroup } from "./c_scene";



setTimeout(()=>{

/**FOR DEBUG */
if(window.location.href.includes(config.debug.commandLine)){ 
    
    const gui = require('./a_gui')
/**
 * gui.gui
 */
const camgui = gui.gui.addFolder('Scene Groups')
camgui.add(myScene, 'visible').name('myScene')
camgui.add(myScene2, 'visible').name('myScene2')
camgui.add(otherGroup, 'visible').name('otherGroup')
camgui.add(tGroup, 'visible').name('tGroup')


}


},5000)





