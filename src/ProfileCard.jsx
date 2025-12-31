import React, { useEffect, useRef, useMemo, useState } from 'react';
import './ProfileCard.css';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg, #0f0f0f 0%, #050505 100%)';

const ProfileCard = ({
  avatarUrl,
  nameEn = "Amirali Dabiri Maram",
  nameFa = "امیرعلی دبیری مرام",
  titleEn = "Job Seeker",
  titleFa = "کارجو",
  onSelectLang,
  isExiting: isExitingProp,
}) => {
  const wrapRef = useRef(null);
  const shellRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [localExiting, setLocalExiting] = useState(false);

  const isExiting = isExitingProp || localExiting;

  const handleLangSelect = (lang) => {
    setLocalExiting(true);
    setTimeout(() => {
      onSelectLang(lang);
    }, 100);
  };

  useEffect(() => {
    const checkMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(hasTouch || isSmallScreen);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setVars(currentX, currentY);
      rafId = requestAnimationFrame(step);
    };

    return {
      setTarget(x, y) {
        targetX = x; targetY = y;
        if (!running) { running = true; rafId = requestAnimationFrame(step); }
      },
      stop() { 
        if (rafId) cancelAnimationFrame(rafId); 
        running = false; 
      }
    };
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    let mobileRaf;

    if (isMobile) {
      let angle = 0;
      const autoAnimate = () => {
        const speed = 0.015;      
        const intensity = 40;    
        angle += speed;
        const x = 50 + Math.cos(angle) * intensity;
        const y = 50 + Math.sin(angle * 0.8) * intensity;
        tiltEngine.setTarget(x, y);
        mobileRaf = requestAnimationFrame(autoAnimate);
      };
      mobileRaf = requestAnimationFrame(autoAnimate);
    } else {
      const onMove = e => {
        const rect = shell.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        tiltEngine.setTarget(px, py);
      };
      const onLeave = () => tiltEngine.setTarget(50, 50);
      shell.addEventListener('pointermove', onMove);
      shell.addEventListener('pointerleave', onLeave);
      return () => {
        shell.removeEventListener('pointermove', onMove);
        shell.removeEventListener('pointerleave', onLeave);
      };
    }

    return () => {
      if (mobileRaf) cancelAnimationFrame(mobileRaf);
      tiltEngine.stop();
    };
  }, [tiltEngine, isMobile]);

  return (
    <div 
      ref={wrapRef} 
      className={`pc-card-wrapper ${isMobile ? 'pc-is-mobile' : 'pc-is-desktop'} ${isExiting ? 'pc-exiting' : ''}`}
    >
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="glitterNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.99" numOctaves="1" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 15 -7" />
        </filter>
      </svg>

      <div className="pc-behind" />
      
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside" style={{ '--inner-gradient': DEFAULT_INNER_GRADIENT }}>
            
            <div className="pc-glitter-base" />
            <div className="pc-glitter-color" />
            
            <div className="pc-shine" />
            <div className="pc-glare" />

            <div className="pc-header-info">
              <div className="dual-name">
                <h2 className="en-name bold-font">{nameEn}</h2>
                <h2 className="fa-name bold-font">{nameFa}</h2>
              </div>
              <div className="dual-title">
                <span className="en-title-text">{titleEn}</span>
                <span className="sep">-</span>
                <span className="fa-title-text">{titleFa}</span>
              </div>
            </div>

            <div className="pc-avatar-container">
              <div className="pc-avatar-bg" />
              <img className="avatar-minimal" src={avatarUrl} alt="Profile" />
            </div>

            <div className="pc-lang-overlay">
              <div className="pc-central-tooltip en-tooltip">View English Resume</div>
              <div className="pc-central-tooltip fa-tooltip">مشاهده رزومه فارسی</div>
              <div className="flag-btn en-corner" onClick={(e) => { e.stopPropagation(); handleLangSelect('en'); }}>
                <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" alt="English" />
              </div>
              <div className="flag-btn fa-corner" onClick={(e) => { e.stopPropagation(); handleLangSelect('fa'); }}>
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