# 📱 YU Research Dashboard - iOS Style

Dashboard minimalista estilo iOS para visualizar datos de investigación de Yeshiva University.

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
cd "C:\Users\Angel daniel\Documents\research\dashboard_proposal"
npm install
```

### 2. Iniciar el servidor

```bash
npm start
```

### 3. Abrir en el navegador

**Dashboard Principal:**
```
http://localhost:3001/elegant-bento.html
```

**Social Media Feed:**
```
http://localhost:3001/social-posts.html
```

---

## ✨ Características

### Flow iOS Premium
- ✅ Sidebar con navegación iOS-style
- ✅ Topbar con Segmented Control
- ✅ Haptic feedback en todos los elementos
- ✅ Glassmorphism en sidebar/topbar
- ✅ Badges rojos estilo iOS
- ✅ Sombras sutiles multicapa
- ✅ Animaciones fluidas (cubic-bezier)

### Páginas

#### 📊 Dashboard (`elegant-bento.html`)
- Stats cards con datos reales del backend
- Bento grid con insights
- Channels overview
- Universities network
- Performance metrics
- Research reports

#### 📱 Social Posts (`social-posts.html`)
- Grid de posts con imágenes reales
- Filtros por plataforma (Instagram, Facebook, Twitter)
- Search en tiempo real
- Click para abrir post original
- Estados iOS (loading, empty, error)

### Backend Integration

El servidor hace de **proxy** para evitar errores CORS:

```
Frontend: http://localhost:3001/api/*
    ↓
Proxy: server.js
    ↓
Backend: https://nomassi-1.onrender.com/api/*
```

**Endpoints:**
- `/api/instagram/yeshivauniversity`
- `/api/facebook/yeshivauniversity`
- `/api/twitter/yeshivau`
- `/api/youtube/yeshivau`
- `/api/meta-ads/yeshivau`

---

## 📁 Estructura de Archivos

```
dashboard_proposal/
├── server.js                 # Servidor Node.js con proxy
├── package.json             # Dependencias
├── elegant-bento.html       # Dashboard principal
├── social-posts.html        # Feed de social media
├── elegant-style.css        # Estilos iOS
└── README.md               # Este archivo
```

---

## 🛠️ Desarrollo

### Modo desarrollo (auto-reload)

```bash
npm run dev
```

### Variables de entorno

El código detecta automáticamente si está en localhost o producción:

```javascript
const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://nomassi-1.onrender.com';
```

---

## 🎨 Design System

### Colores iOS
- **Negro:** `#000000`
- **Grises:** `#1C1C1E`, `#2C2C2E`, `#3A3A3C`, `#48484A`, `#8E8E93`
- **Blanco:** `#F2F2F7`
- **Azul iOS:** `#007AFF`
- **Rojo iOS:** `#FF3B30`
- **Verde iOS:** `#34C759`

### Tipografía
- **Familia:** `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter'`
- **Títulos:** Outfit
- **Body:** Inter

### Sombras
```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);
```

---

## 📝 Notas

- El servidor corre en el puerto **3001** por defecto
- Los datos se cargan automáticamente al abrir cada página
- Todos los posts son clickeables y abren el original en nueva pestaña
- El dashboard es completamente responsive

---

## 🐛 Troubleshooting

**Error: Cannot find module 'express'**
```bash
npm install
```

**Error: Port 3001 already in use**
```bash
# Cambiar el puerto en server.js línea 6:
const PORT = 3002;  // o cualquier otro puerto
```

**No se cargan los posts**
- Verificar que el backend esté online: https://nomassi-1.onrender.com
- Revisar la consola del navegador (F12) para ver errores
- Verificar que el servidor Node.js esté corriendo

---

Creado con ❤️ por Angel Ramirez
Flow iOS inspired by Apple/Steve Jobs
