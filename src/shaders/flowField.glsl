uniform float u_time;
uniform vec2 u_resolution;
uniform float u_t;

varying vec2 vUv;

// Hash for random values
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// 2D noise
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
    );
}

// Calculate flow field vector at a point
vec2 flowField(vec2 p) {
    float angle = noise(p * 2.0 + u_time * 0.2) * 6.28318;
    angle += noise(p * 4.0 - u_time * 0.1) * 3.14159;
    return vec2(cos(angle), sin(angle));
}

void main() {
    vec2 st = vUv * 2.0 - 1.0;
    st.x *= u_resolution.x / u_resolution.y;
    
    // Calculate flow at this position
    vec2 flow = flowField(st * 3.0);
    
    // Trace flow lines
    vec2 pos = st;
    float pattern = 0.0;
    
    for(int i = 0; i < 8; i++) {
        vec2 flowDir = flowField(pos * 3.0 + u_time * 0.3);
        pos += flowDir * 0.05;
        pattern += length(flowDir) * 0.125;
    }
    
    // Create ribbons based on flow direction
    float flowAngle = atan(flow.y, flow.x);
    float ribbons = sin(flowAngle * 5.0 + u_time) * 0.5 + 0.5;
    ribbons += cos(length(st) * 8.0 - u_time * 2.0) * 0.3;
    
    // Color based on flow intensity and direction
    vec3 color1 = vec3(0.0, 0.8, 1.0);  // Cyan
    vec3 color2 = vec3(0.0, 0.3, 0.8);  // Blue
    vec3 color3 = vec3(0.5, 1.0, 0.8);  // Light cyan
    
    vec3 color = mix(color1, color2, pattern);
    color = mix(color, color3, ribbons);
    
    // Add flow lines visualization
    float flowLines = smoothstep(0.02, 0.0, abs(sin(pattern * 20.0 + u_time * 3.0)));
    color += vec3(flowLines) * 0.5;
    
    // Modulate with u_t
    color *= 0.5 + 0.5 * (1.0 - u_t * 0.3);
    
    gl_FragColor = vec4(color, 1.0);
}
