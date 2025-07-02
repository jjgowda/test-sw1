// SmartWorks Creations - Premium Digital Marketing Agency
// Enhanced JavaScript with Process Animation Improvements - Fixed Version

class SmartWorksApp {
    constructor() {
        this.isLoaded = false;
        this.currentTheme = this.getStoredTheme();
        this.scrollProgress = 0;
        this.processSteps = [];
        this.serviceCards = [];
        this.teamCards = [];
        this.timelineAnimated = false;
        
        this.init();
    }

    init() {
        this.initializeElements();
        this.setupEventListeners();
        this.initializeTheme();
        this.startLoadingSequence();
        this.initializeAnimations();
        this.setupIntersectionObserver();
        this.initializeProcessTimeline();
    }

    initializeElements() {
        // Loading screen
        this.loadingScreen = document.getElementById('loadingScreen');
        
        // Navigation
        this.navbar = document.getElementById('navbar');
        this.themeToggle = document.getElementById('themeToggle');
        
        // Hero section
        this.typingText = document.getElementById('typingText');
        
        // Process section
        this.timelineLine = document.getElementById('timelineLine');
        this.processSteps = document.querySelectorAll('.process-step');
        
        // Service and team cards
        this.serviceCards = document.querySelectorAll('.service-card');
        this.teamCards = document.querySelectorAll('.team-card');
        
        // WhatsApp popup
        this.contactBtn = document.getElementById('contactBtn');
        this.whatsappPopup = document.getElementById('whatsappPopup');
        this.popupClose = document.getElementById('popupClose');
        
        // All contact buttons
        this.contactButtons = document.querySelectorAll('.contact-btn, .cta-button, #contactBtn');
    }

    setupEventListeners() {
        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Scroll events with throttling for better performance
        window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16), { passive: true });
        
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // WhatsApp popup - Multiple contact buttons
        this.contactButtons.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showWhatsAppPopup();
                });
            }
        });
        
        if (this.popupClose) {
            this.popupClose.addEventListener('click', () => this.hideWhatsAppPopup());
        }
        
        // Close popup when clicking outside
        if (this.whatsappPopup) {
            document.addEventListener('click', (e) => {
                if (this.whatsappPopup.classList.contains('show') && 
                    !this.whatsappPopup.contains(e.target) && 
                    !Array.from(this.contactButtons).includes(e.target)) {
                    this.hideWhatsAppPopup();
                }
            });
        }
        
        // Resize handler
        window.addEventListener('resize', this.throttle(() => this.handleResize(), 100), { passive: true });
        
        // Reduced motion check
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.disableAnimations();
        }
    }

    // Theme Management
    getStoredTheme() {
        if (typeof localStorage !== 'undefined') {
            try {
                return localStorage.getItem('theme') || 'light';
            } catch (e) {
                return 'light';
            }
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    initializeTheme() {
        document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
        
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem('theme', this.currentTheme);
            } catch (e) {
                console.warn('Could not save theme preference');
            }
        }
        
        // Add smooth transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    // Loading Animation
    startLoadingSequence() {
        // Simulate loading time
        setTimeout(() => {
            this.finishLoading();
        }, 1500);
    }

    finishLoading() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
        }
        this.isLoaded = true;
        
        // Start hero animations
        setTimeout(() => {
            this.startHeroAnimations();
        }, 300);
        
        // Remove loading screen from DOM after animation
        setTimeout(() => {
            if (this.loadingScreen) {
                this.loadingScreen.remove();
            }
        }, 800);
    }

    // Hero Animations
    startHeroAnimations() {
        // Start typing animation
        this.startTypingAnimation();
        
        // Animate floating shapes
        this.animateFloatingShapes();
    }

    startTypingAnimation() {
        if (!this.typingText) return;
        
        const words = ['Leadership', 'Excellence', 'Innovation', 'Success'];
        let currentWordIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        
        const typeSpeed = 150;
        const deleteSpeed = 100;
        const pauseTime = 2000;
        
        const typeWriter = () => {
            const currentWord = words[currentWordIndex];
            
            if (isDeleting) {
                this.typingText.textContent = currentWord.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                
                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentWordIndex = (currentWordIndex + 1) % words.length;
                    setTimeout(typeWriter, 500);
                    return;
                }
            } else {
                this.typingText.textContent = currentWord.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                
                if (currentCharIndex === currentWord.length) {
                    isDeleting = true;
                    setTimeout(typeWriter, pauseTime);
                    return;
                }
            }
            
            setTimeout(typeWriter, isDeleting ? deleteSpeed : typeSpeed);
        };
        
        // Add cursor effect
        this.typingText.style.borderRight = '3px solid #FFD700';
        this.typingText.style.animation = 'blink 1s infinite';
        
        // Add keyframes for cursor blink
        if (!document.querySelector('#cursor-blink-style')) {
            const style = document.createElement('style');
            style.id = 'cursor-blink-style';
            style.textContent = `
                @keyframes blink {
                    0%, 50% { border-color: #FFD700; }
                    51%, 100% { border-color: transparent; }
                }
            `;
            document.head.appendChild(style);
        }
        
        typeWriter();
    }

    animateFloatingShapes() {
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            shape.style.animationDelay = `${index * 0.5}s`;
            shape.style.opacity = '0.1';
        });
    }

    // Scroll Handling - Fixed
    handleScroll() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.scrollProgress = Math.min(scrollTop / docHeight, 1);
        
        this.updateNavbar(scrollTop);
        this.updateProcessTimeline();
        this.handleParallax();
    }

    updateNavbar(scrollTop) {
        if (this.navbar) {
            if (scrollTop > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }
    }

    // Process Timeline Animation - Fixed Implementation
    initializeProcessTimeline() {
        this.processSteps.forEach((step, index) => {
            step.style.animationDelay = `${index * 0.2}s`;
            
            // Add hover effects to each step
            this.addProcessStepHoverEffects(step);
        });
    }

    updateProcessTimeline() {
        if (!this.timelineLine) return;
        
        const processSection = document.querySelector('.process');
        if (!processSection) return;
        
        const rect = processSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate if section is in view
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const sectionBottom = sectionTop + sectionHeight;
        
        let progress = 0;
        
        if (sectionTop < windowHeight && sectionBottom > 0) {
            // Section is in viewport
            const visibleTop = Math.max(0, -sectionTop);
            const visibleBottom = Math.min(sectionHeight, windowHeight - sectionTop);
            const visibleHeight = visibleBottom - visibleTop;
            
            if (visibleHeight > 0) {
                progress = Math.min(visibleHeight / (sectionHeight * 0.8), 1);
            }
        }
        
        // Update timeline line height with smooth animation
        const maxHeight = this.calculateTimelineHeight();
        const targetHeight = Math.max(0, progress * maxHeight);
        
        this.timelineLine.style.height = `${targetHeight}px`;
        
        // Add glow effect when timeline is active
        if (progress > 0) {
            this.timelineLine.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.3)';
            this.timelineLine.style.background = 'linear-gradient(to bottom, #FFD700, #FFA500)';
        } else {
            this.timelineLine.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
        }
        
        // Animate process steps based on timeline progress
        this.animateProcessStepsOnScroll(progress);
    }

    calculateTimelineHeight() {
        const processContainer = document.querySelector('.process-timeline');
        if (!processContainer) return 600;
        
        let totalHeight = 0;
        this.processSteps.forEach(step => {
            totalHeight += step.offsetHeight + 32; // 32px margin
        });
        
        return Math.max(totalHeight - 100, 400);
    }

    animateProcessStepsOnScroll(progress) {
        const stepCount = this.processSteps.length;
        const progressPerStep = 1 / stepCount;
        
        this.processSteps.forEach((step, index) => {
            const stepProgress = (progress - (index * progressPerStep)) / progressPerStep;
            
            if (stepProgress > 0 && !step.classList.contains('animate')) {
                // Trigger step animation
                setTimeout(() => {
                    step.classList.add('animate');
                    this.activateStepParticles(step);
                }, index * 150);
            }
        });
    }

    activateStepParticles(step) {
        const particles = step.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            setTimeout(() => {
                particle.style.animation = `particleFloat 3s ease-in-out infinite ${index * 0.5}s`;
            }, index * 200);
        });
        
        // Add step number pulsing
        const stepNumber = step.querySelector('.step-number');
        if (stepNumber) {
            stepNumber.style.animation = 'stepPulse 2s ease-in-out infinite';
        }
    }

    addProcessStepHoverEffects(step) {
        const stepContent = step.querySelector('.step-content');
        const stepNumber = step.querySelector('.step-number');
        
        if (stepContent && stepNumber) {
            step.addEventListener('mouseenter', () => {
                stepContent.style.transform = 'translateY(-8px) rotate(1deg)';
                stepContent.style.boxShadow = '0 12px 30px rgba(255, 215, 0, 0.2)';
                stepContent.style.borderColor = '#FFD700';
                
                stepNumber.style.transform = 'scale(1.1)';
                stepNumber.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
                
                // Add extra particles on hover
                this.createHoverParticles(step);
            });
            
            step.addEventListener('mouseleave', () => {
                stepContent.style.transform = '';
                stepContent.style.boxShadow = '';
                stepContent.style.borderColor = '';
                
                stepNumber.style.transform = '';
                stepNumber.style.boxShadow = '';
            });
        }
    }

    createHoverParticles(step) {
        const particleCount = 3;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: #FFD700;
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
            `;
            
            step.appendChild(particle);
            
            const rect = step.getBoundingClientRect();
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // Animate particle
            particle.animate([
                { 
                    opacity: 0, 
                    transform: 'scale(0) translateY(0)' 
                },
                { 
                    opacity: 1, 
                    transform: 'scale(1.5) translateY(-30px)' 
                },
                { 
                    opacity: 0, 
                    transform: 'scale(0) translateY(-60px)' 
                }
            ], {
                duration: 1500,
                delay: i * 200,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }

    handleParallax() {
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(window.pageYOffset * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${yPos * 0.1}deg)`;
        });
    }

    // Intersection Observer for Animations
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleElementInView(entry.target);
                }
            });
        }, options);
        
        // Observe elements
        this.serviceCards.forEach(card => observer.observe(card));
        this.teamCards.forEach(card => observer.observe(card));
        
        // Observe section headers
        document.querySelectorAll('.section-header').forEach(header => {
            observer.observe(header);
        });
    }

    handleElementInView(element) {
        if (element.classList.contains('service-card')) {
            this.animateServiceCard(element);
        } else if (element.classList.contains('team-card')) {
            this.animateTeamCard(element);
        } else if (element.classList.contains('section-header')) {
            this.animateSectionHeader(element);
        }
    }

    animateServiceCard(card) {
        const index = Array.from(this.serviceCards).indexOf(card);
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 100);
    }

    animateTeamCard(card) {
        const index = Array.from(this.teamCards).indexOf(card);
        setTimeout(() => {
            card.classList.add('animate');
            this.addSparkleEffect(card);
        }, index * 200);
    }

    animateSectionHeader(header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }

    // Special Effects
    addSparkleEffect(element) {
        const sparkles = 5;
        for (let i = 0; i < sparkles; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #FFD700;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
                opacity: 0;
            `;
            
            element.appendChild(sparkle);
            
            const x = Math.random() * element.offsetWidth;
            const y = Math.random() * element.offsetHeight;
            
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            
            sparkle.animate([
                { opacity: 0, transform: 'scale(0) rotate(0deg)' },
                { opacity: 1, transform: 'scale(1.5) rotate(180deg)' },
                { opacity: 0, transform: 'scale(0) rotate(360deg)' }
            ], {
                duration: 1000,
                delay: i * 200,
                easing: 'ease-out'
            }).onfinish = () => sparkle.remove();
        }
    }

    // Navigation
    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // WhatsApp Popup - Fixed Implementation
    showWhatsAppPopup() {
        console.log('Showing WhatsApp popup'); // Debug log
        
        if (this.whatsappPopup) {
            this.whatsappPopup.classList.add('show');
            
            // Add animation class for better visual feedback
            this.whatsappPopup.style.transform = 'translateY(0) scale(1)';
            this.whatsappPopup.style.opacity = '1';
            
            // Auto hide after 15 seconds
            setTimeout(() => {
                if (this.whatsappPopup && this.whatsappPopup.classList.contains('show')) {
                    this.hideWhatsAppPopup();
                }
            }, 15000);
        }
    }

    hideWhatsAppPopup() {
        console.log('Hiding WhatsApp popup'); // Debug log
        
        if (this.whatsappPopup) {
            this.whatsappPopup.classList.remove('show');
            this.whatsappPopup.style.transform = 'translateY(20px) scale(0.9)';
            this.whatsappPopup.style.opacity = '0';
        }
    }

    // Utility Functions
    handleResize() {
        // Recalculate timeline height on resize
        this.updateProcessTimeline();
        this.handleParallax();
    }

    disableAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    initializeAnimations() {
        // Setup enhanced interactions
        this.initializeCustomCursor();
        
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    initializeCustomCursor() {
        const interactiveElements = document.querySelectorAll('.btn, .service-card, .team-card, .process-step, .nav-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.cursor = 'pointer';
            });
        });
    }

    // Performance optimization
    throttle(func, wait) {
        let timeout;
        let previous = 0;
        
        return function executedFunction(...args) {
            const now = Date.now();
            const remaining = wait - (now - previous);
            
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(this, args);
            } else if (!timeout) {
                timeout = setTimeout(() => {
                    previous = Date.now();
                    timeout = null;
                    func.apply(this, args);
                }, remaining);
            }
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing SmartWorks App'); // Debug log
    
    // Add loading state
    document.body.classList.add('loading');
    
    // Initialize app
    window.smartWorksApp = new SmartWorksApp();
    
    // Remove loading state after initialization
    setTimeout(() => {
        document.body.classList.remove('loading');
        console.log('SmartWorks App initialized'); // Debug log
    }, 100);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.classList.add('paused');
    } else {
        document.body.classList.remove('paused');
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('SmartWorks App Error:', e.error);
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartWorksApp;
}