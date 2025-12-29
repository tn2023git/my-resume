import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import './GradientText.css';

export default function GradientText({
  children,
  className = '',
  // لیست اصلی رنگ‌ها بدون تکرار دستی
  colors = ["#F3BC08", "#A010D6"],
  animationSpeed = 8,
  showBorder = false,
  pauseOnHover = false,
}) {
  const [isPaused, setIsPaused] = useState(false);
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);
  
  const x = useMotionValue(0);
  const animationDuration = animationSpeed * 1000;

  useEffect(() => {
    if (textRef.current) {
      // استفاده از getBoundingClientRect برای دقت بالاتر در پیکسل
      setTextWidth(textRef.current.getBoundingClientRect().width);
    }
  }, [children]);

  useAnimationFrame((time, delta) => {
    if (isPaused || textWidth === 0) return;

    const moveAmount = (delta / animationDuration) * textWidth;
    const nextX = x.get() - moveAmount;

    // ریست کردن موقعیت بدون پرش (Seamless Reset)
    if (nextX <= -textWidth) {
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

  /**
   * منطق توزیع یکنواخت رنگ‌ها:
   * برای اینکه فاصله رنگ آخر تا اول هم یکسان باشد، رنگ اول را در انتها اضافه می‌کنیم
   * و درصدها را طوری تقسیم می‌کنیم که فواصل کاملاً برابر باشند.
   */
  const generateUniformGradient = () => {
    const fullColors = [...colors, colors[0]]; // اضافه کردن رنگ اول به انتها
    const step = 100 / (fullColors.length - 1);
    return fullColors.map((color, index) => `${color} ${index * step}%`).join(', ');
  };

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${generateUniformGradient()})`,
    backgroundSize: `${textWidth}px 100%`,
    backgroundRepeat: 'repeat-x',
  };

  return (
    <motion.div
      className={`animated-gradient-text ${showBorder ? 'with-border' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ overflow: 'hidden' }}
    >
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