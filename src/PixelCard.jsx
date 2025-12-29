import { useEffect, useRef } from 'react';
import './PixelCard.css';

class Pixel {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min, max) { return Math.random() * (max - min) + min; }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) { this.counter += this.counterStep; return; }
    if (this.size >= this.maxSize) { this.isShimmer = true; }
    if (this.isShimmer) { this.shimmer(); } else { this.size += this.sizeStep; }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) { this.isIdle = true; return; } else { this.size -= 0.1; }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) { this.isReverse = true; } 
    else if (this.size <= this.minSize) { this.isReverse = false; }
    if (this.isReverse) { this.size -= this.speed; } else { this.size += this.speed; }
  }
}

function getEffectiveSpeed(value, reducedMotion) {
  const throttle = 0.001;
  return reducedMotion ? 0 : parseInt(value, 10) * throttle;
}

const VARIANTS = {
  resume: {
    activeColor: 'rgba(160, 16, 214, 0.7)',
    gap: 6,
    speed: 35,
    colors: 'rgba(243, 188, 8, 0.7),rgba(209, 118, 92, 0.7),rgba(160, 10, 214, 0.7),rgba(223, 147, 57, 0.7)',
    noFocus: false
  }
};

export default function PixelCard({ variant = 'resume', gap, speed, colors, noFocus, className = '', children }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pixelsRef = useRef([]);
  const animationRef = useRef(null);
  const timePreviousRef = useRef(performance.now());
  const reducedMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;

  const variantCfg = VARIANTS[variant] || VARIANTS.resume;
  const finalGap = gap ?? variantCfg.gap;
  const finalSpeed = speed ?? variantCfg.speed;
  const finalColors = colors ?? variantCfg.colors;

  const initPixels = () => {
    if (!containerRef.current || !canvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const colorsArray = finalColors.split('),').map(c => c.endsWith(')') ? c : c + ')');
    const pxs = [];
    for (let x = 0; x < width; x += parseInt(finalGap, 10)) {
      for (let y = 0; y < height; y += parseInt(finalGap, 10)) {
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
        const delay = reducedMotion ? 0 : Math.sqrt(Math.pow(x - width/2, 2) + Math.pow(y - height/2, 2));
        pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, getEffectiveSpeed(finalSpeed, reducedMotion), delay));
      }
    }
    pixelsRef.current = pxs;
  };

  const doAnimate = fnName => {
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
    const timeNow = performance.now();
    const timePassed = timeNow - timePreviousRef.current;
    if (timePassed < 1000 / 60) return;
    timePreviousRef.current = timeNow - (timePassed % (1000 / 60));

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    let allIdle = true;
    pixelsRef.current.forEach(pixel => {
      pixel[fnName]();
      if (!pixel.isIdle) allIdle = false;
    });
    if (allIdle) cancelAnimationFrame(animationRef.current);
  };

  const handleAnimation = name => {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(() => doAnimate(name));
  };

  useEffect(() => {
    initPixels();
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    // منطق اسکرول برای موبایل
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      handleAnimation(isVisible ? 'appear' : 'disappear');
    };

    if (isTouch) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // چک کردن وضعیت اولیه
    }

    const observer = new ResizeObserver(() => initPixels());
    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [finalGap, finalSpeed, finalColors]);

  return (
    <div
      ref={containerRef}
      className={`pixel-card ${className}`}
      onMouseEnter={() => !window.matchMedia("(pointer: coarse)").matches && handleAnimation('appear')}
      onMouseLeave={() => !window.matchMedia("(pointer: coarse)").matches && handleAnimation('disappear')}
    >
      <canvas className="pixel-canvas" ref={canvasRef} />
      <div className="pixel-content">{children}</div>
    </div>
  );
}