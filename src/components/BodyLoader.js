'use client';

import { useEffect } from 'react';

export default function BodyLoader() {
    useEffect(() => {
        // Small delay to let the page render, then fade in
        const timer = setTimeout(() => {
            document.body.classList.remove('is-loading');
            document.body.classList.add('loaded');
        }, 150);

        return () => clearTimeout(timer);
    }, []);

    return null;
}
