import React from 'react';
import '../../styles/AchievementsPanel.scss';

const AchievementsPanel = ({ isOpen, onClose }) => {
    return (
        <div className={`achievements-panel ${isOpen ? 'open' : ''}`} inert={!isOpen ? true : undefined}>
            <div className="achievements-card profile-card">
                <div className="achievements-header">
                    <h3>PROFILE</h3>
                    <button
                        className="close-btn"
                        onClick={onClose}
                        aria-label="Close profile"
                    >
                        <svg viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="profile-content">
                    {/* Name & Role */}
                    <div className="profile-hero">
                        <h4 className="profile-name">KUNDAN KUMAR A</h4>
                        <div className="profile-role">Software Developer</div>
                    </div>

                    {/* Education */}
                    <div className="profile-section">
                        <div className="section-heading">Education</div>
                        <div className="section-body">
                            <div className="item-title">B.Tech — Computer Science Engineering</div>
                            <div className="item-subtitle">IPS Academy, Indore</div>
                        </div>
                    </div>

                    {/* Focus */}
                    <div className="profile-section">
                        <div className="section-heading">Focus</div>
                        <div className="section-tags">
                            <span className="profile-tag">Full-Stack Development</span>
                            <span className="profile-tag">AI / ML</span>
                            <span className="profile-tag">AI / LLM Applications</span>
                        </div>
                    </div>

                    {/* Projects */}
                    <div className="profile-section">
                        <div className="section-heading">Projects</div>
                        <div className="section-tags projects-tags">
                            <span className="profile-tag project-tag">EduSure</span>
                            <span className="profile-tag project-tag">OneHealth</span>
                            <span className="profile-tag project-tag">EcoSense</span>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="profile-section">
                        <div className="section-heading">Highlights</div>
                        <ul className="profile-highlights">
                            <li>100+ Live Users</li>
                            <li>Hackathon Achievements</li>
                            <li>Full-Stack Development Experience</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AchievementsPanel;
