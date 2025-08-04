// controllers/courseController.js
const db = require('../config/database');

// Tüm kursları getir (genel)
const getAllCourses = async (req, res) => {
  try {
    const [courses] = await db.execute(`
      SELECT c.*, u.first_name, u.last_name,
             COUNT(DISTINCT cv.id) as video_count,
             COUNT(DISTINCT uc.user_id) as student_count
      FROM courses c
      LEFT JOIN users u ON c.created_by = u.id
      LEFT JOIN course_videos cv ON c.id = cv.course_id
      LEFT JOIN user_courses uc ON c.id = uc.course_id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);

    res.json({
      success: true,
      data: { courses }
    });

  } catch (error) {
    console.error('Get all courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Kurslar yüklenirken hata oluştu!'
    });
  }
};

// Kurs detayı getir
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    // Kurs bilgilerini getir (öğrenci sayısı dahil)
    const [courses] = await db.execute(`
      SELECT c.*, u.first_name, u.last_name,
             COUNT(DISTINCT uc.user_id) as student_count
      FROM courses c
      LEFT JOIN users u ON c.created_by = u.id
      LEFT JOIN user_courses uc ON c.id = uc.course_id
      WHERE c.id = ?
      GROUP BY c.id
    `, [id]);

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Kurs bulunamadı!'
      });
    }

    // Kurs videolarını getir
    const [videos] = await db.execute(`
      SELECT * FROM course_videos 
      WHERE course_id = ? 
      ORDER BY order_number ASC
    `, [id]);

    // Kursa kayıtlı öğrencileri getir (detaylı bilgi için)
    const [students] = await db.execute(`
      SELECT u.id, u.first_name, u.last_name, u.email, uc.assigned_at
      FROM user_courses uc
      JOIN users u ON uc.user_id = u.id
      WHERE uc.course_id = ?
      ORDER BY uc.assigned_at DESC
    `, [id]);

    res.json({
      success: true,
      data: { 
        course: courses[0],
        videos,
        students
      }
    });

  } catch (error) {
    console.error('Get course by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Kurs detayları yüklenirken hata oluştu!'
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById
};