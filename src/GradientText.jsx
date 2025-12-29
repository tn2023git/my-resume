import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import './GradientText.css';

export default function GradientText({
  children,
  className = '',
  // ترتیب رنگ‌ها را برای یک چرخه طبیعی اصلاح کردم
  colors = ["#F3BC08", "#DF9339", "#D1765C", "#A010D6"],
  animationSpeed = 5,
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

    // استفاده از باقی‌مانده برای ریست شدن نرم مقدار
    const currentProgress = (elapsedRef.current % animationDuration) / animationDuration;
    progress.set(currentProgress * 100);
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [animationSpeed]);

  // جابه‌جایی از ۰ تا ۱۰۰ درصد
  const backgroundPosition = useTransform(progress, p => `${p}% 50%`);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  // کلید حل مشکل: تکرار رنگ اول در انتها و استفاده از پالت دوبرابر شده
  const gradientColors = [...colors, colors[0], ...colors, colors[0]].join(', ');

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${gradientColors})`,
    backgroundSize: '300% 100%', // افزایش سایز برای نرم‌تر شدن حرکت
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