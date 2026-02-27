#include ../noise/cnoise3D.glsl

uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;
uniform vec3 u_color5;
uniform sampler2D u_noiseTexture;

varying vec3 vPosition;
varying vec2 vUv;

void main(){
    vec2 noiseUV = vec2(vUv.x * .08, vUv.y ) + vec2(u_time * .01, 0.0);
    float noise = texture2D(u_noiseTexture, noiseUV).r;

       vec3 color;
    
    if (noise < 0.25) {
        float t = noise / 0.25;
        color = mix(u_color1, u_color2, t);
    } else if (noise < 0.5) {
        float t = (noise - 0.25) / 0.25;
        color = mix(u_color2, u_color3, t);
    } else if (noise < 0.75) {
        float t = (noise - 0.5) / 0.25;
        color = mix(u_color3, u_color4, t);
    } else {
        float t = (noise - 0.75) / 0.25;
        color = mix(u_color4, u_color5, t);
    }
    
    csm_DiffuseColor = vec4(color, 1.0);
}