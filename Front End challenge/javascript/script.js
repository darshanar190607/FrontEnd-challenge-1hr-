// Global Variables
let loadingProgress = 0;
let loadingTimer = 0;
let charts = {};
let isDarkMode = false;
let cursorFollower = null;
let interactiveChart = null;

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
    initializeDarkMode();
    initializeCursorFollower();
    initializeInteractiveElements();
});

// Enhanced Loader Functionality
function initializeLoader() {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('mainContent');
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const loadingText = document.getElementById('loadingText');
    const timer = document.getElementById('timer');
    
    const loadingMessages = [
        'Initializing Analytics Engine...',
        'Loading Dashboard Components...',
        'Connecting to Data Sources...',
        'Preparing Visualizations...',
        'Optimizing Performance...',
        'Configuring Security Protocols...',
        'Loading Brand Assets...',
        'Finalizing Setup...',
        'Almost Ready...',
        'Welcome to PowerBI Pro!'
    ];
    
    let messageIndex = 0;
    
    // Update loading progress
    const loadingInterval = setInterval(() => {
        loadingProgress += Math.random() * 8 + 3;
        loadingTimer += 0.1;
        
        if (loadingProgress >= 100) {
            loadingProgress = 100;
            clearInterval(loadingInterval);
            
            // Complete loading animation
            setTimeout(() => {
                // Add zoom-out class for 3D effect
                loader.classList.add('zoom-out');
                
                setTimeout(() => {
                    loader.style.display = 'none';
                    mainContent.style.display = 'block';
                    
                    // Initialize AOS after content is shown
                    AOS.init({
                        duration: 1000,
                        once: true,
                        offset: 100,
                        easing: 'ease-out-cubic'
                    });
                    
                    // Start counter animations
                    animateCounters();
                    
                    // Initialize interactive elements
                    initializeHeroInteractions();
                }, 800);
            }, 1000);
        }
        
        // Update progress bar and percentage
        progressBar.style.width = loadingProgress + '%';
        progressPercentage.textContent = Math.floor(loadingProgress) + '%';
        
        // Update timer
        timer.textContent = (Math.floor(loadingTimer * 10) / 10).toFixed(1);
        
        // Update loading message
        const messageThreshold = 100 / loadingMessages.length;
        const newMessageIndex = Math.floor(loadingProgress / messageThreshold);
        if (newMessageIndex !== messageIndex && newMessageIndex < loadingMessages.length) {
            messageIndex = newMessageIndex;
            loadingText.textContent = loadingMessages[messageIndex];
        }
    }, 100);
}

// Enhanced Parallax Effects
function initializeParallax() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-speed]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Update interactive graph visibility
        const heroGraph = document.getElementById('heroInteractiveGraph');
        if (heroGraph && scrolled < window.innerHeight) {
            const opacity = Math.max(0, 1 - (scrolled / (window.innerHeight * 0.5)));
            heroGraph.style.opacity = opacity;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Mouse parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const parallaxLayers = document.querySelectorAll('.parallax-layer-1, .parallax-layer-2');
        parallaxLayers.forEach((layer, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            layer.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Dark Mode Functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    
    // Load saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        document.body.classList.add('dark-mode');
        isDarkMode = true;
        darkModeIcon.className = 'fas fa-sun';
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        isDarkMode = !isDarkMode;
        
        // Update icon
        darkModeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        
        // Save preference
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update charts for dark mode
        updateChartsForTheme();
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

// Cursor Follower
function initializeCursorFollower() {
    cursorFollower = document.getElementById('cursorFollower');
    const followerDot = cursorFollower.querySelector('.follower-dot');
    const followerRing = cursorFollower.querySelector('.follower-ring');
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Smooth following animation
        dotX += (mouseX - dotX) * 0.8;
        dotY += (mouseY - dotY) * 0.8;
        ringX += (mouseX - ringX) * 0.3;
        ringY += (mouseY - ringY) * 0.3;
        
        followerDot.style.left = dotX + 'px';
        followerDot.style.top = dotY + 'px';
        followerRing.style.left = ringX + 'px';
        followerRing.style.top = ringY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hide cursor follower on mobile
    if (window.innerWidth <= 768) {
        cursorFollower.style.display = 'none';
    }
}

// Interactive Hero Elements
function initializeHeroInteractions() {
    const heroSection = document.querySelector('.hero-section');
    const interactiveGraph = document.getElementById('heroInteractiveGraph');
    
    // Show interactive graph on mouse enter
    heroSection.addEventListener('mouseenter', () => {
        if (window.innerWidth > 992) {
            interactiveGraph.classList.add('show');
            createInteractiveChart();
        }
    });
    
    // Update graph on mouse move
    heroSection.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 992 && interactiveChart) {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Update chart data based on mouse position
            updateInteractiveChart(x, y);
        }
    });
}

// Create Interactive Chart
function createInteractiveChart() {
    const ctx = document.getElementById('interactiveChart');
    if (ctx && !interactiveChart) {
        interactiveChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['A', 'B', 'C', 'D', 'E'],
                datasets: [{
                    label: 'Interactive Data',
                    data: [10, 20, 15, 25, 20],
                    borderColor: '#00bcf2',
                    backgroundColor: 'rgba(0, 188, 242, 0.1)',
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
                        radius: 3,
                        hoverRadius: 5
                    }
                },
                animation: {
                    duration: 300
                }
            }
        });
    }
}

// Update Interactive Chart
function updateInteractiveChart(mouseX, mouseY) {
    if (interactiveChart) {
        const newData = [
            10 + mouseX * 20,
            20 + mouseY * 15,
            15 + mouseX * 10,
            25 + mouseY * 20,
            20 + mouseX * 15
        ];
        
        interactiveChart.data.datasets[0].data = newData;
        interactiveChart.update('none');
    }
}

// Enhanced Animation Initialization
function initializeAnimations() {
    // Floating animations for hero dashboard
    const dashboardMockup = document.querySelector('.dashboard-mockup');
    if (dashboardMockup) {
        let startTime = Date.now();
        function animateDashboard() {
            const elapsed = Date.now() - startTime;
            const y = Math.sin(elapsed * 0.001) * 10;
            const rotation = Math.sin(elapsed * 0.0005) * 2;
            dashboardMockup.style.transform = `translateY(${y}px) rotateY(${rotation}deg)`;
            requestAnimationFrame(animateDashboard);
        }
        animateDashboard();
    }
    
    // Animate floating visualization items
    const vizItems = document.querySelectorAll('.viz-item');
    vizItems.forEach((item, index) => {
        let startTime = Date.now() + index * 2000;
        function animateVizItem() {
            const elapsed = Date.now() - startTime;
            const y = Math.sin(elapsed * 0.001) * 15;
            const scale = 1 + Math.sin(elapsed * 0.0015) * 0.05;
            item.style.transform = `translateY(${y}px) scale(${scale})`;
            requestAnimationFrame(animateVizItem);
        }
        animateVizItem();
    });
    
    // Parallax cards hover effect
    const parallaxCards = document.querySelectorAll('.parallax-card');
    parallaxCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const rotateX = (y - 0.5) * 10;
            const rotateY = (x - 0.5) * -10;
            
            card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// Enhanced Chart Initialization
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
                    borderRadius: 8,
                    borderSkipped: false
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
                            color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        },
                        ticks: {
                            color: isDarkMode ? '#ffffff' : '#333333'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: isDarkMode ? '#ffffff' : '#333333'
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
                    fill: false,
                    tension: 0.4
                }, {
                    label: 'Forecast',
                    data: [null, null, null, null, 155, 170, 185],
                    borderColor: '#00bcf2',
                    backgroundColor: 'rgba(0, 188, 242, 0.1)',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: isDarkMode ? '#ffffff' : '#333333'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        },
                        ticks: {
                            color: isDarkMode ? '#ffffff' : '#333333'
                        }
                    },
                    x: {
                        grid: {
                            color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        },
                        ticks: {
                            color: isDarkMode ? '#ffffff' : '#333333'
                        }
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
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: isDarkMode ? '#ffffff' : '#333333',
                            padding: 20
                        }
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
                    borderWidth: 2,
                    pointBackgroundColor: '#0078d4'
                }, {
                    label: 'Target State',
                    data: [95, 95, 90, 98, 95],
                    borderColor: '#00bcf2',
                    backgroundColor: 'rgba(0, 188, 242, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#00bcf2'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: isDarkMode ? '#ffffff' : '#333333'
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        },
                        pointLabels: {
                            color: isDarkMode ? '#ffffff' : '#333333'
                        },
                        ticks: {
                            color: isDarkMode ? '#ffffff' : '#333333'
                        }
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

// Update Charts for Theme
function updateChartsForTheme() {
    Object.values(charts).forEach(chart => {
        if (chart && chart.options) {
            // Update legend colors
            if (chart.options.plugins && chart.options.plugins.legend) {
                chart.options.plugins.legend.labels.color = isDarkMode ? '#ffffff' : '#333333';
            }
            
            // Update scale colors
            if (chart.options.scales) {
                Object.keys(chart.options.scales).forEach(scaleKey => {
                    const scale = chart.options.scales[scaleKey];
                    if (scale.ticks) {
                        scale.ticks.color = isDarkMode ? '#ffffff' : '#333333';
                    }
                    if (scale.grid) {
                        scale.grid.color = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                    }
                    if (scale.pointLabels) {
                        scale.pointLabels.color = isDarkMode ? '#ffffff' : '#333333';
                    }
                });
            }
            
            chart.update();
        }
    });
}

// Generate random data for charts
function generateRealtimeData(length, min = 50, max = 200) {
    return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Enhanced Counter Animations
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
    const target = parseFloat(element.dataset.count);
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

// Enhanced Ripple Effects
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
                z-index: 1000;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS if not exists
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

// Enhanced Navbar Functionality
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

// Enhanced Carousel Functionality
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
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            carousel.setAttribute('data-bs-pause', 'hover');
        });
        
        carousel.addEventListener('mouseleave', () => {
            carousel.removeAttribute('data-bs-pause');
        });
    }
}

// Interactive Elements
function initializeInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.brand-kit-card, .service-card, .product-card, .testimonial-card, .customer-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add scroll-triggered animations
    const animatedElements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
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
    
    // Update cursor follower visibility
    if (cursorFollower) {
        cursorFollower.style.display = window.innerWidth <= 768 ? 'none' : 'block';
    }
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
        navigator.serviceWorker.register('../sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Form Handling
function initializeForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted:', data);
            trackEvent('form_submit', { form_id: this.id });
            
            showNotification('Form submitted successfully!', 'success');
        });
    });
}

// Notification System
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const bgColor = type === 'success' ? '#107c10' : 
                   type === 'error' ? '#d13438' : 
                   type === 'warning' ? '#ffb900' : '#0078d4';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${bgColor};
        color: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
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

// Analytics Tracking
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    console.log('Event tracked:', eventName, eventData);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeLazyLoading();
    initializeForms();
});

// Export functions for global access
window.PowerBIApp = {
    showNotification,
    trackEvent,
    charts,
    toggleDarkMode: () => document.getElementById('darkModeToggle').click()
};