// Teachers page functionality
document.addEventListener('DOMContentLoaded', function() {
    const teachersContainer = document.getElementById('teachers-container');
    const specialtyFilter = document.getElementById('specialty-filter');
    
    if(teachersContainer) {
        // Load teachers data
        fetch('json/teachers.json')
            .then(response => response.json())
            .then(data => {
                displayTeachers(data.teachers);
                
                // Add event listener for filter changes
                if(specialtyFilter) {
                    specialtyFilter.addEventListener('change', function() {
                        const selectedSpecialty = this.value;
                        filterTeachers(data.teachers, selectedSpecialty);
                    });
                }
            })
            .catch(error => {
                console.error('Error loading teachers data:', error);
                teachersContainer.innerHTML = '<p>Error loading teachers. Please try again later.</p>';
            });
    }
    
    function displayTeachers(teachers) {
        teachersContainer.innerHTML = '';
        
        teachers.forEach(teacher => {
            const teacherCard = document.createElement('div');
            teacherCard.className = 'teacher-card';
            
            // Get current language
            const currentLang = document.getElementById('language-selector')?.value || 'en';
            
            teacherCard.innerHTML = `
                <div class="teacher-image">
                    <img src="images/${teacher.image}" alt="${teacher.name}">
                </div>
                <div class="teacher-info">
                    <h3>${teacher.name}</h3>
                    <div class="specialties">
                        ${teacher.specialty.map(spec => `<span class="specialty">${getSpecialtyName(spec, currentLang)}</span>`).join('')}
                    </div>
                    <p class="bio">${teacher.bio[currentLang] || teacher.bio.en}</p>
                    <div class="certifications">
                        <h4>${currentLang === 'es' ? 'Certificaciones' : currentLang === 'ja' ? '資格' : 'Certifications'}</h4>
                        <ul>
                            ${teacher.certifications.map(cert => `<li>${cert}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            
            teachersContainer.appendChild(teacherCard);
        });
    }
    
    function filterTeachers(teachers, specialty) {
        if(specialty === 'all') {
            displayTeachers(teachers);
            return;
        }
        
        const filteredTeachers = teachers.filter(teacher => 
            teacher.specialty.includes(specialty)
        );
        
        displayTeachers(filteredTeachers);
    }
    
    function getSpecialtyName(specialty, lang) {
        const specialties = {
            'business': {
                'en': 'Business English',
                'es': 'Inglés de Negocios',
                'ja': 'ビジネス英語'
            },
            'exam': {
                'en': 'Exam Prep',
                'es': 'Preparación de Exámenes',
                'ja': '試験準備'
            },
            'conversation': {
                'en': 'Conversation',
                'es': 'Conversación',
                'ja': '会話'
            },
            'kids': {
                'en': 'Kids & Teens',
                'es': 'Niños y Adolescentes',
                'ja': '子供とティーン'
            }
        };
        
        return specialties[specialty][lang] || specialties[specialty]['en'];
    }
});