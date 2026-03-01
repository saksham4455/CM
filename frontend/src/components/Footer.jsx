import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/Footer.css'

function Footer() {
  const [time, setTime] = useState(new Date())
  const [systemVitals, setSystemVitals] = useState({
    cpu: 0,
    ram: 0,
    network: 0
  })
  const [terminalLogs, setTerminalLogs] = useState([
    '> System initialized...',
    '> Connecting to mainframe...',
    '> Establishing secure connection...'
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())

      // Simulate system vitals
      setSystemVitals({
        cpu: Math.floor(Math.random() * 30 + 15),
        ram: Math.floor(Math.random() * 25 + 50),
        network: Math.floor(Math.random() * 100)
      })
    }, 1000)

    // Terminal logs
    const logTimer = setInterval(() => {
      const messages = [
        '> Scanning for threats...',
        '> Firewall status: ACTIVE',
        '> Encryption key rotated',
        '> Connection secured',
        '> No anomalies detected',
        '> System monitoring active',
        '> Threat level: LOW',
        '> SSL handshake complete'
      ]
      const randomMsg = messages[Math.floor(Math.random() * messages.length)]
      setTerminalLogs(prev => [...prev.slice(-2), randomMsg])
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(logTimer)
    }
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">CYNET 2026</h3>
          <p className="footer-tagline">Initiating Cyber Domination</p>
          <p className="footer-description">Where Hackers Are Born</p>

          <div className="system-vitals">
            <h5 className="vitals-title">SYSTEM VITALS</h5>
            <div className="vital-bar">
              <span className="vital-label">CPU</span>
              <div className="vital-progress">
                <div className="vital-fill" style={{ width: `${systemVitals.cpu}%` }}></div>
              </div>
              <span className="vital-value">{systemVitals.cpu}%</span>
            </div>
            <div className="vital-bar">
              <span className="vital-label">RAM</span>
              <div className="vital-progress">
                <div className="vital-fill" style={{ width: `${systemVitals.ram}%` }}></div>
              </div>
              <span className="vital-value">{systemVitals.ram}%</span>
            </div>
            <div className="vital-bar">
              <span className="vital-label">NET</span>
              <div className="vital-progress">
                <div className="vital-fill network" style={{ width: `${systemVitals.network}%` }}></div>
              </div>
              <span className="vital-value">{systemVitals.network}%</span>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">NAVIGATION</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/events"> Past Events</Link></li>
            <li><Link to="/team">Team </Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">CONNECT</h4>
          <ul className="footer-links">
            <li><a href="mailto:cyber@cynet.net">cyber@cynet.net</a></li>
            <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
          </ul>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-section footer-section-wide">
          <div className="footer-dual-section">
            <div className="footer-subsection">
              <h4 className="footer-heading">SECURITY STATUS</h4>
              <div className="status-indicators">
                <div className="status-item">
                  <span className="status-dot active"></span>
                  <span>FIREWALL: ACTIVE</span>
                </div>
                <div className="status-item">
                  <span className="status-dot active"></span>
                  <span>SSL/TLS: SECURED</span>
                </div>
                <div className="status-item">
                  <span className="status-dot active"></span>
                  <span>AES-256: ENABLED</span>
                </div>
                <div className="status-item">
                  <span className="status-dot warning"></span>
                  <span>THREAT LEVEL: LOW</span>
                </div>
              </div>
            </div>

            <div className="footer-subsection">
              <h4 className="footer-heading">TERMINAL LOG</h4>
              <div className="terminal-log">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="log-entry">
                    <span className="log-time">[{formatTime(time)}]</span>
                    <span className="log-text">{log}</span>
                  </div>
                ))}
              </div>
              <div className="encrypted-msg">
                <span className="encrypt-icon">🔒</span>
                <span className="encrypt-text">E2E ENCRYPTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-compressed-bottom">
          <div className="footer-bottom-info">
            <span className="copyright">&copy; 2026 CYNET</span>
            <span className="footer-separator">&nbsp;|&nbsp;</span>
            <span className="footer-rights">All rights reserved.</span>
          </div>
          <div className="footer-bottom-team">
            <span className="footer-team">Made with 🤍 by Developer Team: Kanika, Aditya, Saksham, Ananya, Daksh, Avnish, Shubhu, Jia, Harshit</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
