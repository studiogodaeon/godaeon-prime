'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { triggerPixelTransition } from './PixelOverlay';

const menuItems = [
    { label: 'HOME', icon: 'fa-home', href: '/' },
    { label: 'ABOUT US', icon: 'fa-info-circle', href: '/about' },
    { label: 'GODAEON', icon: 'fa-users', href: '/godaeon' },
    { label: 'Development', icon: 'fa-laptop-code', href: '/development' },
    { label: 'Investment', icon: 'fa-chart-line', href: '/investment' },
    { label: 'Contact', icon: 'fa-envelope', href: '/contact' },
];

const wheelCx = 300, wheelCy = 300, wheelRadius = 200, wheelInnerRadius = 80;
const totalItems = menuItems.length;
const sliceAngle = 360 / totalItems;
const gap = 4;

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians)),
    };
}

function createSectorPath(x, y, outerR, innerR, startAngle, endAngle) {
    const startOuter = polarToCartesian(x, y, outerR, endAngle);
    const endOuter = polarToCartesian(x, y, outerR, startAngle);
    const startInner = polarToCartesian(x, y, innerR, endAngle);
    const endInner = polarToCartesian(x, y, innerR, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
        'M', startOuter.x, startOuter.y,
        'A', outerR, outerR, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
        'L', endInner.x, endInner.y,
        'A', innerR, innerR, 0, largeArcFlag, 1, startInner.x, startInner.y,
        'Z',
    ].join(' ');
}

export default function CommandWheel() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLabel, setActiveLabel] = useState(-1);
    const overlayRef = useRef(null);
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const btnContentRef = useRef(null);
    const centerRef = useRef(null);
    const radarVideoRef = useRef(null);
    const isMenuOpenRef = useRef(false);

    // Keep ref in sync
    useEffect(() => {
        isMenuOpenRef.current = isMenuOpen;
    }, [isMenuOpen]);

    // Build segments data
    const segments = menuItems.map((item, i) => {
        const startAngle = (i * sliceAngle) + (gap / 2);
        const endAngle = ((i + 1) * sliceAngle) - (gap / 2);
        const pathData = createSectorPath(wheelCx, wheelCy, wheelRadius, wheelInnerRadius, startAngle, endAngle);
        const midAngle = startAngle + (sliceAngle - gap) / 2;
        const textRadius = wheelInnerRadius + (wheelRadius - wheelInnerRadius) / 2;
        const pos = polarToCartesian(wheelCx, wheelCy, textRadius, midAngle);
        return { ...item, pathData, pos, startAngle, endAngle, index: i };
    });

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const targetScale = isMobile ? 0.55 : 1;

        if (isMenuOpen) {
            gsap.to(overlayRef.current, { opacity: 1, pointerEvents: 'all', duration: 0.4 });
            gsap.fromTo(containerRef.current,
                { rotation: -180, scale: 0.5, opacity: 0 },
                { rotation: 0, scale: targetScale, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.7)' }
            );
            gsap.to(logoRef.current, { opacity: 0, y: 20 });
            if (radarVideoRef.current) {
                radarVideoRef.current.play().catch(() => { });
            }
        } else {
            gsap.to(overlayRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
            gsap.to(containerRef.current, { rotation: 90, scale: 0.5, opacity: 0, duration: 0.4 });
            gsap.to(centerRef.current, { x: 0, y: 0, duration: 0.3 });
            gsap.to(logoRef.current, { opacity: 1, y: 0 });
            if (radarVideoRef.current) {
                radarVideoRef.current.pause();
            }
        }
    }, [isMenuOpen]);

    // Keyboard shortcut
    useEffect(() => {
        const handler = (e) => {
            if (e.key.toLowerCase() === 'x') {
                setIsMenuOpen(prev => !prev);
            }
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, []);

    // Mouse parallax on wheel center
    useEffect(() => {
        const handler = (e) => {
            if (!isMenuOpenRef.current) return;
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            const maxDist = 40;
            const moveDist = Math.min(dist * 0.15, maxDist);
            const moveX = Math.cos(angle) * moveDist;
            const moveY = Math.sin(angle) * moveDist;
            gsap.to(centerRef.current, { x: moveX, y: moveY, duration: 0.3, ease: 'power2.out' });
        };
        document.addEventListener('mousemove', handler);
        return () => document.removeEventListener('mousemove', handler);
    }, []);

    const handleSegmentClick = (href) => {
        triggerPixelTransition(href);
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* Menu toggle */}
            <div className="menu-toggle-container">
                <div className="floating-menu-logo" ref={logoRef}>
                    <i className="fas fa-cube text-red-600"></i>
                    <span>GODAEON</span>
                </div>
                <div className="menu-toggle-btn" onClick={toggleMenu}>
                    <div className="menu-btn-content" ref={btnContentRef}>
                        {isMenuOpen ? (
                            <i className="fas fa-times menu-close-icon" aria-hidden="true" style={{ transform: 'translateY(8px)' }}></i>
                        ) : (
                            <span>PRESS &apos;X&apos;</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Menu overlay */}
            <div className="menu-overlay" ref={overlayRef}>
                {/* Radar background */}
                <div className="menu-radar-bg" aria-hidden="true">
                    <video
                        ref={radarVideoRef}
                        className="menu-radar-video"
                        loop
                        muted
                        playsInline
                    >
                        <source src="/media/radar.mp4" type="video/mp4" />
                    </video>
                    <div className="menu-radar-scan"></div>
                </div>

                {/* Wheel */}
                <div className="wheel-svg-container" ref={containerRef}>
                    <div className="wheel-center" ref={centerRef}>
                        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                    </div>
                    <svg width="600" height="600" viewBox="0 0 600 600">
                        {segments.map((seg) => (
                            <path
                                key={seg.index}
                                d={seg.pathData}
                                className="wheel-segment"
                                onClick={() => handleSegmentClick(seg.href)}
                                onMouseEnter={() => setActiveLabel(seg.index)}
                                onMouseLeave={() => setActiveLabel(-1)}
                            />
                        ))}
                    </svg>
                    <div className="wheel-content">
                        {segments.map((seg) => (
                            <div
                                key={seg.index}
                                className={`wheel-item-content ${activeLabel === seg.index ? 'active' : ''}`}
                                style={{ left: `${seg.pos.x}px`, top: `${seg.pos.y}px` }}
                            >
                                <i className={`fas ${seg.icon}`}></i>
                                <span>{seg.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
