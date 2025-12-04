uniform float u_time;
uniform vec2 u_resolution;
uniform float u_t;

varying vec2 vUv;

// Complex number multiplication for Mandelbrot-like fractals
vec2 complexMult(vec2 a, vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

// Julia set variation
float julia(vec2 z, vec2 c) {
    float iter = 0.0;
    for(int i = 0; i < 50; i++) {
        z = complexMult(z, z) + c;
        if(length(z) > 2.0) break;
        iter += 1.0;
    }
    return iter / 50.0;
}

// Spiral fractal pattern
float spiralFractal(vec2 p) {
    float r = length(p);
    float a = atan(p.y, p.x);
    
    float pattern = 0.0;
    float scale = 1.0;
    
    for(int i = 0; i < 4; i++) {
        // Create spiral arms
        float arms = sin(a * 5.0 + r * 8.0 * scale - u_time * 0.5);
        // Add radial waves
        float waves = cos(r * 15.0 * scale + u_time);
        pattern += (arms * waves) * (1.0 / scale);
        scale *= 2.0;
    }
    
    return pattern;
}

void main() {
    vec2 st = vUv * 2.0 - 1.0;
    st.x *= u_resolution.x / u_resolution.y;
    
    // Animate Julia set parameter
    vec2 c = vec2(
        0.355 + cos(u_time * 0.3) * 0.1,
        0.355 + sin(u_time * 0.5) * 0.1
    );
    
    // Zoom in/out with u_t
    float zoom = 1.5 + sin(u_t * 3.14159) * 0.5;
    vec2 z = st * zoom;
    
    // Calculate fractal
    float juliaValue = julia(z, c);
    float spiralValue = spiralFractal(st * 2.0);
    
    // Mix between different fractal types based on time
    float mixFactor = sin(u_time * 0.2) * 0.5 + 0.5;
    float fractalPattern = mix(juliaValue, spiralValue * 0.5 + 0.5, mixFactor);
    
    // Create colorful fractal bands
    vec3 color1 = vec3(0.1, 1.0, 0.3);  // Lime green
    vec3 color2 = vec3(0.0, 0.5, 0.8);  // Blue-green
    vec3 color3 = vec3(1.0, 0.8, 0.0);  // Yellow
    
    vec3 color = mix(color1, color2, fractalPattern);
    color = mix(color, color3, smoothstep(0.4, 0.6, fractalPattern));
    
    // Add self-similar detail
    float detail = sin(fractalPattern * 50.0 + u_time * 2.0) * 0.5 + 0.5;
    color *= 0.7 + detail * 0.3;
    
    // Edge glow effect
    float edge = smoothstep(0.9, 1.0, fractalPattern);
    color += vec3(edge) * vec3(0.5, 1.0, 0.5);
    
    gl_FragColor = vec4(color, 1.0);
}
