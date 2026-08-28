import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  Shield,
  Siren,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import MyReports from "./pages/MyReports";
import Preparedness from "./pages/Preparedness";
import ReportEmergency from "./pages/ReportEmergency";
import SafetyMap from "./pages/SafetyMap";
import Emergency from "./pages/Emergency";
import EmergencyCapture from "./pages/EmergencyCapture";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <a href="#home" className="logo">
          <div className="logo-icon">
            <Siren size={19} />
          </div>

          <div>
            <span className="logo-name">Campus</span>
            <span className="logo-highlight">ResQ</span>
          </div>
        </a>

        {/* DESKTOP NAV */}
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#workflow">How it works</a>
          <a href="#safety">Safety</a>
        </div>

        <div className="nav-actions">
          <button className="login-btn">
            Admin Login
          </button>

              <a href="/report" className="nav-report-btn">
            Report Emergency
            <ArrowRight size={15} />
          </a>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div className="mobile-nav">
          <a href="#features" onClick={() => setOpen(false)}>
            Features
          </a>

          <a href="#workflow" onClick={() => setOpen(false)}>
            How it works
          </a>

          <a href="#safety" onClick={() => setOpen(false)}>
            Safety
          </a>

            <a href="/report" className="mobile-report">
            Report Emergency
          </a>
        </div>
      )}
    </nav>
  );
}


function Hero() {
  const handleSOS = () => {
    const confirmSOS = window.confirm(
      "🚨 Are you sure you want to activate emergency mode?"
    );

    if (confirmSOS) {
      window.location.href = "/emergency-capture";
    }
  };

  return (
    <section id="home" className="hero">

      <div className="hero-grid"></div>

      <div className="hero-container">

        <div className="hero-content">

          <div className="status-pill">
            <span className="status-dot"></span>
            Smart Campus Safety System
          </div>

          <h1>
            Safer campus.
            <br />

            <span>
              Faster response.
            </span>
          </h1>

          <p>
            A smart emergency response platform that connects
            students, AI-powered incident intelligence, security
            teams, and campus responders in one system.
          </p>

          <div className="hero-buttons">

            <a href="/report" className="primary-btn">
                Report an Emergency
              <ArrowRight size={17} />
            </a>

            <a href="#workflow" className="secondary-btn">
              See how it works
              <ChevronRight size={17} />
            </a>

          </div>

          <div className="hero-note">
            <CheckCircle2 size={15} />
            Anonymous reporting available
          </div>

        </div>

        <div className="sos-wrapper">
          <button
            className="sos-button"
            onClick={handleSOS}
            type="button"
          >
            <span className="sos-icon">🚨</span>
            <span className="sos-label">SOS</span>
          </button>

          <div className="sos-caption">
            <span>Press for</span>
            <strong>EMERGENCY</strong>
          </div>
        </div>

        {/* HERO VISUAL */}
        <div className="hero-visual">

          <div className="dashboard-preview">

            <div className="preview-top">
              <div>
                <span>LIVE OPERATIONS</span>
                <h3>Campus Response</h3>
              </div>

              <div className="live">
                <span></span>
                LIVE
              </div>
            </div>

            <div className="preview-map">

              <div className="map-grid"></div>

              <div className="building building-one">
                Engineering
              </div>

              <div className="building building-two">
                Library
              </div>

              <div className="building building-three">
                Hostel
              </div>

              <div className="incident-marker marker-one">
                <AlertTriangle size={13} />
              </div>

              <div className="incident-marker marker-two">
                <AlertTriangle size={13} />
              </div>

              <div className="responder-marker">
                <Shield size={13} />
              </div>

              <div className="route-line"></div>

            </div>

            <div className="preview-bottom">

              <div>
                <span>OPEN INCIDENTS</span>
                <strong>03</strong>
              </div>

              <div>
                <span>RESPONDERS</span>
                <strong>04</strong>
              </div>

              <div>
                <span>AVG RESPONSE</span>
                <strong>02:18</strong>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* TRUST STRIP */}
      <div className="hero-trust">

        <span>BUILT FOR CAMPUS SAFETY</span>

        <div className="trust-items">
          <span>
            <MapPin size={14} />
            Real-time location
          </span>

          <span>
            <Sparkles size={14} />
            AI classification
          </span>

          <span>
            <Shield size={14} />
            Emergency response
          </span>
        </div>

      </div>

    </section>
  );
}


function Features() {
  const features = [
    {
      icon: Siren,
      number: "01",
      title: "One-tap emergency reporting",
      description:
        "Students can quickly report an emergency with location, category, identity preference, and photo or video evidence.",
    },

    {
      icon: Sparkles,
      number: "02",
      title: "AI incident intelligence",
      description:
        "The system analyzes the incident description, identifies the category, estimates severity, and helps prioritize the response.",
    },

    {
      icon: MapPin,
      number: "03",
      title: "Smart campus map",
      description:
        "Security teams can see incident locations, risk zones, responders, and suggested response routes.",
    },

    {
      icon: Users,
      number: "04",
      title: "Crowd confirmation",
      description:
        "Nearby students can confirm or deny reported incidents, helping authorities reduce false reports.",
    },

    {
      icon: Clock3,
      number: "05",
      title: "Automatic escalation",
      description:
        "If an emergency is not acknowledged within the defined time, the system automatically escalates it.",
    },

    {
      icon: Shield,
      number: "06",
      title: "Safety preparedness",
      description:
        "Emergency contacts, evacuation procedures, assembly points, and safety instructions remain easily accessible.",
    },
  ];

  return (
    <section id="features" className="features-section">

      <div className="section-container">

        <div className="section-heading">

          <div>
            <span className="eyebrow">
              CORE CAPABILITIES
            </span>

            <h2>
              Everything needed
              <br />
              <span>when seconds matter.</span>
            </h2>
          </div>

          <p>
            CampusResQ brings reporting, intelligence,
            location awareness and emergency coordination
            into one connected safety platform.
          </p>

        </div>

        <div className="features-grid">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div className="feature-card" key={feature.number}>

                <div className="feature-top">
                  <span>{feature.number}</span>

                  <div className="feature-icon">
                    <Icon size={20} />
                  </div>
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <div className="feature-arrow">
                  <ArrowRight size={16} />
                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}


function HowItWorks() {
  return (
    <section id="workflow" className="workflow-section">

      <div className="section-container">

        <div className="workflow-heading">

          <span className="eyebrow">
            RESPONSE WORKFLOW
          </span>

          <h2>
            From first signal
            <br />
            <span>to final resolution.</span>
          </h2>

        </div>

        <div className="workflow">

          <div className="workflow-line"></div>

          <WorkflowStep
            number="01"
            title="Student reports"
            text="A student submits an emergency report with optional identity, location and evidence."
          />

          <WorkflowStep
            number="02"
            title="AI understands"
            text="AI analyzes the description and determines the incident category and estimated severity."
          />

          <WorkflowStep
            number="03"
            title="Response is prioritized"
            text="The system ranks the incident and identifies the nearest available responder."
          />

          <WorkflowStep
            number="04"
            title="Security responds"
            text="Authorities receive the alert, assign responders and track the incident status."
          />

          <WorkflowStep
            number="05"
            title="Incident resolved"
            text="The incident is closed and response information becomes part of campus safety analytics."
          />

        </div>

      </div>

    </section>
  );
}


function WorkflowStep({ number, title, text }) {
  return (
    <div className="workflow-step">

      <div className="workflow-number">
        {number}
      </div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

    </div>
  );
}


function SafetySection() {
  return (
    <section id="safety" className="safety-section">

      <div className="section-container">

        <div className="safety-box">

          <div className="safety-content">

            <span className="eyebrow">
              SAFETY FIRST
            </span>

            <h2>
              Prepared before
              <br />
              <span>the emergency arrives.</span>
            </h2>

            <p>
              Keep important safety information accessible
              across the campus. Students and staff can quickly
              find emergency contacts, evacuation instructions,
              assembly points and campus procedures.
            </p>

            <div className="safety-buttons">

              <a href="/report" className="primary-btn">
                  Emergency information
                <ArrowRight size={16} />
              </a>

            </div>

          </div>

          <div className="safety-list">

            <SafetyItem
              title="Emergency contacts"
              text="Quick access to campus security and emergency services."
            />

            <SafetyItem
              title="Evacuation procedures"
              text="Clear instructions for different emergency situations."
            />

            <SafetyItem
              title="Assembly points"
              text="Find designated safe locations across campus."
            />

            <SafetyItem
              title="Campus procedures"
              text="Access important safety guidelines anytime."
            />

          </div>

        </div>

      </div>

    </section>
  );
}


function SafetyItem({ title, text }) {
  return (
    <div className="safety-item">

      <div className="safety-check">
        <CheckCircle2 size={17} />
      </div>

      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>

    </div>
  );
}


function ReportSection() {
  const navigate = useNavigate();

  return (
    <section id="report" className="report-section">

      <div className="section-container">

        <div className="report-box">

          <div>
            <span className="eyebrow">
              EMERGENCY RESPONSE
            </span>

            <h2>
              See something?
              <br />
              <span>Report it.</span>
            </h2>

            <p>
              Your report can help security teams respond
              faster and keep the campus safe.
            </p>
          </div>

          <button className="report-action-button" onClick={() => navigate("/report")}>
            <Siren size={21} />
            Report Emergency
          </button>

        </div>

      </div>

    </section>
  );
}


function Footer() {
  return (
    <footer className="footer">

      <div className="section-container">

        <div className="footer-main">

          <div className="logo">
            <div className="logo-icon">
              <Siren size={18} />
            </div>

            <div>
              <span className="logo-name">Campus</span>
              <span className="logo-highlight">ResQ</span>
            </div>
          </div>

          <p>
            Smart Campus Emergency Response
            & Safety Management System
          </p>

        </div>

        <div className="footer-bottom">

          <span>
            © 2026 CampusResQ
          </span>

          <span>
            Built for safer campuses.
          </span>

        </div>

      </div>

    </footer>
  );
}


function LandingPage() {
  return (
    <div>

      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <SafetySection />

      <ReportSection />

      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/report" element={<ReportEmergency />} />
      <Route path="/reports" element={<MyReports />} />
      <Route path="/map" element={<SafetyMap />} />
      <Route path="/preparedness" element={<Preparedness />} />
      <Route path="/emergency" element={<Emergency />} />
      <Route
        path="/emergency-capture"
        element={<EmergencyCapture />}
      />
      <Route path="/my-report" element={<MyReports />} />
      <Route path="/my-reports" element={<MyReports />} />
    </Routes>
  );
}