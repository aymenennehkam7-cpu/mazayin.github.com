/* ============================================
   RESERVATIONS.JS - Form Validation & Handling
   Complete form validation and submission
   ============================================ */

// ===== STRICT MODE =====
'use strict';

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initReservationForm();
    initNewsletterForm();
    initDatePicker();
});

// ===== RESERVATION FORM INITIALIZATION =====
function initReservationForm() {
    const form = document.getElementById('reservationForm');
    
    if (!form) return;
    
    // Form fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const guestsSelect = document.getElementById('guests');
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    const messageTextarea = document.getElementById('message');
    
    // Real-time validation
    if (nameInput) nameInput.addEventListener('blur', () => validateName(nameInput));
    if (emailInput) emailInput.addEventListener('blur', () => validateEmail(emailInput));
    if (phoneInput) phoneInput.addEventListener('blur', () => validatePhone(phoneInput));
    if (guestsSelect) guestsSelect.addEventListener('change', () => validateSelect(guestsSelect, 'guests'));
    if (dateInput) dateInput.addEventListener('change', () => validateDate(dateInput));
    if (timeSelect) timeSelect.addEventListener('change', () => validateSelect(timeSelect, 'time'));
    
    // Form submission
    form.addEventListener('submit', handleFormSubmission);
}

// ===== FORM SUBMISSION HANDLER =====
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate all fields
    const isValid = validateForm(form);
    
    if (!isValid) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    setFormLoading(form, true);
    
    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        // Success simulation
        handleFormSuccess(form, formData);
        
        // Error simulation - uncomment to test
        // handleFormError(form, 'Unable to process reservation. Please try again.');
    }, 2000);
}

// ===== FORM SUCCESS HANDLER =====
function handleFormSuccess(form, formData) {
    setFormLoading(form, false);
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message show';
    successMessage.innerHTML = `
        <h3>✓ Reservation Confirmed!</h3>
        <p>Thank you, ${formData.get('name')}! Your reservation for ${formData.get('guests')} on ${formatDate(formData.get('date'))} at ${formData.get('time')} has been received.</p>
        <p>We'll send a confirmation email to ${formData.get('email')} shortly.</p>
    `;
    
    // Insert success message
    form.insertAdjacentElement('beforebegin', successMessage);
    
    // Hide form
    form.style.display = 'none';
    
    // Reset form after delay
    setTimeout(() => {
        form.reset();
        form.style.display = 'flex';
        successMessage.remove();
    }, 10000);
    
    // Show notification
    showNotification('Reservation confirmed successfully!', 'success');
    
    // Track event (for analytics)
    trackReservation(formData);
}

// ===== FORM ERROR HANDLER =====
function handleFormError(form, errorMessage) {
    setFormLoading(form, false);
    showNotification(errorMessage, 'error');
}

// ===== SET FORM LOADING STATE =====
function setFormLoading(form, isLoading) {
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (isLoading) {
        form.classList.add('loading');
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';
    } else {
        form.classList.remove('loading');
        submitButton.disabled = false;
        submitButton.textContent = 'Confirm Reservation';
    }
}

// ===== FORM VALIDATION =====
function validateForm(form) {
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const phoneInput = form.querySelector('#phone');
    const guestsSelect = form.querySelector('#guests');
    const dateInput = form.querySelector('#date');
    const timeSelect = form.querySelector('#time');
    
    let isValid = true;
    
    if (!validateName(nameInput)) isValid = false;
    if (!validateEmail(emailInput)) isValid = false;
    if (!validatePhone(phoneInput)) isValid = false;
    if (!validateSelect(guestsSelect, 'guests')) isValid = false;
    if (!validateDate(dateInput)) isValid = false;
    if (!validateSelect(timeSelect, 'time')) isValid = false;
    
    return isValid;
}

// ===== NAME VALIDATION =====
function validateName(input) {
    const value = input.value.trim();
    const formGroup = input.closest('.form-group');
    
    if (value === '') {
        setFieldError(formGroup, 'Name is required');
        return false;
    }
    
    if (value.length < 2) {
        setFieldError(formGroup, 'Name must be at least 2 characters');
        return false;
    }
    
    if (!/^[a-zA-Z\s'-]+$/.test(value)) {
        setFieldError(formGroup, 'Name can only contain letters');
        return false;
    }
    
    setFieldSuccess(formGroup);
    return true;
}

// ===== EMAIL VALIDATION =====
function validateEmail(input) {
    const value = input.value.trim();
    const formGroup = input.closest('.form-group');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === '') {
        setFieldError(formGroup, 'Email is required');
        return false;
    }
    
    if (!emailRegex.test(value)) {
        setFieldError(formGroup, 'Please enter a valid email address');
        return false;
    }
    
    setFieldSuccess(formGroup);
    return true;
}

// ===== PHONE VALIDATION =====
function validatePhone(input) {
    const value = input.value.trim();
    const formGroup = input.closest('.form-group');
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    
    if (value === '') {
        setFieldError(formGroup, 'Phone number is required');
        return false;
    }
    
    if (!phoneRegex.test(value)) {
        setFieldError(formGroup, 'Please enter a valid phone number');
        return false;
    }
    
    if (value.replace(/\D/g, '').length < 10) {
        setFieldError(formGroup, 'Phone number must be at least 10 digits');
        return false;
    }
    
    setFieldSuccess(formGroup);
    return true;
}

// ===== SELECT VALIDATION =====
function validateSelect(select, fieldName) {
    const value = select.value;
    const formGroup = select.closest('.form-group');
    
    if (value === '') {
        setFieldError(formGroup, `Please select ${fieldName}`);
        return false;
    }
    
    setFieldSuccess(formGroup);
    return true;
}

// ===== DATE VALIDATION =====
function validateDate(input) {
    const value = input.value;
    const formGroup = input.closest('.form-group');
    
    if (value === '') {
        setFieldError(formGroup, 'Date is required');
        return false;
    }
    
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        setFieldError(formGroup, 'Please select a future date');
        return false;
    }
    
    // Check if it's a Monday (restaurant is closed)
    if (selectedDate.getDay() === 1) {
        setFieldError(formGroup, 'We are closed on Mondays');
        return false;
    }
    
    // Maximum 90 days in advance
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90);
    
    if (selectedDate > maxDate) {
        setFieldError(formGroup, 'Reservations can only be made up to 90 days in advance');
        return false;
    }
    
    setFieldSuccess(formGroup);
    return true;
}

// ===== SET FIELD ERROR =====
function setFieldError(formGroup, message) {
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.form-error');
    
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'form-error';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// ===== SET FIELD SUCCESS =====
function setFieldSuccess(formGroup) {
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    
    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== DATE PICKER INITIALIZATION =====
function initDatePicker() {
    const dateInput = document.getElementById('date');
    
    if (!dateInput) return;
    
    // Set minimum date to today
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    dateInput.setAttribute('min', minDate);
    
    // Set maximum date to 90 days from now
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90);
    dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const form = document.querySelector('.footer__newsletter-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = form.querySelector('.footer__newsletter-input');
        const email = emailInput.value.trim();
        
        if (!validateEmailString(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        const submitButton = form.querySelector('.footer__newsletter-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Subscribing...';
        
        // Simulate API call
        setTimeout(() => {
            submitButton.textContent = 'Subscribe';
            submitButton.disabled = false;
            emailInput.value = '';
            showNotification('Successfully subscribed to our newsletter!', 'success');
        }, 1500);
    });
}

// ===== EMAIL STRING VALIDATION =====
function validateEmailString(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <span class="notification__icon">${getNotificationIcon(type)}</span>
        <span class="notification__message">${message}</span>
        <button class="notification__close" aria-label="Close notification">×</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#059669' : type === 'error' ? '#DC2626' : '#3B82F6'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    const closeButton = notification.querySelector('.notification__close');
    closeButton.style.cssText = `
        background: transparent;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        margin-left: 12px;
    `;
    
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== GET NOTIFICATION ICON =====
function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    return icons[type] || icons.info;
}

// ===== FORMAT DATE =====
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ===== TRACK RESERVATION (Analytics) =====
function trackReservation(formData) {
    // Example: Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'reservation_submitted', {
            guests: formData.get('guests'),
            date: formData.get('date'),
            time: formData.get('time')
        });
    }
    
    // Example: Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Schedule', {
            content_name: 'Restaurant Reservation',
            content_category: 'Booking'
        });
    }
    
    console.log('Reservation tracked:', Object.fromEntries(formData));
}

// ===== PHONE NUMBER FORMATTER =====
function formatPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
        formattedValue = '+' + value.substring(0, 3);
    }
    if (value.length >= 4) {
        formattedValue += ' ' + value.substring(3, 6);
    }
    if (value.length >= 7) {
        formattedValue += ' ' + value.substring(6, 9);
    }
    if (value.length >= 10) {
        formattedValue += ' ' + value.substring(9, 12);
    }
    
    input.value = formattedValue;
}

// ===== AUTO-FORMAT PHONE ON INPUT =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        formatPhoneNumber(this);
    });
}

// ===== PREVENT PAST DATES IN DATE PICKER =====
window.addEventListener('load', function() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.addEventListener('keydown', function(e) {
            e.preventDefault();
        });
    }
});

// ===== ADD ANIMATION STYLES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification__close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// ===== CONSOLE LOG: RESERVATIONS LOADED =====
console.log('%c📅 Mazayin Restaurant - Reservations System Loaded', 'color: #059669; font-size: 14px; font-weight: bold;');

// ===== EXPORT FOR MODULE USE (Optional) =====
// Uncomment if using ES6 modules
/*
export {
    initReservationForm,
    validateForm,
    validateEmail,
    validatePhone,
    showNotification,
    formatDate
};
*/