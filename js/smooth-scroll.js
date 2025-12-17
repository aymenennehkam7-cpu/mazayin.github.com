/**
 * Mazaya Restaurant - Smooth Scroll Implementation
 * Vanilla JavaScript smooth scrolling with accessibility support
 * ES6+ syntax, cross-browser compatible
 * @version 1.0.0
 */

(function() {
  'use strict';

  /**
   * Configuration object for smooth scrolling
   */
  const CONFIG = {
    // Offset for fixed header (in pixels)
    scrollOffset: 80,
    
    // Scroll duration (in milliseconds) - fallback for browsers without native smooth scroll
    duration: 800,
    
    // Easing function for custom scroll animation
    easing: 'easeInOutCubic',
    
    // Selector for anchor links
    linkSelector: 'a[href^="#"]',
    
    // Whether to update URL hash
    updateURL: true,
    
    // Throttle delay for scroll events (ms)
    throttleDelay: 100
  };

  /**
   * Easing functions for smooth animation
   */
  const easingFunctions = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (--t) * t * t + 1,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  };

  /**
   * Check if user prefers reduced motion
   * @returns {boolean}
   */
  const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  /**
   * Throttle function to limit execution rate
   * @param {Function} func - Function to throttle
   * @param {number} delay - Delay in milliseconds
   * @returns {Function}
   */
  const throttle = (func, delay) => {
    let lastCall = 0;
    return function(...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      return func(...args);
    };
  };

  /**
   * Get the target element from href
   * @param {string} href - The href attribute value
   * @returns {HTMLElement|null}
   */
  const getTargetElement = (href) => {
    if (!href || href === '#' || href === '#!') return null;
    
    try {
      // Remove leading hash if present
      const id = href.startsWith('#') ? href.slice(1) : href;
      return document.getElementById(id);
    } catch (error) {
      console.warn('Invalid selector:', href);
      return null;
    }
  };

  /**
   * Calculate the target scroll position with offset
   * @param {HTMLElement} target - Target element
   * @returns {number}
   */
  const getTargetPosition = (target) => {
    if (!target) return 0;
    
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    return Math.max(0, targetPosition - CONFIG.scrollOffset);
  };

  /**
   * Native smooth scroll with offset (modern browsers)
   * @param {HTMLElement} target - Target element
   */
  const smoothScrollNative = (target) => {
    const targetPosition = getTargetPosition(target);
    
    window.scrollTo({
      top: targetPosition,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  };

  /**
   * Custom smooth scroll animation (fallback for older browsers)
   * @param {HTMLElement} target - Target element
   */
  const smoothScrollCustom = (target) => {
    const startPosition = window.pageYOffset;
    const targetPosition = getTargetPosition(target);
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    // If user prefers reduced motion, jump immediately
    if (prefersReducedMotion()) {
      window.scrollTo(0, targetPosition);
      return;
    }

    /**
     * Animation step function
     * @param {number} currentTime - Current timestamp
     */
    const animationStep = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / CONFIG.duration, 1);
      
      // Apply easing function
      const easingFunc = easingFunctions[CONFIG.easing] || easingFunctions.easeInOutCubic;
      const ease = easingFunc(progress);
      
      // Calculate new position
      const newPosition = startPosition + (distance * ease);
      
      window.scrollTo(0, newPosition);
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animationStep);
      }
    };

    requestAnimationFrame(animationStep);
  };

  /**
   * Main scroll function - uses native or fallback
   * @param {HTMLElement} target - Target element
   */
  const scrollToTarget = (target) => {
    if (!target) return;

    // Check if browser supports native smooth scroll
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    
    if (supportsNativeSmoothScroll) {
      smoothScrollNative(target);
    } else {
      smoothScrollCustom(target);
    }
  };

  /**
   * Handle click on anchor link
   * @param {Event} event - Click event
   */
  const handleLinkClick = (event) => {
    const link = event.currentTarget;
    const href = link.getAttribute('href');
    
    // Ignore if href is missing or just a hash
    if (!href || href === '#' || href === '#!') {
      event.preventDefault();
      return;
    }

    const target = getTargetElement(href);
    
    // Only handle if target exists
    if (target) {
      event.preventDefault();
      
      // Scroll to target
      scrollToTarget(target);
      
      // Update URL if configured
      if (CONFIG.updateURL && history.pushState) {
        history.pushState(null, null, href);
      }
      
      // Set focus to target for accessibility
      // Using setTimeout to ensure scroll completes first
      setTimeout(() => {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        
        // Remove tabindex after focus (for proper tab order)
        target.addEventListener('blur', function() {
          target.removeAttribute('tabindex');
        }, { once: true });
      }, CONFIG.duration + 100);
    }
  };

  /**
   * Initialize smooth scrolling
   */
  const init = () => {
    try {
      // Get all anchor links
      const links = document.querySelectorAll(CONFIG.linkSelector);
      
      if (links.length === 0) {
        console.info('No anchor links found for smooth scrolling');
        return;
      }

      // Attach click handlers
      links.forEach(link => {
        // Skip links that open in new window/tab
        if (link.target && link.target !== '_self') return;
        
        link.addEventListener('click', handleLinkClick);
      });

      // Handle URL hash on page load
      if (window.location.hash) {
        const target = getTargetElement(window.location.hash);
        if (target) {
          // Delay to ensure page is fully loaded
          window.addEventListener('load', () => {
            setTimeout(() => {
              scrollToTarget(target);
            }, 100);
          });
        }
      }

      console.info('Smooth scroll initialized successfully');
    } catch (error) {
      console.error('Error initializing smooth scroll:', error);
    }
  };

  /**
   * Public API
   */
  window.SmoothScroll = {
    /**
     * Initialize smooth scrolling
     */
    init: init,
    
    /**
     * Scroll to specific element
     * @param {string|HTMLElement} target - Target selector or element
     */
    scrollTo: (target) => {
      const element = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;
      scrollToTarget(element);
    },
    
    /**
     * Update configuration
     * @param {Object} options - Configuration options
     */
    config: (options) => {
      Object.assign(CONFIG, options);
    },
    
    /**
     * Get current configuration
     * @returns {Object}
     */
    getConfig: () => ({ ...CONFIG })
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

/**
 * USAGE EXAMPLES:
 * 
 * 1. Automatic initialization (happens on DOM ready)
 *    Just include this script and all anchor links will work
 * 
 * 2. Programmatic scrolling:
 *    SmoothScroll.scrollTo('#menu');
 *    SmoothScroll.scrollTo(document.getElementById('about'));
 * 
 * 3. Update configuration:
 *    SmoothScroll.config({ 
 *      scrollOffset: 100, 
 *      duration: 1000,
 *      updateURL: false 
 *    });
 * 
 * 4. Re-initialize (if adding links dynamically):
 *    SmoothScroll.init();
 */