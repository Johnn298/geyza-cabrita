// ============================================================
// Main JavaScript for Beauty Salon Website
// Handles accordion interactions and dynamic content
// ============================================================

// Initialize accordion on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAccordion();
});

// Initialize accordion with services data
function initializeAccordion() {
    const accordion = document.getElementById('accordion');
    
    servicesData.forEach((category, index) => {
        const item = createAccordionItem(category, index);
        accordion.appendChild(item);
    });
}

// Create accordion item HTML
function createAccordionItem(category, index) {
    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.id = `accordion-${category.id}`;
    
    // Create header
    const header = document.createElement('button');
    header.className = 'accordion-header';
    header.innerHTML = `
        <div class="accordion-header-image">
            <img src="${category.exampleImage}" alt="${category.title}">
        </div>
        <div class="accordion-header-content">
            <span class="accordion-label">${category.title}</span>
            <div class="accordion-toggle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </div>
        </div>
    `;
    
    // Create content
    const content = document.createElement('div');
    content.className = 'accordion-content';
    
    // Add image
    const imageDiv = document.createElement('div');
    imageDiv.className = 'accordion-image';
    imageDiv.innerHTML = `<img src="${category.exampleImage}" alt="${category.title}">`;
    content.appendChild(imageDiv);
    
    // Add services list
    const servicesDiv = document.createElement('div');
    servicesDiv.className = 'accordion-services';
    
    category.services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        serviceItem.innerHTML = `
            <div class="service-header">
                <span class="service-name">${service.name}</span>
                <span class="service-price">${service.price}</span>
            </div>
            <p class="service-description">${service.description}</p>
        `;
        servicesDiv.appendChild(serviceItem);
    });
    
    content.appendChild(servicesDiv);
    
    // Add header and content to item
    item.appendChild(header);
    item.appendChild(content);
    
    // Add click event listener
    header.addEventListener('click', function() {
        toggleAccordion(item);
    });
    
    return item;
}

// Toggle accordion item
function toggleAccordion(item) {
    const isOpen = item.classList.contains('open');
    
    // Close all other items
    document.querySelectorAll('.accordion-item').forEach(el => {
        if (el !== item && el.classList.contains('open')) {
            el.classList.remove('open');
        }
    });
    
    // Toggle current item
    if (isOpen) {
        item.classList.remove('open');
    } else {
        item.classList.add('open');
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add fade-up animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.services, .about, .contact').forEach(section => {
    observer.observe(section);
});
