const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Backend URL
const BACKEND_URL = 'https://nomassi-1.onrender.com';

// Enable CORS for all routes
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Proxy for scraped images
app.get('/scraped_data/*', async (req, res) => {
    const imagePath = req.path;
    const targetUrl = `${BACKEND_URL}${imagePath}`;

    console.log(`🖼️  Proxying image: ${targetUrl}`);

    try {
        const response = await axios.get(targetUrl, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'YU-Research-Dashboard/1.0'
            }
        });

        res.set('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        console.error(`❌ Error proxying image ${imagePath}:`, error.message);
        res.status(404).send('Image not found');
    }
});

// Proxy for /api/files/* (images from backend)
app.get('/api/files/*', async (req, res) => {
    const filePath = req.path;
    const targetUrl = `${BACKEND_URL}${filePath}`;

    console.log(`📁 Proxying file: ${targetUrl}`);

    try {
        const response = await axios.get(targetUrl, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'YU-Research-Dashboard/1.0'
            }
        });

        res.set('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        console.error(`❌ Error proxying file ${filePath}:`, error.message);
        res.status(404).send('File not found');
    }
});

// API Proxy routes to avoid CORS issues (JSON data)
app.get('/api/*', async (req, res) => {
    const apiPath = req.path;
    const targetUrl = `${BACKEND_URL}${apiPath}`;

    console.log(`📡 Proxying API: ${targetUrl}`);

    try {
        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'YU-Research-Dashboard/1.0'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(`❌ Error proxying ${apiPath}:`, error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch data from backend',
            message: error.message
        });
    }
});

// Root route - redirect to login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Start server
app.listen(PORT, () => {
    console.log('\n🎉 YU Research Dashboard Server Started!\n');
    console.log(`📱 Dashboard: http://localhost:${PORT}/elegant-bento.html`);
    console.log(`📊 Social Posts: http://localhost:${PORT}/social-posts.html`);
    console.log(`\n✨ Backend proxy: http://localhost:${PORT}/api/*`);
    console.log(`🔗 Proxying to: ${BACKEND_URL}\n`);
    console.log('Press Ctrl+C to stop the server\n');
});
