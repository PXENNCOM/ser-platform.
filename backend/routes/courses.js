// routes/courses.js
const express = require('express');
const { getAllCourses, getCourseById } = require('../controllers/courseController');

const router = express.Router();

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

module.exports = router;