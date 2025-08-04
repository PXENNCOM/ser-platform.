// models/User.js
const db = require('../config/database');

class User {
  static async findById(id) {
    try {
      const [users] = await db.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      return users[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const [users] = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return users[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async create(userData) {
    try {
      const {
        email, password, first_name, last_name,
        phone, date_of_birth, gender, address, city
      } = userData;

      const [result] = await db.execute(
        `INSERT INTO users (email, password, first_name, last_name, phone, date_of_birth, gender, address, city) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [email, password, first_name, last_name, phone, date_of_birth, gender, address, city]
      );

      return { id: result.insertId, ...userData };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, userData) {
    try {
      const fields = Object.keys(userData).map(key => `${key} = ?`).join(', ');
      const values = Object.values(userData);
      values.push(id);

      await db.execute(
        `UPDATE users SET ${fields} WHERE id = ?`,
        values
      );

      return await this.findById(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;