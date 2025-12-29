import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import './GradientText.css';

export default function GradientText({
  children,
  className = '',
  // پالت رنگی بهینه شده (رنگ اول و آخر یکی هستند تا مرز حذف شود)
  colors = ["#F3BC08", "#DF9339", "#D1765C", "#A010D6", "#F3BC08"],
  animationSpeed = 8, // سرعت را کمی کمتر کردم تا حرکت نرم‌تر دیده شود
  showBorder = false,
  pauseOnHover = false,
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

    // محاسبه پیشرفت به صورت درصدی از کل زمان انیمیشن
    const totalProgress = (elapsedRef.current / animationDuration) * 100;
    progress.set(totalProgress);
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [animationSpeed]);

  // کلید حل پرش: استفاده از باقی‌مانده ۱۰۰ (Modulus 100) 
  // چون Background Size ما ۲۰۰٪ است، جابه‌جایی ۱۰۰ درصدی باعث تکرار بی‌نقص می‌شود
  const backgroundPosition = useTransform(progress, p => `${p % 100}% 50%`);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  // ایجاد نوار طولانی از رنگ‌ها برای حرکت نوار نقاله‌ای
  const gradientColors = [...colors, ...colors].join(', ');

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${gradientColors})`,
    backgroundSize: '200% 100%',
    backgroundRepeat: 'repeat',
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