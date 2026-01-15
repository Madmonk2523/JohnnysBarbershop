/* ================================
   JOHNNY'S BARBERSHOP - MAIN.JS
   Clean, Modern, Optimized
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScroll();
    initObserver();
});

/* ================================
   NAVIGATION SETUP
   ================================ */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Track active section on scroll
    trackActiveSection();
}

function trackActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ================================
   SMOOTH SCROLL
   ================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ================================
   SCROLL ANIMATIONS
   ================================ */
function initObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll(
        '.service-card, .review-card, .why-card, .info-block'
    ).forEach(el => observer.observe(el));
}

/* ================================
   KEYBOARD SHORTCUTS
   ================================ */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelector('.nav-menu')?.classList.remove('active');
    }
});

console.log('Johnny\'s Barbershop loaded');

