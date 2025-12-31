import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';
import './GradientText.css';

export default function GradientText({
  children,
  className = '',
  colors = ["#f3bc08", "#df9339", "#d1765c", "#a010d6", "#d1765c", "#df9339"],
  animationSpeed = 4, // سرعت طبق درخواست قبلی روی ۴ (سریع‌تر) تنظیم شده است
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
  // استفاده از Ref برای ذخیره مقدار موقعیت فعلی جهت جلوگیری از پرش در رندرهای مجدد
  const currentXPos = useRef(0);

  const animationDuration = animationSpeed * 1000;

  useEffect(() => {
    if (textRef.current) {
      const width = textRef.current.offsetWidth;
      if (width > 0) {
        setTextWidth(width);
      }
    }
  }, [children]);

  useAnimationFrame((time) => {
    // اگر عرض متن هنوز محاسبه نشده یا انیمیشن متوقف است، کاری انجام نده
    if (isPaused || textWidth <= 0) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    // محاسبه مقدار جابجایی بر اساس زمان سپری شده
    const moveAmount = (deltaTime / animationDuration) * textWidth;
    
    // بروزرسانی مقدار فعلی با استفاده از باقیمانده (Modulo) برای چرخش بی‌نقص
    currentXPos.current = (currentXPos.current + moveAmount) % textWidth;
    
    x.set(currentXPos.current);
  });

  const backgroundPosition = useTransform(x, value => `${value}px 50%`);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientAngle = direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
  
  // برای جلوگیری از پرش رنگ در انتهای تکرار، گرادینت را دو برابر می‌کنیم
  const gradientColors = [...colors, ...colors].join(', ');

  const gradientStyle = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    // سایز پس‌زمینه را دو برابر عرض متن می‌گذاریم تا حرکت نرم باقی بماند
    backgroundSize: `${textWidth * 2}px 100%`,
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
      style={{ display: 'inline-flex' }} 
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
          flexWrap: 'nowrap', // تغییر به nowrap برای جلوگیری از شکستن خط در لحظه خروج
          color: 'transparent'
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}