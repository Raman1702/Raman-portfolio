import React, { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import ContributionCity from "./ContributionCity";
import TechHeading from "./TechHeading";
import MagneticCursor from "./MagneticCursor";
import { usePortfolioMotion } from "./usePortfolioMotion";
import { useSmoothScroll } from "./useSmoothScroll";
import { useStartup } from "./useStartup";
const email = "singhraman1702@gmail.com";

function MotionLabel({ children }) {
  return (
    <span className="roll-label">
      <span className="roll-label-track">
        <span className="roll-label-main">{children}</span>
        <span className="roll-label-copy" aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}

function HeroDetails({ placement }) {
  return (
    <div className={`hero-note hero-note--${placement} reveal`}>
      <p>
        Software engineer.
        <br />
        From the interface to the infrastructure.
      </p>
      <p>
        Based in Bengaluru, India.
        <br />
        Currently building at GoKhana.
      </p>
      <a href="/Raman_Ahalawat_Resume.pdf" data-magnetic download className="text-link">
        <MotionLabel>(Download résumé ↗)</MotionLabel>
      </a>
    </div>
  );
}

function BracketLabel({ children }) {
  return (
    <span className="bracket-label">
      <span className="control-bracket" aria-hidden="true">(</span>
      <span className="control-label">{children}</span>
      <span className="control-bracket" aria-hidden="true">)</span>
    </span>
  );
}

const projects = [
  {
    id: "rag",
    name: "Catalog-aware AI",
    category: "AI",
    discipline: "Generative AI",
    type: "Personal project",
    description: "Product recommendations grounded in a real catalog.",
    stack: "Python · LangChain · LangGraph · FastAPI · pgvector",
    intro:
      "A retrieval-augmented recommendation system connecting natural-language questions to relevant products, with an agentic layer for multi-step requests.",
    details: [
      "Built an ingestion pipeline to chunk and embed product data, with vectors in PostgreSQL and metadata in OpenSearch.",
      "Combined semantic and keyword retrieval to ground responses in catalog information.",
      "Used LangGraph for comparisons, filters, and budget-aware suggestions.",
      "Connected a React chat interface to FastAPI and packaged the application with Docker.",
    ],
  },
  {
    id: "mail",
    name: "UClone",
    category: "Full stack",
    discipline: "Full-stack development",
    type: "Personal project",
    description: "An email client, built from the inbox up.",
    stack: "React · Node.js · Express · MongoDB",
    intro:
      "A Gmail-inspired full-stack email application connecting a responsive React interface to REST APIs.",
    details: [
      "Designed and built the email composition flow.",
      "Implemented send/receive functionality and inbox management.",
      "Connected the frontend to a Node.js and Express backend with MongoDB.",
    ],
  },
  {
    id: "food",
    name: "GoKhana platform",
    category: "Full stack",
    discipline: "Product engineering",
    type: "Work at GoKhana",
    description: "Full-stack systems for everyday cafeteria operations.",
    stack: "Java · Spring Boot · React · Node.js · AWS",
    intro:
      "Engineering work on GoKhana’s corporate cafeteria and food-court management platform, from the frontend to the services underneath.",
    details: [
      "Developed microservices powering dashboards, reporting, and cafeteria operations.",
      "Built full-stack features with React, Next.js, and Redux.",
      "Delivered sales analytics, order tracking, and loyalty-program features.",
      "Contributed code reviews and CI/CD deployments with cross-functional teams.",
    ],
  },
  {
    id: "ops",
    name: "Operations, automated",
    category: "Systems",
    discipline: "Workflow automation",
    type: "Work at GoKhana",
    description: "Less repetitive work. More room to operate.",
    stack: "Java · Node.js · Microservices",
    intro:
      "Automation of minimum-guarantee and operational checklist workflows for GoKhana’s operations teams.",
    details: [
      "Automated minimum-guarantee workflows.",
      "Reduced repetitive operational checklist work.",
      "Reduced manual operations workload by 40%.",
    ],
  },
  {
    id: "systems",
    name: "Built to scale",
    category: "Systems",
    discipline: "System design",
    type: "Personal project",
    description: "Architecture studies in scale, speed, and reliability.",
    stack: "AWS · Caching · Load balancing · API design",
    intro:
      "System design studies for a URL shortener, a food-delivery application, and an e-commerce backend.",
    details: [
      "Designed database structures for each application’s access patterns.",
      "Considered caching and load balancing for scalable services.",
      "Explored API versioning and infrastructure on AWS.",
    ],
  },
  {
    id: "speed",
    name: "A faster response",
    category: "Systems",
    discipline: "Performance engineering",
    type: "Work at GoKhana",
    description: "Better queries. Faster APIs. A more reliable platform.",
    stack: "SQL · REST APIs · Spring Boot · Node.js",
    intro:
      "Database-query optimization and third-party API integration work to improve responsiveness on GoKhana’s platform.",
    details: [
      "Optimized database queries and integrated third-party APIs.",
      "Cut average API response times by 30%.",
      "Improved reliability while delivering end-to-end platform features.",
    ],
  },
];
function Cover({ type }) {
  if (type === "rag")
    return (
      <div className="cover cover-rag">
        <div className="cover-top">
          <span>Catalog intelligence</span>
          <span>RAG / LangGraph</span>
        </div>
        <div className="rag-title">
          Good answers.
          <br />
          <i>Real context.</i>
        </div>
        <div className="rag-flow">
          <span>Retrieve</span>
          <span>→</span>
          <span>Reason</span>
          <span>→</span>
          <span>Recommend</span>
        </div>
        <div className="cover-bottom">
          From product data to a useful conversation.
        </div>
      </div>
    );
  if (type === "mail")
    return (
      <div className="cover cover-mail">
        <div className="cover-top">
          <span>UClone</span>
          <span>Full-stack email</span>
        </div>
        <div className="mail-sheet">
          <span>To: the next idea</span>
          <div>
            Hello,
            <br />
            <i>world.</i>
          </div>
          <span>Compose. Send. Stay connected.</span>
        </div>
        <span className="cover-bottom">React / Node.js / MongoDB</span>
      </div>
    );
  if (type === "food")
    return (
      <div className="cover cover-food">
        <div className="cover-top">
          <span>GoKhana</span>
          <span>Product engineering</span>
        </div>
        <div className="food-title">
          Behind
          <br />
          every
          <br />
          <i>lunch.</i>
        </div>
        <div className="cover-bottom">Orders · Analytics · Operations</div>
      </div>
    );
  if (type === "ops")
    return (
      <div className="cover cover-ops">
        <div className="cover-top">
          <span>Operations, automated</span>
          <span>GoKhana</span>
        </div>
        <div className="ops-number">
          40<span>%</span>
        </div>
        <div className="ops-copy">
          less manual work.
          <br />
          <i>More possibility.</i>
        </div>
        <div className="cover-bottom">
          Minimum-guarantee & checklist workflows
        </div>
      </div>
    );
  if (type === "systems")
    return (
      <div className="cover cover-systems">
        <div className="cover-top">
          <span>System design studies</span>
          <span>AWS</span>
        </div>
        <div className="systems-title">
          Think in
          <br />
          <i>systems.</i>
        </div>
        <div className="system-layers">
          <span>Requests</span>
          <span>Load balancer</span>
          <span>Services + cache</span>
          <span>Database</span>
        </div>
      </div>
    );
  return (
    <div className="cover cover-speed">
      <div className="cover-top">
        <span>Performance engineering</span>
        <span>GoKhana</span>
      </div>
      <div className="speed-number">
        −30<span>%</span>
      </div>
      <i>
        Worth the wait?
        <br />
        Better without it.
      </i>
      <div className="cover-bottom">Average API response time</div>
    </div>
  );
}
function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!project) return;
    const before = document.activeElement;
    ref.current.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      before?.focus();
    };
  }, [project]);
  if (!project) return null;
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      data-lenis-prevent
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="project-title"
    >
      <div className="dialog-bar">
        <span>{project.type}</span>
        <button onClick={onClose}><MotionLabel>(Close)</MotionLabel></button>
      </div>
      <div className="dialog-content">
        <p className="dialog-discipline">{project.discipline}</p>
        <h2 id="project-title">{project.name}</h2>
        <p className="dialog-intro">{project.intro}</p>
        <Cover type={project.id} />
        <h3>The work</h3>
        <ul>
          {project.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <div className="dialog-stack">{project.stack}</div>
        <a
          className="text-link"
          href={`mailto:${email}?subject=${encodeURIComponent(`Let's talk about ${project.name}`)}`}
        >
          <MotionLabel>Discuss this project ↗</MotionLabel>
        </a>
      </div>
    </dialog>
  );
}
export default function Portfolio() {
  const initial = new URLSearchParams(window.location.search);
  const [category, setCategory] = useState(
    ["AI", "Full stack", "Systems"].includes(initial.get("category"))
      ? initial.get("category")
      : "All",
  );
  const [view, setView] = useState(
    initial.get("list") === "yes" ? "list" : "grid",
  );
  const [project, setProject] = useState(null),
    [copied, setCopied] = useState(false),
    [formStatus, setFormStatus] = useState("");
  const mainRef = useRef(null);
  const { ready: startupReady, onSceneReady } = useStartup(mainRef);
  useSmoothScroll(Boolean(project));
  const { captureProjects } = usePortfolioMotion(mainRef, category, view, startupReady);
  const copyTimer = useRef(null);
  const copyRequest = useRef(0);
  const visible = projects.filter(
    (p) => category === "All" || p.category === category,
  );
  useEffect(() => {
    const p = new URLSearchParams();
    if (category !== "All") p.set("category", category);
    if (view === "list") p.set("list", "yes");
    const q = p.toString();
    history.replaceState(
      null,
      "",
      `${location.pathname}${q ? "?" + q : ""}${location.hash}`,
    );
  }, [category, view]);
  useEffect(() => () => {
    clearTimeout(copyTimer.current);
    copyRequest.current += 1;
  }, []);
  function changeCategory(value) {
    if (value === category) return;
    captureProjects();
    setCategory(value);
  }
  function changeView(value) {
    if (value === view) return;
    captureProjects();
    setView(value);
  }
  async function copyEmail() {
    const request = ++copyRequest.current;
    clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(email);
      if (request !== copyRequest.current) return;
      setCopied(true);
      copyTimer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      if (request !== copyRequest.current) return;
      setCopied(false);
      setFormStatus(`Email me at ${email}`);
    }
  }
  function draftEmail(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = `${d.get("message")}\n\nReply to: ${d.get("email")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Let’s build something together")}&body=${encodeURIComponent(body)}`;
    setFormStatus(
      "Your email app will open with a draft. You can review it before sending.",
    );
  }
  return (
    <>
      <MagneticCursor disabled={Boolean(project)} />
      <a href="#work" className="skip-link">
        Skip to selected work
      </a>
      <header className="site-header">
        <a data-magnetic href="#top" className="identity" aria-label="Raman Ahalawat home">
          <MotionLabel>raman.dev</MotionLabel>
        </a>
        <nav aria-label="Main navigation">
          <a data-magnetic href="#activity">(Activity)</a>
          <a data-magnetic href="#work">(Work)</a>
          <a data-magnetic href="#about">(About)</a>
          <a data-magnetic href="#contact">(Contact)</a>
        </nav>
        <a data-magnetic className="availability" href={`mailto:${email}`}>
          <MotionLabel>Let’s work together</MotionLabel>
        </a>
      </header>
      <main ref={mainRef}>
        <section
          className="hero grid-paper"
          id="top"
          aria-labelledby="hero-title"
        >
          <div className="container">
            <div className="hero-lockup">
              <h1
                className="wordmark"
                id="hero-title"
                aria-label="Raman, software engineer"
              >
                <span className="name-part"><TechHeading text="raman" /></span>
                <span className="dev-part"><TechHeading text=".dev" /></span>
              </h1>
              <div className="services">
                <span>+ Full-stack development</span>
                <span>+ Generative AI</span>
                <span>+ System design</span>
              </div>
            </div>
            <HeroDetails placement="mobile" />
          </div>
        </section>
        <ContributionCity onReady={onSceneReady} />
        <section className="introduction-section grid-paper" id="introduction" aria-label="Introduction">
          <div className="container">
            <div className="intro-block">
              <p>
                Raman Ahalawat is a software engineer building thoughtful web
                experiences and intelligent systems. He connects{" "}
                <em>good interfaces</em> with the engineering that makes them
                work.
              </p>
            </div>
            <HeroDetails placement="desktop" />
          </div>
        </section>
        <section
          className="work-section grid-paper"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="work-aperture" aria-hidden="true"><span /></div>
          <div className="container">
            <div className="section-title reveal">
              <span aria-hidden="true" className="outline-word">
                Selected
              </span>
              <h2 id="work-title"><TechHeading text="Work" /></h2>
            </div>
            <div className="work-toolbar">
              <div className="filters" aria-label="Filter projects">
                <span className="toolbar-label">Filter:</span>
                {["All", "Full stack", "AI", "Systems"].map((c) => (
                  <button
                    key={c}
                    onClick={() => changeCategory(c)}
                    aria-pressed={category === c}
                  >
                    <BracketLabel>{c}</BracketLabel>
                  </button>
                ))}
              </div>
              <div className="views" aria-label="Project layout">
                <span>View:</span>
                {["grid", "list"].map((v) => (
                  <button
                    key={v}
                    onClick={() => changeView(v)}
                    aria-pressed={view === v}
                  >
                    <BracketLabel>{v === "grid" ? "Grid" : "List"}</BracketLabel>
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`projects projects-${view} ${category !== "All" ? "filtered" : ""}`}
              aria-live="polite"
            >
              {visible.map((p) => (
                <button
                  className={`project project-${p.id}`}
                  key={p.id}
                  onClick={() => setProject(p)}
                  aria-label={`Read about ${p.name}`}
                >
                  <div className="media-wrap">
                    <Cover type={p.id} />
                    <span className="read-project">Read project <span className="action-arrow" aria-hidden="true">↗</span></span>
                  </div>
                  <div className="project-caption">
                    <span className="project-name">{p.name}</span>
                    <span className="project-discipline">({p.discipline})</span>
                    <span className="list-arrow" aria-hidden="true">
                      ↗
                    </span>
                    <p>{p.description}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="work-end">
              <span>Selected projects & engineering work</span>
              <a data-magnetic href="/Raman_Ahalawat_Resume.pdf" download>
                <MotionLabel>(Full résumé ↗)</MotionLabel>
              </a>
            </div>
          </div>
        </section>
        <section
          className="about-section grid-paper"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="container">
            <div className="about-heading reveal">
              <h2 className="outline-word" id="about-title">
                About
              </h2>
            </div>
            <div className="about-copy reveal">
              <p>
                I build full-stack products at GoKhana and explore generative
                AI through personal projects.
              </p>
              <div className="experience">
                <div>
                  <span>2023 — Present</span>
                  <p>
                    Software Engineer
                    <br />
                    <strong>GoKhana</strong>
                  </p>
                </div>
                <div>
                  <span>2023</span>
                  <p>
                    B.Tech, Computer Science
                    <br />
                    <strong>GLA University</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="contact-section grid-paper"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="container">
            <h2
              className="contact-title outline-word reveal"
              id="contact-title"
            >
              Let’s Talk
            </h2>
            <div className="contact-top">
              <div className="contact-aside reveal">
                <p>Have a project in mind?</p>
                <a data-magnetic href={`mailto:${email}`}><MotionLabel>Email me ↗</MotionLabel></a>
                <button data-magnetic className="copy-email" onClick={copyEmail}>
                  <MotionLabel>{copied ? "(Copied)" : "(Copy email)"}</MotionLabel>
                </button>
                <span className="copy-status" role="status">
                  {copied ? "Email address copied." : ""}
                </span>
              </div>
              <div className="contact-message reveal">
                <a href={`mailto:${email}`}>
                  {email.split("@")[0]}<wbr />@{email.split("@")[1]}
                </a>
              </div>
              <form onSubmit={draftEmail} className="contact-form reveal">
                <label htmlFor="email">Your email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <label htmlFor="message">Your message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength="5"
                  rows="3"
                />
                <button type="submit"><MotionLabel>Draft email ↗</MotionLabel></button>
                <p className="form-note">Opens in your email app.</p>
                <p className="form-status" role="status">
                  {formStatus}
                </p>
              </form>
            </div>
            <div className="socials">
              <span>Elsewhere:</span>
              <a
                href="https://linkedin.com/in/raman-ahalawat"
                data-magnetic
                target="_blank"
                rel="noreferrer"
              >
                <MotionLabel>(LinkedIn ↗)</MotionLabel>
              </a>
              <a
                href="https://leetcode.com/u/Raman_Ahalawat"
                data-magnetic
                target="_blank"
                rel="noreferrer"
              >
                <MotionLabel>(LeetCode ↗)</MotionLabel>
              </a>
              <a data-magnetic href="#top"><MotionLabel>(Back to top ↑)</MotionLabel></a>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <span>Raman Ahalawat</span>
        <span>Always a work in progress.</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
      <ProjectDialog project={project} onClose={() => setProject(null)} />
    </>
  );
}
