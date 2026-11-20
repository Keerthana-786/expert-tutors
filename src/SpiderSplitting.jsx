import React, { useEffect, useRef } from 'react';

/**
 * Global Spider Splitting & Button Breakdown Effect
 * Whenever any button is clicked:
 * 1. The button undergoes a breakdown/shatter recoil animation.
 * 2. An egg/core fractures and miniature glowing spiders split outward,
 *    scurrying across the screen with animated walking legs and web trails!
 */
export default function SpiderSplitting() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Active spiders and shockwaves
    const spiders = [];
    const shockwaves = [];
    const webShards = [];

    // Helper: Mini Spider class
    class MiniSpider {
      constructor(x, y, angle, speed, colorType) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.friction = 0.96;
        this.size = 3.5 + Math.random() * 2.5;
        this.colorType = colorType || (Math.random() > 0.4 ? 'red' : 'blue');
        this.life = 1.0;
        this.decay = 0.016 + Math.random() * 0.012;
        this.walkPhase = Math.random() * Math.PI * 2;
        this.walkSpeed = 0.35 + Math.random() * 0.25;
        this.trail = [];
        this.maxTrail = 6;
        this.turnTimer = Math.floor(Math.random() * 20);
      }

      update() {
        this.trail.push({ x: this.x, y: this.y, life: this.life });
        if (this.trail.length > this.maxTrail) this.trail.shift();

        // Jitter / scurry steering
        this.turnTimer--;
        if (this.turnTimer <= 0) {
          this.angle += (Math.random() - 0.5) * 0.6;
          this.turnTimer = Math.floor(10 + Math.random() * 15);
        }

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.speed *= this.friction;
        if (this.speed < 1.2) this.speed = 1.2; // Keep crawling until fade

        this.walkPhase += this.walkSpeed;
        this.life -= this.decay;
      }

      draw(c) {
        if (this.life <= 0) return;
        c.save();

        // 1. Draw web trail behind spider
        if (this.trail.length > 1) {
          c.beginPath();
          c.moveTo(this.trail[0].x, this.trail[0].y);
          for (let i = 1; i < this.trail.length; i++) {
            c.lineTo(this.trail[i].x, this.trail[i].y);
          }
          c.strokeStyle = this.colorType === 'red' 
            ? `rgba(241, 43, 53, ${this.life * 0.3})`
            : `rgba(22, 139, 255, ${this.life * 0.35})`;
          c.lineWidth = 1;
          c.stroke();
        }

        c.translate(this.x, this.y);
        c.rotate(this.angle + Math.PI / 2); // orient forward

        const primaryColor = this.colorType === 'red' ? '#ff2b38' : '#00e5ff';
        const glowColor = this.colorType === 'red' ? 'rgba(255, 43, 56, ' : 'rgba(0, 229, 255, ';

        // 2. Draw 8 jointed articulated legs with realistic walking motion
        const legCount = 4; // 4 on each side = 8 legs
        const s = this.size;

        c.strokeStyle = `rgba(220, 230, 245, ${this.life * 0.9})`;
        c.lineWidth = 1.1;
        c.lineCap = 'round';
        c.lineJoin = 'round';

        for (let side = -1; side <= 1; side += 2) {
          for (let i = 0; i < legCount; i++) {
            // Alternating tripod walk gait
            const phaseOffset = (i % 2 === 0 ? 0 : Math.PI) + (side === 1 ? Math.PI : 0);
            const swing = Math.sin(this.walkPhase + phaseOffset) * 0.35;

            // Base angles for legs pointing forward, sideways, backward
            const baseAngles = [-0.65, -0.2, 0.3, 0.75];
            const currentAngle = baseAngles[i] + swing;

            const kneeDist = s * (1.6 + (i === 0 || i === 3 ? 0.3 : 0.6));
            const kneeX = side * Math.cos(currentAngle) * kneeDist;
            const kneeY = Math.sin(currentAngle) * kneeDist + (i - 1.5) * 1.2;

            const footDist = s * (2.4 + (i === 0 || i === 3 ? 0.5 : 0.9));
            const footX = side * Math.cos(currentAngle + 0.35 * side) * footDist;
            const footY = Math.sin(currentAngle + 0.35 * side) * footDist + (i - 1.5) * 1.5;

            c.beginPath();
            c.moveTo(side * (s * 0.4), (i - 1.5) * 1.5);
            c.lineTo(kneeX, kneeY);
            c.lineTo(footX, footY);
            c.stroke();
          }
        }

        // 3. Draw Spider Body (Abdomen & Cephalothorax)
        // Abdomen (rear)
        c.beginPath();
        c.ellipse(0, s * 0.7, s * 0.85, s * 1.15, 0, 0, Math.PI * 2);
        c.fillStyle = '#0c0f1d';
        c.fill();
        c.strokeStyle = primaryColor;
        c.lineWidth = 1.2;
        c.stroke();

        // Neon mark on abdomen
        c.beginPath();
        c.moveTo(0, s * 0.2);
        c.lineTo(s * 0.35, s * 0.65);
        c.lineTo(0, s * 0.85);
        c.lineTo(-s * 0.35, s * 0.65);
        c.closePath();
        c.fillStyle = primaryColor;
        c.shadowColor = primaryColor;
        c.shadowBlur = 8;
        c.fill();
        c.shadowBlur = 0; // reset

        // Cephalothorax (head/chest)
        c.beginPath();
        c.ellipse(0, -s * 0.45, s * 0.65, s * 0.65, 0, 0, Math.PI * 2);
        c.fillStyle = '#141a2c';
        c.fill();
        c.strokeStyle = primaryColor;
        c.lineWidth = 1;
        c.stroke();

        // Glowing red/cyan eyes
        c.fillStyle = '#ffffff';
        c.beginPath();
        c.arc(-s * 0.25, -s * 0.7, s * 0.2, 0, Math.PI * 2);
        c.arc(s * 0.25, -s * 0.7, s * 0.2, 0, Math.PI * 2);
        c.fill();

        c.fillStyle = primaryColor;
        c.beginPath();
        c.arc(-s * 0.25, -s * 0.7, s * 0.12, 0, Math.PI * 2);
        c.arc(s * 0.25, -s * 0.7, s * 0.12, 0, Math.PI * 2);
        c.fill();

        c.restore();
      }
    }

    // Helper: Shockwave ring from click
    class Shockwave {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 4;
        this.maxRadius = 55 + Math.random() * 25;
        this.color = color || '#ff2b38';
        this.life = 1.0;
      }
      update() {
        this.radius += (this.maxRadius - this.radius) * 0.22 + 1.5;
        this.life -= 0.045;
      }
      draw(c) {
        if (this.life <= 0) return;
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.strokeStyle = this.color === 'red' ? `rgba(241, 43, 53, ${this.life * 0.8})` : `rgba(22, 139, 255, ${this.life * 0.8})`;
        c.lineWidth = 2 * this.life;
        c.stroke();

        // Subtle geometric web lines inside shockwave
        for (let i = 0; i < 8; i++) {
          const a = (i * Math.PI) / 4;
          c.beginPath();
          c.moveTo(this.x, this.y);
          c.lineTo(this.x + Math.cos(a) * this.radius, this.y + Math.sin(a) * this.radius);
          c.strokeStyle = `rgba(255, 255, 255, ${this.life * 0.25})`;
          c.lineWidth = 0.8;
          c.stroke();
        }
        c.restore();
      }
    }

    // Helper: Web Shards bursting
    class WebShard {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.length = 8 + Math.random() * 12;
        this.life = 1.0;
        this.decay = 0.03 + Math.random() * 0.02;
        this.rot = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.3;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.94;
        this.vy *= 0.94;
        this.rot += this.rotSpeed;
        this.life -= this.decay;
      }
      draw(c) {
        if (this.life <= 0) return;
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rot);
        c.beginPath();
        c.moveTo(-this.length / 2, 0);
        c.lineTo(this.length / 2, 0);
        c.strokeStyle = `rgba(255, 255, 255, ${this.life * 0.7})`;
        c.lineWidth = 1;
        c.stroke();
        c.restore();
      }
    }

    // Main animation loop
    const render = () => {
      animationFrameId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        shockwaves[i].update();
        shockwaves[i].draw(ctx);
        if (shockwaves[i].life <= 0) shockwaves.splice(i, 1);
      }

      // Update & draw shards
      for (let i = webShards.length - 1; i >= 0; i--) {
        webShards[i].update();
        webShards[i].draw(ctx);
        if (webShards[i].life <= 0) webShards.splice(i, 1);
      }

      // Update & draw spiders
      for (let i = spiders.length - 1; i >= 0; i--) {
        spiders[i].update();
        spiders[i].draw(ctx);
        if (spiders[i].life <= 0) spiders.splice(i, 1);
      }

      if (shockwaves.length || webShards.length || spiders.length) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Trigger Spider Splitting & Button Breakdown on any button click
    const handleGlobalClick = (e) => {
      // Find nearest button or clickable control
      const targetBtn = e.target.closest(
        'button, [role="button"], a.primary-btn, a.secondary-btn, .clickable-card'
      );
      if (!targetBtn) return;

      const x = e.clientX;
      const y = e.clientY;

      // 1. Button Breakdown Effect: Add temporary CSS class
      targetBtn.classList.remove('btn-breakdown-active');
      // Force reflow
      void targetBtn.offsetWidth;
      targetBtn.classList.add('btn-breakdown-active');
      setTimeout(() => {
        targetBtn.classList.remove('btn-breakdown-active');
      }, 500);

      // 2. Spider Splitting: Spawn 7 to 11 mini spiders splitting outward
      const count = 7 + Math.floor(Math.random() * 5);
      const baseAngle = Math.random() * Math.PI * 2;
      for (let i = 0; i < count; i++) {
        // Distribute evenly in a circle with small randomness
        const angle = baseAngle + (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const speed = 4.5 + Math.random() * 5.5;
        const colorType = i % 2 === 0 ? 'red' : 'blue';
        spiders.push(new MiniSpider(x, y, angle, speed, colorType));
      }

      // Shockwave & web shards
      shockwaves.push(new Shockwave(x, y, Math.random() > 0.5 ? 'red' : 'blue'));
      for (let i = 0; i < 8; i++) {
        webShards.push(new WebShard(x, y));
      }
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('click', handleGlobalClick, { capture: true });

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}
