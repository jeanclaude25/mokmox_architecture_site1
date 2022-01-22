
varying vec2 vUv;

//Receive value from js
uniform float uOpacity;
uniform vec3 uColor;

            void main()
            {
                gl_FragColor = vec4(vUv.x , vUv.y, vUv.x, 1.0);
            }