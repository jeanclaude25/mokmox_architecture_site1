precision mediump float;


//Receive value from js
uniform float uOpacity;
uniform float uSizeRail;

uniform float uTime;
uniform float uRotation;
uniform vec3 uColor;

//Receive value from vertex
varying vec2 vUv;

float PI = 3.145;

            void main()
            {
                float mid = 0.35;
                float finalRotation = uTime + uRotation;
                vec2 rotated = vec2(
                    cos(finalRotation) * (vUv.x - mid) + sin(finalRotation) * (vUv.y - mid) + mid, 
                    cos(finalRotation) * (vUv.y - mid) - sin(finalRotation) * (vUv.x - mid) + mid);

                float angle = atan(rotated.x - 0.35, rotated.y -0.35);
                angle /= PI * uSizeRail;
                angle += 0.5;
                angle *= 10.0;
                angle = mod(angle, 5.5);
                float strenght = angle;
                float opacity = (1.0 - strenght) * uOpacity;
                strenght = 1.0 - strenght;
                vec3 color = vec3(strenght, strenght, strenght)* uColor;
                gl_FragColor = vec4(color, opacity);
                // gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);

            }