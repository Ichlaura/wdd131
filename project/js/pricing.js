// Pricing page functionality
document.addEventListener('DOMContentLoaded', function() {
    const currencySelector = document.getElementById('currency-selector');
    const priceCardsContainers = {
        'individual': document.querySelector('#individual .price-cards'),
        'group': document.querySelector('#group .price-cards'),
        'intensive': document.querySelector('#intensive .price-cards')
    };
    
    if(currencySelector) {
        // Load pricing data
        fetch('json/pricing.json')
            .then(response => response.json())
            .then(data => {
                displayPricing(data.pricing, 'cop'); // Default to COP
                
                // Add event listener for currency changes
                currencySelector.addEventListener('change', function() {
                    const selectedCurrency = this.value;
                    displayPricing(data.pricing, selectedCurrency);
                });
            })
            .catch(error => {
                console.error('Error loading pricing data:', error);
                Object.values(priceCardsContainers).forEach(container => {
                    if(container) {
                        container.innerHTML = '<p>Error loading pricing. Please try again later.</p>';
                    }
                });
            });
    }
    
    function displayPricing(pricingData, currency) {
        // Get current language
        const currentLang = document.getElementById('language-selector')?.value || 'en';
        
        // Display currency symbol
        const currencySymbols = {
            'cop': '$',
            'usd': '$',
            'eur': '€',
            'jpy': '¥'
        };
        
        const currencyNames = {
            'cop': {
                'en': 'COP',
                'es': 'COP',
                'ja': 'コロンビアペソ'
            },
            'usd': {
                'en': 'USD',
                'es': 'USD',
                'ja': '米ドル'
            },
            'eur': {
                'en': 'EUR',
                'es': 'EUR',
                'ja': 'ユーロ'
            },
            'jpy': {
                'en': 'JPY',
                'es': 'JPY',
                'ja': '日本円'
            }
        };
        
        // Update currency display
        document.querySelectorAll('.currency-display').forEach(element => {
            element.textContent = currencyNames[currency][currentLang];
        });
        
        // Display each pricing category
        Object.keys(pricingData).forEach(category => {
            if(priceCardsContainers[category]) {
                priceCardsContainers[category].innerHTML = '';
                
                pricingData[category].forEach(plan => {
                    const planCard = document.createElement('div');
                    planCard.className = 'price-card';
                    
                    planCard.innerHTML = `
                        <h3>${plan.title[currentLang] || plan.title.en}</h3>
                        <p class="description">${plan.description[currentLang] || plan.description.en}</p>
                        <div class="price">
                            <span class="currency">${currencySymbols[currency]}</span>
                            <span class="amount">${plan[currency]}</span>
                            <span class="period">/${currentLang === 'es' ? 'mes' : currentLang === 'ja' ? '月' : 'month'}</span>
                        </div>
                        <ul class="features">
                            ${plan.features.map(feature => `
                                <li>${feature[currentLang] || feature.en}</li>
                            `).join('')}
                        </ul>
                        <a href="contact.html" class="btn btn-primary">
                            ${currentLang === 'es' ? 'Registrarse' : currentLang === 'ja' ? '登録する' : 'Sign Up'}
                        </a>
                    `;
                    
                    priceCardsContainers[category].appendChild(planCard);
                });
            }
        });
    }
});