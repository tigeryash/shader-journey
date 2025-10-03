uniform float u_time;
uniform float u_waveAmplitude;  
uniform float u_waveFrequency;

varying vec3 vPosition;
varying vec2 vUv;

#include ../noise/cnoise2D.glsl

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec3 pos = position;

    float wave = sin(pos.x * u_waveFrequency + u_time * .1) * u_waveAmplitude;
    float wave2 = cos(pos.y  + u_time * .1) * u_waveAmplitude;

    float combined = wave * wave2 ;

    combined += cnoise2D(vec2(modelPosition.xy));
    pos.z += combined;
    

    csm_Position = pos;

    vPosition = csm_Position.xyz;
    vUv = uv;
}