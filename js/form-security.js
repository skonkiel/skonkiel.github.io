// Form Security Module
(() => {
  // CSRF token management
  const generateCSRFToken = () => {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  // Store CSRF token in a secure httpOnly cookie
  const setCSRFToken = () => {
    const token = generateCSRFToken();
    document.cookie = `XSRF-TOKEN=${token}; path=/; SameSite=Strict; Secure`;
    return token;
  };

  // Input sanitization
  const sanitizeInput = (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  };

  // Rate limiting using localStorage
  const isRateLimited = (formId, maxAttempts = 5, timeWindowMs = 60000) => {
    const now = Date.now();
    const attempts = JSON.parse(localStorage.getItem(`${formId}_attempts`) || '[]');
    
    // Remove old attempts
    const recentAttempts = attempts.filter(timestamp => now - timestamp < timeWindowMs);
    
    if (recentAttempts.length >= maxAttempts) {
      return true;
    }
    
    // Add new attempt
    recentAttempts.push(now);
    localStorage.setItem(`${formId}_attempts`, JSON.stringify(recentAttempts));
    return false;
  };

  // Form validation patterns
  const validationPatterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    url: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
    search: /^[^<>{}]*$/
  };

  // Initialize form security
  const initFormSecurity = (formElement) => {
    if (!formElement) return;

    const formId = formElement.id || 'default_form';
    
    // Add CSRF token to form
    const csrfToken = setCSRFToken();
    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = '_csrf';
    csrfInput.value = csrfToken;
    formElement.appendChild(csrfInput);

    // Add form submission handler
    formElement.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Check rate limiting
      if (isRateLimited(formId)) {
        console.error('Rate limit exceeded. Please try again later.');
        return;
      }

      // Validate and sanitize all inputs
      const formData = new FormData(formElement);
      let isValid = true;
      const sanitizedData = {};

      for (const [key, value] of formData.entries()) {
        // Skip CSRF token
        if (key === '_csrf') {
          sanitizedData[key] = value;
          continue;
        }

        // Sanitize input
        const sanitizedValue = sanitizeInput(value);
        
        // Validate based on input type
        const inputElement = formElement.elements[key];
        const inputType = inputElement.dataset.validationType || inputElement.type;
        
        if (validationPatterns[inputType] && !validationPatterns[inputType].test(sanitizedValue)) {
          console.error(`Invalid ${inputType} format for ${key}`);
          isValid = false;
          break;
        }

        sanitizedData[key] = sanitizedValue;
      }

      if (!isValid) {
        return;
      }

      try {
        // Add security headers
        const headers = {
          'X-CSRF-Token': csrfToken,
          'Content-Type': 'application/json'
        };

        // Submit the form
        const response = await fetch(formElement.action, {
          method: formElement.method,
          headers: headers,
          body: JSON.stringify(sanitizedData),
          credentials: 'same-origin'
        });

        if (!response.ok) {
          throw new Error(`Form submission failed: ${response.statusText}`);
        }

        // Clear form on success
        formElement.reset();

      } catch (error) {
        console.error('Form submission error:', error);
      }
    });
  };

  // Initialize all forms on page load
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form').forEach(initFormSecurity);
  });

  // Export for use in other modules
  window.FormSecurity = {
    init: initFormSecurity,
    sanitizeInput: sanitizeInput,
    isRateLimited: isRateLimited
  };
})(); 