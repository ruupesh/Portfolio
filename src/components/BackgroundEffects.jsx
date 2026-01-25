import React, { useEffect } from "react";

/**
 * BackgroundEffects
 * Implements visual/interactive parity with styles/main.js:
 * - Reveal on scroll for elements with .reveal
 * - Parallax for .hero-content
 * - Particles backdrop (.particles + .particle children)
 * - Floating tech icons (.floating-icons + .floating-icon children)
 * - 3D tilt for cards with .tilt-card
 * - Animated counters for .stat-number[data-target]
 * - Magnetic hover effect for .btn
 * - Cursor glow follower
 */
const BackgroundEffects = () => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    // ---------- Helpers ----------
    const on = (el, evt, handler, opts) => el && el.addEventListener(evt, handler, opts);
    const off = (el, evt, handler) => el && el.removeEventListener(evt, handler);

    // ---------- Animated counters for .stat-number[data-target] ----------
    const animateCounter = (el) => {
      const target = parseFloat(el.getAttribute("data-target") || "0");
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const tick = () => {
        current += step;
        if (current < target) {
          el.textContent = `${Math.floor(current)}`;
          requestAnimationFrame(tick);
        } else {
          el.textContent = Number.isInteger(target) ? `${target}` : `${target.toFixed(1)}`;
        }
      };
      tick();
    };

    // ---------- Reveal on scroll (IntersectionObserver) ----------
    // Observe sections to reveal all their content at once
    const sections = Array.from(document.querySelectorAll("section"));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal everything in this section
            const reveals = entry.target.querySelectorAll(".reveal");
            reveals.forEach((el) => el.classList.add("active"));
            
            // Trigger all counters in this section
            const stats = entry.target.querySelectorAll(".stat-number[data-target]");
            stats.forEach(s => {
              if (s.textContent === "0") {
                animateCounter(s);
              }
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    sections.forEach((el) => revealObserver.observe(el));

    // Handle .reveal elements that might be outside sections
    const loneReveals = Array.from(document.querySelectorAll(".reveal")).filter(el => !el.closest('section'));
    loneReveals.forEach(el => revealObserver.observe(el));

    // ---------- Parallax for hero content ----------
    const heroContent = document.querySelector(".hero-content");
    const parallaxHandler = () => {
      if (!heroContent) return;
      const scrolled = window.pageYOffset || 0;
      if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = String(1 - scrolled / window.innerHeight);
      }
    };
    on(window, "scroll", parallaxHandler, { passive: true });
    parallaxHandler();

    // ---------- Particles backdrop ----------
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles";
    document.body.appendChild(particlesContainer);

    const particleCount = 30;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.width = `${Math.random() * 10 + 5}px`;
      p.style.height = `${Math.random() * 10 + 5}px`;
      p.style.animationDelay = `${Math.random() * 20}s`;
      p.style.animationDuration = `${Math.random() * 10 + 15}s`;
      particlesContainer.appendChild(p);
      particles.push(p);
    }

    // ---------- Floating tech icons ----------
    const icons = ["💻", "🚀", "⚡", "🎯", "🔧", "☁️", "🤖", "📊", "🧠", "⚙️"];
    const floatingContainer = document.createElement("div");
    floatingContainer.className = "floating-icons";
    document.body.appendChild(floatingContainer);

    icons.forEach((icon, i) => {
      const el = document.createElement("div");
      el.className = "floating-icon";
      el.textContent = icon;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.animationDelay = `${i * 2.5}s`;
      floatingContainer.appendChild(el);
    });

    // ---------- 3D tilt for .tilt-card ----------
    const tiltCards = Array.from(document.querySelectorAll(".tilt-card"));
    const handleTiltMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };
    const handleTiltLeave = (e) => {
      const card = e.currentTarget;
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    };
    tiltCards.forEach((card) => {
      on(card, "mousemove", handleTiltMove);
      on(card, "mouseleave", handleTiltLeave);
    });

    // ---------- Magnetic buttons ----------
    const buttons = Array.from(document.querySelectorAll(".btn"));
    const handleBtnMove = (e) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };
    const handleBtnLeave = (e) => {
      const btn = e.currentTarget;
      btn.style.transform = "translate(0, 0)";
    };
    buttons.forEach((btn) => {
      on(btn, "mousemove", handleBtnMove);
      on(btn, "mouseleave", handleBtnLeave);
    });

    // ---------- Cursor glow ----------
    const cursorGlow = document.createElement("div");
    cursorGlow.className = "cursor-glow";
    cursorGlow.style.position = "fixed";
    cursorGlow.style.width = "400px";
    cursorGlow.style.height = "400px";
    cursorGlow.style.borderRadius = "50%";
    cursorGlow.style.background =
      "radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)";
    cursorGlow.style.pointerEvents = "none";
    cursorGlow.style.zIndex = "9999";
    cursorGlow.style.transform = "translate(-50%, -50%)";
    cursorGlow.style.transition = "opacity 0.3s";
    cursorGlow.style.opacity = "0";
    document.body.appendChild(cursorGlow);

    let mouseX = 0,
      mouseY = 0,
      glowX = 0,
      glowY = 0;
    const mouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.style.opacity = "1";
    };
    const mouseLeave = () => {
      cursorGlow.style.opacity = "0";
    };
    on(document, "mousemove", mouseMove);
    on(document, "mouseleave", mouseLeave);

    let rafId = 0;
    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      rafId = requestAnimationFrame(animateGlow);
    };
    rafId = requestAnimationFrame(animateGlow);

    // ---------- Cleanup ----------
    return () => {
      revealObserver.disconnect();
      off(window, "scroll", parallaxHandler);

      tiltCards.forEach((card) => {
        off(card, "mousemove", handleTiltMove);
        off(card, "mouseleave", handleTiltLeave);
      });

      buttons.forEach((btn) => {
        off(btn, "mousemove", handleBtnMove);
        off(btn, "mouseleave", handleBtnLeave);
      });

      off(document, "mousemove", mouseMove);
      off(document, "mouseleave", mouseLeave);
      if (rafId) cancelAnimationFrame(rafId);

      // Remove dynamic containers/elements
      if (particlesContainer && particlesContainer.parentNode) {
        particlesContainer.parentNode.removeChild(particlesContainer);
      }
      if (floatingContainer && floatingContainer.parentNode) {
        floatingContainer.parentNode.removeChild(floatingContainer);
      }
      if (cursorGlow && cursorGlow.parentNode) {
        cursorGlow.parentNode.removeChild(cursorGlow);
      }
    };
  }, []);

  // No DOM markup required; CSS handles visuals, JS above handles dynamic nodes
  return null;
};

export default BackgroundEffects;