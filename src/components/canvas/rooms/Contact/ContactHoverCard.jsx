import React, { useState, useCallback } from 'react';
import '../../../../styles/ContactHoverCard.scss';

const EMAIL_ADDRESS = 'kundan25052003@gmail.com';
const PHONE_NUMBER = '+91 9952429138';

const ContactHoverCard = ({ type, onMouseEnter, onMouseLeave }) => {
    const [copied, setCopied] = useState(false);
    const isEmail = type === 'email';

    const title = isEmail ? 'EMAIL' : 'PHONE';
    const displayValue = isEmail ? EMAIL_ADDRESS : PHONE_NUMBER;
    const actionHref = isEmail ? `mailto:${EMAIL_ADDRESS}` : undefined;

    const handleCopy = useCallback(async (e) => {
        e.stopPropagation();
        const textToCopy = isEmail ? EMAIL_ADDRESS : PHONE_NUMBER;

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
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
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.warn('Failed to copy text: ', err);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    }, [isEmail]);

    return (
        <div
            className="contact-hover-card"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={(e) => e.stopPropagation()}
            role="region"
            aria-label={`${title} contact info`}
        >
            <div className="hover-card-border" />
            <div className="hover-card-content">
                <div className="hover-card-title">
                    <span>{isEmail ? '✉️' : '📞'}</span>
                    <span>{title}</span>
                </div>

                {isEmail ? (
                    <a
                        href={actionHref}
                        className="hover-card-value"
                        title="Click to open email client"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {displayValue}
                    </a>
                ) : (
                    <span className="hover-card-value">
                        {displayValue}
                    </span>
                )}

                <button
                    type="button"
                    className={`hover-card-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                    aria-label={isEmail ? 'Copy email address' : 'Copy phone number'}
                >
                    {copied ? (
                        <>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>{isEmail ? 'Email copied!' : 'Phone number copied!'}</span>
                        </>
                    ) : (
                        <>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>{isEmail ? 'Copy Email' : 'Copy Number'}</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ContactHoverCard;
