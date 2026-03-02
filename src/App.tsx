import { useMemo, useState } from 'react'
import './App.css'
import projectsData from './data/projects.json'

type Project = {
  title: string
  category: string
  summary: string
  tools: string
  impact: string
  year: string
  labels?: string[]
}

const projects: Project[] = projectsData as Project[]
const ALL_CATEGORY = 'All'

function App() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  const filteredProjects = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return projects
    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  const categories = useMemo(() => {
    return [ALL_CATEGORY, ...new Set(projects.map((project) => project.category))]
  }, [])

  return (
    <main className="portfolio">
      <nav className="mini-menu" aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>

      <header id="home" className="hero">
        <p className="eyebrow">Cybersecurity Portfolio</p>
        <h1>
Cybersecurity enthusiast focused on defensive operations, traffic analysis, and secure web infrastructure.
        </h1>
        <div className="intro">
          <p>
            Computer Systems Engineering student in final year with academic
            training in Cybersecurity and foundational cloud computing
            knowledge across AWS, GCP, and DigitalOcean. Completed CCNA modules
            1 and 2 with solid understanding of networking fundamentals,
            routing, switching, and TCP/IP models.
          </p>
          <p>
            Hands-on experience in security-focused lab environments including
            vulnerability testing, network traffic analysis, DDoS detection
            automation, and Linux server hardening. Strong interest in Security
            Engineering and Blue Team operations, with practical experience in
            log monitoring, firewall configuration, and incident response
            automation using Python.
          </p>
          <p>
            Passionate about understanding how systems work internally and
            building secure, resilient infrastructure from the ground up.
          </p>
        </div>
        <div className="hero-actions">
          <a href="#projects" className="btn primary">
            View Projects
          </a>
          <a href="#contact" className="btn ghost">
            Contact
          </a>
        </div>
      </header>

      <section className="grid stats" aria-label="Key metrics">
        <article>
          <p className="number">{projects.length}+</p>
          <p>recent technical projects</p>
        </article>
        <article>
          <p className="number">{categories.length - 1}</p>
          <p>main focus areas</p>
        </article>
        <article>
          <p className="number">100%</p>
          <p>lab-based learning</p>
        </article>
      </section>

      <section id="projects" className="projects">
        <div className="section-head">
          <h2>Projects</h2>
          <div className="filters" role="tablist" aria-label="Filter projects">
            {categories.map((category) => (
              <button
                key={category}
                className={`chip ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                role="tab"
                aria-selected={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <p className="projects-intro">
          A broader set of hands-on cybersecurity projects focused on detection,
          hardening, security testing, and practical automation.
        </p>

        <div className="grid project-grid">
          {filteredProjects.map((project) => {
            const isExpanded = expandedProject === project.title
            return (
              <article key={project.title} className="project-card">
                <div className="card-top">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                {project.labels && project.labels.length > 0 && (
                  <div className="project-labels" aria-label="Project labels">
                    {project.labels.map((label) => (
                      <span key={`${project.title}-${label}`} className="project-label">
                        {label}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  className="text-btn"
                  onClick={() =>
                    setExpandedProject(isExpanded ? null : project.title)
                  }
                >
                  {isExpanded ? 'Hide details' : 'View details'}
                </button>
                {isExpanded && (
                  <div className="details">
                    <p>
                      <strong>Tools:</strong> {project.tools}
                    </p>
                    <p>
                      <strong>Impact:</strong> {project.impact}
                    </p>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>

      <section id="skills" className="skills">
        <h2>Skills</h2>
        <div className="skills-grid">
          <article>
            <h3>Blue Team</h3>
            <p>Basic monitoring, log analysis, and initial alert triage.</p>
          </article>
          <article>
            <h3>Web Security</h3>
            <p>Recon, OWASP Top 10 testing, and technical reporting.</p>
          </article>
          <article>
            <h3>Automation</h3>
            <p>Python/Bash scripts for repetitive tasks and hardening.</p>
          </article>
          <article>
            <h3>IT Fundamentals</h3>
            <p>Networking, Linux/Windows, and administration best practices.</p>
          </article>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Contact</h2>
        <p>Available here:</p>
        <div className="contact-links">
          <a href="mailto:os67583@gmail.com">os67583@gmail.com</a>
          <a href="https://github.com/salazar2001" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/oscar-salazar-709865232/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
