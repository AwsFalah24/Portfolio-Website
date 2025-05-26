document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const aboutDropdownBtn = document.getElementById('aboutDropdownBtn');
    const dropdown = document.querySelector('.dropdown');
    const aboutSection = document.querySelector('.about');
    const workSection = document.querySelector('.work-section');
    const projectsSection = document.querySelector('.projects-section');

    // Navigation functionality
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            // Smooth scroll to section
            section.scrollIntoView({ behavior: 'smooth' });
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Dropdown click
    if (aboutDropdownBtn && dropdown) {
        aboutDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });
        document.addEventListener('click', () => {
            dropdown.classList.remove('open');
        });
    }

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to handle scroll animation
    function handleScrollAnimation() {
        const sections = document.querySelectorAll('.about, .projects-section, .work-section');
        
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('fade-in');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);

    // Run once on page load to check for elements already in view
    document.addEventListener('DOMContentLoaded', handleScrollAnimation);
}); 