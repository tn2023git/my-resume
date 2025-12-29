import { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';

const vertexShader = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Fragment Shader برای دسکتاپ (Prismatic)
const prismaticFragment = `#version 300 es
precision highp float;
precision highp int;
out vec4 fragColor;
uniform vec2 uResolution;
uniform float uTime;
uniform float uIntensity;
uniform float uSpeed;
uniform int uAnimType;
uniform vec2 uMouse;
uniform int uColorCount;
uniform float uDistort;
uniform vec2 uOffset;
uniform sampler2D uGradient;
uniform float uNoiseAmount;
uniform int uRayCount;

float hash21(vec2 p){ p = floor(p); return fract(52.9829189 * fract(dot(p, vec2(0.065, 0.005)))); }
mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }
float layeredNoise(vec2 fragPx){
    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
    vec2 q = rot30() * p;
    float n = 0.0;
    n += 0.40 * hash21(q); n += 0.25 * hash21(q * 2.0 + 17.0);
    n += 0.20 * hash21(q * 4.0 + 47.0); n += 0.10 * hash21(q * 8.0 + 113.0);
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
    float s = q * 0.5; s = pow(s, 1.5);
    float tail = 1.0 - pow(1.0 - s, 2.0);
    s = mix(s, tail, 0.2);
    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;
    return clamp(s + dn, 0.0, 1.0);
}
mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }
vec3 sampleGradient(float t){ return texture(uGradient, vec2(clamp(t, 0.0, 1.0), 0.5)).rgb; }
vec2 rot2(vec2 v, float a){ float s = sin(a), c = cos(a); return mat2(c, -s, s, c) * v; }
float bendAngle(vec3 q, float t){ return 0.8 * sin(q.x * 0.55 + t * 0.6) + 0.7 * sin(q.y * 0.50 - t * 0.5) + 0.6 * sin(q.z * 0.60 + t * 0.7); }

void main(){
    vec2 frag = gl_FragCoord.xy;
    float t = uTime * uSpeed;
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);
    vec3 col = vec3(0.0);
    float n = layeredNoise(frag);
    mat3 rot3dMat = mat3(1.0);
    if(uAnimType == 1){ vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17); rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x); }
    mat3 hoverMat = mat3(1.0);
    if(uAnimType == 2){ vec2 m = uMouse * 2.0 - 1.0; vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0); hoverMat = rotY(ang.y) * rotX(ang.x); }
    float marchT = 0.0;
    for (int i = 0; i < 44; ++i) {
        vec3 P = marchT * dir; P.z -= 2.0;
        float rad = length(P); vec3 Pl = P * (10.0 / max(rad, 1e-6));
        if(uAnimType == 0){ vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0)); Pl.xz *= mat2(c.x, c.y, c.z, c.w); }
        else if(uAnimType == 1){ Pl = rot3dMat * Pl; }
        else { Pl = hoverMat * Pl; }
        float stepLen = min(rad - 0.3, n * 0.1 * uNoiseAmount) + 0.1;
        float grow = smoothstep(0.35, 3.0, marchT);
        vec3 Pb = Pl; Pb.xz = rot2(Pb.xz, uDistort * 0.15 * grow * bendAngle(Pl * 0.6, t));
        Pb.xy = rot2(Pb.xy, 0.5 * uDistort * 0.15 * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9));
        float rayPattern = smoothstep(0.5, 0.7, sin(Pb.x + cos(Pb.y) * cos(Pb.z)) * sin(Pb.z + sin(Pb.y) * cos(Pb.x + t)));
        if (uRayCount > 0) {
            float ang = atan(Pb.y, Pb.x);
            rayPattern *= smoothstep(0.15, 0.95, pow(0.5 + 0.5 * cos(float(uRayCount) * ang), 3.0));
        }
        float saw = fract(marchT * 0.25);
        vec3 spectral = (uColorCount > 0) ? 2.0 * sampleGradient(saw * saw * (3.0 - 2.0 * saw)) : 1.0 + vec3(cos(marchT * 3.0), cos(marchT * 3.0 + 1.0), cos(marchT * 3.0 + 2.0));
        col += (0.05 / (0.4 + stepLen)) * smoothstep(5.0, 0.0, rad) * spectral * rayPattern;
        marchT += stepLen;
    }
    col *= edgeFade(frag, uResolution, uOffset) * uIntensity;
    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

// Fragment Shader برای موبایل (PixelCard Style)
const pixelFragment = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor0;
uniform vec2 uMouse;

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 grid = fract(uv * 30.0);
    float dist = length(uv - uMouse);
    float mask = smoothstep(0.4, 0.0, dist);
    vec3 col = uColor0 * mask * (0.5 + 0.5 * sin(uTime + uv.x * 10.0));
    fragColor = vec4(col * step(0.1, grid.x) * step(0.1, grid.y), 1.0);
}
`;

const hexToRgb01 = hex => {
    let h = hex.trim().replace('#', '');
    if (h.length === 3) h = h.split('').map(x => x + x).join('');
    const intVal = parseInt(h, 16);
    return [((intVal >> 16) & 255) / 255, ((intVal >> 8) & 255) / 255, (intVal & 255) / 255];
};

const PrismaticBurst = ({
    intensity = 2, speed = 0.5, animationType = 'hover',
    color0 = "#f3bc08", color1 = "#d1765c", color2 = "#a010d6",
    distort = 0.3, paused = false, offset = { x: 0, y: 0 },
    hoverDampness = 0.1, rayCount = 0, mixBlendMode = 'lighten'
}) => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const mouseRef = useRef([0.5, 0.5]);
    const isMobile = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
        const renderer = new Renderer({ dpr, alpha: false, antialias: false });
        rendererRef.current = renderer;
        const gl = renderer.gl;
        gl.canvas.style.position = 'absolute';
        gl.canvas.style.inset = '0';
        gl.canvas.style.mixBlendMode = mixBlendMode;
        container.appendChild(gl.canvas);

        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: isMobile ? pixelFragment : prismaticFragment,
            uniforms: {
                uResolution: { value: [0, 0] },
                uTime: { value: 0 },
                uIntensity: { value: intensity },
                uSpeed: { value: speed },
                uAnimType: { value: animationType === 'rotate' ? 0 : animationType === 'rotate3d' ? 1 : 2 },
                uMouse: { value: [0.5, 0.5] },
                uColorCount: { value: 3 },
                uDistort: { value: distort },
                uOffset: { value: [offset.x, offset.y] },
                uNoiseAmount: { value: 0.8 },
                uRayCount: { value: rayCount },
                uColor0: { value: hexToRgb01(color0) }, // مخصوص افکت موبایل
                uGradient: { value: new Texture(gl) }
            }
        });

        const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
        const resize = () => {
            renderer.setSize(container.clientWidth, container.clientHeight);
            program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
        };
        window.addEventListener('resize', resize);
        resize();

        let raf, last = performance.now(), accum = 0;
        const update = now => {
            const dt = (now - last) * 0.001;
            last = now;
            if (!paused) accum += dt;
            program.uniforms.uTime.value = accum;
            program.uniforms.uMouse.value = mouseRef.current;
            renderer.render({ scene: mesh });
            raf = requestAnimationFrame(update);
        };
        raf = requestAnimationFrame(update);

        const onMove = e => {
            const x = e.touches ? e.touches[0].clientX : e.clientX;
            const y = e.touches ? e.touches[0].clientY : e.clientY;
            mouseRef.current = [x / window.innerWidth, 1 - y / window.innerHeight];
        };
        window.addEventListener(isMobile ? 'touchmove' : 'mousemove', onMove);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener(isMobile ? 'touchmove' : 'mousemove', onMove);
            try { container.removeChild(gl.canvas); } catch {}
        };
    }, [isMobile]);

    return <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, overflow: 'hidden' }} ref={containerRef} />;
};

export default PrismaticBurst;