// Secure Netlify Identity Configuration
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    // Force HTTPS for authentication
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      window.location.protocol = 'https:';
      return;
    }

    // Auto-redirect to admin on login
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        // Add random delay to prevent timing attacks
        const randomDelay = Math.floor(Math.random() * 1000) + 500;
        setTimeout(() => {
          document.location.href = "/admin/";
        }, randomDelay);
      });
    }
  });

  // Security enhancements for Netlify Identity
  window.netlifyIdentity.on("login", user => {
    // Set secure session cookie
    document.cookie = "nf_session=true; Secure; SameSite=Strict; Path=/";
    
    // Clear URL parameters to prevent information leakage
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  });

  window.netlifyIdentity.on("logout", () => {
    // Clear all authentication cookies on logout
    document.cookie = "nf_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "nf_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Redirect to home page
    window.location.href = "/";
  });

  // Additional security measures
  window.netlifyIdentity.on("error", err => {
    console.error("Authentication error:", err);
    // Clear sensitive data on error
    window.localStorage.removeItem("netlify-cms-user");
    window.localStorage.removeItem("netlify-cms-api");
  });

  // Implement session timeout
  let sessionTimeout;
  const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

  function resetSessionTimer() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
      window.netlifyIdentity.logout();
    }, SESSION_DURATION);
  }

  // Reset timer on user activity
  ["mousemove", "keypress", "click", "scroll"].forEach(event => {
    document.addEventListener(event, resetSessionTimer, false);
  });

  // Initialize session timer
  resetSessionTimer();
} 