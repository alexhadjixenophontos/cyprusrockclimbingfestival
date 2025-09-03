// DOM Elements
const yearButtons = document.querySelectorAll('.year-btn');
const welcomeTitle = document.getElementById('welcome-title');
const welcomeDates = document.getElementById('welcome-dates');
const countdown = document.getElementById('countdown');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Festival dates
const festivalDates = {
    2024: {
        start: new Date('2024-10-26T00:00:00'),
        end: new Date('2024-10-28T23:59:59'),
        title: 'WELCOME TO CRCF 2024',
        dates: 'From 26 to 28 October 2024'
    },
    2025: {
        start: new Date('2025-10-17T00:00:00'),
        end: new Date('2025-10-19T23:59:59'),
        title: 'WELCOME TO CRCF 2025',
        dates: 'From 17 to 19 October 2025'
    }
};

// Current year (default to 2025)
let currentYear = 2025;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeYearButtons();
    initializeCountdown();
    initializeMobileNavigation();
    initializeSmoothScrolling();
    updateContentForYear(currentYear);
});

// Year button functionality
function initializeYearButtons() {
    yearButtons.forEach(button => {
        button.addEventListener('click', function() {
            const year = parseInt(this.dataset.year);
            if (year !== currentYear) {
                currentYear = year;
                updateContentForYear(year);
                updateActiveButton();
                updateCountdown();
            }
        });
    });
}

function updateActiveButton() {
    yearButtons.forEach(button => {
        button.classList.remove('active');
        if (parseInt(button.dataset.year) === currentYear) {
            button.classList.add('active');
        }
    });
}

function updateContentForYear(year) {
    const festivalData = festivalDates[year];
    if (festivalData) {
        welcomeTitle.textContent = festivalData.title;
        welcomeDates.textContent = festivalData.dates;
    }
}

// Countdown functionality
function initializeCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const festivalData = festivalDates[currentYear];
    if (!festivalData) return;

    const now = new Date();
    const timeLeft = festivalData.start - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // Festival has started or ended
        const endTime = festivalData.end - now;
        if (endTime > 0) {
            // Festival is ongoing
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Update countdown text
            document.querySelector('.countdown-label').textContent = 'FESTIVAL ON!';
        } else {
            // Festival has ended
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Update countdown text
            document.querySelector('.countdown-label').textContent = 'ENDED';
        }
    }
}

// Mobile navigation
function initializeMobileNavigation() {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
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

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation (excluding landing section)
    document.querySelectorAll('section:not(#landing)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize animations when page loads
window.addEventListener('load', function() {
    initializeAnimations();
});

// Add loading animation for images (excluding logo)
function initializeImageLoading() {
    const images = document.querySelectorAll('img:not(.logo-img)');
    images.forEach(img => {
        // Set initial state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // If image is already loaded, show it immediately
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            // Otherwise, show it when it loads
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            // Fallback: show image after a delay even if load event doesn't fire
            setTimeout(() => {
                if (img.style.opacity === '0') {
                    img.style.opacity = '1';
                }
            }, 1000);
        }
    });
}

// Initialize image loading
initializeImageLoading();

// Add scroll effect for navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add parallax effect for landing section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const landingSection = document.querySelector('.landing-section');
    if (landingSection) {
        const rate = scrolled * -0.5;
        landingSection.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects for gallery items
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add form validation for contact form (if added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function to format numbers with leading zeros
function padZero(num) {
    return num.toString().padStart(2, '0');
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu with Escape key
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - could be used for next year
            if (currentYear === 2024) {
                currentYear = 2025;
                updateContentForYear(currentYear);
                updateActiveButton();
                updateCountdown();
            }
        } else {
            // Swipe right - could be used for previous year
            if (currentYear === 2025) {
                currentYear = 2024;
                updateContentForYear(currentYear);
                updateActiveButton();
                updateCountdown();
            }
        }
    }
}
