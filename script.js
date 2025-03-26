document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('form-message');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const buttonText = document.querySelector('.button-text');
    
    // Show loading state
    loadingSpinner.style.display = 'inline-block';
    buttonText.style.display = 'none';
    
    try {
        const response = await fetch('/send_mail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            })
        });
        
        const data = await response.json();
        
        formMessage.textContent = data.message;
        formMessage.style.color = data.success ? 'green' : 'red';
        
        if (data.success) {
            this.reset();
        }
    } catch (error) {
        formMessage.textContent = 'An error occurred. Please try again later.';
        formMessage.style.color = 'red';
    } finally {
        // Hide loading state
        loadingSpinner.style.display = 'none';
        buttonText.style.display = 'inline-block';
    }
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