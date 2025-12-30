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
}) => {
  const wrapRef = useRef(null);
  const shellRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

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
      wrap.style.setProperty('--rotate-x', `${(x - 50) / 7}deg`);
      wrap.style.setProperty('--rotate-y', `${-(y - 50) / 7}deg`);
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

    let mobileRaf;

    if (isMobile) {
      let angle = 0;
      const autoAnimate = () => {
        angle += 0.008; 
        const x = 50 + Math.cos(angle) * 35;
        const y = 50 + Math.sin(angle) * 35;
        tiltEngine.setTarget(x, y);
        mobileRaf = requestAnimationFrame(autoAnimate);
      };
      mobileRaf = requestAnimationFrame(autoAnimate);
    } else {
      const onMove = e => {
        const rect = shell.getBoundingClientRect();
        tiltEngine.setTarget(((e.clientX - rect.left) / rect.width) * 100, ((e.clientY - rect.top) / rect.height) * 100);
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
    <div ref={wrapRef} className={`pc-card-wrapper ${isMobile ? 'pc-is-mobile' : 'pc-is-desktop'}`}>
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
              <div 
                className="flag-btn en-corner" 
                data-tooltip="View English Resume"
                onClick={(e) => { e.stopPropagation(); onSelectLang('en'); }}
              >
                <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" alt="EN" />
              </div>
              
              <div 
                className="flag-btn fa-corner" 
                data-tooltip="مشاهده رزومه فارسی"
                onClick={(e) => { e.stopPropagation(); onSelectLang('fa'); }}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg" alt="FA" />
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(ProfileCard);