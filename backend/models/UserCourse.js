// models/UserCourse.js
const db = require('../config/database');

class UserCourse {
  static async findByUserId(userId) {
    try {
      const [courses] = await db.execute(`
        SELECT c.*, uc.assigned_at
        FROM user_courses uc
        JOIN courses c ON uc.course_id = c.id
        WHERE uc.user_id = ?
        ORDER BY uc.assigned_at DESC
      `, [userId]);
      return courses;
    } catch (error) {
      throw error;
    }
  }

  static async create(userId, courseId) {
    try {
      const [result] = await db.execute(
        'INSERT INTO user_courses (user_id, course_id) VALUES (?, ?)',
        [userId, courseId]
      );
      return { id: result.insertId, user_id: userId, course_id: courseId };
    } catch (error) {
      throw error;
    }
  }

  static async delete(userId, courseId) {
    try {
      const [result] = await db.execute(
        'DELETE FROM user_courses WHERE user_id = ? AND course_id = ?',
        [userId, courseId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async exists(userId, courseId) {
    try {
      const [rows] = await db.execute(
        'SELECT id FROM user_courses WHERE user_id = ? AND course_id = ?',
        [userId, courseId]
      );
      return rows.length > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserCourse;