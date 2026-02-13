'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoBackground() {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        console.log('🎬 VideoBackground mounted, readyState:', video.readyState);

        // Debug listeners
        const onPlay = () => console.log('▶️ Video playing, currentTime:', video.currentTime);
        const onPause = () => console.log('⏸️ Video paused, currentTime:', video.currentTime);
        const onEnded = () => console.log('⏹️ Video ended');
        const onError = (e) => console.error('❌ Video error:', e);
        const onStalled = () => console.log('⚠️ Video stalled');
        const onWaiting = () => console.log('⏳ Video waiting/buffering');
        const onTimeUpdate = () => {
            if (Math.floor(video.currentTime) % 5 === 0) {
                console.log('🕐 Video time:', video.currentTime.toFixed(1), '/', video.duration?.toFixed(1));
            }
        };
        const onLoadedData = () => console.log('📦 Video loaded data, duration:', video.duration);

        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        video.addEventListener('ended', onEnded);
        video.addEventListener('error', onError);
        video.addEventListener('stalled', onStalled);
        video.addEventListener('waiting', onWaiting);
        video.addEventListener('timeupdate', onTimeUpdate);
        video.addEventListener('loadeddata', onLoadedData);

        // Play the video
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.volume = 0.7;

        const tryPlay = () => {
            console.log('🔄 Attempting play...');
            video.play()
                .then(() => console.log('✅ Play promise resolved'))
                .catch(err => console.warn('⛔ Play failed:', err.message));
        };

        if (video.readyState >= 2) {
            tryPlay();
        } else {
            video.addEventListener('canplay', () => {
                console.log('📡 canplay fired');
                tryPlay();
            }, { once: true });
        }

        // Watchdog — restart if stalled
        const watchdog = setInterval(() => {
            if (video.paused && !document.hidden) {
                console.log('🐕 Watchdog: video paused, restarting...');
                video.play().catch(() => { });
            }
        }, 3000);

        return () => {
            console.log('🧹 VideoBackground unmounting');
            clearInterval(watchdog);
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
            video.removeEventListener('ended', onEnded);
            video.removeEventListener('error', onError);
            video.removeEventListener('stalled', onStalled);
            video.removeEventListener('waiting', onWaiting);
            video.removeEventListener('timeupdate', onTimeUpdate);
            video.removeEventListener('loadeddata', onLoadedData);
        };
    }, []);

    const toggleSound = () => {
        const video = videoRef.current;
        if (!video) return;

        const newMuted = !isMuted;
        setIsMuted(newMuted);
        video.muted = newMuted;

        if (!newMuted && video.paused) {
            video.play().catch(() => { });
        }
    };

    return (
        <>
            <div className="fullscreen-video-bg">
                <video
                    ref={videoRef}
                    id="fullscreen-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src="/media/draft1.mp4" type="video/mp4" />
                </video>
            </div>

            <button
                className="sound-toggle-btn"
                aria-label="Toggle Sound"
                title={isMuted ? 'Click to unmute' : 'Click to mute'}
                onClick={toggleSound}
            >
                <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
                <span className="sound-label">{isMuted ? 'UNMUTE' : 'MUTE'}</span>
            </button>
        </>
    );
}

