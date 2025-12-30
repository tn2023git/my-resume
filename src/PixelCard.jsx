import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './ProfileCard.css';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg, #1a1a1a 0%, #000 100%)';

const ProfileCard = ({
  avatarUrl,
  nameEn = "Amirali Dabiri Maram",
  nameFa = "امیرعلی دبیری مرام",
  titleEn = "Job Seeker",
  titleFa = "کارجو",
  onSelectLang,
}) => {
  const wrapRef = useRef(null);

  const tiltEngine = useMemo(() => {
    let rafId = null;
    let running = false;
    let currentX = 50, currentY = 50, targetX = 50, targetY = 50;

    const setVars = (x, y) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      
      // محاسبه درصد موقعیت موس
      const px = Math.min(Math.max(x, 0), 100);
      const py = Math.min(Math.max(y, 0), 100);
      
      wrap.style.setProperty('--pointer-x', `${px}%`);
      wrap.style.setProperty('--pointer-y', `${py}%`);
      
      // محاسبه چرخش (Tilt)
      const rx = (px - 50) / 5;
      const ry = -(py - 50) / 5;
      wrap.style.setProperty('--rotate-x', `${rx}deg`);
      wrap.style.setProperty('--rotate-y', `${ry}deg`);
    };

    const step = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      setVars(currentX, currentY);
      rafId = requestAnimationFrame(step);
    };

    return {
      setTarget(x, y) {
        targetX = x; targetY = y;
        if (!running) { running = true; rafId = requestAnimationFrame(step); }
      },
      stop() { cancelAnimationFrame(rafId); running = false; }
    };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const move = (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      tiltEngine.setTarget(x, y);
    };

    const leave = () => tiltEngine.setTarget(50, 50);

    wrap.addEventListener('pointermove', move);
    wrap.addEventListener('pointerleave', leave);
    return () => {
      wrap.removeEventListener('pointermove', move);
      wrap.removeEventListener('pointerleave', leave);
      tiltEngine.stop();
    };
  }, [tiltEngine]);

  return (
    <div ref={wrapRef} className="pc-card-wrapper">
      <div className="pc-behind" />
      <div className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside" style={{ '--inner-gradient': DEFAULT_INNER_GRADIENT }}>
            
            {/* لایه‌های افکت درخشش */}
            <div className="pc-shine" />
            <div className="pc-glitter" />
            <div className="pc-glare" />

            {/* Header: Name and Title */}
            <div className="pc-header-info">
              <h3 className="dual-name">
                <span className="en-name">{nameEn}</span>
                <span className="fa-name">{nameFa}</span>
              </h3>
              <div className="dual-title">
                <span>{titleEn}</span>
                <span className="sep">-</span>
                <span>{titleFa}</span>
              </div>
            </div>

            {/* Content: Avatar and Buttons */}
            <div className="pc-avatar-container">
              <img className="avatar" src={avatarUrl} alt="Profile" />
              
              <button className="flag-corner en-corner" onClick={() => onSelectLang('en')}>
                <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" alt="EN" />
              </button>
              
              <button className="flag-corner fa-corner" onClick={() => onSelectLang('fa')}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg" alt="FA" />
              </button>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileCard;