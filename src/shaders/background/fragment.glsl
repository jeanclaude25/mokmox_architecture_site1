// Author @patriciogv - 2015 - patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 uResolution;
uniform float uFrequency;
uniform float u_time;

varying vec2 vUv;

vec2 skew (vec2 st) {
    vec2 r = vec2(0.0);
    r.x = 1.1547*st.x;
    r.y = st.y+0.5*r.x;
    return r;
}

vec3 simplexGrid (vec2 st) {
    vec3 xyz = vec3(0.0);

    vec2 p = fract(skew(st));
    if (p.x > p.y) {
        xyz.xy = 1.0-vec2(p.x,p.y-p.x);
        xyz.z = p.y;
    } else {
        xyz.yz = 1.0-vec2(p.x-p.y,p.y);
        xyz.x = p.x;
    }

    return fract(xyz);
}

float noise(vec3 p)
{
	vec3 ip=floor(p) ;
    p-=ip; 
    vec3 s=vec3(u_time,157,113);
    vec4 h=vec4(0.,s.yz,s.y+s.z)+dot(ip,s);
    p=p*p*(3.-2.*p); 
    h=mix(fract(sin(h)*43758.5),fract(sin(h+s.x)*43758.5),p.x);
    h.xy=mix(h.xz,h.yw,p.y);
    return mix(h.x,h.y,p.z); 
}

void main() {
    vec2 st = vUv.xy * uResolution.xy;
    vec3 color = vec3(0.0);

    // Scale the space to see the grid
    st *= 10.;

    // Show the 2D grid
    // color.rg = fract(st);

    // Skew the 2D grid
    // color.rg = fract(skew(st));

    // Subdivide the grid into to equilateral triangles
    color = simplexGrid(st);
    float val = 0.0;
    val = noise(vec3(st.x,st.y,u_time));
    gl_FragColor = vec4(val,val,val,.1);
}