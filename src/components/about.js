// components/About.js
export default function About() {
    return (
      <section id="about" className="about-section py-5">
        <div className="container">
          <h2>About Me</h2>
          <p>[Your brief introduction]</p>
          <a href="/resume.pdf" download className="btn btn-primary">Download Resume</a>
        </div>
      </section>
    );
  }
  