import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, ExternalLink } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

export default function Portfolio() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/SoumodeepDas2004/repos")
      .then((res) => res.json())
      .then((data) => setRepos(data.slice(0, 5)));
  }, []);

  // 🔥 Cursor Glow (fixed + cleaned)
  useEffect(() => {
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);

    const move = (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      glow.remove();
    };
  }, []);
  //article fetch
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@higherdas09")
      .then(res => res.json())
      .then(data => {
        setArticles(data.items.slice(0, 5)); // latest 5 posts
      });
  }, []);
  useEffect(() => {
    const canvas = document.getElementById("matrix");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-container">
      <div className="bg-overlay"></div>
      <canvas id="matrix"></canvas>

      {/* HERO */}
      <section className="center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Soumodeep Das (NightEagle)
        </motion.h1>

        <TypeAnimation
          sequence={[
            "Cybersecurity Analyst", 1500,
            "Threat Intelligence", 1500,
            "Malware Analyst", 1500,
            "SOC Operations", 1500,
            "Ethical Hacking", 1500,
            "Software Development", 1500,
          ]}
          wrapper="p"
          speed={50}
          repeat={Infinity}
        />

        <div style={{ marginTop: "20px", fontSize: "25px" }}>
          <a href="#projects" className="button">View Projects</a>
          <a href="#contact" className="button" style={{ marginLeft: "10px" }}>Contact</a>
        </div>
      </section>

      {/* TERMINAL */}
      <section className="card terminal">
        <h2>System Terminal</h2>
        <p className="small">
          <span className="green">{'>'} Contacting NightEagle...</span><br />
          <span className="green">{'>'} Initializing System...</span><br />
          <span className="green">{'>'} Loading threat intelligence modules...</span><br />
          <span className="green">{'>'} Establishing secure connection...</span><br />
          <span className="green">{'>'} System ready ✔</span>
        </p>
      </section>

      {/* ABOUT + SKILLS */}
      <motion.section
        className="grid grid-2"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="card">
          <h2>About Me</h2>
          <p>
            I am Soumodeep Das (NightEagle), a cybersecurity enthusiast with a strong focus on threat intelligence,
            SOC operations, malware analysis, and OSINT. I am passionate about understanding how real-world cyber threats
            operate and continuously work on improving my skills in analyzing, detecting, and mitigating security risks.

            Alongside cybersecurity, I build secure and privacy-focused applications, combining software development with
            defensive security practices. My goal is to contribute to building resilient systems and to grow as a
            cybersecurity professional capable of handling modern threat landscapes.
          </p>

          <p className="small" style={{ marginTop: "10px" }}>
            Focus Areas: Cybersecurity, Threat Intelligence, SOC Analysis, Malware Research, OSINT, Secure Software Development
          </p>
        </div>

        <div className="card">
          <h2>Skills</h2>
          <div className="grid grid-2">
            {["Wireshark", "Burp Suite", "Nmap", "Splunk", "Python", "Java", "FastAPI", "MySQL","Software Development","Malware Analysis"].map(skill => (
              <div key={skill} className="card small center">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="center">Latest Writeups</h2>

        <p className="center small" style={{ marginBottom: "20px" }}>
          Read all on →
          <a href="https://medium.com/@higherdas09" target="_blank"> Medium</a>
        </p>

        <div className="grid grid-3">
          {articles.map((article, index) => (
            <div key={index} className="card">
              <h3 className="project-title">{article.title}</h3>

              <p className="small">
                {article.pubDate.split(" ")[0]} {/* date */}
              </p>

              <a href={article.link} target="_blank">
                Read Article <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="center">Projects</h2>

        <div className="grid grid-3">
          {repos.map(repo => (
            <motion.div key={repo.id} whileHover={{ scale: 1.05 }} className="card">
              <h3 className="project-title">{repo.name}</h3>
              <p className="small">{repo.description || "No description"}</p>

              <a href={repo.html_url} target="_blank" rel="noreferrer">
                View <ExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CONTACT */}
      <section id="contact" className="center">
        <h2>Connect</h2>

        <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "20px" }}>
          <a href="https://github.com/SoumodeepDas2004" target="_blank">
            <FaGithub size={28} />
          </a>

          <a href="https://www.linkedin.com/in/soumodeepdas-cybersecurity-neagle02/" target="_blank">
            <FaLinkedin size={28} />
          </a>

          <a href="mailto:officialsoumodeepdas09@gmail.com" target="_blank">
            <Mail size={32} />
          </a>
        </div>
      </section>

      <footer>© Soumodeep Das ( NightEagle ) </footer>

    </div>
  );
}