import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  const handleStartVerification = () => {
    navigate("/login");
  };

  return (
    <div className="home-scroll">
      <header className="hero-section">
        <div className="container">
          <div className="trusted-by">
            TRUSTED BY 500+ FINANCIAL INSTITUTIONS
          </div>
          <h1>
            Enterprise-Grade{" "}
            <span className="highlight">Identity Verification</span>
          </h1>
          <p className="intro-text">
            Secure, compliant, and intelligent KYC verification platform designed
            for financial institutions, banks, credit unions, and financial
            services with enterprise-grade security and compliance.
          </p>

          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">99.7%</div>
              <div className="stat-description">Verification Accuracy</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-description">Global Partners</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2.5M+</div>
              <div className="stat-description">Verifications Done</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">&lt;3s</div>
              <div className="stat-description">Processing Time</div>
            </div>
          </div>

          <div className="cta-buttons">
            <button onClick={handleStartVerification} className="btn btn-primary">
              Start Verification
            </button>
            <a href="#contact" className="btn btn-secondary">
              View Demo
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="why-us" className="why-choose-us">
          <div className="container">
            <h2>Why Financial Institutions Choose Us</h2>
            <div className="features-container">
              <div className="feature-card" tabIndex="0">
                <span className="icon">🔒</span>
                <h3>Bank-Grade Security</h3>
                <p>
                  Enterprise-level encryption and compliance with standards
                  including PCI DSS and ISO 27001.
                </p>
              </div>

              <div className="feature-card" tabIndex="0">
                <span className="icon">⚡</span>
                <h3>Instant Verification</h3>
                <p>
                  Advanced OCR technology provides fast, accurate identity
                  verification with 99.7% accuracy rate.
                </p>
              </div>

              <div className="feature-card" tabIndex="0">
                <span className="icon">⚖️</span>
                <h3>Regulatory Compliance</h3>
                <p>
                  Fully compliant with KYC, AML, and GDPR requirements as
                  trusted by 500+ financial institutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="kyc-process-cta">
          <div className="container">
            <h2>Ready to Secure Your KYC Process?</h2>
            <p>
              Join hundreds of financial institutions that trust our platform for
              secure, compliant identity verification.
            </p>
            <div className="cta-buttons">
              <button onClick={handleStartVerification} className="btn btn-primary">
                Get Started Now →
              </button>
              <a href="#top" className="btn btn-secondary">
                Contact Sales
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
