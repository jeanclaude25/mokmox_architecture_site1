import { trianglesFloat } from "./j_animation"
import { canvas } from "./c_scene"
import { checkVisible } from "./l_objects"
import { updateTween, updateTweenMobile } from "./m_tween"



        const disable = () => {
            // To get the scroll position of current webpage
            const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
            const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;

            // if scroll happens, set it to the previous value
            window.scrollTo(LeftScroll, TopScroll);
        }

        const enable = () => {
            window.onscroll =  () => { };
        }

        const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

        const preventDefault = (e) => e.preventDefault()
        

        const preventDefaultForScrollKeys = (e) => {
            if (keys[e.keyCode]) {
                preventDefault(e);
                return false;
            }
        }

        // modern Chrome requires { passive: false } when adding event
        const supportsPassive = false;
        try {
            window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
                get: () => { supportsPassive = true; }
            }));
        } catch (e) { }
        
        const wheelOpt = supportsPassive ? { passive: false } : false;
        const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

        // call this to Disable
        const disableScroll = () => {
            window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop

            window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
            window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
            window.addEventListener('keydown', preventDefaultForScrollKeys, false);
        }

        // call this to Enable
        export const enableScroll = () => {
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
            window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
            window.removeEventListener('touchmove', preventDefault, wheelOpt);
            window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
        }


        

        

        export const scrollingLogic = (e) => {
            if (checkVisible(canvas, window.innerHeight, 'above') && !trianglesFloat) {
                disableScroll()
                canvas.scrollIntoView(false)
            }
        }

        window.addEventListener('scroll', scrollingLogic)
        window.addEventListener('touchmove', scrollingLogic)

        // document.body.addEventListener('wheel', updateTween)
        // document.body.addEventListener('DOMMouseScroll', updateTween); // older FF
        // document.body.addEventListener('touchmove', updateTweenMobile); // mobile
        // document.body.addEventListener('keydown', updateTween);

        window.addEventListener('wheel', updateTween)
        window.addEventListener('DOMMouseScroll', updateTween); // older FF
        window.addEventListener('touchmove', updateTweenMobile); // mobile
        window.addEventListener('keydown', updateTween);
