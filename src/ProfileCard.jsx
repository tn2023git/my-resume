import React, { useEffect, useRef, useMemo } from 'react';
import './ProfileCard.css';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg, #121212 0%, #000000 100%)';

const ProfileCard = ({
  avatarUrl,
  nameEn = "Amirali Dabiri Maram",
  nameFa = "امیرعلی دبیری مرام",
  titleEn = "Job Seeker",
  titleFa = "کارجو",
  onSelectLang,
  enableMobileTilt = true,
  mobileTiltSensitivity = 5
}) => {
  const wrapRef = useRef(null);
  const shellRef = useRef(null);

  const tiltEngine = useMemo(() => {
    let rafId = null;
    let running = false;
    let currentX = 50, currentY = 50, targetX = 50, targetY = 50;

    const setVars = (x, y) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      wrap.style.setProperty('--pointer-x', `${x}%`);
      wrap.style.setProperty('--pointer-y', `${y}%`);
      wrap.style.setProperty('--rotate-x', `${(x - 50) / 6}deg`);
      wrap.style.setProperty('--rotate-y', `${-(y - 50) / 6}deg`);
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
    const shell = shellRef.current;
    if (!shell) return;

    const onMove = e => {
      const rect = shell.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      tiltEngine.setTarget(x, y);
    };

    const onLeave = () => tiltEngine.setTarget(50, 50);

    shell.addEventListener('pointermove', onMove);
    shell.addEventListener('pointerleave', onLeave);
    return () => {
      shell.removeEventListener('pointermove', onMove);
      shell.removeEventListener('pointerleave', onLeave);
      tiltEngine.stop();
    };
  }, [tiltEngine]);

  return (
    <div ref={wrapRef} className="pc-card-wrapper">
      {/* Dynamic Glitter Filter - No image needed */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <div className="pc-behind" />
      
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside" style={{ '--inner-gradient': DEFAULT_INNER_GRADIENT }}>
            
            <div className="pc-glitter" />
            <div className="pc-shine" />
            <div className="pc-glare" />

            {/* --- 1. TOP SECTION (Name & Title) --- */}
            <div className="pc-header-info">
              <div className="dual-name">
                <h2 className="en-name">{nameEn}</h2>
                <h2 className="fa-name">{nameFa}</h2>
              </div>
              <div className="dual-title">
                <span>{titleEn}</span>
                <span className="sep">•</span>
                <span>{titleFa}</span>
              </div>
            </div>

            {/* --- 2. MIDDLE SECTION (Avatar & Language Buttons) --- */}
            <div className="pc-avatar-container">
              <img className="avatar" src={avatarUrl} alt="Profile" />
              
              {/* Language Buttons placed over the avatar area */}
              <div className="flag-corner en-corner" onClick={() => onSelectLang('en')}>
                <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" alt="English" />
              </div>
              
              <div className="flag-corner fa-corner" onClick={() => onSelectLang('fa')}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg" alt="Farsi" />
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(ProfileCard);