const fs = require('fs');
const path = require('path');

const dashboardDir = __dirname;

// HTML files to protect (exclude login.html)
const htmlFiles = [
    'analytics.html',
    'audience-segmentation.html',
    'bento.html',
    'channels-management.html',
    'compliance-visual.html',
    'digital-ads-redesign.html',
    'digital-ads.html',
    // 'elegant-bento.html', // Already done
    'email-marketing.html',
    'feedback.html',
    'index.html',
    'insights.html',
    'internal-comms.html',
    'moderation.html',
    'premium-bento.html',
    'reports.html',
    'research-files.html',
    'settings.html',
    'sidebar-bento.html',
    'social-posts.html',
    'universities.html'
];

const authScriptTag = `
    <!-- Authentication Guard - Must be first! -->
    <script src="auth.js"></script>
`;

let successCount = 0;
let skippedCount = 0;

htmlFiles.forEach(filename => {
    const filePath = path.join(dashboardDir, filename);

    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipped ${filename} (file not found)`);
        skippedCount++;
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Check if auth script is already added
    if (content.includes('auth.js')) {
        console.log(`✓ ${filename} (already protected)`);
        skippedCount++;
        return;
    }

    // Find the <head> tag and insert auth script right after
    const headRegex = /(<head[^>]*>)/i;

    if (headRegex.test(content)) {
        content = content.replace(headRegex, `$1${authScriptTag}`);

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Protected ${filename}`);
        successCount++;
    } else {
        console.log(`❌ Failed to protect ${filename} (no <head> tag found)`);
    }
});

console.log(`\n📊 Summary:`);
console.log(`   Protected: ${successCount} files`);
console.log(`   Skipped: ${skippedCount} files`);
console.log(`   Total: ${htmlFiles.length} files`);
console.log(`\n🔒 All dashboard pages are now protected!`);
console.log(`   Login at: login.html`);
console.log(`   Credentials: admin / yu2025`);
