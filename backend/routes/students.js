
// routes/students.js
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getMyCourses, getMyCourseDetail } = require('../controllers/studentController');

const router = express.Router();

// Tüm student routes require authentication
router.use(authenticateToken);

// Student routes
router.get('/my-courses', getMyCourses);
router.get('/courses/:id', getMyCourseDetail);

module.exports = router;