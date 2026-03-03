import React, { useState, useMemo, useEffect } from "react";
import "../css/AdminPanel.css";
import { useRegistrationStore } from "../../store/registerStore";

/* ─── Event list (must match the IDs stored in DB by RegistrationForm) ─── */
const ALL_EVENTS = [
  "TREASURE_HUNT",
  "INNOVISION",
  "GAMING_ARENA",
  "HACKING_EVENT",
  "MIND_MATRIX",
  "TECH_UNSEEN",
  "SHADOW_CODE",
];

const EVENT_LABELS = {
  TREASURE_HUNT: "TREASURE HUNT",
  INNOVISION:    "INNOVISION 7.0",
  GAMING_ARENA:  "GAMING ARENA",
  CODING_EVENT: "SHADOW CODE",
  MIND_MATRIX:   "MIND MATRIX",
  TECH_UNSEEN:   "TECH UNSEEN",
  HACKING_EVENT: "HACKING EVENT",
};

/* ─── Screenshot Lightbox ─── */
const Lightbox = ({ src, name, onClose }) => (
  <div className="ap-lightbox-overlay" onClick={onClose}>
    <div className="ap-lightbox-box" onClick={(e) => e.stopPropagation()}>
      <button className="ap-lightbox-close" onClick={onClose}>
        ✕
      </button>
      <img src={src} alt={`${name} payment screenshot`} />
      <p className="ap-lightbox-label">{name} — Payment Screenshot</p>
    </div>
  </div>
);

/* ─── Status Badge ─── */
const StatusBadge = ({ status }) => (
  <span className={`ap-badge ap-badge--${status}`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);

/* ─── Main Component ─── */
const AdminPanel = () => {
  const [activeEvent, setActiveEvent] = useState("ALL");
  const [search, setSearch] = useState("");
  const [lightbox, setLightbox] = useState(null); // { src, name }
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    registrations,
    fetchRegistrations,
    acceptStudent,
    rejectStudent,
    loading,
  } = useRegistrationStore();

  useEffect(() => {
    const auth = sessionStorage.getItem("cynet-admin-auth");
    if (!auth) window.location.href = "/admin-login";
    fetchRegistrations("ALL");
  }, []);

  const filtered = useMemo(() => {
    let rows = registrations;

    if (activeEvent !== "ALL") {
      rows = rows.filter((r) => r.events.includes(activeEvent));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.college.toLowerCase().includes(q) ||
          r.phone.includes(q) ||
          r.email.toLowerCase().includes(q),
      );
    }
    return rows;
  }, [registrations, activeEvent, search]);

  console.log(registrations);

  const handleLogout = () => {
    sessionStorage.removeItem("cynet-admin-auth");
    window.location.href = "/admin-login";
  };

  /* ── Stats ── */
  const stats = useMemo(() => {
    const base =
      activeEvent === "ALL"
        ? registrations
        : registrations.filter((r) => r.events.includes(activeEvent));

    return {
      total: base.length,
      pending: base.filter((r) => r.status === "pending").length,
      accepted: base.filter((r) => r.status === "accepted").length,
      rejected: base.filter((r) => r.status === "rejected").length,
    };
  }, [registrations, activeEvent]);

  return (
    <div className="ap-root">
      {/* ════ SIDEBAR ════ */}
      <aside className={`ap-sidebar ${sidebarOpen ? "ap-sidebar--open" : ""}`}>
        <div className="ap-sidebar-header">
          <span className="ap-sidebar-title">
            <span className="ap-bracket">[</span>
            CYNET 2026
            <span className="ap-bracket">]</span>
          </span>
          <button
            className="ap-sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <p className="ap-sidebar-label">FILTER BY EVENT</p>

        <nav className="ap-nav">
          <button
            className={`ap-nav-item ${activeEvent === "ALL" ? "ap-nav-item--active" : ""}`}
            onClick={() => {
              setActiveEvent("ALL");
              setSidebarOpen(false);
            }}
          >
            <span className="ap-nav-icon">◈</span> ALL EVENTS
            <span className="ap-nav-count">{registrations.length}</span>
          </button>

          {ALL_EVENTS.map((ev) => {
            const count = registrations.filter((r) => r.events.includes(ev)).length;
            return (
              <button
                key={ev}
                className={`ap-nav-item ${activeEvent === ev ? "ap-nav-item--active" : ""}`}
                onClick={() => {
                  setActiveEvent(ev);
                  setSidebarOpen(false);
                }}
              >
                <span className="ap-nav-icon">▸</span>
                {EVENT_LABELS[ev] || ev}
                <span className="ap-nav-count">{count}</span>
              </button>
            );
          })}
          <button className="bg-red-900/60 rounded-md py-1 cursor-pointer hover:bg-red-900 duration-150 transition-all" onClick={handleLogout}>Logout</button>
        </nav>

        <div className="ap-sidebar-footer">ADMIN PANEL v1.0</div>
      </aside>

      {/* ════ MAIN CONTENT ════ */}
      <main className="ap-main">
        {/* ── Top Bar ── */}
        <header className="ap-topbar">
          <button className="ap-hamburger" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <div className="ap-topbar-title">
            <span className="ap-topbar-tag">&lt;ADMIN /&gt;</span>
            <span className="ap-topbar-sub">
              {activeEvent === "ALL" ? "All Registrations" : (EVENT_LABELS[activeEvent] || activeEvent)}
            </span>
          </div>
          <input
            className="ap-search"
            type="text"
            placeholder="Search name, college, phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>

        {/* ── Stats Cards ── */}
        <div className="ap-stats">
          <div className="ap-stat-card ap-stat-card--total">
            <span className="ap-stat-num">{stats.total}</span>
            <span className="ap-stat-label">TOTAL</span>
          </div>
          <div className="ap-stat-card ap-stat-card--pending">
            <span className="ap-stat-num">{stats.pending}</span>
            <span className="ap-stat-label">PENDING</span>
          </div>
          <div className="ap-stat-card ap-stat-card--accepted">
            <span className="ap-stat-num">{stats.accepted}</span>
            <span className="ap-stat-label">ACCEPTED</span>
          </div>
          <div className="ap-stat-card ap-stat-card--rejected">
            <span className="ap-stat-num">{stats.rejected}</span>
            <span className="ap-stat-label">REJECTED</span>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="ap-table-wrap">
          {filtered.length === 0 ? (
            <div className="ap-empty">
              <span>[ NO REGISTRATIONS FOUND ]</span>
            </div>
          ) : (
            <table className="ap-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>NAME</th>
                  <th>COLLEGE</th>
                  <th>CLASS / SEM</th>
                  <th>PHONE</th>
                  <th>EMAIL</th>
                  <th>EVENT</th>
                  <th>PAYMENT</th>
                  <th>SCREENSHOT</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((reg, idx) => (
                  <tr key={reg.id} className={`ap-tr ap-tr--${reg.status}`}>
                    <td className="ap-td-num">{idx + 1}</td>

                    <td className="ap-td-name">{reg.name}</td>

                    <td>{reg.college}</td>

                    <td className="ap-td-class">{reg.classSem}</td>

                    <td>
                      <a className="ap-phone" href={`tel:${reg.phone}`}>
                        {reg.phone}
                      </a>
                    </td>

                    <td className="ap-td-email">
                      <a className="ap-email-link" href={`mailto:${reg.email}`}>
                        {reg.email}
                      </a>
                    </td>

                    <td>
                      <span className="ap-event-tag">
                        {reg.events.map((ev, i) => (
                          <span key={i} className="ap-event-tag">
                            {ev}
                          </span>
                        ))}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`ap-payment ap-payment--${reg.paymentStatus}`}
                      >
                        {reg.paymentStatus.toUpperCase()}
                      </span>
                    </td>

                    <td className="ap-td-screenshot">
                      {reg.screenshotUrl ? (
                        <button
                          className="ap-thumb-btn"
                          onClick={() =>
                            setLightbox({ src: reg.screenshotUrl, name: reg.name })
                          }
                        >
                          <img
                            className="ap-thumb"
                            src={reg.screenshotUrl}
                            alt="screenshot"
                          />
                        </button>
                      ) : (
                        <span className="ap-no-ss">—</span>
                      )}
                    </td>

                    <td>
                      <StatusBadge status={reg.status} />
                    </td>

                    <td>
                      <div className="ap-actions">
                        <button
                          className="ap-btn ap-btn--accept"
                          disabled={reg.status === "accepted"}
                          onClick={() => acceptStudent(reg._id)}
                          title="Accept registration"
                        >
                          ✓ Accept
                        </button>
                        <button
                          className="ap-btn ap-btn--reject"
                          disabled={reg.status === "rejected"}
                          onClick={() => rejectStudent(reg._id)}
                          title="Reject registration"
                        >
                          ✗ Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="ap-footer-note">
          Showing {filtered.length} of {registrations.length} registrations
          {activeEvent !== "ALL" && ` · Event: ${EVENT_LABELS[activeEvent] || activeEvent}`}
          {search && ` · Search: "${search}"`}
        </p>
      </main>

      {/* ════ LIGHTBOX ════ */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          name={lightbox.name}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="ap-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminPanel;
