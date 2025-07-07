// Set active navigation based on current page
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize mobile navigation
function initializeMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Page load animation
function initializePageLoadAnimation() {
    document.body.style.opacity = '0';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Parallax scrolling effect
function initializeParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.glow-svg, .hero-logo-svg, .service-logo-svg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.2;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${parallax}px)`;
        });
    });
}

// Enhanced scroll animations
function initializeAdvancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Staggered animation for multiple elements
    const staggeredObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100); // 100ms delay between each element
                staggeredObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply staggered animations to service buttons
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(btn => {
        btn.classList.add('animate-prepare');
        staggeredObserver.observe(btn);
    });

    // Add CSS classes for animation states
    const style = document.createElement('style');
    style.textContent = `
        .animate-prepare {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Button ripple effect
function initializeButtonRippleEffect() {
    const buttons = document.querySelectorAll('.cta-button, .contact-team-btn, .learn-more-btn, .service-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple effect CSS
    const style = document.createElement('style');
    style.textContent = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavigation();
    initializeMobileNavigation();
    initializePageLoadAnimation();
    initializeParallaxEffect();
    initializeAdvancedScrollAnimations();
    initializeButtonRippleEffect();
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simple validation
            if (!formObject.name || !formObject.email || !formObject.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formObject.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
});

// Enhanced scroll animations for images and sections
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special effects for different element types
                if (entry.target.classList.contains('glow-svg')) {
                    entry.target.style.filter = 'blur(1px) brightness(1.2)';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .compliance-card, .additional-item, .faq-item, .contact-method, .parking-image, .about-image, .why-image, .appeal-image, .partners-image, .contact-image, .services-section');
    
    animateElements.forEach((el, index) => {
        if (!el.style.opacity) { // Only set if not already set by CSS animations
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        }
        observer.observe(el);
    });
});

// Header scroll effect - transparent when at top, solid when scrolling
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const scrollThreshold = 50; // Threshold for background change
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Change background based on scroll position
        if (scrollTop > scrollThreshold) {
            // Scrolled down - make header solid
            header.style.background = '#121212';
            header.style.backdropFilter = 'blur(10px)';
            header.style.transition = 'background 0.3s ease, backdrop-filter 0.3s ease';
        } else {
            // At top - make header transparent
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.transition = 'background 0.3s ease, backdrop-filter 0.3s ease';
        }
    });
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Statistics counter animation
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
        }, 30);
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
});

// FAQ accordion functionality (if needed)
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from other items
            faqItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle active class on clicked item
            this.classList.toggle('active');
        });
    });
});

// Loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen if it exists
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
});

// Hero gradient heading animation
function animateHeroWords() {
    const words = document.querySelectorAll('.hero-gradient-words .word');
    let current = 0;
    if (!words.length) return;
    words[current].classList.add('active');
    setInterval(() => {
        words[current].classList.remove('active');
        current = (current + 1) % words.length;
        words[current].classList.add('active');
    }, 2200);
}
document.addEventListener('DOMContentLoaded', animateHeroWords);

// Enhanced hero word animation with smooth transitions
document.addEventListener('DOMContentLoaded', function() {
  const words = document.querySelectorAll('.hero-heading-gradient-wrapper .hero-heading-gradient-text');
  let current = 0;
  
  if (words.length === 0) return;
  
  function showWord(idx) {
    words.forEach((el, i) => {
      if (i === idx) {
        el.classList.add('active');
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      } else {
        el.classList.remove('active');
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
      }
    });
  }
  
  // Initialize all words with transitions
  words.forEach(word => {
    word.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  showWord(current);
  
  setInterval(() => {
    current = (current + 1) % words.length;
    showWord(current);
  }, 3000); // Increased duration for better readability
});

// Service Tabs Bar Logic
const tabImageMap = {
    'scan-stay': {
        svg: 'assets/service/scan-stay.svg',
        png: 'assets/service/scan-stay.png'
    },
    'digital-permits': {
        svg: 'assets/service/digital-permits.svg',
        png: 'assets/service/digital-permits.png'
    },
    'dashboard': {
        svg: 'assets/service/dashboard.svg',
        png: 'assets/service/dashboard.png'
    },
    'lpr-patrol': {
        svg: 'assets/service/lpr-patrol.svg',
        png: 'assets/service/lpr-patrol.png'
    },
    'car-park': {
        svg: 'assets/service/car-park.svg',
        png: 'assets/service/car-park.png'
    },
    'equipment': {
        svg: 'assets/service/equipment.svg',
        png: 'assets/service/equipment.png'
    },
    'body-corporate': {
        svg: 'assets/service/body-corporate.svg',
        png: 'assets/service/body-corporate.png'
    },
    'consulting': {
        svg: 'assets/service/consulting.svg',
        png: 'assets/service/consulting.png'
    },
    'packages': {
        svg: 'assets/service/packages.svg',
        png: 'assets/service/packages.png'
    }
};

function updateServiceImage(tabKey) {
    const container = document.getElementById('service-image-container');
    if (!container) return;
    const isMobile = window.innerWidth <= 768;
    const imgSrc = isMobile ? tabImageMap[tabKey].png : tabImageMap[tabKey].svg;
    container.innerHTML = `<img src="${imgSrc}" alt="${tabKey}"/>`;
}

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.service-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('selected'));
            this.classList.add('selected');
            updateServiceImage(this.getAttribute('data-tab'));
        });
    });
    // Show initial image
    const selected = document.querySelector('.service-tab.selected');
    if (selected) {
        updateServiceImage(selected.getAttribute('data-tab'));
    }
    // Update image on resize
    window.addEventListener('resize', function() {
        const selected = document.querySelector('.service-tab.selected');
        if (selected) {
            updateServiceImage(selected.getAttribute('data-tab'));
        }
    });
}); 