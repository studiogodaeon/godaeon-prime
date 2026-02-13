'use client';

import { useEffect, useRef } from 'react';

export default function TypingEffect({ text, className = '', speed = 100 }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const typingSpan = el.querySelector('.typing-text');
        const cursor = el.querySelector('.typing-cursor');
        if (!typingSpan || !cursor) return;

        typingSpan.textContent = '';
        let i = 0;
        let timeoutId;

        function typeWriter() {
            if (i < text.length) {
                typingSpan.textContent += text[i];
                i++;
                timeoutId = setTimeout(typeWriter, speed);
            } else {
                timeoutId = setTimeout(() => {
                    cursor.style.opacity = '0';
                    timeoutId = setTimeout(() => cursor.remove(), 500);
                }, 500);
            }
        }

        timeoutId = setTimeout(typeWriter, 500);

        return () => clearTimeout(timeoutId);
    }, [text, speed]);

    return (
        <span ref={containerRef} className={className}>
            <span className="typing-text text-red-600"></span>
            <span className="typing-cursor">|</span>
        </span>
    );
}
