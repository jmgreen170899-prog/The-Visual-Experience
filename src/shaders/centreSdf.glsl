uniform float u_time;
uniform vec2 u_resolution;
uniform float u_t;

varying vec2 vUv;

// SDF for circle
float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

// SDF for rounded box
float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}

// SDF union (smooth minimum)
float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
}

// Rotation matrix
mat2 rot(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c);
}

void main() {
    vec2 st = vUv * 2.0 - 1.0;
    st.x *= u_resolution.x / u_resolution.y;
    
    // Pulsing and breathing effect
    float pulse = sin(u_time * 2.0) * 0.1 + 0.9;
    float breathe = sin(u_time * 0.5) * 0.15;
    
    // Central circle
    float centerSize = 0.3 + breathe + u_t * 0.2;
    float centerSdf = sdCircle(st, centerSize);
    
    // Rotating geometric shapes around center
    vec2 stRot = st * rot(u_time * 0.5);
    float shapes = 1000.0;
    
    for(int i = 0; i < 6; i++) {
        float angle = float(i) * 3.14159 / 3.0;
        vec2 pos = vec2(cos(angle), sin(angle)) * (0.6 + breathe * 0.5);
        float shape = sdCircle(stRot - pos, 0.15);
        shapes = smin(shapes, shape, 0.1);
    }
    
    // Combine center and surrounding shapes
    float sdf = smin(centerSdf, shapes, 0.2);
    
    // Add concentric rings
    float rings = abs(sin((length(st) - u_time * 0.3) * 15.0)) * 0.5;
    
    // Convert SDF to colors
    float fillCenter = smoothstep(0.02, 0.0, centerSdf);
    float outlineCenter = smoothstep(0.05, 0.03, abs(centerSdf)) * (1.0 - fillCenter);
    
    float fillShapes = smoothstep(0.02, 0.0, shapes);
    float outlineShapes = smoothstep(0.05, 0.03, abs(shapes)) * (1.0 - fillShapes);
    
    // Ring glow
    float ringGlow = smoothstep(0.1, 0.0, abs(mod(length(st), 0.2) - 0.1));
    ringGlow *= 1.0 - smoothstep(0.5, 1.0, length(st));
    
    // Color composition
    vec3 bgColor = vec3(0.05, 0.0, 0.1);
    vec3 centerColor = vec3(1.0, 1.0, 1.0) * pulse;
    vec3 shapeColor = vec3(0.5, 0.8, 1.0);
    vec3 glowColor = vec3(0.3, 0.6, 1.0);
    
    vec3 color = bgColor;
    color = mix(color, centerColor, fillCenter);
    color += outlineCenter * centerColor;
    color = mix(color, shapeColor, fillShapes * 0.7);
    color += outlineShapes * shapeColor;
    color += ringGlow * glowColor * rings;
    
    // Add radial gradient from center
    float radialGrad = 1.0 - smoothstep(0.0, 1.5, length(st));
    color += glowColor * radialGrad * 0.2;
    
    gl_FragColor = vec4(color, 1.0);
}
