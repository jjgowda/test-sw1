// SmartWork Creation Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initTypingAnimation();
    initSmoothScrolling();
    initContactForm();
    initParticles();
    initScrollEffects();
    initServiceCards();
    initWhatsAppButton();
    
    // Mobile header fix - ensure proper spacing
    adjustForMobileHeader();
    window.addEventListener('resize', adjustForMobileHeader);
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(themeIcon, currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeIcon, newTheme);
        
        // Add smooth transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(icon, theme) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    navMenu.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Typing Animation for Hero Section
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const texts = [
        'Transform Your Digital Presence',
        'Drive Real Business Results',
        'Scale Your Brand Effectively',
        'Dominate Your Market'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of text
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Start typing animation
    typeText();
}

// Smooth Scrolling Navigation with Header Offset
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = window.innerWidth < 768 ? 70 : 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = window.innerWidth < 768 ? 70 : 80;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            showSuccessMessage();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Send WhatsApp message with form data
            sendWhatsAppMessage(data);
        }, 1500);
    });
}

function validateForm(data) {
    const requiredFields = ['name', 'email', 'message'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showError(`Please fill in the ${field} field.`);
            return false;
        }
    }
    
    if (!emailRegex.test(data.email)) {
        showError('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

function showError(message) {
    // Create and show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Show error
    setTimeout(() => errorDiv.classList.add('show'), 100);
    
    // Hide error after 3 seconds
    setTimeout(() => {
        errorDiv.classList.remove('show');
        setTimeout(() => document.body.removeChild(errorDiv), 300);
    }, 3000);
}

function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

function sendWhatsAppMessage(data) {
    const phoneNumber = '918282772787';
    const message = `New Contact Form Submission:
    
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Service: ${data.service || 'Not specified'}
Message: ${data.message}`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab after a short delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 2000);
}

// WhatsApp Button Initialization - FIX FOR THE BUTTON ISSUE
function initWhatsAppButton() {
    const whatsappFloat = document.getElementById('whatsapp-float');
    const whatsappLink = whatsappFloat.querySelector('a');
    
    // Ensure the WhatsApp button works properly
    whatsappLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create WhatsApp message
        const defaultMessage = 'Hi SmartWork Creation! I\'m interested in your digital marketing services. Please tell me more about what you offer.';
        const phoneNumber = '918282772787';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        
        // Track click event
        console.log('WhatsApp button clicked');
    });
    
    // Add hover effect
    whatsappFloat.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    whatsappFloat.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Hide/show on scroll with improved performance
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down - hide button
                whatsappFloat.style.transform = 'translateY(100px) scale(0.8)';
                whatsappFloat.style.opacity = '0.7';
            } else {
                // Scrolling up - show button
                whatsappFloat.style.transform = 'translateY(0) scale(1)';
                whatsappFloat.style.opacity = '1';
            }
            
            lastScrollTop = scrollTop;
        }, 10);
    });
}

// Particles.js Configuration
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#FFD700'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#FFD700',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Scroll Effects (Intersection Observer for animations)
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .team-member, .process-step, .contact-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Service Cards Interactive Effects
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'card-ripple';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        card.addEventListener('click', function() {
            const service = this.dataset.service;
            
            // Pre-fill contact form with selected service
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                serviceSelect.value = service;
            }
            
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            const headerHeight = window.innerWidth < 768 ? 70 : 80;
            
            window.scrollTo({
                top: contactSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        });
    });
}

// Mobile Header Adjustment Function
function adjustForMobileHeader() {
    const isMobile = window.innerWidth < 768;
    const headerHeight = isMobile ? 70 : 80;
    
    // Update CSS custom property
    document.documentElement.style.setProperty(
        '--current-header-height', 
        `${headerHeight}px`
    );
    
    // Update scroll padding
    document.documentElement.style.scrollPaddingTop = `${headerHeight}px`;
}

// Add CSS for animations and error messages
const additionalStyles = `
    <style>
        /* Animation classes */
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Card ripple effect */
        .card-ripple {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 215, 0, 0.3);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
        
        /* Error message styles */
        .error-message {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: rgba(220, 53, 69, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(220, 53, 69, 0.3);
            border-radius: 16px;
            padding: 2rem;
            z-index: 2000;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            color: white;
        }
        
        .error-message.show {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        
        .error-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            text-align: center;
        }
        
        .error-content i {
            font-size: 3rem;
            color: #fff;
        }
        
        .error-content p {
            margin: 0;
            font-weight: 500;
        }
        
        /* WhatsApp float button enhancements */
        .whatsapp-float {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .whatsapp-float:hover {
            transform: scale(1.1) !important;
        }
        
        /* Mobile optimizations */
        @media (max-width: 767px) {
            .card-ripple {
                max-width: 150px;
                max-height: 150px;
            }
            
            .error-message,
            .success-message {
                margin: 0 1rem;
                max-width: calc(100% - 2rem);
            }
        }
        
        /* Service card hover states */
        .service-card {
            position: relative;
            overflow: hidden;
        }
        
        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
            transition: left 0.5s ease;
        }
        
        .service-card:hover::before {
            left: 100%;
        }
        
        /* Team member hover effects */
        .team-member {
            position: relative;
            overflow: hidden;
        }
        
        .team-member::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(255, 165, 0, 0.05));
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .team-member:hover::after {
            opacity: 1;
        }
    </style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Performance optimizations
function optimizePerformance() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let ticking = false;
    
    function updateScrollElements() {
        updateActiveNavLink();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Add focus management for accessibility
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.zIndex = '10000';
    skipLink.style.padding = '8px';
    skipLink.style.backgroundColor = 'var(--color-primary)';
    skipLink.style.color = 'white';
    skipLink.style.textDecoration = 'none';
    skipLink.style.borderRadius = '4px';
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Manage focus for mobile menu
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    hamburger.addEventListener('click', function() {
        setTimeout(() => {
            if (navMenu.classList.contains('active')) {
                const firstLink = navMenu.querySelector('.nav-link');
                if (firstLink) firstLink.focus();
            }
        }, 100);
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);
