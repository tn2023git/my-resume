import React, { useEffect, useRef, useMemo } from 'react';
import './ProfileCard.css';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg, #60496e8c 0%, #71C4FF44 100%)';

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

  const tiltEngine = useMemo(() => {
    let rafId = null;
    let running = false;
    let currentX = 0, currentY = 0, targetX = 0, targetY = 0;

    const setVars = (x, y) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;
      const width = shell.clientWidth, height = shell.clientHeight;
      const px = Math.min(Math.max((100 / width) * x, 0), 100);
      const py = Math.min(Math.max((100 / height) * y, 0), 100);
      
      wrap.style.setProperty('--pointer-x', `${px}%`);
      wrap.style.setProperty('--pointer-y', `${py}%`);
      wrap.style.setProperty('--rotate-x', `${-(px - 50) / 5}deg`);
      wrap.style.setProperty('--rotate-y', `${(py - 50) / 4}deg`);
    };

    const step = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      setVars(currentX, currentY);
      rafId = requestAnimationFrame(step);
    };

    return {
      setTarget(x, y) { targetX = x; targetY = y; if(!running){ running=true; rafId=requestAnimationFrame(step); }},
      stop() { cancelAnimationFrame(rafId); running = false; }
    };
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    const move = (e) => {
      const rect = shell.getBoundingClientRect();
      tiltEngine.setTarget(e.clientX - rect.left, e.clientY - rect.top);
    };
    const leave = () => {
        if(shellRef.current) tiltEngine.setTarget(shellRef.current.clientWidth/2, shellRef.current.clientHeight/2);
    };

    shell.addEventListener('pointermove', move);
    shell.addEventListener('pointerleave', leave);
    return () => { 
        shell.removeEventListener('pointermove', move); 
        shell.removeEventListener('pointerleave', leave);
        tiltEngine.stop(); 
    };
  }, [tiltEngine]);

  return (
    <div ref={wrapRef} className="pc-card-wrapper">
      <div className="pc-behind" />
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside" style={{'--inner-gradient': DEFAULT_INNER_GRADIENT}}>
            <div className="pc-shine" />
            <div className="pc-glare" />
            
            {/* Name and Title at TOP */}
            <div className="pc-header-info">
                <h3 className="dual-name">
                  <span className="en-name">{nameEn}</span>
                  <span className="fa-name">{nameFa}</span>
                </h3>
                <p className="dual-title">
                  <span>{titleEn}</span>
                  <span className="sep">-</span>
                  <span>{titleFa}</span>
                </p>
            </div>

            <div className="pc-avatar-container">
              <img className="avatar" src={avatarUrl} alt="Amirali" />
              
              {/* Wikipedia SVG Flags in Bottom Corners */}
              <button className="flag-corner en-corner" onClick={() => onSelectLang('en')}>
                <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" alt="English" />
              </button>
              
              <button className="flag-corner fa-corner" onClick={() => onSelectLang('fa')}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg" alt="Farsi" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(ProfileCard);