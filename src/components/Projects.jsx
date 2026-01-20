import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";

const Projects = () => {
  const { projects } = usePortfolio();

  return (
    <section id="projects" className="section">
      <div className="section-container">
        <div className="section-header reveal">
          <h2>Featured Projects</h2>
        </div>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="project-top">
                <div className="project-header">
                  <h3>{project.name}</h3>
                </div>
                <div className="project-tags">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-content">
                <p
                  style={{
                    color: "var(--text-muted)",
                    marginBottom: "1.5rem",
                    lineHeight: "1.7",
                  }}
                >
                  {project.description}
                </p>
                <ul className="highlight-list">
                  {project.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;