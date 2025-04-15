// Courses page functionality
document.addEventListener('DOMContentLoaded', function() {
    const coursesContainer = document.getElementById('courses-container');
    const levelFilter = document.getElementById('level-filter');
    const typeFilter = document.getElementById('type-filter');
    
    if(coursesContainer) {
        // Load courses data
        fetch('json/courses.json')
            .then(response => response.json())
            .then(data => {
                displayCourses(data.courses);
                
                // Add event listeners for filter changes
                if(levelFilter) {
                    levelFilter.addEventListener('change', function() {
                        applyFilters(data.courses);
                    });
                }
                
                if(typeFilter) {
                    typeFilter.addEventListener('change', function() {
                        applyFilters(data.courses);
                    });
                }
            })
            .catch(error => {
                console.error('Error loading courses data:', error);
                coursesContainer.innerHTML = '<p>Error loading courses. Please try again later.</p>';
            });
    }
    
    function displayCourses(courses) {
        coursesContainer.innerHTML = '';
        
        // Get current language
        const currentLang = document.getElementById('language-selector')?.value || 'en';
        
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            
            courseCard.innerHTML = `
                <div class="course-header">
                    <h3>${course.title[currentLang] || course.title.en}</h3>
                    <span class="level ${course.level}">
                        ${getLevelName(course.level, currentLang)}
                    </span>
                </div>
                <div class="course-body">
                    <p class="description">${course.description[currentLang] || course.description.en}</p>
                    <div class="course-meta">
                        <div class="meta-item">
                            <i class="far fa-clock"></i>
                            <span>${course.duration}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-chalkboard-teacher"></i>
                            <span>${course.hours}</span>
                        </div>
                    </div>
                </div>
                <div class="course-footer">
                    <a href="contact.html" class="btn btn-secondary">
                        ${currentLang === 'es' ? 'Más Información' : currentLang === 'ja' ? '詳細情報' : 'More Info'}
                    </a>
                </div>
            `;
            
            coursesContainer.appendChild(courseCard);
        });
    }
    
    function applyFilters(courses) {
        const selectedLevel = levelFilter.value;
        const selectedType = typeFilter.value;
        
        let filteredCourses = courses;
        
        if(selectedLevel !== 'all') {
            filteredCourses = filteredCourses.filter(course => course.level === selectedLevel);
        }
        
        if(selectedType !== 'all') {
            filteredCourses = filteredCourses.filter(course => course.type === selectedType);
        }
        
        displayCourses(filteredCourses);
    }
    
    function getLevelName(level, lang) {
        const levels = {
            'beginner': {
                'en': 'Beginner',
                'es': 'Principiante',
                'ja': '初心者'
            },
            'intermediate': {
                'en': 'Intermediate',
                'es': 'Intermedio',
                'ja': '中級'
            },
            'advanced': {
                'en': 'Advanced',
                'es': 'Avanzado',
                'ja': '上級'
            }
        };
        
        return levels[level][lang] || levels[level]['en'];
    }
});