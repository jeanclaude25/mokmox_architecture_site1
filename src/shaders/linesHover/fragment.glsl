precision mediump float;


//Receive value from js
uniform float uSizeRail;
uniform float uModulo;
uniform float uOpacity;
uniform float uTime;
uniform float uRotation;
uniform vec3 uColor;
uniform float uMultiplier;

//Receive value from vertex
varying vec2 vUv;

float PI = 3.1415;

            void main()
            {
                float mid = 0.35;
                float finalRotation = (uTime * uMultiplier) + uRotation;
                vec2 rotated = vec2(
                    cos(finalRotation) * (vUv.x - mid) + sin(finalRotation) * (vUv.y - mid) + mid, 
                    cos(finalRotation) * (vUv.y - mid) - sin(finalRotation) * (vUv.x - mid) + mid);

                float angle = atan(rotated.x - 0.35, rotated.y -0.35);
                angle /= PI * uSizeRail;
                angle += 0.5;
                angle *= 10.0;
                angle = mod(angle, uModulo);
                float strenght = angle;
                strenght = 1.0 - strenght;
                vec3 color = vec3(strenght, strenght, strenght)* uColor;
                float opacity = strenght * uOpacity;
                gl_FragColor = vec4(color, opacity);

            }