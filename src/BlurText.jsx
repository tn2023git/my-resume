import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = 'easeOut',
  onAnimationComplete,
  stepDuration = 0.35,
  colors = ["#f3bc08", "#df9339", "#d1765c", "#a010d6", "#d1765c", "#df9339"],
  animationSpeed = 8
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  const x = useMotionValue(0);
  const animationDuration = animationSpeed * 1000;

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.getBoundingClientRect().width || 500);
    }
  }, [text]);

  useAnimationFrame((time, delta) => {
    if (width === 0) return;
    const moveAmount = (delta / animationDuration) * width;
    let nextX = x.get() + moveAmount;
    if (nextX >= width) nextX -= width;
    x.set(nextX);
  });

  const backgroundPosition = useTransform(x, value => `${value}px 50%`);

  useEffect(() => {
    const currentRef = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold, rootMargin }
    );
    if (currentRef) observer.observe(currentRef);
    const timer = setTimeout(() => setInView(true), 500);
    return () => {
      if (currentRef) observer.disconnect();
      clearTimeout(timer);
    };
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () => direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    backgroundSize: `${width}px 100%`,
    backgroundRepeat: 'repeat-x',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'flex',
    flexWrap: 'wrap',
    color: 'transparent' // اضافه شدن برای اطمینان
  };

  return (
    <motion.div 
      ref={containerRef} 
      className={className} 
      style={{ ...gradientStyle, backgroundPosition }}
    >
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          initial={fromSnapshot}
          animate={inView ? animateKeyframes : fromSnapshot}
          transition={{
            duration: stepDuration * toSnapshots.length,
            times: Array.from({ length: toSnapshots.length + 1 }, (_, i) => i / toSnapshots.length),
            delay: (index * delay) / 1000,
            ease: easing
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {segment === '' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default BlurText;