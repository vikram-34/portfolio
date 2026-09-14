// Smooth trigonometric noise avoids texture downloads and long noise loops.
// Object-space pointer coordinates come from R3F's raycast intersection.
export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uStrength;
  uniform vec3 uPointer;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vWave;
  void main() {
    float wave = sin(position.x * 3.4 + uTime * 0.45)
      * sin(position.y * 3.1 - uTime * 0.3)
      * cos(position.z * 3.8 + uTime * 0.25);
    float touch = exp(-distance(position, uPointer) * 2.2) * uStrength;
    vec3 displaced = position + normal * (wave * 0.2 + touch * 0.27);
    vWave = wave;
    vNormal = normalize(normalMatrix * normal);
    vec4 viewPosition = modelViewMatrix * vec4(displaced, 1.0);
    vPosition = viewPosition.xyz;
    gl_Position = projectionMatrix * viewPosition;
  }
`;
// Directional light, Fresnel edging and a restrained grain form the molten surface.
export const fragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vWave;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(-vPosition);
    float light = max(dot(normal, normalize(vec3(-0.6, 1.0, 1.2))), 0.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.4);
    float bands = sin(vPosition.y * 18.0 + vWave * 4.0 + uTime * 0.12) * 0.035;
    vec3 dark = vec3(0.16, 0.038, 0.013);
    vec3 warm = vec3(1.0, 0.29, 0.095);
    vec3 color = mix(dark, warm, light * 0.85 + vWave * 0.09 + bands);
    color += fresnel * vec3(0.68, 0.28, 0.13);
    color += (hash(gl_FragCoord.xy) - 0.5) * 0.025;
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;
