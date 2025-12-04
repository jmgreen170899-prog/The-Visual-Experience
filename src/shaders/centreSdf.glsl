uniform float u_time;
uniform vec2 u_resolution;
uniform float u_t;

varying vec2 vUv;

void main() {
    vec2 st = vUv;
    vec2 pos = st * 2.0 - 1.0;
    
    // Simple SDF for center
    float d = length(pos);
    float circle = smoothstep(0.5, 0.48, d);
    
    float pulse = sin(u_time * 2.0) * 0.1 + 0.9;
    circle *= pulse;
    
    vec3 color = vec3(circle);
    
    gl_FragColor = vec4(color, 1.0);
}
