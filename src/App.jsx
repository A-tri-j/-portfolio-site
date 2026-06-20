import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  ArrowRight,
  ExternalLink,
  Code2,
  Sparkles,
  Menu,
  X,
  Database,
  Brain,
  Cloud,
  Wrench,
  GraduationCap,
  Sun,
  Moon,
  Download,
  ArrowUp,
  Quote,
} from "lucide-react";
import "./index.css";

function Github(props) {
  var size = props.size || 18;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.11.81 2.25 0 1.635-.015 2.94-.015 3.345 0 .315.225.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function Linkedin(props) {
  var size = props.size || 18;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

var fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function Section(props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={props.className || ""}
    >
      {props.children}
    </motion.div>
  );
}

function useTypingEffect(words, speed, pause) {
  var state = useState("");
  var text = state[0];
  var setText = state[1];

  var idxState = useState(0);
  var index = idxState[0];
  var setIndex = idxState[1];

  var delState = useState(false);
  var deleting = delState[0];
  var setDeleting = delState[1];

  useEffect(
    function () {
      var current = words[index % words.length];
      var timeout;

      if (!deleting && text === current) {
        timeout = setTimeout(function () {
          setDeleting(true);
        }, pause);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex(index + 1);
      } else {
        timeout = setTimeout(
          function () {
            if (deleting) {
              setText(current.slice(0, text.length - 1));
            } else {
              setText(current.slice(0, text.length + 1));
            }
          },
          deleting ? speed / 2 : speed
        );
      }

      return function () {
        clearTimeout(timeout);
      };
    },
    [text, deleting, index, words, speed, pause]
  );

  return text;
}

export default function App() {
  var menuState = useState(false);
  var menuOpen = menuState[0];
  var setMenuOpen = menuState[1];

  var themeState = useState(localStorage.getItem("theme") || "dark");
  var theme = themeState[0];
  var setTheme = themeState[1];

  var loadState = useState(true);
  var loading = loadState[0];
  var setLoading = loadState[1];

  var scrollState = useState(0);
  var scrollPct = scrollState[0];
  var setScrollPct = scrollState[1];

  var topState = useState(false);
  var showScrollTop = topState[0];
  var setShowScrollTop = topState[1];

  var activeState = useState("about");
  var activeSection = activeState[0];
  var setActiveSection = activeState[1];

  var cursorDot = useRef(null);
  var cursorRing = useRef(null);

  var typedRole = useTypingEffect(
    ["Full-Stack Developer", "React Enthusiast", "Problem Solver", "GenAI Explorer"],
    90,
    1500
  );

  var navItems = [
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(
    function () {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    },
    [theme]
  );

  useEffect(function () {
    var t = setTimeout(function () {
      setLoading(false);
    }, 1400);
    return function () {
      clearTimeout(t);
    };
  }, []);

  useEffect(
    function () {
      document.body.style.overflow = menuOpen ? "hidden" : "auto";
    },
    [menuOpen]
  );

  useEffect(function () {
    function onScroll() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowScrollTop(scrollTop > 500);

      var sectionIds = [];
      for (var k = 0; k < navItems.length; k++) {
        sectionIds.push(navItems[k].href.replace("#", ""));
      }

      for (var i = 0; i < sectionIds.length; i++) {
        var id = sectionIds[i];
        var el = document.getElementById(id);
        if (el) {
          var rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return function () {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(function () {
    var isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) {
      return;
    }
    document.body.classList.add("custom-cursor-on");

    function move(e) {
      if (cursorDot.current) {
        cursorDot.current.style.left = e.clientX + "px";
        cursorDot.current.style.top = e.clientY + "px";
      }
      if (cursorRing.current) {
        cursorRing.current.style.left = e.clientX + "px";
        cursorRing.current.style.top = e.clientY + "px";
      }
    }
    window.addEventListener("mousemove", move);
    return function () {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("custom-cursor-on");
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function openMenu() {
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  var projects = [
    {
      title: "GreatKart - E-Commerce Website",
      desc: "Fully functional e-commerce platform with product listings, cart, checkout, user authentication and order management.",
      tech: ["Django", "PostgreSQL", "HTML", "CSS"],
      repo: "https://github.com/A-tri-j/greatkart-django",
      live: null,
    },
    {
      title: "MAKAUT ERP Portal",
      desc: "Recreated the MAKAUT university ERP portal with improved UI/UX - student login, result viewing and notice board modules.",
      tech: ["Django", "HTML", "CSS", "JavaScript"],
      repo: "https://github.com/A-tri-j/MAKAUT-ERP-portal",
      live: null,
    },
    {
      title: "Simon Says Memory Game",
      desc: "Interactive browser-based memory game with progressive difficulty, dynamic colour sequences, score tracking and responsive design.",
      tech: ["HTML", "CSS", "JavaScript"],
      repo: "https://github.com/A-tri-j/Simon-Says-memory-game",
      live: null,
    },
  ];

  var education = [
    {
      title: "B.Tech - Information Technology",
      school: "Maulana Abul Kalam Azad University of Technology (MAKAUT)",
      year: "2024 - 2028, Currently in 2nd Year",
      score: "SGPA 8.15",
    },
    {
      title: "Higher Secondary (Class 12)",
      school: "Add your school name here",
      year: "HS Board Examination",
      score: "79%",
    },
    {
      title: "Secondary (Class 10)",
      school: "Add your school name here",
      year: "Madhyamik Board Examination",
      score: "81%",
    },
  ];

  var languages = ["C", "Java", "Python", "JavaScript", "React", "HTML", "CSS"];
  var databases = ["MySQL", "PostgreSQL", "Redis"];
  var genai = ["RAG", "LangChain", "Generative AI Fundamentals"];
  var deployment = ["Vercel", "Railway", "Render"];
  var tools = ["Jupyter Notebook", "VS Code", "Git", "GitHub"];

  var skillLevels = [
    { name: "JavaScript", level: 80 },
    { name: "Python", level: 78 },
    { name: "Java", level: 72 },
    { name: "Django", level: 75 },
    { name: "React", level: 70 },
    { name: "SQL / Databases", level: 73 },
  ];

  var testimonials = [
    {
      text: "Atrij has a strong grasp of full-stack fundamentals and picks up new technologies fast. Great to have in a hackathon team.",
      name: "Add Name",
      role: "Hackathon Teammate",
    },
    {
      text: "Consistently curious and reliable, actively contributes to workshops and helps peers debug their projects.",
      name: "Add Name",
      role: "GDG On Campus Mentor",
    },
  ];

  var navLinks = [];
  for (var ni = 0; ni < navItems.length; ni++) {
    var item = navItems[ni];
    var sectionId = item.href.replace("#", "");
    var isActive = activeSection === sectionId;
    navLinks.push(
      <a key={item.label} href={item.href} className={isActive ? "active" : ""}>
        {item.label}
      </a>
    );
  }

  var mobileLinks = [];
  for (var mi = 0; mi < navItems.length; mi++) {
    var mitem = navItems[mi];
    mobileLinks.push(
      <a key={mitem.label} href={mitem.href} onClick={closeMenu}>
        {mitem.label}
      </a>
    );
  }

  var eduCards = [];
  for (var ei = 0; ei < education.length; ei++) {
    var edu = education[ei];
    eduCards.push(
      <div className="edu-card" key={edu.title}>
        <div className="edu-left">
          <h3>
            <GraduationCap size={16} style={{ marginRight: 8, verticalAlign: "-2px" }} />
            {edu.title}
          </h3>
          <div className="school">{edu.school}</div>
          <div className="year">{edu.year}</div>
        </div>
        <div className="edu-score">{edu.score}</div>
      </div>
    );
  }

  var skillBarRows = [];
  for (var si = 0; si < skillLevels.length; si++) {
    var skill = skillLevels[si];
    skillBarRows.push(
      <div className="skill-bar-row" key={skill.name}>
        <div className="skill-bar-label">
          <span>{skill.name}</span>
          <span>{skill.level}%</span>
        </div>
        <div className="skill-bar-track">
          <motion.div
            className="skill-bar-fill"
            initial={{ width: 0 }}
            whileInView={{ width: skill.level + "%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  }

  function renderPills(list) {
    var out = [];
    for (var pi = 0; pi < list.length; pi++) {
      out.push(
        <div className="skill-pill" key={list[pi]}>
          {list[pi]}
        </div>
      );
    }
    return out;
  }

  var projectCards = [];
  for (var pj = 0; pj < projects.length; pj++) {
    var proj = projects[pj];
    var tagEls = [];
    for (var tj = 0; tj < proj.tech.length; tj++) {
      tagEls.push(
        <span className="tag" key={proj.tech[tj]}>
          {proj.tech[tj]}
        </span>
      );
    }
    projectCards.push(
      <Section key={proj.title}>
        <div className="project-card">
          <div className="icon-box">
            <Sparkles size={20} />
          </div>
          <h3>{proj.title}</h3>
          <p>{proj.desc}</p>
          <div className="tag-row">{tagEls}</div>
          <div className="project-links">
            <a href={proj.repo} target="_blank" rel="noreferrer">
              <Github size={15} /> Repo
            </a>
            {proj.live ? (
              <a href={proj.live} target="_blank" rel="noreferrer">
                <ExternalLink size={15} /> Live
              </a>
            ) : null}
          </div>
        </div>
      </Section>
    );
  }

  var testimonialCards = [];
  for (var tk = 0; tk < testimonials.length; tk++) {
    var test = testimonials[tk];
    testimonialCards.push(
      <Section key={test.name + test.role}>
        <div className="testimonial-card">
          <Quote className="testimonial-quote-icon" size={22} />
          <p className="testimonial-text">{test.text}</p>
          <div className="testimonial-author">
            <div className="testimonial-avatar">{test.name.charAt(0)}</div>
            <div>
              <h4>{test.name}</h4>
              <span>{test.role}</span>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <motion.div
            className="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="loader-logo">
              Atrij<span>.dev</span>
            </div>
            <div className="loader-bar">
              <motion.div
                className="loader-bar-fill"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="cursor-dot" ref={cursorDot}></div>
      <div className="cursor-ring" ref={cursorRing}></div>

      <div className="scroll-progress" style={{ width: scrollPct + "%" }}></div>

      <nav className="navbar">
        <div className="nav-inner">
          <div className="logo">
            Atrij<span>.dev</span>
          </div>
          <div className="nav-links">{navLinks}</div>
          <div className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </div>
          <a href="#contact" className="nav-cta">
            Let's Talk
          </a>
          <div className="hamburger" onClick={openMenu}>
            <Menu size={24} />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="mobile-menu"
          >
            <div
              style={{ position: "absolute", top: 28, right: 28, cursor: "pointer" }}
              onClick={closeMenu}
            >
              <X size={24} />
            </div>
            {mobileLinks}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="hero">
        <div className="blob"></div>
        <div className="blob2"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hero-badge"
        >
          <span className="dot"></span> Open to Internship Opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Hi, I'm Atrij Ghosh -<br />
          <span className="highlight">{typedRole}</span>
          <span className="typed-cursor">&nbsp;</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          B.Tech IT student at MAKAUT University, building real-world web applications with
          Django, React and JavaScript. Hackathon winner, 300+ DSA problems solved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hero-actions"
        >
          <a href="#projects" className="btn-primary">
            View Projects <ArrowRight size={16} />
          </a>
          <a href="#contact" className="btn-outline">
            Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="hero-socials"
        >
          <a href="https://github.com/A-tri-j" target="_blank" rel="noreferrer">
            <Github size={19} />
          </a>
          <a href="https://www.linkedin.com/in/atrij-ghosh-86690234a" target="_blank" rel="noreferrer">
            <Linkedin size={19} />
          </a>
          <a href="mailto:atrijghosh10@gmail.com">
            <Mail size={19} />
          </a>
        </motion.div>
      </section>

      <section className="section container" id="about">
        <Section>
          <div className="section-tag">About Me</div>
          <h2 className="section-title">A bit about my journey</h2>
        </Section>

        <div className="about-grid">
          <Section>
            <p>
              I'm a 2nd-year B.Tech Information Technology student at MAKAUT University,
              passionate about full-stack web development. I work primarily with Django,
              PostgreSQL, HTML, CSS and JavaScript, and I'm currently expanding into React and
              Generative AI tools like LangChain and RAG pipelines.
            </p>
            <p>
              I enjoy solving algorithmic problems, building practical web applications, and
              contributing to my university's tech community through GDG On Campus. I recently
              won the GeeksforGeeks Classroom x MAKAUT Hackathon 2026.
            </p>
            <a
              href="Atrij_Ghosh_CV (1).pdf"
              download
              className="btn-primary resume-btn"
              style={{ display: "inline-flex", width: "fit-content" }}
            >
              <Download size={16} /> Download Resume
            </a>
          </Section>

          <Section>
            <div className="stat-grid">
              <div className="stat-card">
                <h3>300+</h3>
                <span>DSA Problems Solved</span>
              </div>
              <div className="stat-card">
                <h3>8.15</h3>
                <span>Current SGPA</span>
              </div>
              <div className="stat-card">
                <h3>3+</h3>
                <span>Projects Built</span>
              </div>
              <div className="stat-card">
                <h3>1st</h3>
                <span>Hackathon Win 2026</span>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <section className="section container" id="education">
        <Section>
          <div className="section-tag">Academic Background</div>
          <h2 className="section-title">Education</h2>
        </Section>

        <Section>
          <div className="edu-grid">{eduCards}</div>
        </Section>
      </section>

      <section className="section container" id="skills">
        <Section>
          <div className="section-tag">Tech Stack</div>
          <h2 className="section-title">Skills & Tools</h2>
        </Section>

        <Section>
          <div className="skill-group">
            <div className="skill-group-title">Proficiency Overview</div>
            <div className="skill-bars">{skillBarRows}</div>
          </div>

          <div className="skill-group">
            <div className="skill-group-title">
              <Code2 size={14} style={{ marginRight: 6, verticalAlign: "-2px" }} />
              Languages & Frontend
            </div>
            <div className="skills-wrap">{renderPills(languages)}</div>
          </div>

          <div className="skill-group">
            <div className="skill-group-title">
              <Database size={14} style={{ marginRight: 6, verticalAlign: "-2px" }} />
              Databases
            </div>
            <div className="skills-wrap">{renderPills(databases)}</div>
          </div>

          <div className="skill-group">
            <div className="skill-group-title">
              <Brain size={14} style={{ marginRight: 6, verticalAlign: "-2px" }} />
              Generative AI
            </div>
            <div className="skills-wrap">{renderPills(genai)}</div>
          </div>

          <div className="skill-group">
            <div className="skill-group-title">
              <Cloud size={14} style={{ marginRight: 6, verticalAlign: "-2px" }} />
              Deployment
            </div>
            <div className="skills-wrap">{renderPills(deployment)}</div>
          </div>

          <div className="skill-group">
            <div className="skill-group-title">
              <Wrench size={14} style={{ marginRight: 6, verticalAlign: "-2px" }} />
              Tools
            </div>
            <div className="skills-wrap">{renderPills(tools)}</div>
          </div>
        </Section>
      </section>

      <section className="section container" id="projects">
        <Section>
          <div className="section-tag">Portfolio</div>
          <h2 className="section-title">Things I've Built</h2>
        </Section>

        <div className="project-grid">{projectCards}</div>
      </section>

      <section className="section container" id="experience">
        <Section>
          <div className="section-tag">Experience</div>
          <h2 className="section-title">Where I've Contributed</h2>
        </Section>

        <Section>
          <div className="timeline">
            <div className="timeline-item">
              <div className="date">2026</div>
              <h3>Hackathon Winner</h3>
              <div className="org">GeeksforGeeks Classroom x MAKAUT Hackathon</div>
              <p>
                Won first place by building a complete solution under time constraints,
                collaborating with a team and presenting the final product to judges.
              </p>
            </div>

            <div className="timeline-item">
              <div className="date">2024 - Present</div>
              <h3>Core Member</h3>
              <div className="org">GDG On Campus, MAKAUT</div>
              <p>
                Actively involved in organizing and participating in workshops and tech events,
                contributing to peer learning and university tech community building.
              </p>
            </div>

            <div className="timeline-item">
              <div className="date">Add your dates</div>
              <h3>Internship Title (Add here)</h3>
              <div className="org">Company Name</div>
              <p>
                Briefly describe what you built, the stack you used, and the impact of your work
                during the internship.
              </p>
            </div>
          </div>
        </Section>
      </section>

      <section className="section container" id="testimonials">
        <Section>
          <div className="section-tag">What People Say</div>
          <h2 className="section-title">Testimonials</h2>
        </Section>

        <div className="testimonial-grid">{testimonialCards}</div>
      </section>

      <section className="section container" id="contact">
        <Section>
          <div className="contact-box">
            <h2>Let's build something together</h2>
            <p>I'm open to internship and entry-level developer roles.</p>
            <div className="contact-actions">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=atrijghosh10@gmail.com&su=Portfolio%20Contact&body=Hi%20Atrij,"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <Mail size={16} /> atrijghosh10@gmail.com
              </a>
              <a href="tel:+917439165592" className="btn-outline">
                <Phone size={16} /> +91 7439165592
              </a>
            </div>
          </div>
        </Section>
      </section>

      <footer className="footer">
        Copyright {new Date().getFullYear()} Atrij Ghosh - Built with React & Framer Motion
      </footer>

      <AnimatePresence>
        {showScrollTop ? (
          <motion.button
            className="scroll-top-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
          >
            <ArrowUp size={20} />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}