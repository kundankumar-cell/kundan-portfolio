import { useScene } from '../../context/SceneContext';
import { useGalleryProjects, useStudioContent, useAwards } from '../../hooks/useSanityData';
import '../../styles/ScreenReaderOverlay.scss';

/**
 * ScreenReaderOverlay — A7 Accessibility
 * 
 * Invisible HTML layer providing screen reader access to 3D canvas content.
 * Contains buttons/links matching interactive 3D elements (doors, rooms).
 * Visually hidden via .sr-only but fully accessible to assistive tech.
 */
const ScreenReaderOverlay = () => {
    const { hasEntered, isInRoom, currentRoom, teleportTo, requestExit } = useScene();
    
    // Pobieranie danych do wygenerowania niewidocznego HTML-a dla SEO / robotów
    const projects = useGalleryProjects();
    const studio = useStudioContent();
    const awards = useAwards();

    return (
        <div className="sr-overlay" role="complementary" aria-label="Accessible navigation for 3D portfolio">
            {/* Skip to content link */}
            <a href="#sr-main-nav" className="sr-only sr-focusable">
                Skip to accessible navigation
            </a>

            {/* Main accessible navigation */}
            <nav id="sr-main-nav" className="sr-only" aria-label="Portfolio rooms">
                <h1>KUNDANKUMAR A — Software Developer Portfolio</h1>
                <h2>Portfolio Navigation</h2>

                {!hasEntered && (
                    <p>Welcome to KUNDANKUMAR A's interactive 3D portfolio. Click or press Enter on the doors to enter.</p>
                )}

                {hasEntered && !isInRoom && (
                    <>
                        <p>You are in the corridor. Choose a room to explore:</p>
                        <ul>
                            <li>
                                <button onClick={() => teleportTo('about')} type="button">
                                    About — My story, skills, and journey
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('gallery')} type="button">
                                    The Gallery — My projects and work
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('contact')} type="button">
                                    Contact — Get in touch with me
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('studio')} type="button">
                                    The Studio — Technologies and experience
                                </button>
                            </li>
                        </ul>
                    </>
                )}

                {hasEntered && isInRoom && (
                    <>
                        <p>
                            You are in the {currentRoom === 'about' ? 'About' :
                                currentRoom === 'gallery' ? 'Gallery' :
                                    currentRoom === 'contact' ? 'Contact' :
                                        currentRoom === 'studio' ? 'Studio' : currentRoom} room.
                        </p>
                        <button onClick={requestExit} type="button">
                            Go back to corridor
                        </button>

                        {/* Room-specific content descriptions */}
                        {currentRoom === 'about' && (
                            <div aria-label="About room content">
                                <h3>About Kundan Kumar A</h3>
                                <p>I am Kundan Kumar A, a Software Developer and B.Tech CSE/CSIT student at IPS Academy, Indore (currently in 6th Semester with a 92% score, expected graduation in 2027). I have completed a Full Stack Development Internship as a Full Stack Intern, and I specialize in building full-stack applications and AI-powered solutions.</p>
                                <p><strong>Core Interests:</strong> Full Stack Development, Artificial Intelligence, Machine Learning, Natural Language Processing (NLP), and Large Language Models (LLMs).</p>
                                <p><strong>Technical Skills:</strong> Java, Python, JavaScript, React, Node.js, MongoDB, SQL, Machine Learning, NLP, AI / LLM, HTML, CSS, Git.</p>
                                
                                {awards && (
                                    <section>
                                        <h4>Achievements</h4>
                                        <ul>
                                            {awards.sotd && awards.sotd.items && awards.sotd.items.map((a, i) => (
                                                <li key={i}>{a.label} - {a.date} {a.url && <a href={a.url}>View</a>}</li>
                                            ))}
                                            {awards.sotm && awards.sotm.items && awards.sotm.items.map((a, i) => (
                                                <li key={i}>{a.label} - {a.date} {a.url && <a href={a.url}>View</a>}</li>
                                            ))}
                                            {awards.other && awards.other.items && awards.other.items.map((a, i) => (
                                                <li key={i}>{a.label} - {a.date} {a.url && <a href={a.url}>View</a>}</li>
                                            ))}
                                        </ul>
                                    </section>
                                )}
                            </div>
                        )}
                        {currentRoom === 'gallery' && (
                            <div aria-label="Gallery room content">
                                <h3>My Projects</h3>
                                <p>Browse through my portfolio projects displayed on paper cards. Click on a project card to see details and visit the live site.</p>
                                
                                {projects && projects.length > 0 && (
                                    <ul>
                                        {projects.map((p, i) => (
                                            <li key={i}>
                                                <h4>{p.title} {p.type ? `— ${p.type}` : ''}</h4>
                                                {p.achievement && <p><strong>Achievement:</strong> {p.achievement}</p>}
                                                <p>{p.description}</p>
                                                {p.techStack && p.techStack.length > 0 && (
                                                    <p><strong>Tech Stack:</strong> {p.techStack.map(t => t.name || t).join(', ')}</p>
                                                )}
                                                {p.url && (
                                                    <a href={p.url} target="_blank" rel="noopener noreferrer">
                                                        Visit {p.title} (Live Demo)
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        {currentRoom === 'contact' && (
                            <div aria-label="Contact room content">
                                <h3>Contact Kundan Kumar A</h3>
                                <p>Get in touch with Kundan Kumar A (Software Developer) via the following channels:</p>
                                <ul>
                                    <li><strong>Email:</strong> <a href="mailto:kundan25052003@gmail.com">kundan25052003@gmail.com</a></li>
                                    <li><strong>Phone:</strong> <a href="tel:+919952429138">+91 9952429138</a></li>
                                    <li><strong>GitHub:</strong> <a href="https://github.com/kundankumar-cell" target="_blank" rel="noopener noreferrer">https://github.com/kundankumar-cell</a></li>
                                    <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/kundankumar-a-81125a2a4" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/kundankumar-a-81125a2a4</a></li>
                                    <li><strong>LeetCode:</strong> <a href="https://leetcode.com/u/KundanKumar_A25/" target="_blank" rel="noopener noreferrer">https://leetcode.com/u/KundanKumar_A25/</a></li>
                                </ul>
                            </div>
                        )}
                        {currentRoom === 'studio' && (
                            <div aria-label="Studio room content">
                                <h3>The Studio</h3>
                                <p>Explore resources and documents on rotating monitors. Click a monitor to view or download resources.</p>

                                {studio && studio.length > 0 && (
                                    <ul>
                                        {studio.map((s, i) => (
                                            <li key={i}>
                                                <h4>{s.title}</h4>
                                                <p>{s.description}</p>
                                                {s.file && (
                                                    <div>
                                                        <a href={s.file} target="_blank" rel="noopener noreferrer">VIEW RESUME</a>
                                                        {' | '}
                                                        <a href={s.file} download={s.filename || `${s.title}.pdf`}>DOWNLOAD RESUME</a>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Quick navigation to other rooms */}
                        <h3>Quick Navigation</h3>
                        <ul>
                            {currentRoom !== 'about' && (
                                <li><button onClick={() => teleportTo('about')} type="button">Go to About</button></li>
                            )}
                            {currentRoom !== 'gallery' && (
                                <li><button onClick={() => teleportTo('gallery')} type="button">Go to Gallery</button></li>
                            )}
                            {currentRoom !== 'contact' && (
                                <li><button onClick={() => teleportTo('contact')} type="button">Go to Contact</button></li>
                            )}
                            {currentRoom !== 'studio' && (
                                <li><button onClick={() => teleportTo('studio')} type="button">Go to Studio</button></li>
                            )}
                        </ul>
                    </>
                )}
            </nav>

            {/* Live region for state changes */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {isInRoom && `Entered ${currentRoom} room`}
            </div>
        </div>
    );
};

export default ScreenReaderOverlay;
