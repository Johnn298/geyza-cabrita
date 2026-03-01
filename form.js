/**
 * ============================================================
 * LUMIÈRE BEAUTY STUDIO — Main JavaScript
 * script.js
 * ============================================================
 *
 * Sections:
 *  1. Service Data (categories and specific services)
 *  2. DOM References
 *  3. Header Scroll Behaviour
 *  4. Mobile Navigation Toggle
 *  5. Dynamic Service Selector
 *  6. Form Validation Helpers
 *  7. Booking Form Submission (FormSpree)
 *  8. Scroll-Reveal Animation
 *  9. Footer Year
 * 10. Initialisation
 * ============================================================
 */

'use strict';

/* ============================================================
   1. SERVICE DATA
   ============================================================
   To add or edit services:
   - Add a new key to SERVICES matching the <option value="...">
     in the serviceCategory <select> in index.html.
   - Each key maps to an array of service name strings.
   ============================================================ */
const SERVICES = {
  manicure: [
    'Classic Manicure',
    'Gel Manicure',
    'Acrylic Extensions',
    'Nail Art Design',
    'French Manicure',
    'Nail Repair',
  ],
  pedicure: [
    'Classic Pedicure',
    'Spa Pedicure',
    'Gel Pedicure',
    'Exfoliating Treatment',
    'Paraffin Pedicure',
    'Medical Pedicure',
  ],
  lashes: [
    'Classic Lash Extensions',
    'Volume Lash Extensions',
    'Hybrid Lashes',
    'Mega Volume Lashes',
    'Lash Lift & Tint',
    'Lash Removal',
  ],
  brows: [
    'Brow Shaping & Waxing',
    'Brow Tinting',
    'Brow Lamination',
    'Microblading',
    'Henna Brows',
    'Brow Mapping & Design',
  ],
  waxing: [
    'Full Leg Wax',
    'Half Leg Wax',
    'Bikini Wax',
    'Brazilian Wax',
    'Underarm Wax',
    'Facial Wax',
    'Full Body Wax',
  ],
  makeup: [
    'Natural Day Makeup',
    'Evening Glam',
    'Bridal Makeup',
    'Special Event Makeup',
    'Makeup Lesson (1 hour)',
    'Airbrush Makeup',
  ],
};


/* ============================================================
   2. DOM REFERENCES
   ============================================================ */
const header          = document.getElementById('top')?.closest('.site-header') || document.querySelector('.site-header');
const hamburger       = document.getElementById('hamburger');
const mobileMenu      = document.getElementById('mobile-menu');
const mobileLinks     = document.querySelectorAll('.mobile-link, .mobile-cta');
const categorySelect  = document.getElementById('serviceCategory');
const serviceSelect   = document.getElementById('specificService');
const bookingForm     = document.getElementById('booking-form');
const submitBtn       = document.getElementById('submit-btn');
const formSuccess     = document.getElementById('form-success');
const yearSpan        = document.getElementById('year');


/* ============================================================
   3. HEADER SCROLL BEHAVIOUR
   Adds a .scrolled class to the header when the user scrolls
   past 10px, enabling the drop-shadow effect defined in CSS.
   ============================================================ */
function initHeaderScroll() {
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}


/* ============================================================
   4. MOBILE NAVIGATION TOGGLE
   Toggles the mobile drawer open/closed and manages
   aria-expanded / aria-hidden for accessibility.
   ============================================================ */
function initMobileNav() {
  if (!hamburger || !mobileMenu) return;

  const openMenu = () => {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  };

  const closeMenu = () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      hamburger.classList.contains('open') &&
      !header.contains(e.target)
    ) {
      closeMenu();
    }
  });
}


/* ============================================================
   5. DYNAMIC SERVICE SELECTOR
   Populates the specific service <select> based on the chosen
   category. The specific service select is disabled until a
   category is selected.
   ============================================================ */
function populateServices(category) {
  // Clear current options
  serviceSelect.innerHTML = '';

  if (!category || !SERVICES[category]) {
    // Reset to placeholder
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.textContent = 'Select a category first…';
    serviceSelect.appendChild(placeholder);
    serviceSelect.disabled = true;
    return;
  }

  // Add placeholder option
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = 'Choose a service…';
  serviceSelect.appendChild(placeholder);

  // Add service options
  SERVICES[category].forEach(serviceName => {
    const option = document.createElement('option');
    option.value = serviceName.toLowerCase().replace(/\s+/g, '-');
    option.textContent = serviceName;
    serviceSelect.appendChild(option);
  });

  serviceSelect.disabled = false;
}

function initServiceSelector() {
  if (!categorySelect || !serviceSelect) return;

  categorySelect.addEventListener('change', () => {
    const selected = categorySelect.value;
    populateServices(selected);

    // Clear any previous error on the service select
    clearError(serviceSelect, 'specificService-error');
    clearError(categorySelect, 'serviceCategory-error');
  });
}


/* ============================================================
   6. FORM VALIDATION HELPERS
   ============================================================ */

/**
 * Show an error message for a given field.
 * @param {HTMLElement} field  - The input/select element
 * @param {string}      errorId - The id of the error <span>
 * @param {string}      message - The error text to display
 */
function showError(field, errorId, message) {
  field.classList.add('error');
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.textContent = message;
}

/**
 * Clear the error state for a given field.
 * @param {HTMLElement} field   - The input/select element
 * @param {string}      errorId - The id of the error <span>
 */
function clearError(field, errorId) {
  field.classList.remove('error');
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.textContent = '';
}

/**
 * Validate a single field and return true if valid.
 * @param {HTMLElement} field
 * @returns {boolean}
 */
function validateField(field) {
  const id    = field.id;
  const value = field.value.trim();
  const errorId = `${id}-error`;

  // Required check
  if (field.required && !value) {
    showError(field, errorId, 'This field is required.');
    return false;
  }

  // Email format
  if (id === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showError(field, errorId, 'Please enter a valid email address.');
      return false;
    }
  }

  // Phone — allow digits, spaces, +, -, (, )
  if (id === 'phone' && value) {
    const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    if (!phoneRegex.test(value)) {
      showError(field, errorId, 'Please enter a valid phone number.');
      return false;
    }
  }

  // Specific service — must not be empty
  if (id === 'specificService' && !value) {
    showError(field, errorId, 'Please select a specific service.');
    return false;
  }

  clearError(field, errorId);
  return true;
}

/**
 * Validate all required form fields.
 * @returns {boolean} true if all fields are valid
 */
function validateForm() {
  const fields = [
    document.getElementById('fullName'),
    document.getElementById('email'),
    document.getElementById('phone'),
    document.getElementById('serviceCategory'),
    document.getElementById('specificService'),
  ];

  let isValid = true;

  fields.forEach(field => {
    if (field && !validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

/**
 * Attach real-time validation on blur for each required field.
 */
function initRealTimeValidation() {
  const fields = bookingForm
    ? bookingForm.querySelectorAll('input[required], select[required]')
    : [];

  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        validateField(field);
      }
    });
  });
}


/* ============================================================
   7. BOOKING FORM SUBMISSION (FORMSPREE)
   Submits the form data to FormSpree via fetch (AJAX).
   On success, hides the form and shows the success message.
   On error, displays a generic error message.

   To configure FormSpree:
   1. Create a free account at https://formspree.io
   2. Create a new form and copy your form ID (e.g., "abcdefgh")
   3. In index.html, replace XXXXXXX in the action attribute:
      action="https://formspree.io/f/XXXXXXX"
      → action="https://formspree.io/f/abcdefgh"
   ============================================================ */
function initFormSubmission() {
  if (!bookingForm) return;

  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Run validation
    if (!validateForm()) {
      // Scroll to first error
      const firstError = bookingForm.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const formData = new FormData(bookingForm);
    const action   = bookingForm.getAttribute('action');

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        // Success — hide form fields, show success message
        bookingForm.querySelectorAll('.form-step, .form-submit').forEach(el => {
          el.style.display = 'none';
        });
        formSuccess.hidden = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        // Server returned an error
        const data = await response.json().catch(() => ({}));
        const msg  = data?.errors?.[0]?.message || 'Something went wrong. Please try again.';
        showSubmitError(msg);
      }
    } catch (err) {
      // Network error
      showSubmitError('Unable to send your booking. Please check your connection and try again.');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

/**
 * Display a submission-level error message below the submit button.
 * @param {string} message
 */
function showSubmitError(message) {
  let errorEl = document.getElementById('submit-error');

  if (!errorEl) {
    errorEl = document.createElement('p');
    errorEl.id = 'submit-error';
    errorEl.setAttribute('role', 'alert');
    errorEl.style.cssText = `
      color: #c0392b;
      font-size: 0.875rem;
      text-align: center;
      margin-top: 0.5rem;
    `;
    submitBtn.parentNode.insertBefore(errorEl, submitBtn.nextSibling);
  }

  errorEl.textContent = message;
}


/* ============================================================
   8. SCROLL-REVEAL ANIMATION
   Adds the .reveal class to target elements and uses
   IntersectionObserver to add .visible when they enter
   the viewport, triggering the CSS fade-in-up transition.
   ============================================================ */
function initScrollReveal() {
  // Elements to animate
  const targets = document.querySelectorAll(
    '.service-card, .about-feature, .sidebar-card, .section-header, .about-content, .about-visual'
  );

  if (!targets.length) return;

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  targets.forEach(el => observer.observe(el));
}


/* ============================================================
   9. FOOTER YEAR
   Automatically updates the copyright year.
   ============================================================ */
function initFooterYear() {
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}


/* ============================================================
   10. INITIALISATION
   Run all modules after the DOM is ready.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initServiceSelector();
  initRealTimeValidation();
  initFormSubmission();
  initScrollReveal();
  initFooterYear();
});
