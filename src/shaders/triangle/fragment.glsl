precision mediump float;


//Receive value from js
// uniform float uOpacity;
uniform float uOpacity;
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;

//Receive value from vertex
varying vec2 vUv;

            void main()
            {

                vec3 color = (uColorA * vUv.x) + (uColorB * (1.0-vUv.x));
                gl_FragColor = vec4(color, uOpacity);

            }