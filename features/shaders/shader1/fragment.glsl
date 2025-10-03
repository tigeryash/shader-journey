#include ../noise/cnoise3D.glsl

uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;
uniform vec3 u_color5;

varying vec3 vPosition;
varying vec2 vUv;

void main(){
 vec3 color = vPosition * 0.5 + 0.5;
    csm_DiffuseColor = vec4(color, 1.0);
}