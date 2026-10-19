const express = require('express');
const cors = require('cors');
const path = require('path');
const publicRoutes = require('./routes/public');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'albergue-mvp-api' });
});

app.use('/api/v1', publicRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).json({ code: 'NOT_FOUND', message: 'Ruta no encontrada' });
});

app.use(errorHandler);

module.exports = app;
