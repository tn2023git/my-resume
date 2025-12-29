import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import './GradientText.css';

export default function GradientText({
  children,
  className = '',
  // رنگ‌ها دقیقاً با ترتیب درخواستی شما
  colors = ["#F3BC08", "#DF9339", "#D1765C", "#A010D6", "#D1765C", "#DF9339"],
  animationSpeed = 5,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = false // طبق درخواست شما روی false تنظیم شد
}) {
  const [isPaused, setIsPaused] = useState(false);
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);
  
  const x = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);

  const animationDuration = animationSpeed * 1000;

  // محاسبه عرض متن برای جابه‌جایی دقیق در واحد پیکسل
  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.getBoundingClientRect().width);
    }
  }, [children]);

  useAnimationFrame((time, delta) => {
    if (isPaused || textWidth === 0) return;

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    // محاسبه جابه‌جایی برای حرکت از چپ به راست (استفاده از عرض متن)
    const moveAmount = (deltaTime / animationDuration) * textWidth;
    let nextX = x.get() + moveAmount;

    // ریست شدن در نقطه انتهایی برای ایجاد چرخه بی‌پایان
    if (nextX >= textWidth) {
      nextX -= textWidth;
    }
    x.set(nextX);
  });

  useEffect(() => {
    elapsedRef.current = 0;
    x.set(0);
  }, [animationSpeed, yoyo]);

  // تبدیل موقعیت به پیکسل (مانع از پرش در لحظه ریست می‌شود)
  const backgroundPosition = useTransform(x, value => `${value}px 50%`);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  // بازگشت به منطق کد اصلی شما برای ترکیب رنگ‌ها
  const gradientColors = [...colors, colors[0]].join(', ');

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${gradientColors})`,
    backgroundSize: `${textWidth}px 100%`,
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