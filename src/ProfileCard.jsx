import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './ProfileCard.css';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg, #a010d6 0%, #f3bc08 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
};

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

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
  const enterTimerRef = useRef(null);
  const leaveRafRef = useRef(null);

  const tiltEngine = useMemo(() => {
    let rafId = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const setVarsFromXY = (x, y) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;
      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`
      };
      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = ts => {
      if (!running) return;
      const dt = (ts - (lastTs || ts)) / 1000;
      lastTs = ts;
      const k = 1 - Math.exp(-dt / 0.14);
      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;
      setVarsFromXY(currentX, currentY);
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) { currentX = x; currentY = y; setVarsFromXY(x, y); },
      setTarget(x, y) { targetX = x; targetY = y; if(!running){ running=true; rafId=requestAnimationFrame(step); }},
      toCenter() { if(shellRef.current) this.setTarget(shellRef.current.clientWidth/2, shellRef.current.clientHeight/2); },
      cancel() { if(rafId) cancelAnimationFrame(rafId); running=false; }
    };
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const onMove = e => {
      const rect = shell.getBoundingClientRect();
      tiltEngine.setTarget(e.clientX - rect.left, e.clientY - rect.top);
    };
    
    const onLeave = () => tiltEngine.toCenter();

    const handleMotion = (e) => {
      if (!e.beta || !e.gamma) return;
      const x = clamp((shell.clientWidth/2) + e.gamma * mobileTiltSensitivity, 0, shell.clientWidth);
      const y = clamp((shell.clientHeight/2) + (e.beta - 20) * mobileTiltSensitivity, 0, shell.clientHeight);
      tiltEngine.setTarget(x, y);
    };

    shell.addEventListener('pointermove', onMove);
    shell.addEventListener('pointerleave', onLeave);
    
    if (enableMobileTilt) {
        window.addEventListener('deviceorientation', handleMotion);
    }

    tiltEngine.setImmediate(shell.clientWidth/2, shell.clientHeight/2);

    return () => {
      shell.removeEventListener('pointermove', onMove);
      shell.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('deviceorientation', handleMotion);
      tiltEngine.cancel();
    };
  }, [tiltEngine, enableMobileTilt, mobileTiltSensitivity]);

  return (
    <div ref={wrapRef} className="pc-card-wrapper" style={{'--inner-gradient': DEFAULT_INNER_GRADIENT}}>
      <div className="pc-behind" />
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            <div className="pc-shine" />
            <div className="pc-glare" />
            
            <div className="pc-content pc-avatar-content">
              <img className="avatar" src={avatarUrl} alt="Profile" />
              
              <div className="pc-lang-selector">
                <button className="lang-btn fa-btn" onClick={() => onSelectLang('fa')}>فارسی</button>
                <button className="lang-btn en-btn" onClick={() => onSelectLang('en')}>English</button>
              </div>
            </div>

            <div className="pc-content">
              <div className="pc-details">
                <h3 className="dual-name">
                    <span className="en-name">{nameEn}</span>
                    <span className="fa-name">{nameFa}</span>
                </h3>
                <p className="dual-title">
                   <span className="en-title">{titleEn}</span>
                   <span className="separator">-</span>
                   <span className="fa-title">{titleFa}</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(ProfileCard);