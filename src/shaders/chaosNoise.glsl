uniform float u_time;
uniform vec2 u_resolution;
uniform float u_t;

varying vec2 vUv;

// Simple noise function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 st = vUv;
    
    // Create chaotic noise pattern
    float noise = random(st * 10.0 + u_time * 0.5);
    float noise2 = random(st * 20.0 - u_time * 0.3);
    
    vec3 color = vec3(noise * noise2);
    color = mix(color, vec3(1.0, 0.0, 0.5), u_t * 0.3);
    
    gl_FragColor = vec4(color, 1.0);
}
