// Preloader animation logic
document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById('preloader');
    const progress = document.getElementById('preloader-progress');
    let percent = 0;
    // Animate progress bar
    const interval = setInterval(() => {
        percent += Math.floor(Math.random() * 13) + 7; // random step for luxury feel
        if (percent > 100) percent = 100;
        progress.style.width = percent + '%';
        if (percent === 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hide');
            }, 600); // allow bar to finish
        }
    }, 320);
    // Fallback: hide after 3.5s if not already hidden
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 3500);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    
    const totalSeconds = (endDate - now) / 1000;
    
    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;
    
    document.getElementById('days').textContent = formatTime(days);
    document.getElementById('hours').textContent = formatTime(hours);
    document.getElementById('minutes').textContent = formatTime(minutes);
    document.getElementById('seconds').textContent = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if(this.getAttribute('href') === '#') return;
        
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if(mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if(window.scrollY > 100) {
        document.querySelector('header').style.background = 'rgba(10, 10, 26, 0.95)';
        document.querySelector('header').style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        document.querySelector('header').style.background = 'rgba(10, 10, 26, 0.9)';
        document.querySelector('header').style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.2)';
    }

    // Back to top button
    if(window.scrollY > 300) {
        document.getElementById('back-to-top').classList.add('active');
    } else {
        document.getElementById('back-to-top').classList.remove('active');
    }
});

// Back to top button
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hero scroll button
document.getElementById('hero-scroll').addEventListener('click', () => {
    window.scrollTo({
        top: document.getElementById('features').offsetTop - 100,
        behavior: 'smooth'
    });
});

// Order tracking form
const trackingForm = document.querySelector('.tracking-form');
const trackingResults = document.getElementById('tracking-results');
    
trackingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    trackingResults.style.display = 'block';
    trackingResults.scrollIntoView({ behavior: 'smooth' });
});

// Quick View Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Quick View buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.getElementById('product-modal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    // Close modal button
    document.getElementById('close-modal').addEventListener('click', function () {
        document.getElementById('product-modal').style.display = 'none';
        document.body.style.overflow = '';
    });
    // Close modal on outside click
    document.getElementById('product-modal').addEventListener('click', function (e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Reserve/Add to Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function () {
            btn.innerHTML = '<i class="fas fa-check"></i> Reserved';
            btn.disabled = true;
            btn.classList.add('reserved');
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Reserve';
                btn.disabled = false;
                btn.classList.remove('reserved');
            }, 2000);
        });
    });

    // View Entire Collection button
    const viewCollectionBtn = document.querySelector('.btn-platinum');
    if (viewCollectionBtn) {
        viewCollectionBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = "#products";
            // Optionally, scroll to products section smoothly
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Cookie consent
const cookieConsent = document.getElementById('cookie-consent');
const cookieAccept = document.getElementById('cookie-accept');
const cookieDecline = document.getElementById('cookie-decline');
    
setTimeout(() => {
    if(!localStorage.getItem('cookieAccepted')) {
        cookieConsent.classList.add('active');
    }
}, 3000);
    
cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookieAccepted', 'true');
    cookieConsent.classList.remove('active');
});
    
cookieDecline.addEventListener('click', () => {
    cookieConsent.classList.remove('active');
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn');
    
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        const ripples = document.createElement('span');
        ripples.style.left = `${x}px`;
        ripples.style.top = `${y}px`;
        this.appendChild(ripples);
        
        setTimeout(() => {
            ripples.remove();
        }, 1000);
    });
});

// Animate elements when scrolling
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .category-card, .product-card, .payment-method, .brand-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state
document.querySelectorAll('.feature-card, .category-card, .product-card, .payment-method, .brand-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Real-time countdown for Luxury Deals Section
document.addEventListener('DOMContentLoaded', function () {
    // Set your sale end date/time here (YYYY-MM-DDTHH:MM:SS)
    const saleEnd = new Date('2025-07-31T23:59:59').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = saleEnd - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            // Optionally, show a message or disable the sale
            const dealsContent = document.querySelector('.deals-content');
            if (dealsContent) {
                dealsContent.querySelector('h2').textContent = 'Private Sale Ended';
                dealsContent.querySelector('.btn').classList.add('disabled');
                dealsContent.querySelector('.btn').textContent = 'Sale Closed';
                dealsContent.querySelector('.btn').setAttribute('disabled', 'disabled');
            }
            clearInterval(timer);
        }
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    // Access Private Sale button functionality
    const accessBtn = document.querySelector('.deals-content .btn');
    if (accessBtn) {
        accessBtn.addEventListener('click', function (e) {
            e.preventDefault();
            // Example: Show a modal or redirect to a private sale page
            alert('Welcome to the Private Sale! Please log in or contact your concierge for access.');
            // Or: window.location.href = '/private-sale.html';
        });
    }
});

// Luxury Order Tracking Section - Real Time & Accessible
document.addEventListener('DOMContentLoaded', function () {
    const trackingBtn = document.querySelector('.tracking-btn');
    const orderIdInput = document.getElementById('order-id');
    const emailInput = document.getElementById('email');
    const results = document.getElementById('tracking-results');

    if (trackingBtn) {
        trackingBtn.addEventListener('click', function (e) {
            e.preventDefault();

            results.innerHTML = '<div role="status" aria-live="polite" style="padding:2em;text-align:center;">Checking your order status...</div>';

            setTimeout(() => {
                const orderId = orderIdInput.value.trim();
                const email = emailInput.value.trim();

                if (!orderId || !email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
                    results.innerHTML = `<div role="alert" style="color:#b00; padding:1em; background:#fffbe6; border-radius:8px; margin:1em 0;">
                        Please enter a valid Private Client ID and confidential email address.
                    </div>`;
                    return;
                }

                let statusHtml = '';
                if (orderId.toUpperCase().includes('VIP')) {
                    statusHtml = `
                        <div class="order-status">
                            <div class="status-info">
                                <h4>Order #${orderId.toUpperCase()}</h4>
                                <p>Placed on July 1, 2025 | Priority VIP Service</p>
                            </div>
                            <div class="status-badge shipped" aria-label="In Transit">In Transit</div>
                        </div>
                        <div class="status-timeline">
                            <div class="timeline-item completed">
                                <div class="timeline-date">July 1, 2025</div>
                                <div class="timeline-text">Order received and confirmed by your personal concierge</div>
                            </div>
                            <div class="timeline-item completed">
                                <div class="timeline-date">July 2, 2025</div>
                                <div class="timeline-text">Item authenticated and prepared for dispatch</div>
                            </div>
                            <div class="timeline-item current">
                                <div class="timeline-date">July 3, 2025</div>
                                <div class="timeline-text">In transit via private courier (ETA July 5)</div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-date">Scheduled July 5, 2025</div>
                                <div class="timeline-text">White glove delivery to your specified location</div>
                            </div>
                        </div>
                    `;
                } else {
                    statusHtml = `
                        <div class="order-status">
                            <div class="status-info">
                                <h4>Order #${orderId.toUpperCase()}</h4>
                                <p>Placed on June 20, 2025 | Standard Service</p>
                            </div>
                            <div class="status-badge delivered" aria-label="Delivered">Delivered</div>
                        </div>
                        <div class="status-timeline">
                            <div class="timeline-item completed">
                                <div class="timeline-date">June 20, 2025</div>
                                <div class="timeline-text">Order received</div>
                            </div>
                            <div class="timeline-item completed">
                                <div class="timeline-date">June 21, 2025</div>
                                <div class="timeline-text">Dispatched</div>
                            </div>
                            <div class="timeline-item completed">
                                <div class="timeline-date">June 23, 2025</div>
                                <div class="timeline-text">Delivered to your address</div>
                            </div>
                        </div>
                    `;
                }

                results.innerHTML = statusHtml;
                results.setAttribute('tabindex', '-1');
                results.focus();
            }, 1200);
        });
    }
});