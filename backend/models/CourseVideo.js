// models/CourseVideo.js
const db = require('../config/database');

class CourseVideo {
  static async findByCourseId(courseId) {
    try {
      const [videos] = await db.execute(
        'SELECT * FROM course_videos WHERE course_id = ? ORDER BY order_number ASC',
        [courseId]
      );
      return videos;
    } catch (error) {
      throw error;
    }
  }

  static async create(videoData) {
    try {
      const { course_id, title, video_url, order_number } = videoData;
      const [result] = await db.execute(
        'INSERT INTO course_videos (course_id, title, video_url, order_number) VALUES (?, ?, ?, ?)',
        [course_id, title, video_url, order_number]
      );
      return { id: result.insertId, ...videoData };
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.execute('DELETE FROM course_videos WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CourseVideo;