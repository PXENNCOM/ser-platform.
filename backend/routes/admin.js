// routes/admin.js
const express = require('express');
const { requireAdmin } = require('../middleware/adminAuth');
const {
  createCourse,
  updateCourse,
  deleteCourse,
  addVideoToCourse,
  deleteVideo,
  getStudents,
  assignCourseToStudent,
  removeCourseFromStudent
} = require('../controllers/adminController');

const router = express.Router();

// Tüm admin routes require admin auth
router.use(requireAdmin);

// Course management
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

// Video management
router.post('/courses/:id/videos', addVideoToCourse);
router.delete('/videos/:videoId', deleteVideo);

// Student management
router.get('/students', getStudents);
router.post('/assign-course', assignCourseToStudent);
router.delete('/students/:studentId/courses/:courseId', removeCourseFromStudent);

module.exports = router;