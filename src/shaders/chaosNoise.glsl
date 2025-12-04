uniform float u_time;
uniform vec2 u_resolution;
uniform float u_t;

varying vec2 vUv;

// Hash function for pseudo-random values
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// 2D noise function
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fractal Brownian Motion for chaotic layered noise
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 5; i++) {
        value += amplitude * noise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 st = vUv;
    
    // Create chaotic movement
    vec2 offset = vec2(
        fbm(st * 3.0 + u_time * 0.3),
        fbm(st * 3.0 + u_time * 0.3 + 100.0)
    );
    
    // Multi-layered noise for chaos
    float n1 = fbm(st * 5.0 + offset + u_time * 0.5);
    float n2 = fbm(st * 8.0 - offset + u_time * 0.3);
    float n3 = fbm(st * 12.0 + u_time * 0.7);
    
    // Mix noises with chaotic patterns
    float chaos = n1 * n2 + n3 * 0.5;
    chaos = pow(chaos, 1.5);
    
    // Color scheme evolves with u_t
    vec3 color1 = vec3(1.0, 0.2, 0.5);  // Hot pink
    vec3 color2 = vec3(0.8, 0.0, 0.8);  // Purple
    vec3 color3 = vec3(1.0, 0.5, 0.0);  // Orange
    
    vec3 color = mix(color1, color2, chaos);
    color = mix(color, color3, sin(u_t * 3.14159) * 0.5 + 0.5);
    color *= chaos;
    
    // Add some brightness variation
    color += vec3(0.1) * sin(u_time * 2.0 + st.x * 10.0) * sin(u_time * 1.5 + st.y * 10.0);
    
    gl_FragColor = vec4(color, 1.0);
}
