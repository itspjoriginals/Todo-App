import { useEffect, useRef } from "react";

export default function CursorParticles() {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    const getThemeColor = () => {
      const primary =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--primary")
          .trim();

      return primary || `hsl(${Date.now() % 360}, 100%, 70%)`;
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 2;
        this.alpha = 1;
        this.velocityX = (Math.random() - 0.5) * 1.5;
        this.velocityY = (Math.random() - 0.5) * 1.5;
        this.color = getThemeColor();
      }

      update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.alpha -= 0.02;
        this.size *= 0.96;
      }

      draw() {
        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.current.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.current.splice(i, 1);
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = e => {
      for (let i = 0; i < 3; i++) {
        particles.current.push(new Particle(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
