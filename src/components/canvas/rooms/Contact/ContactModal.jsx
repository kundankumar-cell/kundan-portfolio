import React, { useState, useEffect, useCallback } from 'react';
import '../../../../styles/ContactModal.scss';

const EMAIL_ADDRESS = 'kundan25052003@gmail.com';
const PHONE_NUMBER = '+91 9952429138';

const ContactModal = ({ type, onClose }) => {
    const [copied, setCopied] = useState(false);
    const [copyMessage, setCopyMessage] = useState('');

    const isEmail = type === 'email';
    const isPhone = type === 'phone';

    const title = isEmail ? 'Email' : 'Phone';
    const displayValue = isEmail ? EMAIL_ADDRESS : PHONE_NUMBER;
    const actionHref = isEmail ? `mailto:${EMAIL_ADDRESS}` : `tel:+919952429138`;

    // Keyboard accessibility: Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose?.();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Handle copying to clipboard with error fallback
    const handleCopy = useCallback(async () => {
        const textToCopy = isEmail ? EMAIL_ADDRESS : PHONE_NUMBER;
        const successMsg = isEmail ? 'Email copied!' : 'Phone number copied!';

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                // Fallback for older browsers or non-secure contexts
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                textArea.style.position = 'fixed';
                textArea.style.left = '-9999px';
                textArea.style.top = '-9999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            setCopied(true);
            setCopyMessage(successMsg);
            setTimeout(() => {
                setCopied(false);
            }, 2500);
        } catch (err) {
            console.warn('Failed to copy text: ', err);
            // Fallback display
            setCopied(true);
            setCopyMessage(successMsg);
            setTimeout(() => {
                setCopied(false);
            }, 2500);
        }
    }, [isEmail]);

    const handlePrimaryAction = useCallback(() => {
        window.location.href = actionHref;
    }, [actionHref]);

    if (!type) return null;

    return (
        <div
            className="contact-modal-backdrop"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose?.();
                }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
        >
            <div className="contact-modal-card">
                <div className="modal-sketch-border" />

                <div className="contact-modal-content">
                    {/* Header */}
                    <div className="contact-modal-header">
                        <div className="modal-title-wrapper">
                            <span className="modal-icon">{isEmail ? '✉️' : '📞'}</span>
                            <h2 id="contact-modal-title" className="modal-title">{title}</h2>
                        </div>
                        <button
                            type="button"
                            className="modal-close-btn"
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Value Box */}
                    <div className="contact-modal-value-box">
                        <span className="value-label">{isEmail ? 'Direct Email' : 'Phone / WhatsApp'}</span>
                        <a
                            href={actionHref}
                            className="value-link"
                            title={isEmail ? 'Open in mail client' : 'Call number'}
                        >
                            {displayValue}
                        </a>
                    </div>

                    {/* Action Buttons */}
                    <div className="contact-modal-actions">
                        {isEmail ? (
                            <>
                                <button
                                    type="button"
                                    className={`modal-btn btn-secondary ${copied ? 'btn-copied' : ''}`}
                                    onClick={handleCopy}
                                    aria-label="Copy email address"
                                >
                                    {copied ? (
                                        <>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Copy Email</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="modal-btn btn-primary"
                                    onClick={handlePrimaryAction}
                                    aria-label="Open email client"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                                        <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Open Email</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="modal-btn btn-primary"
                                    onClick={handlePrimaryAction}
                                    aria-label="Call phone number"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Call</span>
                                </button>
                                <button
                                    type="button"
                                    className={`modal-btn btn-secondary ${copied ? 'btn-copied' : ''}`}
                                    onClick={handleCopy}
                                    aria-label="Copy phone number"
                                >
                                    {copied ? (
                                        <>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Copy Number</span>
                                        </>
                                    )}
                                </button>
                            </>
                        )}
                    </div>

                    {/* Copy Feedback Toast */}
                    {copied && (
                        <div className="copy-toast" role="status" aria-live="polite">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>{copyMessage}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
