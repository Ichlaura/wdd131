// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('language-selector');
    const elementsToTranslate = document.querySelectorAll('[data-lang]');
    
    // Load saved language preference or default to browser language
    let currentLang = localStorage.getItem('preferredLang') || 
                     navigator.language.split('-')[0] || 
                     'en';
    
    // Make sure we only use supported languages
    if(!['en', 'es', 'ja'].includes(currentLang)) {
        currentLang = 'en';
    }
    
    // Set the selector to current language
    if(languageSelector) {
        languageSelector.value = currentLang;
        
        // Add event listener for language changes
        languageSelector.addEventListener('change', function() {
            currentLang = this.value;
            localStorage.setItem('preferredLang', currentLang);
            loadTranslations(currentLang);
        });
    }
    
    // Load translations for the current language
    loadTranslations(currentLang);
    
    function loadTranslations(lang) {
        fetch('json/translations.json')
            .then(response => {
                if(!response.ok) {
                    throw new Error('Translations file not found');
                }
                return response.json();
            })
            .then(translations => {
                // Update all elements with data-lang attribute
                elementsToTranslate.forEach(element => {
                    const key = element.getAttribute('data-lang');
                    if(translations[lang] && translations[lang][key]) {
                        if(element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                            element.placeholder = translations[lang][key];
                        } else if(element.tagName === 'OPTION') {
                            element.textContent = translations[lang][key];
                        } else {
                            element.textContent = translations[lang][key];
                        }
                    }
                });
                
                // Update page title
                const titleKey = document.querySelector('title').getAttribute('data-lang');
                if(translations[lang] && translations[lang][titleKey]) {
                    document.title = translations[lang][titleKey] + document.title.split('|')[1];
                }
            })
            .catch(error => {
                console.error('Error loading translations:', error);
            });
    }
});