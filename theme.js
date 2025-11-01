/* ============================================
   YESHIVA UNIVERSITY RESEARCH DASHBOARD
   Theme System & Global Utilities
   ============================================ */

// Theme Management
const ThemeManager = {
    init() {
        // Load saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update toggle UI if exists
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.setAttribute('data-theme', theme);
        }
    },

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);

        // Show toast notification
        this.showToast(newTheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
    },

    showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.theme-toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast
        const toast = document.createElement('div');
        toast.className = 'theme-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Hide and remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
};

// Sidebar Management
function toggleSidebar() {
    const sidebar = document.getElementById('ios-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});

// Make ThemeManager globally available
window.ThemeManager = ThemeManager;
window.toggleSidebar = toggleSidebar;
