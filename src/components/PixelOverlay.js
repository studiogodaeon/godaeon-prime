'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const blockSize = 50;

export default function PixelOverlay() {
    const overlayRef = useRef(null);

    const createPixelGrid = useCallback(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;
        overlay.innerHTML = '';

        const width = window.innerWidth;
        const height = window.innerHeight;
        const cols = Math.ceil(width / blockSize);
        const rows = Math.ceil(height / blockSize);
        const numBlocks = cols * rows;

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < numBlocks; i++) {
            const div = document.createElement('div');
            div.classList.add('pixel-block');
            fragment.appendChild(div);
        }
        overlay.appendChild(fragment);
    }, []);

    useEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;

        const hasPixelTransition = sessionStorage.getItem('pixel_transition') === '1';

        if (hasPixelTransition) {
            createPixelGrid();
            const blocks = overlay.querySelectorAll('.pixel-block');
            gsap.set(blocks, { opacity: 1 });

            gsap.to(blocks, {
                opacity: 0,
                duration: 0.5,
                stagger: { amount: 0.5, from: 'random', grid: 'auto' },
                ease: 'power2.inOut',
                onComplete: () => {
                    sessionStorage.removeItem('pixel_transition');
                    overlay.style.pointerEvents = 'none';
                    overlay.innerHTML = '';
                }
            });
        }

        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(createPixelGrid, 200);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
        };
    }, [createPixelGrid]);

    return <div id="pixel-overlay" ref={overlayRef}></div>;
}

// Export a helper so pages can trigger the pixel transition
export function triggerPixelTransition(target) {
    const overlay = document.getElementById('pixel-overlay');
    if (!overlay) {
        window.location.href = target;
        return;
    }

    sessionStorage.setItem('pixel_transition', '1');
    overlay.style.pointerEvents = 'all';

    if (overlay.children.length === 0) {
        overlay.innerHTML = '';
        const width = window.innerWidth;
        const height = window.innerHeight;
        const cols = Math.ceil(width / blockSize);
        const rows = Math.ceil(height / blockSize);
        const numBlocks = cols * rows;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < numBlocks; i++) {
            const div = document.createElement('div');
            div.classList.add('pixel-block');
            fragment.appendChild(div);
        }
        overlay.appendChild(fragment);
    }

    const blocks = overlay.querySelectorAll('.pixel-block');
    gsap.to(blocks, {
        opacity: 1,
        duration: 0.4,
        stagger: { amount: 0.5, from: 'random', grid: 'auto' },
        ease: 'power1.inOut',
        onComplete: () => {
            window.location.href = target;
        }
    });
}
