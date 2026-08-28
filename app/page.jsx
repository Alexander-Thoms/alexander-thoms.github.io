import EnterGate from "./components/EnterGate";
import { asset } from "../lib/asset";

export default function Page() {
  return (
    <>
      {/* Animated blurred wallpaper background */}
      <div
        className="background-image"
        aria-hidden="true"
        style={{
          backgroundImage: `url("${asset("/assets/wallpaper.webp")}")`,
        }}
      ></div>

      {/* Entry gate + background music + music controls (interactive) */}
      <EnterGate />

      {/* App */}
      <div className="app">
        <nav className="navbar">
          <div className="nav-content">
            <div className="nav-links">
              <a className="nav-link" href="#home">
                home
              </a>
              <a className="nav-link" href="#contact">
                contact
              </a>
              <a className="nav-link" href="#certifications">
                certifications
              </a>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <div className="content-wrapper">
            {/* HOME */}
            <section id="home" className="page">
              <div className="page-header">
                <img
                  id="avatar"
                  className="avatar"
                  src={asset("/assets/avatar.webp")}
                  alt="avatar"
                />
                <h1 className="title">
                  <span>A</span>
                  <span>l</span>
                  <span>e</span>
                  <span>x</span>
                  <span>a</span>
                  <span>n</span>
                  <span>d</span>
                  <span>e</span>
                  <span>r</span>
                  <span>&nbsp;</span>
                  <span>T</span>
                  <span>h</span>
                  <span>o</span>
                  <span>m</span>
                  <span>s</span>
                </h1>
                <p className="subtitle">hi, you found my site!</p>
              </div>

              <div className="section about">
                <div className="section-title-wrap">
                  <h2 className="shine-on-hover">about</h2>
                  <i
                    className="section-icon icon-green i-ph-info-fill"
                    aria-hidden="true"
                  ></i>
                </div>
                <p className="about-text">
                  I&rsquo;m an aspiring Networking Technician with a background in
                  computer systems, networking, and software development. I enjoy
                  working with Linux, Windows Server, Active Directory, Microsoft
                  Azure, PowerShell, Bash, and network administration. I&rsquo;ve
                  also gained hands on experience through software and AI
                  projects, including a recent Front-end AI Engineering
                  internship. I&rsquo;m looking for entry level or volunteer
                  opportunities where I can apply my technical skills, keep
                  learning, and contribute to a team.
                </p>
              </div>

              <div className="button-container">
                <a
                  href="https://github.com/Alexander-Thoms"
                  title="GitHub"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/alexander-thoms-bb3469244/"
                  title="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="page">
              <div className="page-header">
                <h1 className="title">
                  <span>c</span>
                  <span>o</span>
                  <span>n</span>
                  <span>t</span>
                  <span>a</span>
                  <span>c</span>
                  <span>t</span>
                </h1>
                <p className="subtitle">find me around the web</p>
              </div>

              <div className="contact-grid">
                <a
                  className="contact-card"
                  href="https://github.com/Alexander-Thoms"
                >
                  <div className="icon-wrapper">
                    <i className="fa-brands fa-github"></i>
                  </div>
                  <h3>GitHub</h3>
                  <p>@Alexander-Thoms</p>
                </a>
                <a
                  className="contact-card"
                  href="https://www.linkedin.com/in/alexander-thoms-bb3469244/"
                >
                  <div className="icon-wrapper">
                    <i className="fa-brands fa-linkedin"></i>
                  </div>
                  <h3>LinkedIn</h3>
                  <p>in/alexander-thoms</p>
                </a>
              </div>
            </section>

            <section id="certifications" className="page">
              <div className="page-header">
                <h1 className="title">
                  <span>c</span><span>e</span><span>r</span><span>t</span><span>i</span><span>f</span><span>i</span><span>c</span><span>a</span><span>t</span><span>i</span><span>o</span><span>n</span><span>s</span>
                </h1>
                <p className="subtitle">verified credentials</p>
              </div>
              <div className="contact-grid">
                <a
                  className="contact-card"
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-award"></i>
                  </div>
                  <h3>Front-end AI Engineering Internship</h3>
                  <p>Flyrank</p>
                </a>
                <a
                  className="contact-card"
                  href="https://www.coursera.org/account/accomplishments/specialization/D759JAVGHG25"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="icon-wrapper">
                    <i className="fa-brands fa-google"></i>
                  </div>
                  <h3>Google Cybersecurity</h3>
                  <p>Alphabet</p>
                </a>
                <a
                  className="contact-card"
                  href="https://verify.skilljar.com/c/7overzjwhxco"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-code-branch"></i>
                  </div>
                  <h3>MCP Advanced Topics</h3>
                  <p>Anthropic</p>
                </a>
                <a
                  className="contact-card"
                  href="https://verify.skilljar.com/c/i7o6cxy8df75"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-robot"></i>
                  </div>
                  <h3>Claude Code in Action</h3>
                  <p>Anthropic</p>
                </a>
              </div>
            </section>

            <section className="section page">
              <div className="section-title-wrap">
                <h2 className="shine-on-hover">now playing</h2>
              </div>
              <div id="music-video" className="music-video"></div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
