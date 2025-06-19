// Global Variables
let loadingProgress = 0;
let loadingTimer = 0;
let charts = {};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLoader();
    initializeParallax();
    initializeAnimations();
    initializeCharts();
    initializeCounters();
    initializeRippleEffects();
    initializeNavbar();
    initializeCarousel();
});

// Loader Functionality
function initializeLoader() {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('mainContent');
    const progressBar = document.getElementById('progressBar');
    const loadingText = document.getElementById('loadingText');
    const timer = document.getElementById('timer');
    
    const loadingMessages = [
        'Initializing Analytics Engine...',
        'Loading Dashboard Components...',
        'Connecting to Data Sources...',
        'Preparing Visualizations...',
        'Optimizing Performance...',
        'Almost Ready...',
        'Welcome to PowerBI Pro!'
    ];
    
    let messageIndex = 0;
    
    // Update loading progress
    const loadingInterval = setInterval(() => {
        loadingProgress += Math.random() * 15 + 5;
        loadingTimer += 0.1;
        
        if (loadingProgress >= 100) {
            loadingProgress = 100;
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    mainContent.style.display = 'block';
                    
                    // Initialize AOS after content is shown
                    AOS.init({
                        duration: 1000,
                        once: true,
                        offset: 100
                    });
                    
                    // Start counter animations
                    animateCounters();
                }, 500);
            }, 1000);
        }
        
        // Update progress bar
        progressBar.style.width = loadingProgress + '%';
        
        // Update timer
        timer.textContent = Math.floor(loadingTimer * 10) / 10;
        
        // Update loading message
        if (loadingProgress > messageIndex * (100 / loadingMessages.length)) {
            if (messageIndex < loadingMessages.length - 1) {
                messageIndex++;
                loadingText.textContent = loadingMessages[messageIndex];
            }
        }
    }, 100);
}

// Parallax Effects
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Animation Initialization
function initializeAnimations() {
    // Floating animations for hero dashboard
    const dashboardMockup = document.querySelector('.dashboard-mockup');
    if (dashboardMockup) {
        setInterval(() => {
            dashboardMockup.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 10}px)`;
        }, 16);
    }
    
    // Animate floating icons in loader
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        setInterval(() => {
            const offset = index * Math.PI / 2;
            const y = Math.sin(Date.now() * 0.001 + offset) * 20;
            const x = Math.cos(Date.now() * 0.0008 + offset) * 15;
            icon.style.transform = `translate(${x}px, ${y}px)`;
        }, 16);
    });
}

// Chart Initialization
function initializeCharts() {
    // Hero Chart
    const heroCtx = document.getElementById('heroChart');
    if (heroCtx) {
        charts.hero = new Chart(heroCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue',
                    data: [1200, 1900, 1500, 2100, 1800, 2400],
                    borderColor: '#00bcf2',
                    backgroundColor: 'rgba(0, 188, 242, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }
        });
    }
    
    // Reports Chart
    const reportsCtx = document.getElementById('reportsChart');
    if (reportsCtx) {
        charts.reports = new Chart(reportsCtx, {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Reports Generated',
                    data: [45, 62, 58, 71],
                    backgroundColor: ['#0078d4', '#106ebe', '#00bcf2', '#40e0d0'],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Forecast Chart
    const forecastCtx = document.getElementById('forecastChart');
    if (forecastCtx) {
        charts.forecast = new Chart(forecastCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                datasets: [{
                    label: 'Actual',
                    data: [100, 120, 115, 140, 135, 160],
                    borderColor: '#0078d4',
                    backgroundColor: 'rgba(0, 120, 212, 0.1)',
                    borderWidth: 3,
                    fill: false
                }, {
                    label: 'Forecast',
                    data: [null, null, null, null, 155, 170, 185],
                    borderColor: '#00bcf2',
                    backgroundColor: 'rgba(0, 188, 242, 0.1)',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Dashboard Chart
    const dashboardCtx = document.getElementById('dashboardChart');
    if (dashboardCtx) {
        charts.dashboard = new Chart(dashboardCtx, {
            type: 'doughnut',
            data: {
                labels: ['Sales', 'Marketing', 'Support', 'Development'],
                datasets: [{
                    data: [35, 25, 20, 20],
                    backgroundColor: ['#0078d4', '#106ebe', '#00bcf2', '#40e0d0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                cutout: '60%'
            }
        });
    }
    
    // Consolidation Chart
    const consolidationCtx = document.getElementById('consolidationChart');
    if (consolidationCtx) {
        charts.consolidation = new Chart(consolidationCtx, {
            type: 'radar',
            data: {
                labels: ['Data Quality', 'Integration', 'Performance', 'Security', 'Scalability'],
                datasets: [{
                    label: 'Current State',
                    data: [85, 90, 78, 92, 88],
                    borderColor: '#0078d4',
                    backgroundColor: 'rgba(0, 120, 212, 0.2)',
                    borderWidth: 2
                }, {
                    label: 'Target State',
                    data: [95, 95, 90, 98, 95],
                    borderColor: '#00bcf2',
                    backgroundColor: 'rgba(0, 188, 242, 0.2)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Analytics Chart
    const analyticsCtx = document.getElementById('analyticsChart');
    if (analyticsCtx) {
        charts.analytics = new Chart(analyticsCtx, {
            type: 'line',
            data: {
                labels: Array.from({length: 24}, (_, i) => `${i}:00`),
                datasets: [{
                    label: 'Active Users',
                    data: generateRealtimeData(24),
                    borderColor: '#00bcf2',
                    backgroundColor: 'rgba(0, 188, 242, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Page Views',
                    data: generateRealtimeData(24, 500, 1500),
                    borderColor: '#40e0d0',
                    backgroundColor: 'rgba(64, 224, 208, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: 'white'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        }
                    },
                    y: {
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        }
                    }
                }
            }
        });
        
        // Update analytics chart in real-time
        setInterval(() => {
            if (charts.analytics) {
                charts.analytics.data.datasets[0].data = generateRealtimeData(24);
                charts.analytics.data.datasets[1].data = generateRealtimeData(24, 500, 1500);
                charts.analytics.update('none');
            }
        }, 3000);
    }
}

// Generate random data for charts
function generateRealtimeData(length, min = 50, max = 200) {
    return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Counter Animations
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        animateCounter(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target === 99 || target === 99.9) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Ripple Effects
function initializeRippleEffects() {
    const rippleElements = document.querySelectorAll('.ripple-effect');
    
    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Navbar Functionality
function initializeNavbar() {
    const navbar = document.querySelector('.custom-navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Carousel Functionality
function initializeCarousel() {
    const carousel = document.getElementById('solutionsCarousel');
    if (carousel) {
        // Auto-advance carousel
        setInterval(() => {
            const nextButton = carousel.querySelector('.carousel-control-next');
            if (nextButton) {
                nextButton.click();
            }
        }, 8000);
    }
}

// Intersection Observer for Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance Optimizations
const debouncedResize = debounce(() => {
    Object.values(charts).forEach(chart => {
        if (chart && chart.resize) {
            chart.resize();
        }
    });
}, 250);

window.addEventListener('resize', debouncedResize);

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading-placeholder');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('loading-placeholder');
        imageObserver.observe(img);
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Dark Mode Toggle (Optional)
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Load saved dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// Analytics Tracking (Optional)
function trackEvent(eventName, eventData = {}) {
    // Google Analytics or other tracking service
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    console.log('Event tracked:', eventName, eventData);
}

// Form Handling
function initializeForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form validation and submission logic here
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted:', data);
            trackEvent('form_submit', { form_id: this.id });
            
            // Show success message
            showNotification('Form submitted successfully!', 'success');
        });
    });
}

// Notification System
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'primary'}-color);
        color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-medium);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeLazyLoading();
    initializeScrollAnimations();
    initializeForms();
    initializeDarkMode();
});

// Export functions for global access
window.PowerBIApp = {
    showNotification,
    trackEvent,
    charts
};