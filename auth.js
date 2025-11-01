// Authentication Guard for YU Intelligence Dashboard
// This script must be loaded FIRST in protected pages

(function() {
    'use strict';

    // Check if we're on the login page
    const isLoginPage = window.location.pathname.includes('login.html');
    
    if (isLoginPage) {
        // If already authenticated, redirect to dashboard
        const token = localStorage.getItem('yu_auth_token');
        if (token && isValidToken(token)) {
            window.location.replace('elegant-bento.html');
        }
        return;
    }

    // For all other pages, check authentication
    const token = localStorage.getItem('yu_auth_token');
    
    if (!token || !isValidToken(token)) {
        // Not authenticated or token expired, redirect to login
        localStorage.removeItem('yu_auth_token');
        localStorage.removeItem('yu_user');
        window.location.replace('login.html');
    }

    function isValidToken(token) {
        try {
            const decoded = JSON.parse(atob(token));
            const now = Date.now();
            
            // Check if token has expired (24 hours)
            if (decoded.expires && decoded.expires < now) {
                return false;
            }
            
            return true;
        } catch (e) {
            return false;
        }
    }

    // Add logout functionality globally
    window.logout = function() {
        if (confirm('Are you sure you want to sign out?')) {
            localStorage.removeItem('yu_auth_token');
            localStorage.removeItem('yu_user');
            window.location.replace('login.html');
        }
    };

    // Display current user
    window.getCurrentUser = function() {
        return localStorage.getItem('yu_user') || 'Guest';
    };

    // Extend session on activity
    let activityTimeout;
    function extendSession() {
        clearTimeout(activityTimeout);
        
        activityTimeout = setTimeout(() => {
            const token = localStorage.getItem('yu_auth_token');
            if (token) {
                try {
                    const decoded = JSON.parse(atob(token));
                    decoded.expires = Date.now() + (24 * 60 * 60 * 1000); // Extend 24 hours
                    localStorage.setItem('yu_auth_token', btoa(JSON.stringify(decoded)));
                } catch (e) {
                    console.error('Failed to extend session');
                }
            }
        }, 5 * 60 * 1000); // Extend after 5 minutes of activity
    }

    // Listen for user activity
    ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, extendSession, { passive: true });
    });

    console.log('✓ Auth guard active - User:', getCurrentUser());
})();
