import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";

const companyUrls = {
  "Hashedin by Deloitte": "https://hashedin.com/",
  "CLSA": "https://www.clsa.com/",
  "Persistent Systems": "https://www.persistent.com/",
};

const hasMetrics = (text) =>
  /\d+%|\d+\s?hours?|\d+\s?mins?|50% to 99%|leading development|lead developer/i.test(
    text
  );

const Experience = () => {
  const { experience } = usePortfolio();

  return (
    <section id="experience" className="section">
      <div className="section-container">
        <div className="section-header reveal">
          <h2>Experience</h2>
        </div>
        <div className="timeline">
          {experience.map((exp, i) => {
            const isCurrent = exp.duration?.includes("Present");
            const companyInitial = exp.company?.charAt(0) || "";
            const url = companyUrls[exp.company];

            return (
              <motion.div
                key={`${exp.company}-${i}`}
                className="timeline-item reveal"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className={`timeline-dot ${isCurrent ? "current" : ""}`}></div>
                <div className="timeline-content">
                  <div className="experience-header-wrapper">
                    <div className="company-badge">
                      <span className="company-initial">{companyInitial}</span>
                    </div>
                    <div className="timeline-header">
                      <div className="role-info">
                        <div className="role-title-wrapper">
                          <div className="role-title">{exp.position}</div>
                          {isCurrent && <span className="current-badge">Current Role</span>}
                        </div>
                        {url ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="company-name company-link"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          <div className="company-name">{exp.company}</div>
                        )}
                        <div className="location-date">
                          <span className="location-icon">📍</span> {exp.location}
                          <span className="date-separator">•</span>
                          <span className="timeline-date">{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="responsibilities-section">
                    <div className="resp-label">
                      <span className="resp-icon">🎯</span>
                      <span>Key Contributions & Impact</span>
                    </div>
                    <div className="responsibility-list">
                      {exp.responsibilities.map((resp, index) => (
                        <motion.div
                          key={index}
                          className="responsibility-item"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: i * 0.2 + index * 0.1,
                            duration: 0.4,
                          }}
                          style={{ animationDelay: `${i * 0.2 + index * 0.1}s` }}
                        >
                          <div className={`resp-bullet ${hasMetrics(resp) ? "metric" : ""}`}></div>
                          <div className="resp-text">{resp}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;