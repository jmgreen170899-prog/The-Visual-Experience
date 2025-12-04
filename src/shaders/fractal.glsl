uniform float u_time;
uniform vec2 u_resolution;
uniform float u_t;

varying vec2 vUv;

void main() {
    vec2 st = vUv;
    vec2 pos = st * 2.0 - 1.0;
    
    // Simple fractal-like pattern
    float d = length(pos);
    float a = atan(pos.y, pos.x);
    
    float pattern = sin(d * 10.0 - u_time) * cos(a * 5.0 + u_time);
    
    vec3 color = vec3(pattern * 0.5 + 0.5);
    color *= vec3(0.0, 1.0, 0.5);
    
    gl_FragColor = vec4(color, 1.0);
}
