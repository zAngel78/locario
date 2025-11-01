// Script temporal para actualizar los sidebars
// Este script no se ejecutará, solo documenta los cambios necesarios

const sidebarCorrect = `    <div class="sidebar-overlay" id="sidebar-overlay"></div>

    <aside class="ios-sidebar" id="ios-sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <div class="logo-icon">
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                        <path d="M16 8L10 12L16 16L22 12L16 8Z" stroke="white" stroke-width="1.5"/>
                        <path d="M10 20L16 24L22 20" stroke="white" stroke-width="1.5"/>
                        <path d="M10 16L16 20L22 16" stroke="white" stroke-width="1.5"/>
                    </svg>
                </div>
                <div class="logo-text">
                    <h1>Yeshiva University</h1>
                    <p>Research Intelligence</p>
                </div>
            </div>
        </div>

        <nav class="sidebar-nav">
            <div class="nav-section">
                <div class="nav-section-label">Overview</div>
                <a href="elegant-bento.html" class="sidebar-nav-item">Dashboard</a>
                <a href="analytics.html" class="sidebar-nav-item">Analytics</a>
            </div>

            <div class="nav-section">
                <div class="nav-section-label">Channels</div>
                <a href="social-posts.html" class="sidebar-nav-item">
                    <span>Social Media</span>
                    <div class="nav-item-badge">0</div>
                </a>
                <a href="email-marketing.html" class="sidebar-nav-item">
                    <span>Email Marketing</span>
                    <div class="nav-item-badge">8</div>
                </a>
                <a href="digital-ads.html" class="sidebar-nav-item">
                    <span>Digital Ads</span>
                    <div class="nav-item-badge">19</div>
                </a>
            </div>

            <div class="nav-section">
                <div class="nav-section-label">Research</div>
                <a href="universities.html" class="sidebar-nav-item">Universities</a>
                <a href="research-files.html" class="sidebar-nav-item">Files</a>
                <a href="reports.html" class="sidebar-nav-item">Reports</a>
                <a href="settings.html" class="sidebar-nav-item">Settings</a>
            </div>
        </nav>

        <div class="sidebar-footer">
            <div class="sidebar-status">
                <div class="status-dot"></div>
                <div class="status-text">Connected</div>
            </div>
            <button class="btn-export">Export Data</button>
        </div>
    </aside>`;

console.log('Sidebar correcto listo para copiar');
