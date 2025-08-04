// models/Course.js
const db = require('../config/database');

class Course {
  static async findAll() {
    try {
      const [courses] = await db.execute(`
        SELECT c.*, u.first_name, u.last_name,
               COUNT(cv.id) as video_count
        FROM courses c
        LEFT JOIN users u ON c.created_by = u.id
        LEFT JOIN course_videos cv ON c.id = cv.course_id
        GROUP BY c.id
        ORDER BY c.created_at DESC
      `);
      return courses;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [courses] = await db.execute(
        'SELECT * FROM courses WHERE id = ?',
        [id]
      );
      return courses[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async create(courseData) {
    try {
      const { title, description, created_by } = courseData;
      const [result] = await db.execute(
        'INSERT INTO courses (title, description, created_by) VALUES (?, ?, ?)',
        [title, description, created_by]
      );
      return { id: result.insertId, ...courseData };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, courseData) {
    try {
      const { title, description } = courseData;
      await db.execute(
        'UPDATE courses SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [title, description, id]
      );
      return await this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.execute('DELETE FROM courses WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Course;