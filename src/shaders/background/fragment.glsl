// Author @patriciogv - 2015 - patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tBackground;
uniform vec2 uResolution;
uniform float uScale;
uniform float uTime;
uniform vec3 uColMult;
uniform float uAlpha;
uniform float uHaloIntensity;
uniform vec2 uHaloSize;


varying vec2 vUv;

float circle(vec2 position){
    return  length((position - vec2(.5)) * uHaloSize) * uHaloIntensity;
}

float noise(vec3 p)
{
	vec3 ip=floor(p) ;
    p-=ip; 
    vec3 s=vec3(uTime,157 ,113);
    vec4 h=vec4(0.,s.yz,s.y+s.z)+dot(ip,s) ;
    p= p*p*(3.-2.*p); 
    h=mix(fract(sin(h)*43758.5 ),fract(sin(h+s.x)*43758.5),p.x);
    h.xy=mix(h.xz,h.yw,p.y);
    return mix(h.x,h.y,p.z); 
}

void main() {
    vec2 st = vUv.xy * uResolution.xy;
    vec3 color = vec3(0.0);
    // Scale the space to see the grid
    st *= uScale;

    float val = 0.0;
    val = noise(vec3(st.x,st.y,uTime ));

    vec3 final = vec3(val) * (1.0-circle(vUv.xy));

    gl_FragColor = vec4(final * uColMult, uAlpha);
}