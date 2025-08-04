// controllers/adminController.js
const db = require('../config/database');

// Yeni kurs oluştur
const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Kurs başlığı zorunludur!'
      });
    }

    const [result] = await db.execute(
      'INSERT INTO courses (title, description, created_by) VALUES (?, ?, ?)',
      [title, description || null, req.user.id]
    );

    res.status(201).json({
      success: true,
      message: 'Kurs başarıyla oluşturuldu!',
      data: { 
        courseId: result.insertId,
        title,
        description 
      }
    });

  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Kurs oluşturulurken hata oluştu!'
    });
  }
};

// Kursu güncelle
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Kurs başlığı zorunludur!'
      });
    }

    // Kursun varlığını kontrol et
    const [courses] = await db.execute('SELECT id FROM courses WHERE id = ?', [id]);
    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Kurs bulunamadı!'
      });
    }

    await db.execute(
      'UPDATE courses SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description || null, id]
    );

    res.json({
      success: true,
      message: 'Kurs başarıyla güncellendi!'
    });

  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Kurs güncellenirken hata oluştu!'
    });
  }
};

// Kursu sil
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Kursun varlığını kontrol et
    const [courses] = await db.execute('SELECT id FROM courses WHERE id = ?', [id]);
    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Kurs bulunamadı!'
      });
    }

    await db.execute('DELETE FROM courses WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Kurs başarıyla silindi!'
    });

  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Kurs silinirken hata oluştu!'
    });
  }
};

// Kursa video ekle
const addVideoToCourse = async (req, res) => {
  try {
    const { id } = req.params; // course id
    const { title, video_url, order_number } = req.body;

    if (!title || !video_url) {
      return res.status(400).json({
        success: false,
        message: 'Video başlığı ve URL alanları zorunludur!'
      });
    }

    // Kursun varlığını kontrol et
    const [courses] = await db.execute('SELECT id FROM courses WHERE id = ?', [id]);
    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Kurs bulunamadı!'
      });
    }

    // Order number belirtilmemişse, son sıra numarasını al
    let finalOrderNumber = order_number;
    if (!finalOrderNumber) {
      const [lastVideo] = await db.execute(
        'SELECT MAX(order_number) as max_order FROM course_videos WHERE course_id = ?',
        [id]
      );
      finalOrderNumber = (lastVideo[0].max_order || 0) + 1;
    }

    const [result] = await db.execute(
      'INSERT INTO course_videos (course_id, title, video_url, order_number) VALUES (?, ?, ?, ?)',
      [id, title, video_url, finalOrderNumber]
    );

    res.status(201).json({
      success: true,
      message: 'Video başarıyla eklendi!',
      data: {
        videoId: result.insertId,
        title,
        video_url,
        order_number: finalOrderNumber
      }
    });

  } catch (error) {
    console.error('Add video error:', error);
    res.status(500).json({
      success: false,
      message: 'Video eklenirken hata oluştu!'
    });
  }
};

// Videoyu sil
const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const [videos] = await db.execute('SELECT id FROM course_videos WHERE id = ?', [videoId]);
    if (videos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Video bulunamadı!'
      });
    }

    await db.execute('DELETE FROM course_videos WHERE id = ?', [videoId]);

    res.json({
      success: true,
      message: 'Video başarıyla silindi!'
    });

  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({
      success: false,
      message: 'Video silinirken hata oluştu!'
    });
  }
};

// Öğrenci listesi
const getStudents = async (req, res) => {
  try {
    const [students] = await db.execute(`
      SELECT id, email, first_name, last_name, phone, city, created_at,
             (SELECT COUNT(*) FROM user_courses WHERE user_id = users.id) as course_count
      FROM users 
      WHERE role = 'student' 
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: { students }
    });

  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Öğrenci listesi yüklenirken hata oluştu!'
    });
  }
};

// Öğrenciye kurs ata
const assignCourseToStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'Öğrenci ve kurs seçimi zorunludur!'
      });
    }

    // Öğrenci kontrolü
    const [students] = await db.execute(
      'SELECT id FROM users WHERE id = ? AND role = "student"',
      [studentId]
    );

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Öğrenci bulunamadı!'
      });
    }

    // Kurs kontrolü
    const [courses] = await db.execute('SELECT id FROM courses WHERE id = ?', [courseId]);
    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Kurs bulunamadı!'
      });
    }

    // Zaten atanmış mı kontrol et
    const [existing] = await db.execute(
      'SELECT id FROM user_courses WHERE user_id = ? AND course_id = ?',
      [studentId, courseId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Bu kurs zaten öğrenciye atanmış!'
      });
    }

    // Kursu ata
    await db.execute(
      'INSERT INTO user_courses (user_id, course_id) VALUES (?, ?)',
      [studentId, courseId]
    );

    res.json({
      success: true,
      message: 'Kurs başarıyla öğrenciye atandı!'
    });

  } catch (error) {
    console.error('Assign course error:', error);
    res.status(500).json({
      success: false,
      message: 'Kurs atanırken hata oluştu!'
    });
  }
};

// Öğrenciden kursu kaldır
const removeCourseFromStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    const [result] = await db.execute(
      'DELETE FROM user_courses WHERE user_id = ? AND course_id = ?',
      [studentId, courseId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Bu atama bulunamadı!'
      });
    }

    res.json({
      success: true,
      message: 'Kurs başarıyla öğrenciden kaldırıldı!'
    });

  } catch (error) {
    console.error('Remove course error:', error);
    res.status(500).json({
      success: false,
      message: 'Kurs kaldırılırken hata oluştu!'
    });
  }
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  addVideoToCourse,
  deleteVideo,
  getStudents,
  assignCourseToStudent,
  removeCourseFromStudent
};