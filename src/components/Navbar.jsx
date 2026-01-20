import React, { useEffect } from "react";

const Navbar = () => {
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");
    const mobileBtn = document.querySelector(".mobile-menu-btn");

    const handleScroll = () => {
      if (!navbar) return;
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      navbar.style.setProperty("--scroll-progress", `${progress}%`);
    };

    const toggleMobile = () => {
      navLinks?.classList.toggle("active");
    };

    const handleLinkClick = (e) => {
      const anchor = e.currentTarget;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target && navbar) {
          const offset = navbar.offsetHeight || 0;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
        navLinks?.classList.remove("active");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    mobileBtn?.addEventListener("click", toggleMobile);
    const links = document.querySelectorAll(".nav-links a[href^='#']");
    links.forEach((link) => link.addEventListener("click", handleLinkClick));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mobileBtn?.removeEventListener("click", toggleMobile);
      links.forEach((link) => link.removeEventListener("click", handleLinkClick));
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#home" className="nav-logo">
          RB
        </a>
        <button className="mobile-menu-btn" aria-label="Toggle menu">☰</button>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#achievements">Achievements</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;