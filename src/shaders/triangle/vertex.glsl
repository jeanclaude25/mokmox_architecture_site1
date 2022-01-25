        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;
        uniform mat4 modelViewMatrix;

        attribute float opacity;
        attribute vec2 uv;
        attribute vec3 position;

        varying vec2 vUv;
        varying float vOpacity;

        void main()
        {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            //move your object here
            
            vec4 viewPosition = viewMatrix * modelPosition;
            //move the view here
            
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;

            vUv = uv;
            vOpacity = opacity;
        }