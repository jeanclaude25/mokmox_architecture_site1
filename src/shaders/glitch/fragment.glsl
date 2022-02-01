precision mediump float;

uniform sampler2D tDiffuse;
//Receive value from js
uniform float uTime;

varying vec2 vUv;


            void main()
            {
                vec4 color = texture2D(tDiffuse, vUv);

                color.r -= 0.1 ;
                float alpha = color.r * color.g * color.b;

                gl_FragColor = vec4(color.rgb, alpha);

            }