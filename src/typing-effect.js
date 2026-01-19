// typing-effect.js
function createTypingEffect(element, text, color = 'text-red-600', speed = 100) {
    if (!element) return;
    
    const originalContent = element.innerHTML;
    element.innerHTML = `<span class="typing-text"></span><span class="typing-cursor">|</span>`;
    
    const typingText = element.querySelector('.typing-text');
    const cursor = element.querySelector('.typing-cursor');
    
    if (!typingText || !cursor) {
        element.innerHTML = originalContent;
        return;
    }
    
    if (color) {
        typingText.classList.add(color);
    }
    
    let i = 0;
    
    function type() {
        if (i < text.length) {
            typingText.textContent += text[i];
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                cursor.style.opacity = '0';
                setTimeout(() => cursor.remove(), 500);
            }, delay);
        }
    }
    
    const hasPixelTransition = sessionStorage.getItem('pixel_transition') === '1';
    const delay = hasPixelTransition ? 1000 : 0; // 1000ms delay after pixel transition
    
    setTimeout(() => {
        // Clear the flag after using it
        if (hasPixelTransition) {
            sessionStorage.removeItem('pixel_transition');
        }
        type();
    }, delay);
}

function initTypingEffect() {
    const elements = document.querySelectorAll('[data-typing]:not(.has-typing-effect)');
    
    elements.forEach(element => {
        const text = element.getAttribute('data-typing-text') || element.textContent;
        const color = element.classList.contains('text-red-600') ? 'text-red-600' : '';
        const speed = parseInt(element.getAttribute('data-typing-speed')) || 100;
        
        element.classList.add('has-typing-effect');
        element.setAttribute('data-typing-text', text);
        element.textContent = '';
        
        createTypingEffect(element, text, color, speed);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all elements are in place
    setTimeout(initTypingEffect, 100);
    
    // Re-run when navigating back/forward
    window.addEventListener('popstate', () => {
        setTimeout(initTypingEffect, 100);
    });
});
