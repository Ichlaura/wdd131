// DOM Elements
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('.primary-navigation');
const langButtons = document.querySelectorAll('.lang-btn');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const teacherFilter = document.getElementById('teacher-filter');
const teacherCards = document.querySelectorAll('.teacher-card');
const registrationForm = document.getElementById('registration');
const formSteps = document.querySelectorAll('.form-step');
const prevButtons = document.querySelectorAll('.btn-prev');
const nextButtons = document.querySelectorAll('.btn-next');
const testimonialSlides = document.querySelectorAll('.testimonial');
const prevTestimonial = document.querySelector('.slider-prev');
const nextTestimonial = document.querySelector('.slider-next');
const timezoneSelect = document.getElementById('timezone-select');
const timeDisplays = document.querySelectorAll('.time-display');

// Mobile Navigation
mobileNavToggle.addEventListener('click', () => {
    const isExpanded = primaryNav.getAttribute('data-visible') === 'true';
    primaryNav.setAttribute('data-visible', !isExpanded);
    mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
});

// Language Switcher
function setLanguage(lang) {
    // In a real implementation, this would load translations
    localStorage.setItem('preferredLang', lang);
    document.documentElement.lang = lang;
    
    // Update active button
}