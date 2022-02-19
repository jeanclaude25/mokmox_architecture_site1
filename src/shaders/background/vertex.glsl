varying vec2 vUv;

        void main()
        {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            //move your object here
            
            vec4 viewPosition = viewMatrix * modelPosition;
            //move the view here
            
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;

            vUv = uv;
        }