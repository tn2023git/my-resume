import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';
import './GradientText.css';

export default function GradientText({
  children,
  className = '',
  colors = ["#f3bc08", "#df9339", "#d1765c", "#a010d6", "#d1765c", "#df9339"],
  animationSpeed = 2,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = false
}) {
  const [isPaused, setIsPaused] = useState(false);
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);
  
  const x = useMotionValue(0);
  const lastTimeRef = useRef(null);

  const animationDuration = animationSpeed * 1000;

  useEffect(() => {
    if (textRef.current) {
      // استفاده از offsetWidth برای دقت بیشتر در المان‌های inline-block
      setTextWidth(textRef.current.offsetWidth || 500);
    }
  }, [children]);

  useAnimationFrame((time, delta) => {
    if (isPaused || textWidth === 0) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    const moveAmount = (deltaTime / animationDuration) * textWidth;
    let nextX = x.get() + moveAmount;

    if (nextX >= textWidth) {
      nextX -= textWidth;
    }
    x.set(nextX);
  });

  const backgroundPosition = useTransform(x, value => `${value}px 50%`);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientAngle = direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
  const gradientColors = [...colors, colors[0]].join(', ');

  const gradientStyle = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize: `${textWidth}px 100%`,
    backgroundRepeat: 'repeat-x',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <motion.div
      className={`animated-gradient-text ${showBorder ? 'with-border' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-flex' }} // اطمینان از قرارگیری درست در هدرها
    >
      {showBorder && (
        <motion.div 
          className="gradient-overlay" 
          style={{ ...gradientStyle, backgroundPosition }} 
        />
      )}
      <motion.div 
        ref={textRef}
        className="text-content" 
        style={{ 
          ...gradientStyle, 
          backgroundPosition,
          display: 'inline-flex',
          flexWrap: 'wrap',
          color: 'transparent' // اطمینان از شفافیت برای نمایش گرادینت
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}