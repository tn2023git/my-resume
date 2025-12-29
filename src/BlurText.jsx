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
    const updateWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;
        if (newWidth > 0) setWidth(newWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    // یک وقفه کوچک برای اطمینان از رندر شدن فونت‌ها
    const timer = setTimeout(updateWidth, 500); 
    
    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timer);
    };
  }, [text]);

  useAnimationFrame((time, delta) => {
    if (width <= 0) return;
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
    setTimeout(() => setInView(true), 1000);
    return () => { if (currentRef) observer.disconnect(); };
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () => direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -20 } : { filter: 'blur(10px)', opacity: 0, y: 20 },
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

  // استایل داینامیک: اگر عرض هنوز صفر است، متن را شفاف نکن
  const gradientStyle = {
    backgroundImage: width > 0 ? `linear-gradient(to right, ${colors.join(', ')})` : 'none',
    backgroundSize: `${width}px 100%`,
    backgroundRepeat: 'repeat-x',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: width > 0 ? 'transparent' : 'white', // Fallback به سفید
    backgroundClip: 'text',
    color: width > 0 ? 'transparent' : 'white',
    display: 'flex',
    flexWrap: 'wrap',
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
            times: [0, 0.5, 1],
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