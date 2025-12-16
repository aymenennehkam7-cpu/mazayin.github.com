/* ============================================
   ANIMATIONS.JS - Scroll Animations & Effects
   Intersection Observer for scroll-triggered animations
   ============================================ */

// ===== STRICT MODE =====
'use strict';

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        initScrollAnimations();
        initParallaxEffect();
        initCounterAnimation();
        initProgressiveImageLoading();
        initHoverEffects();
    } else {
        // Show all elements immediately if reduced motion is preferred
        showAllElements();
    }
});

// ===== SCROLL ANIMATIONS WITH INTERSECTION OBSERVER =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if (animatedElements.length === 0) return;
    
    // Intersection Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    // Create observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                // Add animation with delay
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, delay);
                
                // Unobserve after animation to improve performance
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== PARALLAX SCROLLING EFFECT =====
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero__image, .hero__background');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ===== COUNTER ANIMATION FOR ACHIEVEMENTS =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.achievement__number');
    
    if (counters.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = element.textContent.trim();
    const isNumeric = /^\d+$/.test(target);
    
    if (!isNumeric) {
        // For non-numeric values (like "20+"), animate the number part
        const match = target.match(/(\d+)(.+)/);
        if (match) {
            const number = parseInt(match[1]);
            const suffix = match[2];
            animateNumber(element, number, suffix);
        }
        return;
    }
    
    const targetNumber = parseInt(target);
    animateNumber(element, targetNumber);
}

function animateNumber(element, target, suffix = '') {
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const increment = target / totalFrames;
    let frame = 0;
    let current = 0;
    
    const counter = setInterval(() => {
        frame++;
        current += increment;
        
        if (frame === totalFrames) {
            clearInterval(counter);
            element.textContent = target + suffix;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, frameDuration);
}

// ===== PROGRESSIVE IMAGE LOADING =====
function initProgressiveImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if (images.length === 0) return;
    
    // Add loading class to images
    images.forEach(img => {
        img.classList.add('loading');
        
        img.addEventListener('load', function() {
            this.classList.remove('loading');
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.classList.remove('loading');
            this.classList.add('error');
        });
    });
}

// ===== HOVER EFFECTS WITH SMOOTH TRANSITIONS =====
function initHoverEffects() {
    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Gallery item hover effects
    const galleryItems = document.querySelectorAll('.gallery__item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// ===== STAGGER ANIMATION FOR MULTIPLE ELEMENTS =====
function staggerAnimation(elements, delay = 100) {
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * delay}ms`;
    });
}

// ===== FADE IN ANIMATION =====
function fadeIn(element, duration = 400) {
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let start = null;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.min(progress / duration, 1);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
            window.requestAnimationFrame(animate);
        }
    }
    
    window.requestAnimationFrame(animate);
}

// ===== FADE OUT ANIMATION =====
function fadeOut(element, duration = 400) {
    let start = null;
    const initialOpacity = parseFloat(window.getComputedStyle(element).opacity);
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.max(initialOpacity - (progress / duration), 0);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
            window.requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    }
    
    window.requestAnimationFrame(animate);
}

// ===== SLIDE IN ANIMATION =====
function slideIn(element, direction = 'left', duration = 400) {
    const directions = {
        left: 'translateX(-100%)',
        right: 'translateX(100%)',
        top: 'translateY(-100%)',
        bottom: 'translateY(100%)'
    };
    
    element.style.transform = directions[direction];
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let start = null;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1);
        
        element.style.transform = `${directions[direction].replace('100%', `${100 - (percent * 100)}%`)}`;
        element.style.opacity = percent;
        
        if (progress < duration) {
            window.requestAnimationFrame(animate);
        } else {
            element.style.transform = 'none';
        }
    }
    
    window.requestAnimationFrame(animate);
}

// ===== SCALE ANIMATION =====
function scaleIn(element, duration = 400) {
    element.style.transform = 'scale(0)';
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let start = null;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1);
        
        element.style.transform = `scale(${percent})`;
        element.style.opacity = percent;
        
        if (progress < duration) {
            window.requestAnimationFrame(animate);
        } else {
            element.style.transform = 'scale(1)';
        }
    }
    
    window.requestAnimationFrame(animate);
}

// ===== REVEAL TEXT ANIMATION =====
function revealText(element, duration = 1000) {
    const text = element.textContent;
    const characters = text.split('');
    
    element.textContent = '';
    element.style.display = 'block';
    
    characters.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = 0;
        span.style.display = 'inline-block';
        span.style.animation = `fadeInUp 0.5s ease-out ${index * 50}ms forwards`;
        element.appendChild(span);
    });
}

// ===== TYPING ANIMATION =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== WAVE ANIMATION FOR ELEMENTS =====
function waveAnimation(elements, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = 'wave 0.6s ease-in-out';
        }, index * delay);
    });
}

// ===== PULSE ANIMATION =====
function pulseElement(element, duration = 1000) {
    element.style.animation = `pulse ${duration}ms ease-in-out`;
    
    setTimeout(() => {
        element.style.animation = '';
    }, duration);
}

// ===== SHOW ALL ELEMENTS (FOR REDUCED MOTION) =====
function showAllElements() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    animatedElements.forEach(element => {
        element.style.opacity = 1;
        element.style.transform = 'none';
    });
}

// ===== SCROLL TO ELEMENT WITH ANIMATION =====
function smoothScrollTo(element, duration = 800) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// ===== INTERSECTION OBSERVER UTILITY =====
function createObserver(callback, options = {}) {
    const defaultOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observerOptions = { ...defaultOptions, ...options };
    
    return new IntersectionObserver(callback, observerOptions);
}

// ===== ANIMATE ON SCROLL CLASS TOGGLE =====
function animateOnScroll(elements, className = 'is-visible', offset = 100) {
    const observer = createObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
            }
        });
    }, {
        rootMargin: `0px 0px -${offset}px 0px`
    });
    
    elements.forEach(element => observer.observe(element));
}

// ===== PERFORMANCE: REQUEST ANIMATION FRAME POLYFILL =====
(function() {
    let lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                                       window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            const currTime = new Date().getTime();
            const timeToCall = Math.max(0, 16 - (currTime - lastTime));
            const id = window.setTimeout(() => {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
})();

// ===== CONSOLE LOG: ANIMATIONS LOADED =====
console.log('%c✨ Mazayin Restaurant - Animations Loaded', 'color: #B87333; font-size: 14px; font-weight: bold;');

// ===== EXPORT FOR MODULE USE (Optional) =====
// Uncomment if using ES6 modules
/*
export {
    initScrollAnimations,
    initParallaxEffect,
    initCounterAnimation,
    fadeIn,
    fadeOut,
    slideIn,
    scaleIn,
    revealText,
    typeWriter,
    waveAnimation,
    pulseElement,
    smoothScrollTo,
    createObserver,
    animateOnScroll
};
*/