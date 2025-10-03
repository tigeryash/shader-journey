uniform float u_time;
uniform float u_waveAmplitude;  
uniform float u_waveFrequency;

varying vec3 vPosition;
varying vec2 vUv;

#include ../noise/cnoise2D.glsl

void main(){
    vec3 pos = position;

    float wave = sin(pos.x * u_waveFrequency + u_time * 0.5);
    float wave2 = sin(pos.y * u_waveFrequency * .8 + u_time * .12 );
    float combined = (wave * wave2 )  * .5 * u_waveAmplitude;

    float noise = cnoise2D(pos.xy *.5); 
    combined += noise * 0.2;
    pos.z += combined;
    

    csm_Position = pos;

    vPosition = csm_Position.xyz;
    vUv = uv;
}