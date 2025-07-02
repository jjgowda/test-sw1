// SmartWork Creation And Solutions PVT LTD - Main JavaScript

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // This would need to be replaced with actual EmailJS public key
})();

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initThemeToggle();
    initMobileMenu();
    initParticleSystem();
    initScrollAnimations();
    initContactForm();
    initModals();
    initSmoothScrolling();
    initWhatsAppPopup();
    
    // Initialize typing animation after a short delay to ensure DOM is ready
    setTimeout(() => {
        initTypingAnimation();
    }, 500);
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.style.display = 'none';
            mobileMenuBtn.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.style.display = 'none';
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// Typing Animation - Fixed implementation
function initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    
    if (!typingText) {
        console.error('Typing text element not found');
        return;
    }
    
    const texts = [
        'Elevate Your Brand',
        'Drive Real Results', 
        'Scale Your Business',
        'Transform Digitally'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function typeText() {
        if (isWaiting) {
            isWaiting = false;
            setTimeout(typeText, 500);
            return;
        }
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            isWaiting = true;
            typeSpeed = 500; // Pause before next text
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Start the animation
    typeText();
}

// Particle System
function initParticleSystem() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.service-card, .team-member, .process-step');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Service card hover animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) scale(1)';
        });
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
    
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const errorElement = field.parentNode.querySelector('.error-message');
        
        // Clear previous errors
        clearError(field);
        
        if (field.hasAttribute('required') && !value) {
            showError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                showError(field, 'Please enter a valid phone number');
                return false;
            }
        }
        
        return true;
    }
    
    function showError(field, message) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        field.style.borderColor = 'var(--color-error)';
    }
    
    function clearError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        field.style.borderColor = '';
    }
    
    function submitForm() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Simulate email sending to info@smartworkcreation.in
        // In a real implementation, you would integrate with EmailJS or a backend service
        setTimeout(() => {
            // Simulate successful email sending
            showFormStatus('success', 'Thank you! Your message has been sent to info@smartworkcreation.in. We\'ll get back to you soon.');
            contactForm.reset();
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

// Modal Functionality
function initModals() {
    const privacyLink = document.getElementById('privacyLink');
    const termsLink = document.getElementById('termsLink');
    const privacyModal = document.getElementById('privacyModal');
    const termsModal = document.getElementById('termsModal');
    const privacyClose = document.getElementById('privacyClose');
    const termsClose = document.getElementById('termsClose');
    
    if (privacyLink && privacyModal) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (termsLink && termsModal) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            termsModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (privacyClose && privacyModal) {
        privacyClose.addEventListener('click', function() {
            privacyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    if (termsClose && termsModal) {
        termsClose.addEventListener('click', function() {
            termsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === privacyModal) {
            privacyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === termsModal) {
            termsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (privacyModal) privacyModal.style.display = 'none';
            if (termsModal) termsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = 'var(--shadow-sm)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });
}

// WhatsApp Popup Functionality
function initWhatsAppPopup() {
    const whatsappPopup = document.getElementById('whatsappPopup');
    
    if (whatsappPopup) {
        // Show WhatsApp popup after 3 seconds
        setTimeout(() => {
            whatsappPopup.style.display = 'block';
            whatsappPopup.style.animation = 'whatsappBounce 2s ease-in-out infinite';
        }, 3000);
        
        // Track WhatsApp clicks
        const whatsappBtn = whatsappPopup.querySelector('.whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function() {
                console.log('WhatsApp clicked - User redirected to WhatsApp');
            });
        }
    }
}

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Window resize handler
window.addEventListener('resize', debounce(function() {
    // Handle any responsive adjustments if needed
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && window.innerWidth > 768) {
        mobileMenu.style.display = 'none';
    }
}, 250));

// Page visibility change handler
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = 'Come back! - SmartWork Creation';
    } else {
        document.title = 'SmartWork Creation And Solutions PVT LTD - Premium Digital Marketing Agency';
    }
});

// Performance optimization - Lazy load animations
function lazyLoadAnimations() {
    const animatedSvgs = document.querySelectorAll('.animated-svg');
    
    const svgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    });
    
    animatedSvgs.forEach(svg => {
        svg.style.animationPlayState = 'paused';
        svgObserver.observe(svg);
    });
}

// Initialize lazy loading after page load
window.addEventListener('load', function() {
    lazyLoadAnimations();
});

// Console message for developers
console.log('%c🚀 SmartWork Creation And Solutions PVT LTD', 'color: #21808D; font-size: 20px; font-weight: bold;');
console.log('%cPremium Digital Marketing Solutions', 'color: #FFD700; font-size: 14px;');
console.log('%cWebsite developed with advanced animations and modern web technologies', 'color: #626C71; font-size: 12px;');

// Export functions for potential external use
window.SmartWork = {
    initializeApp,
    initThemeToggle,
    initMobileMenu,
    initTypingAnimation,
    initParticleSystem,
    initScrollAnimations,
    initContactForm,
    initModals,
    initSmoothScrolling,
    initWhatsAppPopup
};
