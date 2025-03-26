document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const formMessage = document.getElementById('form-message');
    const buttonText = form.querySelector('.button-text');
    const loadingSpinner = form.querySelector('.loading-spinner');
    
    // Show loading state
    buttonText.style.display = 'none';
    loadingSpinner.style.display = 'inline-block';
    
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
    })
    .then(response => response.json())
    .then(data => {
        formMessage.textContent = data.message;
        formMessage.style.color = data.status === 'success' ? '#4CAF50' : '#f44336';
        
        if (data.status === 'success') {
            form.reset();
        }
    })
    .catch(error => {
        formMessage.textContent = 'An error occurred. Please try again.';
        formMessage.style.color = '#f44336';
    })
    .finally(() => {
        // Hide loading state
        buttonText.style.display = 'inline-block';
        loadingSpinner.style.display = 'none';
    });
});

// Reveal elements on scroll
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 150) {
            section.classList.add('active');
        }
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add reveal class to all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });
    
    // Apply project card transitions
    document.querySelectorAll('.details-container.color-container').forEach(card => {
        card.classList.add('project-card-transition');
    });
    
    // Add typing animation to the title
    const title = document.querySelector('#profile .title');
    if (title) {
        title.classList.add('typing-animation');
    }
    
    // Reveal elements as user scrolls
    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger initial reveal
    setTimeout(revealOnScroll, 300);
});