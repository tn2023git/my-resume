import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';

// پیشنهاد ۱: استفاده از دقت متوسط (mediump) در فرگمنت شیدر برای موبایل
const vertexShader = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `#version 300 es
precision mediump float; /* پیشنهاد ۱ */
precision mediump int;

out vec4 fragColor;

uniform vec2  uResolution;
uniform float uTime;
uniform float uIntensity;
uniform float uSpeed;
uniform int   uAnimType;
uniform vec2  uMouse;
uniform int   uColorCount;
uniform float uDistort;
uniform vec2  uOffset;
uniform sampler2D uGradient;
uniform float uNoiseAmount;
uniform int   uRayCount;

float hash21(vec2 p){
    p = floor(p);
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));
    return fract(f);
}

mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }

float layeredNoise(vec2 fragPx){
    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
    vec2 q = rot30() * p;
    float n = 0.0;
    n += 0.40 * hash21(q);
    n += 0.25 * hash21(q * 2.0 + 17.0);
    /* حذف لایه‌های اضافی نویز در موبایل می‌تواند سرعت را بیشتر کند اما فعلاً برای حفظ ظاهر نگه داشتیم */
    return n;
}

vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){
    float focal = res.y * max(dist, 1e-3);
    return normalize(vec3(2.0 * (frag - offset) - res, focal));
}

float edgeFade(vec2 frag, vec2 res, vec2 offset){
    vec2 toC = frag - 0.5 * res - offset;
    float r = length(toC) / (0.5 * min(res.x, res.y));
    float x = clamp(r, 0.0, 1.0);
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
    float s = q * 0.5;
    s = pow(s, 1.5);
    float tail = 1.0 - pow(1.0 - s, 2.0);
    s = mix(s, tail, 0.2);
    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;
    return clamp(s + dn, 0.0, 1.0);
}

mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }

vec3 sampleGradient(float t){
    t = clamp(t, 0.0, 1.0);
    return texture(uGradient, vec2(t, 0.5)).rgb;
}

vec2 rot2(vec2 v, float a){
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c) * v;
}

float bendAngle(vec3 q, float t){
    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)
            + 0.7 * sin(q.y * 0.50 - t * 0.5)
            + 0.6 * sin(q.z * 0.60 + t * 0.7);
    return a;
}

void main(){
    vec2 frag = gl_FragCoord.xy;
    float t = uTime * uSpeed;
    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);
    float marchT = 0.0;
    vec3 col = vec3(0.0);
    float n = layeredNoise(frag);
    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);
    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;

    mat3 rot3dMat = mat3(1.0);
    if(uAnimType == 1){
      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);
      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);
    }
    
    /* منطق ساده‌تر برای رندر سریع‌تر */
    vec3 q = rot3dMat * dir;
    float b = bendAngle(q, t) * amp;
    q.xy = rot2(q.xy, b);
    
    float angle = atan(q.y, q.x);
    float beam = 0.5 + 0.5 * sin(float(uRayCount) * angle + t);
    col = sampleGradient(beam) * uIntensity;
    
    float mask = edgeFade(frag, uResolution, uOffset);
    fragColor = vec4(col * mask, 1.0);
}
`;

export default function PrismaticBurst({
  intensity = 1.0,
  speed = 1.0,
  animationType = 'hover',
  color0 = '#ff0000',
  color1 = '#00ff00',
  color2 = '#0000ff',
  distort = 0.5,
  noiseAmount = 0.1,
  rayCount = 4
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // پیشنهاد ۱: تنظیم DPI کمتر برای موبایل برای رندر سریع‌تر
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
    
    const renderer = new Renderer({ alpha: true, dpr, antialias: !isMobile });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    
    const gradientCanvas = document.createElement('canvas');
    gradientCanvas.width = 256;
    gradientCanvas.height = 1;
    const ctx = gradientCanvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 256, 0);
    grad.addColorStop(0, color0);
    grad.addColorStop(0.5, color1);
    grad.addColorStop(1, color2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 1);
    const uGradient = new Texture(gl, { image: gradientCanvas });

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [0, 0] },
        uIntensity: { value: intensity },
        uSpeed: { value: speed },
        uAnimType: { value: animationType === 'rotate' ? 1 : animationType === 'hover' ? 2 : 0 },
        uMouse: { value: [0.5, 0.5] },
        uDistort: { value: distort },
        uOffset: { value: [0, 0] },
        uGradient: { value: uGradient },
        uNoiseAmount: { value: noiseAmount },
        uRayCount: { value: rayCount }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    };
    window.addEventListener('resize', resize);
    resize();

    let request;
    const update = (t) => {
      request = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };
    request = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(request);
      container.removeChild(gl.canvas);
    };
  }, [intensity, speed, animationType, color0, color1, color2, distort, noiseAmount, rayCount]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}