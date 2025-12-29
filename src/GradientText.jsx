import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import './GradientText.css';

export default function GradientText({
  children,
  className = '',
  colors = ["#F3BC08", "#DF9339", "#D1765C", "#A010D6"],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = false // غیرفعال کردن حالت رفت و برگشتی
}) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);

  const animationDuration = animationSpeed * 1000;

  useAnimationFrame(time => {
    if (isPaused) {
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

    // محاسبه پیشرفت به صورت خطی برای حرکت مداوم
    const totalProgress = (elapsedRef.current / animationDuration) * 100;
    progress.set(totalProgress);
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [animationSpeed]);

  // استفاده از مقادیر منفی برای حرکت از چپ به راست (Infinite Slide)
  const backgroundPosition = useTransform(progress, p => `-${p % 200}% 50%`);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  // تکرار رنگ‌ها برای ایجاد یک چرخه بی‌پایان و بدون پرش (Seamless Loop)
  const gradientColors = [...colors, ...colors].join(', ');

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${gradientColors})`,
    backgroundSize: '200% 100%',
    backgroundRepeat: 'repeat'
  };

  return (
    <motion.div
      className={`animated-gradient-text ${showBorder ? 'with-border' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className="text-content" style={{ ...gradientStyle, backgroundPosition }}>
        {children}
      </motion.div>
    </motion.div>
  );
}