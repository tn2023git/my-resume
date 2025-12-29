import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';
import './GradientText.css';

export default function GradientText({
  children,
  className = '',
  colors = ["#f3bc08","#df9339","#d1765c","#a010d6","#d1765c","#df9339"],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = false // غیرفعال شد
}) {
  const [isPaused, setIsPaused] = useState(false);
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);
  
  const x = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);

  const animationDuration = animationSpeed * 1000;

  // محاسبه عرض متن برای تنظیم اندازه پس‌زمینه
  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.getBoundingClientRect().width);
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
    elapsedRef.current += deltaTime;

    // حرکت از چپ به راست با استفاده از پیکسل
    const moveAmount = (deltaTime / animationDuration) * textWidth;
    let nextX = x.get() + moveAmount;

    // چرخه بی‌نهایت: وقتی به انتهای عرض متن رسید، به صفر برمی‌گردد
    if (nextX >= textWidth) {
      nextX -= textWidth;
    }
    x.set(nextX);
  });

  useEffect(() => {
    elapsedRef.current = 0;
    x.set(0);
  }, [animationSpeed, yoyo]);

  // جابه‌جایی پس‌زمینه بر اساس پیکسل
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
    backgroundSize: `${textWidth}px 100%`, // اندازه پس‌زمینه برابر با عرض متن
    backgroundRepeat: 'repeat-x'
  };

  return (
    <motion.div
      className={`animated-gradient-text ${showBorder ? 'with-border' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          display: 'inline-block',
          whiteSpace: 'nowrap'
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}