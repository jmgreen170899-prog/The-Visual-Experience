uniform float u_time;
uniform vec2 u_resolution;
uniform float u_t;

varying vec2 vUv;

void main() {
    vec2 st = vUv;
    
    // Simple flow field pattern
    float flow = sin(st.x * 5.0 + u_time) * cos(st.y * 5.0 - u_time);
    
    vec3 color = vec3(
        flow * 0.5 + 0.5,
        st.x,
        st.y
    );
    
    gl_FragColor = vec4(color, 1.0);
}
