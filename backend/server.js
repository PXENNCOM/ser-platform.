// debug-server.js - Minimal test server
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Debug server çalışıyor!' });
});

// Route'ları tek tek ekle
try {
  console.log('Auth routes ekleniyor...');
  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);
  console.log('✅ Auth routes başarılı');
} catch (error) {
  console.log('❌ Auth routes hatası:', error.message);
}

try {
  console.log('Course routes ekleniyor...');
  const courseRoutes = require('./routes/courses');
  app.use('/api/courses', courseRoutes);
  console.log('✅ Course routes başarılı');
} catch (error) {
  console.log('❌ Course routes hatası:', error.message);
}

try {
  console.log('Admin routes ekleniyor...');
  const adminRoutes = require('./routes/admin');
  app.use('/api/admin', adminRoutes);
  console.log('✅ Admin routes başarılı');
} catch (error) {
  console.log('❌ Admin routes hatası:', error.message);
}

try {
  console.log('Student routes ekleniyor...');
  const studentRoutes = require('./routes/students');
  app.use('/api/student', studentRoutes);
  console.log('✅ Student routes başarılı');
} catch (error) {
  console.log('❌ Student routes hatası:', error.message);
}

app.listen(PORT, () => {
  console.log(`🚀 Debug server ${PORT} portunda çalışıyor`);
});