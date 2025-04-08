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
const inquiryForm = document.getElementById('inquiry-form');
const whatsappFloat = document.querySelector('.whatsapp-float');

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
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Here you would update all translatable content
    console.log(`Language switched to ${lang}`);
}

// Initialize language from localStorage or browser
function initLanguage() {
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language.substring(0, 2);
    const defaultLang = savedLang || (['es', 'ja'].includes(browserLang) ? browserLang : 'en');
    setLanguage(defaultLang);
}

// Tab System for Courses
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const tabId = button.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});

// Teacher Filter
teacherFilter?.addEventListener('change', (e) => {
    const filterValue = e.target.value;
    
    teacherCards.forEach(card => {
        if (filterValue === 'all' || card.dataset.specialties.includes(filterValue)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Multi-step Registration Form
let currentStep = 0;

function showStep(stepIndex) {
    formSteps.forEach((step, index) => {
        step.classList.toggle('active', index === stepIndex);
    });
    
    // Update current step
    currentStep = stepIndex;
}

nextButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const nextStep = button.dataset.next;
        const stepElement = document.getElementById(nextStep);
        
        // Validate current step before proceeding
        if (validateStep(currentStep)) {
            showStep(Array.from(formSteps).indexOf(stepElement));
        }
    });
});

prevButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const prevStep = button.dataset.prev;
        const stepElement = document.getElementById(prevStep);
        showStep(Array.from(formSteps).indexOf(stepElement));
    });
});

function validateStep(stepIndex) {
    let isValid = true;
    const currentStep = formSteps[stepIndex];
    const inputs = currentStep.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        const errorElement = input.nextElementSibling?.classList?.contains('error-message') 
            ? input.nextElementSibling 
            : input.parentElement.querySelector('.error-message');
        
        if (!input.checkValidity()) {
            errorElement.style.display = 'block';
            errorElement.textContent = input.validationMessage;
            input.classList.add('error');
            isValid = false;
        } else {
            errorElement.style.display = 'none';
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Form Submission
registrationForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateStep(currentStep)) {
        // Gather form data
        const formData = {
            name: document.getElementById('full-name').value,
            email: document.getElementById('email').value,
            country: document.getElementById('country').value,
            timezone: document.getElementById('timezone').value,
            courseType: document.querySelector('input[name="course-type"]:checked')?.value,
            level: document.getElementById('level').value,
            goals: document.getElementById('goals').value,
            agreedToTerms: document.querySelector('input[name="terms"]').checked,
            subscribe: document.querySelector('input[name="newsletter"]').checked,
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage
        saveRegistration(formData);
        
        // Show confirmation
        registrationForm.style.display = 'none';
        document.getElementById('confirmation').classList.remove('hidden');
    }
});

function saveRegistration(data) {
    // Get existing registrations or create new array
    const registrations = JSON.parse(localStorage.getItem('registrations') || [];
    
    // Add new registration
    registrations.push(data);
    
    // Save back to localStorage
    localStorage.setItem('registrations', JSON.stringify(registrations));
    
    console.log('Registration saved:', data);
}

// Testimonial Slider
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    // Update dots
    updateDots(index);
}

function updateDots(index) {
    const dotsContainer = document.querySelector('.slider-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    
    testimonialSlides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        if (i === index) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            currentTestimonial = i;
            showTestimonial(i);
        });
        
        dotsContainer.appendChild(dot);
    });
}

prevTestimonial?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
});

nextTestimonial?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
});

// Timezone Converter
function convertTimes() {
    if (!timezoneSelect || !timeDisplays.length) return;
    
    const selectedTz = timezoneSelect.value;
    const now = new Date();
    
    // Timezone conversion data
    const timezoneData = {
        'Asia/Tokyo': { offset: 9, label: 'JST' },
        'America/Bogota': { offset: -5, label: 'COT' },
        'America/Mexico_City': { offset: -6, label: 'CST' },
        'America/Santiago': { offset: -4, label: 'CLT' }
    };
    
    const tzInfo = timezoneData[selectedTz];
    
    timeDisplays.forEach(display => {
        const originalTimeText = display.dataset.original || display.textContent;
        display.dataset.original = originalTimeText;
        
        // Extract time from text (e.g., "Sun 7:00 AM (JST)")
        const timeMatch = originalTimeText.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        
        if (timeMatch) {
            let hours = parseInt(timeMatch[1]);
            const minutes = parseInt(timeMatch[2]);
            const period = timeMatch[3].toUpperCase();
            
            // Convert to 24-hour format
            if (period === 'PM' && hours < 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;
            
            // Create date object with original time (JST)
            const jstDate = new Date();
            jstDate.setHours(hours, minutes, 0, 0);
            
            // Convert to selected timezone
            const localDate = new Date(jstDate.getTime() + 
                (tzInfo.offset - 9) * 60 * 60 * 1000);
            
            // Format the time
            const localHours = localDate.getHours();
            const localMinutes = localDate.getMinutes().toString().padStart(2, '0');
            const localPeriod = localHours >= 12 ? 'PM' : 'AM';
            const displayHours = localHours % 12 || 12;
            
            // Update display
            display.textContent = originalTimeText.replace(
                /(\d{1,2}:\d{2}\s*(AM|PM))/i, 
                `${displayHours}:${localMinutes} ${localPeriod} (${tzInfo.label})`
            );
        }
    });
}

// Contact Form Submission
inquiryForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm(inquiryForm)) {
        const formData = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            subject: document.getElementById('contact-subject').value,
            message: document.getElementById('contact-message').value,
            timestamp: new Date().toISOString()
        };
        
        // Save inquiry
        saveInquiry(formData);
        
        // Show confirmation
        alert('Thank you for your message! We will respond soon.');
        inquiryForm.reset();
    }
});

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

function saveInquiry(data) {
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || []);
    inquiries.push(data);
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
    console.log('Inquiry saved:', data);
}

// WhatsApp Float Animation
whatsappFloat?.addEventListener('mouseenter', () => {
    whatsappFloat.style.transform = 'scale(1.1)';
});

whatsappFloat?.addEventListener('mouseleave', () => {
    whatsappFloat.style.transform = 'scale(1)';
});

// Initialize Components
function init() {
    // Set initial language
    initLanguage();
    
    // Set up language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });
    
    // Initialize timezone converter
    if (timezoneSelect) {
        timezoneSelect.addEventListener('change', convertTimes);
        convertTimes(); // Run once on page load
    }
    
    // Initialize testimonial slider
    if (testimonialSlides.length) {
        showTestimonial(0);
    }
    
    // Initialize form steps
    if (formSteps.length) {
        showStep(0);
    }
    
    // Set current year in footer
    document.querySelector('.current-year')?.textContent = new Date().getFullYear();
}

// Document Ready
document.addEventListener('DOMContentLoaded', init);