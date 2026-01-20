import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";

const Skills = () => {
  const { skills } = usePortfolio();

  const skillCategories = [
    {
      name: "Programming Languages",
      icon: "💻",
      list: skills.languages,
      color: "var(--primary)",
      emphasis: "core",
    },
    {
      name: "GenAI",
      icon: "🤖",
      list: skills.genai,
      color: "#10b981",
      emphasis: "primary",
    },
    {
      name: "AgenticAI",
      icon: "🧠",
      list: skills.agenticai,
      color: "#f59e0b",
      emphasis: "primary",
    },
    {
      name: "Backend & APIs",
      icon: "⚙️",
      list: skills.backend,
      color: "var(--secondary)",
      emphasis: "core",
    },
    {
      name: "Cloud & DevOps",
      icon: "☁️",
      list: skills.cloud,
      color: "#0ea5e9",
      emphasis: "core",
    },
    {
      name: "Frontend",
      icon: "🎨",
      list: skills.frontend,
      color: "#ec4899",
      emphasis: "secondary",
    },
    {
      name: "Financial Skills",
      icon: "💰",
      list: skills.financial,
      color: "#22c55e",
      emphasis: "secondary",
    },
    {
      name: "Software Engineering",
      icon: "🛠️",
      list: skills.engineering,
      color: "#8b5cf6",
      emphasis: "core",
    },
    {
      name: "Data",
      icon: "📈",
      list: skills.data,
      color: "#14b8a6",
      emphasis: "secondary",
    },
  ];

  return (
    <section id="skills" className="section">
      <div className="section-container">
        <div className="section-header reveal">
          <h2>Technical Arsenal</h2>
        </div>
        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className={`skill-category reveal ${cat.emphasis}`}
              data-emphasis={cat.emphasis}
              style={{ "--cat-color": cat.color }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="cat-header">
                <div
                  className="cat-icon-wrapper"
                  style={{ "--cat-color": cat.color }}
                >
                  <span className="cat-icon">{cat.icon}</span>
                </div>
                <div className="cat-title-wrapper">
                  <h3>{cat.name}</h3>
                  <span className="skill-count">{cat.list.length} skills</span>
                </div>
              </div>
              <div className="skill-tags-wrapper">
                {cat.list.map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="skill-tag"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="skill-name">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;