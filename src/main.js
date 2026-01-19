// --- OPTIMIZED PAGE LOADER & TRANSITIONS ---
// --- OPTIMIZED PAGE LOADER & TRANSITIONS ---
document.addEventListener('DOMContentLoaded', () => {
    const hasPixelTransition = sessionStorage.getItem('pixel_transition') === '1';
    const pixelOverlay = document.getElementById('pixel-overlay');

    if (hasPixelTransition && pixelOverlay) {
        // 1. Create the grid immediately
        createPixelGrid();
        
        // 2. FORCE the blocks to be solid black instantly
        // This covers the screen before we reveal the body
        const blocks = pixelOverlay.querySelectorAll('.pixel-block');
        gsap.set(blocks, { opacity: 1 });

        // 3. NOW reveal the body (It appears underneath the black blocks)
        document.body.classList.add('loaded');

        // 4. Animate the blocks fading out (The Reveal)
        gsap.to(blocks, {
            opacity: 0,
            duration: 0.5,
            stagger: { amount: 0.5, from: 'random', grid: 'auto' },
            ease: 'power2.inOut',
            onComplete: () => {
                sessionStorage.removeItem('pixel_transition');
                pixelOverlay.style.pointerEvents = 'none';
                pixelOverlay.innerHTML = ''; 
            }
        });
    } else {
        // Fresh Load (No transition): Just fade the body in smoothly
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    // Initialize effects
    initTypingEffect();
    initDynamicBackground();
    initCommandWheel(); 
});

// --- TYPING EFFECT FOR HERO TITLE ---
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const fullText = 'RED LINE NATION';
    // Clear content but keep structure to prevent layout shift
    heroTitle.innerHTML = '<span id="typing-text" class="text-red-600"></span><span id="typing-cursor" class="typing-cursor">|</span>';
    
    const typingText = document.getElementById('typing-text');
    const cursor = document.getElementById('typing-cursor');
    
    if (!typingText || !cursor) {
        heroTitle.innerHTML = fullText; 
        return;
    }

    let i = 0;
    const speed = 100;

    function typeWriter() {
        if (i < fullText.length) {
            typingText.textContent += fullText[i];
            i++;
            setTimeout(typeWriter, speed);
        } else {
            setTimeout(() => {
                cursor.style.opacity = '0';
                setTimeout(() => cursor.remove(), 500);
            }, 500);
        }
    }
    setTimeout(typeWriter, 500);
}

// --- MEGA TEXT SCROLL ---
if (document.querySelector('#megaText')) {
    gsap.to("#megaText", {
        xPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1 }
    });
}

// --- PIXEL GRID LOGIC ---
const pixelOverlay = document.getElementById('pixel-overlay');
const blockSize = 50;
let isTransitioning = false;

function createPixelGrid() {
    if (!pixelOverlay) return;
    pixelOverlay.innerHTML = '';

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
    pixelOverlay.appendChild(fragment);
}

// Handle Resize Debounced
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createPixelGrid, 200);
});

function triggerPixelTransition(target) {
    if (!pixelOverlay) {
        window.location.href = target;
        return;
    }
    if (isTransitioning) return;
    isTransitioning = true;

    sessionStorage.setItem('pixel_transition', '1');
    pixelOverlay.style.pointerEvents = 'all';
    
    // Ensure grid exists
    if (pixelOverlay.children.length === 0) createPixelGrid();
    
    const blocks = pixelOverlay.querySelectorAll('.pixel-block');

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

// --- COMMAND WHEEL LOGIC ---
function initCommandWheel() {
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const wheelSvg = document.getElementById('wheelSvg');
    const wheelContent = document.getElementById('wheelContent');
    const wheelSvgContainer = document.getElementById('wheelSvgContainer');
    const floatingLogo = document.getElementById('floatingLogo');
    const menuBtnContent = document.getElementById('menuBtnContent');
    const wheelCenter = document.getElementById('wheelCenter'); 

    let menuRadarVideo = null;

    if (menuOverlay && !menuOverlay.querySelector('.menu-radar-bg')) {
        const bg = document.createElement('div');
        bg.className = 'menu-radar-bg';
        bg.setAttribute('aria-hidden', 'true');

        const video = document.createElement('video');
        video.className = 'menu-radar-video';
        video.autoplay = false;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;

        const source = document.createElement('source');
        source.src = '/media/radar.mp4';
        source.type = 'video/mp4';
        video.appendChild(source);

        const scan = document.createElement('div');
        scan.className = 'menu-radar-scan';

        bg.appendChild(video);
        bg.appendChild(scan);
        menuOverlay.prepend(bg);

        menuRadarVideo = video;
    } else if (menuOverlay) {
        menuRadarVideo = menuOverlay.querySelector('.menu-radar-video');
    }
 
    let isMenuOpen = false;

    const menuItems = [
        { label: 'HOME', icon: 'fa-home', href: 'index.html' },
        { label: 'ABOUT US', icon: 'fa-info-circle', href: 'about.html' },
        { label: 'GODAEON', icon: 'fa-users', href: 'godaeon.html' },
        { label: 'Development', icon: 'fa-laptop-code', href: 'development.html' },
        { label: 'Investment', icon: 'fa-chart-line', href: 'investment.html' },
        { label: 'Contact', icon: 'fa-envelope', href: 'contact.html' }
    ];

    const wheelCx = 300, wheelCy = 300, wheelRadius = 200, wheelInnerRadius = 80;
    const totalItems = menuItems.length;
    const sliceAngle = 360 / totalItems;
    const gap = 4;

    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return { x: centerX + (radius * Math.cos(angleInRadians)), y: centerY + (radius * Math.sin(angleInRadians)) };
    }

    function createSectorPath(x, y, outerR, innerR, startAngle, endAngle) {
        const startOuter = polarToCartesian(x, y, outerR, endAngle);
        const endOuter = polarToCartesian(x, y, outerR, startAngle);
        const startInner = polarToCartesian(x, y, innerR, endAngle);
        const endInner = polarToCartesian(x, y, innerR, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return [ "M", startOuter.x, startOuter.y, "A", outerR, outerR, 0, largeArcFlag, 0, endOuter.x, endOuter.y, "L", endInner.x, endInner.y, "A", innerR, innerR, 0, largeArcFlag, 1, startInner.x, startInner.y, "Z" ].join(" ");
    }

    // Clear existing to avoid duplicates if re-run
    wheelSvg.innerHTML = '';
    wheelContent.innerHTML = '';

    menuItems.forEach((item, i) => {
        const startAngle = (i * sliceAngle) + (gap / 2);
        const endAngle = ((i + 1) * sliceAngle) - (gap / 2);
        const pathData = createSectorPath(wheelCx, wheelCy, wheelRadius, wheelInnerRadius, startAngle, endAngle);
        const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathEl.setAttribute("d", pathData);
        pathEl.setAttribute("class", "wheel-segment");
        pathEl.setAttribute("id", `segment-${i}`);
        
        pathEl.addEventListener('click', () => {
            triggerPixelTransition(item.href);
            toggleMenu();
        });
        pathEl.addEventListener('mouseenter', () => { 
            const label = document.getElementById(`label-${i}`);
            if(label) label.classList.add('active'); 
        });
        pathEl.addEventListener('mouseleave', () => { 
            const label = document.getElementById(`label-${i}`);
            if(label) label.classList.remove('active'); 
        });
        wheelSvg.appendChild(pathEl);

        const midAngle = startAngle + (sliceAngle - gap) / 2;
        const textRadius = wheelInnerRadius + (wheelRadius - wheelInnerRadius) / 2;
        const pos = polarToCartesian(wheelCx, wheelCy, textRadius, midAngle);
        const contentDiv = document.createElement('div');
        contentDiv.className = 'wheel-item-content';
        contentDiv.id = `label-${i}`;
        contentDiv.style.left = `${pos.x}px`;
        contentDiv.style.top = `${pos.y}px`;
        contentDiv.innerHTML = `<i class="fas ${item.icon}"></i><span>${item.label}</span>`;
        wheelContent.appendChild(contentDiv);
    });

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            gsap.to(menuOverlay, { opacity: 1, pointerEvents: "all", duration: 0.4 });
            gsap.fromTo(wheelSvgContainer, { rotation: -180, scale: 0.5, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.7)" });
            menuBtnContent.innerHTML = '<i class="fas fa-times menu-close-icon" aria-hidden="true"></i>'; 
            gsap.to(floatingLogo, { opacity: 0, y: 20 }); 

            if (menuRadarVideo) {
                const playPromise = menuRadarVideo.play();
                if (playPromise && typeof playPromise.catch === 'function') {
                    playPromise.catch(() => {});
                }
            }
        } else {
            gsap.to(menuOverlay, { opacity: 0, pointerEvents: "none", duration: 0.3 });
            gsap.to(wheelSvgContainer, { rotation: 90, scale: 0.5, opacity: 0, duration: 0.4 });
            gsap.to(wheelCenter, { x: 0, y: 0, duration: 0.3 });
            menuBtnContent.innerHTML = "<span>PRESS 'X' FOR MENU</span>";
            gsap.to(floatingLogo, { opacity: 1, y: 0 }); 

            if (menuRadarVideo) {
                menuRadarVideo.pause();
                menuRadarVideo.currentTime = 0;
            }
        }
    }
    menuToggle.addEventListener('click', toggleMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'x') { toggleMenu(); }
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMenuOpen) return;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const angle = Math.atan2(dy, dx);
        const maxDist = 40; 
        const moveDist = Math.min(dist * 0.15, maxDist); 
        const moveX = Math.cos(angle) * moveDist;
        const moveY = Math.sin(angle) * moveDist;
        gsap.to(wheelCenter, { x: moveX, y: moveY, duration: 0.3, ease: "power2.out" });
    });
}

// --- API & CHAT LOGIC ---
const apiKey = ""; 

async function generateMission() {
    const input = document.getElementById('missionInput')?.value;
    const outputDiv = document.getElementById('missionOutput');
    if (!input || !outputDiv) return;
    
    outputDiv.innerHTML = '<span class="text-red-500 animate-pulse">DECRYPTING...</span>';
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: `Generate classified military mission briefing. Obj: ${input}. Short.` }] }] })
        });
        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        outputDiv.innerText = "";
        typeWriter(aiText, outputDiv);
    } catch (e) { outputDiv.innerText = "ERROR."; }
}

// --- LIVE GRID BACKGROUND ---
function initDynamicBackground() {
    let container = document.getElementById('dynamic-bg');
    if (!container) {
        container = document.createElement('div');
        container.id = 'dynamic-bg';
        container.innerHTML = `<div class="bg-grid-lines"></div><div class="bg-vignette"></div>`;
        document.body.prepend(container);
    }

    const gridSize = 60;

    function spawnCell() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const cols = Math.ceil(width / gridSize);
        const rows = Math.ceil(height / gridSize);
        const randomCol = Math.floor(Math.random() * cols);
        const randomRow = Math.floor(Math.random() * rows);

        const cell = document.createElement('div');
        cell.classList.add('grid-flicker-cell');
        cell.style.left = (randomCol * gridSize) + 'px';
        cell.style.top = (randomRow * gridSize) + 'px';

        container.appendChild(cell);
        setTimeout(() => cell.remove(), 4000);
    }
    setInterval(spawnCell, 100);
}

// --- HELPER TYPEWRITER ---
function typeWriter(text, element) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
            i++;
            setTimeout(type, 10);
        }
    }
    type();
}