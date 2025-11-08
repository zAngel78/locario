const fs = require('fs');
const path = require('path');

// Files to update
const files = [
    'elegant-bento.html',
    'analytics.html',
    'universities.html',
    'social-posts.html',
    'sidebar-bento.html',
    'research-files.html',
    'premium-bento.html',
    'index.html',
    'email-marketing.html',
    'digital-ads.html',
    'digital-ads-redesign.html',
    'bento.html'
];

// Replacement patterns
const replacements = [
    // CSS classes
    {
        old: /\.university-card\.touro::before \{ background: linear-gradient\(90deg, #48BB78 0%, #38A169 100%\); \}/g,
        new: `.university-card.maryland::before { background: linear-gradient(90deg, #DC2626 0%, #B91C1C 100%); }
        .university-card.rutgers::before { background: linear-gradient(90deg, #DC2626 0%, #B91C1C 100%); }`
    },
    {
        old: /\.quick-stat-card\.touro-stat::before \{ background: #38A169; \}/g,
        new: `.quick-stat-card.maryland-stat::before { background: #DC2626; }
        .quick-stat-card.rutgers-stat::before { background: #DC2626; }`
    },
    // Quick stat cards HTML
    {
        old: /<div class="quick-stat-card touro-stat">\s*<div class="quick-stat-label">Touro University<\/div>\s*<div class="quick-stat-value">[\d.]+K<\/div>\s*<\/div>/g,
        new: `<div class="quick-stat-card maryland-stat">
                        <div class="quick-stat-label">Univ. of Maryland</div>
                        <div class="quick-stat-value">58.0K</div>
                    </div>
                    <div class="quick-stat-card rutgers-stat">
                        <div class="quick-stat-label">Rutgers University</div>
                        <div class="quick-stat-value">44.0K</div>
                    </div>`
    },
    // iOS list item for university selector (social-posts.html style)
    {
        old: /<div class="ios-list-item" data-uni="touro" onclick="selectUniversity\('touro'\)">\s*<div class="uni-option">\s*<div class="uni-icon"[^>]*>TO<\/div>\s*<div class="uni-info">\s*<div class="uni-name">Touro University<\/div>\s*<div class="uni-meta">[^<]*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/gs,
        new: `<div class="ios-list-item" data-uni="maryland" onclick="selectUniversity('maryland')">
                    <div class="uni-option">
                        <div class="uni-icon" style="background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);">MD</div>
                        <div class="uni-info">
                            <div class="uni-name">University of Maryland</div>
                            <div class="uni-meta">College Park, MD</div>
                        </div>
                    </div>
                </div>
                <div class="ios-list-item" data-uni="rutgers" onclick="selectUniversity('rutgers')">
                    <div class="uni-option">
                        <div class="uni-icon" style="background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);">RU</div>
                        <div class="uni-info">
                            <div class="uni-name">Rutgers University</div>
                            <div class="uni-meta">New Brunswick, NJ</div>
                        </div>
                    </div>
                </div>`
    },
    // JavaScript university object (social-posts.html style)
    {
        old: /touro:\s*\{\s*name:\s*'Touro University',\s*instagram:\s*'touro',\s*facebook:\s*'touro',\s*twitter:\s*'touro'\s*\}/gs,
        new: `maryland: {
                name: 'University of Maryland',
                instagram: 'university_of_maryland',
                facebook: 'university_of_maryland',
                twitter: 'university_of_maryland'
            },
            rutgers: {
                name: 'Rutgers University',
                instagram: 'rutgers',
                facebook: 'rutgers',
                twitter: 'rutgers'
            }`
    },
    // JavaScript university object (universities.html style)
    {
        old: /touro:\s*\{\s*name:\s*'Touro University',\s*badge:\s*'[^']*',\s*badgeClass:\s*'[^']*',\s*class:\s*'touro',\s*instagram:\s*\d+,\s*engagement:\s*[\d.]+,\s*alumni:\s*\d+,\s*links:\s*\[[^\]]*\]\s*\}/gs,
        new: `maryland: {
                name: 'University of Maryland',
                badge: 'Public Research',
                badgeClass: 'badge-leader',
                class: 'maryland',
                instagram: 58000,
                engagement: 2.1,
                alumni: 377000,
                links: [
                    { text: 'Digital Ads', icon: 'ads', url: 'digital-ads.html#maryland' },
                    { text: 'Website', icon: 'globe', url: 'https://www.umd.edu' }
                ]
            },
            rutgers: {
                name: 'Rutgers University',
                badge: 'Public Research',
                badgeClass: 'badge-leader',
                class: 'rutgers',
                instagram: 44000,
                engagement: 1.9,
                alumni: 500000,
                links: [
                    { text: 'Digital Ads', icon: 'ads', url: 'digital-ads.html#rutgers' },
                    { text: 'Website', icon: 'globe', url: 'https://www.rutgers.edu' }
                ]
            }`
    },
    // Chart data arrays
    {
        old: /\{ name: 'Touro', value: \d+ \}/g,
        new: `{ name: 'UMD', value: 58000 }, { name: 'Rutgers', value: 44000 }`
    },
    // Engagement data
    {
        old: /\{ name: 'Touro', value: [\d.]+ \}/g,
        new: `{ name: 'UMD', value: 2.1 }, { name: 'Rutgers', value: 1.9 }`
    }
];

console.log('🔄 Replacing Touro with University of Maryland and Rutgers...\n');

files.forEach(file => {
    const filePath = path.join(__dirname, file);

    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${file} - file not found`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    replacements.forEach(({ old, new: newText }) => {
        if (content.match(old)) {
            content = content.replace(old, newText);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated ${file}`);
    } else {
        console.log(`⏭️  No changes needed in ${file}`);
    }
});

console.log('\n✨ Replacement complete!');
