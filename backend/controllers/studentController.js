// controllers/studentController.js
const db = require('../config/database');

// Öğrencinin kurslarını getir
const getMyCourses = async (req, res) => {
  try {
    const [courses] = await db.execute(`
      SELECT c.*, u.first_name as instructor_first_name, u.last_name as instructor_last_name,
             uc.assigned_at,
             COUNT(cv.id) as video_count
      FROM user_courses uc
      JOIN courses c ON uc.course_id = c.id
      LEFT JOIN users u ON c.created_by = u.id
      LEFT JOIN course_videos cv ON c.id = cv.course_id
      WHERE uc.user_id = ?
      GROUP BY c.id
      ORDER BY uc.assigned_at DESC
    `, [req.user.id]);

    res.json({
      success: true,
      data: { courses }
    });

  } catch (error) {
    console.error('Get my courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Kurslarınız yüklenirken hata oluştu!'
    });
  }
};

// Öğrencinin erişebileceği kurs detayı
const getMyCourseDetail = async (req, res) => {
  try {
    const { id } = req.params;

    // Öğrencinin bu kursa erişimi var mı kontrol et
    const [access] = await db.execute(
      'SELECT id FROM user_courses WHERE user_id = ? AND course_id = ?',
      [req.user.id, id]
    );

    if (access.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Bu kursa erişim yetkiniz yok!'
      });
    }

    // Kurs bilgilerini getir
    const [courses] = await db.execute(`
      SELECT c.*, u.first_name as instructor_first_name, u.last_name as instructor_last_name
      FROM courses c
      LEFT JOIN users u ON c.created_by = u.id
      WHERE c.id = ?
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

    res.json({
      success: true,
      data: { 
        course: courses[0],
        videos 
      }
    });

  } catch (error) {
    console.error('Get my course detail error:', error);
    res.status(500).json({
      success: false,
      message: 'Kurs detayları yüklenirken hata oluştu!'
    });
  }
};

module.exports = {
  getMyCourses,
  getMyCourseDetail
};