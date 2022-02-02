precision mediump float;

uniform sampler2D tDiffuse;
//Receive value from js
uniform float uTime;

//rect move
uniform vec2 uPosRect;
uniform vec2 uScRect;
uniform vec2 uDephRect;


varying vec2 vUv;

float rectShape(vec2 position, vec2 scale){
    scale = vec2(0.5) - scale * 0.5;
    vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));
    shaper *= vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));
    return shaper.x * shaper.y;
}
float random2d(vec2 coord){
    return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

            void main()
            {
                float rect = rectShape(vec2(vUv.x + uPosRect.x, vUv.y + uPosRect.y), vec2(uScRect.x, uScRect.y));
                float rectP = rectShape(vec2(vUv.x + uPosRect.x + uDephRect.x, vUv.y + uPosRect.y + uDephRect.y), vec2(uScRect.x, uScRect.y));

                

                vec2 newUvPlus = vec2(vUv.x + uDephRect.x + sin(uTime)/10.0, vUv.y + uDephRect.y);
                float random = random2d(vec2(uTime,uTime));
                newUvPlus.x += random/100.0;
                vec4 color = texture2D(tDiffuse, newUvPlus) * rect;
                
                vec4 colorM = texture2D(tDiffuse, vUv);

                
                vec4 trou =  colorM * (1.0-rect) ;
                vec4 piece = color;
                vec4 final =  trou + piece ;

                final.r -= 0.1 ;
                float alpha = final.r * final.g * final.b;

                gl_FragColor = vec4(final.rgb, alpha);

            }