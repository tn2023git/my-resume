import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import './GradientText.css';

export default function GradientText({
  children,
  className = '',
  colors = ["#F3BC08", "#DF9339", "#D1765C", "#A010D6"],
  animationSpeed = 8,
  showBorder = false,
  pauseOnHover = false,
}) {
  const [isPaused, setIsPaused] = useState(false);
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);
  
  const x = useMotionValue(0);
  const animationDuration = animationSpeed * 1000;

  // محاسبه عرض متن برای جابه‌جایی دقیق
  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, [children]);

  useAnimationFrame((time, delta) => {
    if (isPaused || textWidth === 0) return;

    // محاسبه جابه‌جایی بر اساس زمان برای حرکت یکنواخت
    const moveAmount = (delta / animationDuration) * textWidth;
    const nextX = x.get() - moveAmount;

    // وقتی به اندازه یک دور کامل جابه‌جا شد، بدون پرش به صفر برمی‌گردد
    if (Math.abs(nextX) >= textWidth) {
      x.set(nextX + textWidth);
    } else {
      x.set(nextX);
    }
  });

  const backgroundPosition = useTransform(x, value => `${value}px 50%`);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  // ایجاد چرخه رنگی متصل (رنگ آخر به اول)
  const gradientColors = [...colors, colors[0]].join(', ');

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${gradientColors})`,
    backgroundSize: `${textWidth}px 100%`,
    backgroundRepeat: 'repeat-x',
  };

  return (
    <motion.div
      className={`animated-gradient-text ${showBorder ? 'with-border' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        ref={textRef}
        className="text-content" 
        style={{ ...gradientStyle, backgroundPosition }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}