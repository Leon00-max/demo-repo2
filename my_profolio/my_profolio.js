// Slideshow functionality
let slideIndex = 1;
let slideInterval;

// Initialize slideshow
function initSlideshow() {
    showSlides(slideIndex);
    // Auto-advance slides every 5 seconds
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Next/previous controls
function changeSlide(n) {
    showSlides(slideIndex += n);
    // Reset the timer when manually changed
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
    // Reset the timer when manually changed
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    slides[slideIndex-1].style.display = "flex";  
    dots[slideIndex-1].className += " active-dot";
}

// Document Ready Functions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slideshow
    initSlideshow();

    // Show modal when button is clicked
    document.getElementById('show-projects-btn').addEventListener('click', function() {
        document.getElementById('name-modal').style.display = 'flex';
    });

    // Close modal when X is clicked
    document.querySelector('.close-btn').addEventListener('click', function() {
        document.getElementById('name-modal').style.display = 'none';
    });

    // Submit name and show projects
    document.getElementById('submit-name').addEventListener('click', function() {
        const visitorName = document.getElementById('visitor-name').value;
        if (visitorName.trim() !== '') {
            // Hide modal
            document.getElementById('name-modal').style.display = 'none';
            
            // Show welcome message with visitor's name
            alert(`Welcome, ${visitorName}! Here are some of my projects.`);
            
            // Add more project cards
            const projectsContainer = document.getElementById('projects-container');
            
            const projects = [
                {
                    title: 'E-commerce Website',
                    description: 'A fully responsive e-commerce website with product filtering, cart functionality, and user authentication.',
                    tech: 'Technologies Used: HTML, CSS, JavaScript, React',
                    link: '#'
                },
                {
                    title: 'Weather App',
                    description: 'A weather application that provides real-time weather updates based on location.',
                    tech: 'Technologies Used: HTML, CSS, JavaScript, API Integration',
                    link: '#'
                },
                {
                    title: 'Task Manager',
                    description: 'A task management application to help users organize their daily activities.',
                    tech: 'Technologies Used: HTML, CSS, JavaScript, Local Storage',
                    link: '#'
                }
            ];
            
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <p class="tech-used">${project.tech}</p>
                    <a href="${project.link}" class="project-link">View Project</a>
                `;
                projectsContainer.appendChild(projectCard);
            });
            
            // Hide the button after showing all projects
            document.getElementById('show-projects-btn').style.display = 'none';
        }
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('name-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
