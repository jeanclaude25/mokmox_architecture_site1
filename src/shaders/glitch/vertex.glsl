        varying vec2 vUv;


float rectShape(vec2 position, vec2 scale){
    scale = vec2(0.5) - scale * 0.5;
    vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));
    shaper *= vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));
    return shaper.x * shaper.y;
}

        void main()
        {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            
            //move your object here
            
            vec4 viewPosition = viewMatrix * modelPosition + rectShape(uv, vec2(2));

            //move the view here
            
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;
            vUv = uv;
        }