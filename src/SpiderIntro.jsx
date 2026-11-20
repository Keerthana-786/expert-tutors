import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

/**
 * Cinematic Opening Intro Sequence:
 * Stage 1: Spider drops down on silk thread, twitches legs & eyes charge up with power.
 * Stage 2: SPIDER BLAST! Detonation of energy shockwaves, sparks & web fragments!
 * Stage 3: Official Expert Tutors Logo bursts outward from the blast center with glowing aura.
 * Stage 4: "EXPERT TUTORS" types in letter-by-letter with cyber typewriter effect + tagline.
 * Stage 5: Enter Academy trigger button with spider splitting breakdown.
 */
export default function SpiderIntro({ onFinish }) {
  // Stages: spider arrival and blast, book opening, logo reveal, then typewriter.
  const [stage, setStage] = useState('spider-descend');
  const [typedTitle, setTypedTitle] = useState('');
  const [showSlogan, setShowSlogan] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const blastCanvasRef = useRef(null);

  const fullTitle = 'EXPERT TUTORS';

  // Sequence controller
  useEffect(() => {
    // Stage 1: Spider descends (0 to 1.4s)
    const t1 = setTimeout(() => {
      setStage('spider-charge');
    }, 1400);

    // Stage 2: Spider Blast explosion! (1.4s to 2.2s)
    const t2 = setTimeout(() => {
      setStage('blast');
      triggerBlastParticles();
    }, 2200);

    // Stage 3: The book opens after the blast.
    const t3 = setTimeout(() => {
      setStage('book-open');
    }, 2800);

    // Stage 4: Reveal the logo after the book opens.
    const t4 = setTimeout(() => {
      setStage('logo-emerge');
    }, 3800);

    // Stage 5: Start typewriter.
    const t5 = setTimeout(() => {
      setStage('typing');
    }, 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  // Typewriter effect for "EXPERT TUTORS", followed by slogan & tagline reveal
  useEffect(() => {
    if (stage !== 'typing') return;

    let titleIndex = 0;
    let sTimer;
    let tTimer;
    let rTimer;

    const titleInterval = setInterval(() => {
      if (titleIndex <= fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, titleIndex));
        titleIndex++;
      } else {
        clearInterval(titleInterval);

        // 1. Reveal main slogan with subtle fade-in
        sTimer = setTimeout(() => {
          setShowSlogan(true);
        }, 150);

        // 2. Reveal supporting tagline smoothly after main slogan
        tTimer = setTimeout(() => {
          setShowTagline(true);
        }, 450);

        // 3. Mark ready for CTA button activation
        rTimer = setTimeout(() => {
          setStage('ready');
        }, 750);
      }
    }, 85);

    return () => {
      clearInterval(titleInterval);
      clearTimeout(sTimer);
      clearTimeout(tTimer);
      clearTimeout(rTimer);
    };
  }, [stage]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((v) => !v);
    }, 450);
    return () => clearInterval(cursorInterval);
  }, []);

  // Blast Canvas Particle Explosion
  const triggerBlastParticles = () => {
    const canvas = blastCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = canvas.width / 2;
    const cy = canvas.height * 0.44;

    const particles = [];
    const rings = [];

    // Shockwave rings
    rings.push({ r: 5, maxR: Math.max(canvas.width, canvas.height) * 0.7, color: '#ff2b38', width: 6, alpha: 1 });
    rings.push({ r: 5, maxR: Math.max(canvas.width, canvas.height) * 0.5, color: '#00e5ff', width: 4, alpha: 1 });

    // 80 blast sparks & cyber web shards
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 16;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 4,
        color: Math.random() > 0.45 ? '#ff2b38' : Math.random() > 0.3 ? '#00e5ff' : '#ffffff',
        alpha: 1,
        decay: 0.015 + Math.random() * 0.02,
        isLine: Math.random() > 0.6,
        lineLength: 8 + Math.random() * 20,
        rot: Math.random() * Math.PI * 2,
      });
    }

    let animId;
    const animateBlast = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r += (ring.maxR - ring.r) * 0.16 + 2;
        ring.alpha -= 0.022;
        if (ring.alpha > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
          ctx.strokeStyle = ring.color;
          ctx.globalAlpha = Math.max(0, ring.alpha);
          ctx.lineWidth = ring.width * ring.alpha;
          ctx.shadowColor = ring.color;
          ctx.shadowBlur = 15;
          ctx.stroke();
          ctx.restore();
        } else {
          rings.splice(i, 1);
        }
      }

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.strokeStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;

          if (p.isLine) {
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.beginPath();
            ctx.moveTo(-p.lineLength / 2, 0);
            ctx.lineTo(p.lineLength / 2, 0);
            ctx.lineWidth = 1.5;
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        } else {
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0 || rings.length > 0) {
        animId = requestAnimationFrame(animateBlast);
      }
    };
    animateBlast();
  };

  const isSpiderVisible = stage === 'spider-descend' || stage === 'spider-charge';
  const isBookVisible = stage === 'book-open';
  const isLogoVisible = stage === 'logo-emerge' || stage === 'typing' || stage === 'ready';

  return (
    <motion.div
      className="spider-intro-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {/* Background Web Matrix */}
      <div className="spider-intro-bg">
        <div className="spider-matrix-grid" />
        <div className="spider-web-halo halo-1" />
        <div className="spider-web-halo halo-2" />
        <div className="spider-web-halo halo-3" />
      </div>

      {/* Blast Canvas */}
      <canvas ref={blastCanvasRef} className="spider-blast-canvas" />

      {/* Skip Button */}
      <button className="intro-skip-btn" onClick={onFinish}>
        <span>Skip</span>
        <ArrowRight size={14} />
      </button>

      <div className="spider-intro-stage">
        {/* ============================================================== */}
        {/* PHASE 1 & 2: THE SPIDER DESCENDS, CHARGES, AND BLASTS          */}
        {/* ============================================================== */}
        <AnimatePresence>
          {isSpiderVisible && (
            <motion.div
              className="spider-actor-wrapper"
              initial={{ y: -380, opacity: 0 }}
              animate={
                stage === 'spider-charge'
                  ? {
                      y: 0,
                      opacity: 1,
                      scale: [1, 1.15, 0.95, 1.3, 0.8, 1.45],
                      rotate: [0, -3, 3, -6, 6, 0],
                      filter: [
                        'drop-shadow(0 0 15px #ff2b38)',
                        'drop-shadow(0 0 40px #00e5ff)',
                        'drop-shadow(0 0 70px #ff2b38)',
                      ],
                    }
                  : { y: 0, opacity: 1, scale: 1 }
              }
              exit={{
                scale: 2.8,
                opacity: 0,
                filter: 'brightness(4) drop-shadow(0 0 80px #ffffff)',
                transition: { duration: 0.18 },
              }}
              transition={{
                y: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.5 },
                scale: { duration: 0.8, repeat: Infinity, repeatType: 'reverse' },
              }}
            >
              {/* Glowing Silk Web Strand */}
              <div className="spider-silk-thread" />

              {/* Detailed Animated Mechanical Spider SVG */}
              <div className="spider-svg-wrap">
                <svg
                  viewBox="0 0 200 200"
                  className={`spider-svg ${stage === 'spider-charge' ? 'spider-charging' : ''}`}
                >
                  <defs>
                    <radialGradient id="spiderGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ff2b38" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#1a060a" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0a0c16" stopOpacity="0.3" />
                    </radialGradient>
                    <filter id="neonBlur" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* 8 Articulated Spider Legs */}
                  {/* Left Legs */}
                  <g className="spider-legs-left">
                    {/* Leg 1 */}
                    <path
                      d="M 85 90 Q 40 40 25 65 T 10 115"
                      fill="none"
                      stroke="#00e5ff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    {/* Leg 2 */}
                    <path
                      d="M 80 100 Q 30 75 20 105 T 8 140"
                      fill="none"
                      stroke="#cbd8f0"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* Leg 3 */}
                    <path
                      d="M 80 115 Q 35 125 30 150 T 15 178"
                      fill="none"
                      stroke="#cbd8f0"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* Leg 4 */}
                    <path
                      d="M 85 125 Q 50 160 40 185 T 30 200"
                      fill="none"
                      stroke="#ff2b38"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Right Legs */}
                  <g className="spider-legs-right">
                    {/* Leg 1 */}
                    <path
                      d="M 115 90 Q 160 40 175 65 T 190 115"
                      fill="none"
                      stroke="#00e5ff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    {/* Leg 2 */}
                    <path
                      d="M 120 100 Q 170 75 180 105 T 192 140"
                      fill="none"
                      stroke="#cbd8f0"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* Leg 3 */}
                    <path
                      d="M 120 115 Q 165 125 170 150 T 185 178"
                      fill="none"
                      stroke="#cbd8f0"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* Leg 4 */}
                    <path
                      d="M 115 125 Q 150 160 160 185 T 170 200"
                      fill="none"
                      stroke="#ff2b38"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Spider Abdomen (Lower Body) */}
                  <ellipse
                    cx="100"
                    cy="132"
                    rx="26"
                    ry="36"
                    fill="url(#spiderGlow)"
                    stroke="#ff2b38"
                    strokeWidth="2.5"
                    filter="url(#neonBlur)"
                  />

                  {/* Glowing Spider Hourglass / Sigil */}
                  <polygon
                    points="93,116 107,116 100,128"
                    fill="#00e5ff"
                    filter="url(#neonBlur)"
                  />
                  <polygon
                    points="93,142 107,142 100,128"
                    fill="#ff2b38"
                    filter="url(#neonBlur)"
                  />

                  {/* Spider Cephalothorax (Upper Body/Chest) */}
                  <circle
                    cx="100"
                    cy="92"
                    r="20"
                    fill="#0d1222"
                    stroke="#00e5ff"
                    strokeWidth="2.2"
                  />

                  {/* Mandibles / Fangs */}
                  <path
                    d="M 94 76 Q 96 66 91 62"
                    fill="none"
                    stroke="#ff2b38"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 106 76 Q 104 66 109 62"
                    fill="none"
                    stroke="#ff2b38"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Glowing Spider Eyes */}
                  <circle cx="94" cy="84" r="3.2" fill="#ffffff" filter="url(#neonBlur)" />
                  <circle cx="106" cy="84" r="3.2" fill="#ffffff" filter="url(#neonBlur)" />
                  <circle cx="89" cy="89" r="2.2" fill="#ff2b38" />
                  <circle cx="111" cy="89" r="2.2" fill="#ff2b38" />
                </svg>
              </div>

              <div className="spider-charge-pulse">
                <span>{stage === 'spider-charge' ? 'CRITICAL ENERGY ACCUMULATION' : 'INITIATING SYSTEM'}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isBookVisible && (
            <motion.div
              className="intro-book-scene"
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <div className="intro-book" role="img" aria-label="An animated book opens">
                <div className="intro-book-pages">
                  <span>EXPERT</span>
                  <span>TUTORS</span>
                  <small>Your Knowledge. Your Mission.</small>
                </div>
                <div className="intro-book-cover" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================================== */}
        {/* PHASE 3 & 4: LOGO REVEAL & "EXPERT TUTORS" TYPEWRITER          */}
        {/* ============================================================== */}
        <AnimatePresence>
          {isLogoVisible && (
            <motion.div
              className="logo-reveal-wrapper"
              initial={{ scale: 0, opacity: 0, rotate: -25 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 170,
                damping: 18,
                mass: 1.1,
              }}
            >
              {/* Glowing Holographic Halo around Logo */}
              <div className="logo-holo-rings">
                <div className="holo-ring holo-ring-outer" />
                <div className="holo-ring holo-ring-inner" />
                <div className="holo-glow" />
              </div>

              {/* Official Logo */}
              <motion.div
                className="intro-logo-box"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/expert-tutors-logo.png"
                  alt="Expert Tutors Official Logo"
                  className="intro-main-logo"
                />
              </motion.div>

              {/* Typewriter Container for "EXPERT TUTORS" */}
              <div className="typewriter-container">
                <h1 className="typewriter-title">
                  {typedTitle.startsWith('EXPERT') ? (
                    <>
                      <span className="title-white">{typedTitle.slice(0, 6)}</span>
                      {typedTitle.length > 6 && (
                        <span className="title-gold">{typedTitle.slice(6)}</span>
                      )}
                    </>
                  ) : (
                    <span className="title-white">{typedTitle}</span>
                  )}
                  {showCursor && <span className="typewriter-cursor">|</span>}
                </h1>

                {/* 1. Main Brand Slogan: Electric-blue glow, uppercase, elegant letter-spacing, subtle fade-in */}
                <motion.div
                  className="intro-main-slogan"
                  initial={{ opacity: 0, y: 10 }}
                  animate={showSlogan || stage === 'ready' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  EVERY STUDENT HAS A HERO.
                </motion.div>

                {/* 2. Supporting Tagline: Beneath main slogan, smaller font, soft blue-white, smooth fade-in */}
                <motion.div
                  className="intro-supporting-tagline"
                  initial={{ opacity: 0, y: 8 }}
                  animate={showTagline || stage === 'ready' ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
                >
                  YOUR CHALLENGE. OUR EXPERTISE. YOUR SUCCESS.
                </motion.div>

                {/* 3. Main CTA Button: "⚡ BEGIN YOUR MISSION →" */}
                <motion.div
                  className="intro-action-area"
                  initial={{ opacity: 0, y: 15 }}
                  animate={stage === 'ready' ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <button className="enter-academy-btn primary-btn" onClick={onFinish}>
                    <Zap size={16} className="btn-zap" />
                    <span>BEGIN YOUR MISSION</span>
                    <ArrowRight size={17} />
                  </button>

                  {/* 4. Bottom Verification Text: "ACADEMIC EXCELLENCE STARTS HERE" */}
                  <div className="intro-badge-note">
                    <Shield size={12} />
                    <span>ACADEMIC EXCELLENCE STARTS HERE</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
