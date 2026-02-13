'use client';

import { useEffect, useRef } from 'react';

const CARDS = [
    {
        name: 'CIPHER',
        role: 'SYSTEM ARCHITECT',
        mediaType: 'video',
        mediaSrc: '/media/radar.mp4',
        backImg: '/media/siddharth.jpeg',
        realName: 'SORAV',
        realRole: 'FULL STACK DEV',
        id: '001',
        tag: 'FOUNDER',
        bio: '"Building, breaking, and innovating. Driven by curiosity."',
        linkedin: '#',
    },
    {
        name: 'RONIN',
        role: 'UI SPECIALIST',
        mediaType: 'image',
        mediaSrc: '/media/hero1.jpeg',
        backImg: '/media/siddharth.jpeg',
        realName: 'SIDDHARTH',
        realRole: 'REACT / GSAP',
        id: '002',
        tag: 'LEAD FE',
        bio: '"Crafting interfaces that blur reality."',
        linkedin: '#',
    },
    {
        name: 'SPECTRE',
        role: 'DATA OPS',
        mediaType: 'image',
        mediaSrc: '/media/hero2.jpeg',
        backImg: '/media/swaraj.jpeg',
        realName: 'SWARAJ',
        realRole: 'SECURITY OPS',
        id: '003',
        tag: 'BACKEND',
        bio: '"Ensuring scalability and zero downtime."',
        linkedin: '#',
    },
    {
        name: 'PHANTOM',
        role: 'RECON',
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1531297461136-82lw8fca9198?q=80&w=1000&auto=format&fit=crop',
        backImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
        realName: 'UNKNOWN',
        realRole: 'INTELLIGENCE',
        id: '004',
        tag: 'CLASSIFIED',
        bio: '"Data redacted. Level 5 clearance."',
        linkedin: '#',
    },
    {
        name: 'VANGUARD',
        role: 'ASSAULT',
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop',
        backImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
        realName: 'RECRUITING',
        realRole: 'GAME DESIGN',
        id: '005',
        tag: 'OPEN',
        bio: '"Position open for application."',
    },
    {
        name: 'GHOST',
        role: 'STEALTH',
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
        backImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop',
        realName: 'RECRUITING',
        realRole: 'AUDIO ENG',
        id: '006',
        tag: 'OPEN',
        bio: '"Seeking audio specialist."',
    },
    {
        name: 'WRAITH',
        role: 'SUPPORT',
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=1000&auto=format&fit=crop',
        backImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
        realName: 'RESERVED',
        realRole: 'MARKETING',
        id: '007',
        tag: 'PENDING',
        bio: '"Clearance pending."',
    },
    {
        name: 'ONYX',
        role: 'COMMAND',
        mediaType: 'image',
        mediaSrc: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop',
        backImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
        realName: 'UNKNOWN',
        realRole: 'STRATEGY',
        id: '008',
        tag: 'CLASSIFIED',
        bio: '"Identity protected."',
    },
];

function CyberCard({ card }) {
    const innerRef = useRef(null);
    const cardRef = useRef(null);
    const isFlippedRef = useRef(false);

    useEffect(() => {
        const cardEl = cardRef.current;
        const innerEl = innerRef.current;
        if (!cardEl || !innerEl) return;

        const handleClick = () => {
            isFlippedRef.current = !isFlippedRef.current;
            innerEl.classList.toggle('is-flipped');
            if (isFlippedRef.current) cardEl.style.transform = 'none';
        };

        const handleMouseMove = (e) => {
            if (isFlippedRef.current) return;
            const rect = cardEl.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPct = (x / rect.width - 0.5) * 2;
            const yPct = (y / rect.height - 0.5) * 2;
            const xRotation = yPct * -8;
            const yRotation = xPct * 8;
            requestAnimationFrame(() => {
                if (!isFlippedRef.current) {
                    cardEl.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
                }
            });
        };

        const handleMouseLeave = () => {
            if (!isFlippedRef.current) {
                cardEl.style.transform = 'rotateX(0deg) rotateY(0deg)';
            }
        };

        cardEl.addEventListener('click', handleClick);
        cardEl.addEventListener('mousemove', handleMouseMove);
        cardEl.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cardEl.removeEventListener('click', handleClick);
            cardEl.removeEventListener('mousemove', handleMouseMove);
            cardEl.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="cyber-card" ref={cardRef}>
            <div className="card-inner" ref={innerRef}>
                <div className="card-front">
                    {card.mediaType === 'video' ? (
                        <video className="card-media" autoPlay loop muted playsInline>
                            <source src={card.mediaSrc} type="video/mp4" />
                        </video>
                    ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img className="card-media" src={card.mediaSrc} alt={card.name} />
                    )}
                    <div className="front-overlay">
                        <h2 className="text-3xl font-bold font-teko uppercase leading-none">{card.name}</h2>
                        <p className="text-xs text-red-500 font-mono tracking-widest">{card.role}</p>
                    </div>
                    <div className="tech-frame"></div>
                </div>
                <div className="card-back">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.backImg} className="real-bg-img" alt={card.realName} />
                    <div className="back-content">
                        <div className="card-header">
                            <span>ID: {card.id}</span>
                            <span className="tag-highlight">{card.tag}</span>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold uppercase font-teko">{card.realName}</h3>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">{card.realRole}</p>
                            {card.bio && <p className="bio-text">{card.bio}</p>}
                        </div>
                    </div>
                    {card.linkedin && (
                        <a href={card.linkedin} className="linkedin-btn" onClick={(e) => e.stopPropagation()}>
                            <i className="fab fa-linkedin"></i>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function GodaeonPage() {
    // Duplicate cards for infinite scroll
    const allCards = [...CARDS, ...CARDS];

    return (
        <>
            <style jsx global>{`
        .carousel-view {
          width: 100%;
          height: 80vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .carousel-track {
          display: flex;
          gap: 40px;
          width: max-content;
          animation: scroll-left 20s linear infinite;
          padding: 0 40px;
          perspective: 2000px;
        }

        .carousel-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .cyber-card {
          position: relative;
          width: 300px;
          height: 500px;
          flex-shrink: 0;
          cursor: pointer;
          background: transparent;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.15, 0.9, 0.34, 1);
        }

        .card-inner.is-flipped {
          transform: rotateY(180deg);
        }

        .card-front, .card-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          clip-path: polygon(
            20px 0, 100% 0,
            100% calc(100% - 20px), calc(100% - 20px) 100%,
            0 100%, 0 20px
          );
          border: 1px solid #333;
          background: #050505;
        }

        .card-front { z-index: 2; }

        .card-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(1.1) brightness(0.9);
          transition: filter 0.4s ease, transform 0.4s ease;
        }

        .cyber-card:hover .card-media {
          filter: grayscale(0%) contrast(1) brightness(1);
          transform: scale(1.05);
        }

        .front-overlay {
          position: absolute;
          bottom: 0; left: 0; width: 100%;
          padding: 20px;
          background: linear-gradient(to top, #000 10%, transparent 100%);
          pointer-events: none;
        }

        .card-back {
          transform: rotateY(180deg);
          background: #0a0a0a;
          display: flex;
          flex-direction: column;
        }

        .real-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.3;
          filter: grayscale(100%);
        }

        .back-content {
          position: relative;
          z-index: 20;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 25px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 40%, #000 90%);
        }

        .tech-frame {
          position: absolute;
          inset: 5px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          clip-path: polygon(
            15px 0, 100% 0,
            100% calc(100% - 15px), calc(100% - 15px) 100%,
            0 100%, 0 15px
          );
          pointer-events: none;
        }

        .linkedin-btn {
          position: absolute;
          bottom: 25px;
          right: 25px;
          color: white;
          font-size: 1.4rem;
          z-index: 30;
          transition: color 0.3s;
        }
        .linkedin-btn:hover { color: #0077b5; }

        .card-header {
          display: flex;
          justify-content: space-between;
          font-family: 'Courier New', monospace;
          font-size: 0.7rem;
          color: #666;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 10px;
        }

        .tag-highlight { color: #ff0000; font-weight: bold; }

        .bio-text {
          font-size: 0.8rem;
          color: #ccc;
          margin-top: 10px;
          border-left: 2px solid #ff0000;
          padding-left: 10px;
          line-height: 1.5;
        }
      `}</style>

            <div className="cyber-grid-bg"></div>

            <div className="container mx-auto px-6 pt-16 text-center">
                <h1 className="text-5xl font-bold mb-2 tracking-tighter">
                    THE <span className="text-red-600">SQUAD</span>
                </h1>
            </div>

            <div className="carousel-view">
                <div className="carousel-track">
                    {allCards.map((card, i) => (
                        <CyberCard key={`card-${i}`} card={card} />
                    ))}
                </div>
            </div>
        </>
    );
}
