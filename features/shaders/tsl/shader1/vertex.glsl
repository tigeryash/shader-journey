uniform float u_time;
uniform float u_waveAmplitude;  
uniform float u_waveFrequency;
uniform vec2 u_waveSpeed;

varying vec3 vPosition;
varying vec2 vUv;

#include ../noise/cnoise3D.glsl

void main(){
    vec3 pos = position;

    float elevation = sin(pos.x * u_waveFrequency *.66 + u_time * u_waveSpeed.x) *sin(pos.y * u_waveFrequency *1.7 + u_time * u_waveSpeed.y )* u_waveAmplitude;
  
    elevation += cnoise3D(vec3(pos.xy *.5, u_time * 0.04)); 
    
    pos.z += elevation;
    
    csm_Position = pos;

    vPosition = csm_Position.xyz;
    vUv = uv;
}