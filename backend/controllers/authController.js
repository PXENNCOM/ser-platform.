// controllers/authController.js
const db = require('../config/database');
const { hashPassword, comparePassword, validateEmail, validatePassword } = require('../utils/helpers');
const { generateToken } = require('../utils/jwt');

// Kullanıcı kayıt
const register = async (req, res) => {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
      phone,
      date_of_birth,
      gender,
      address,
      city
    } = req.body;

    // Validasyon
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({
        success: false,
        message: 'Ad, soyad, e-posta ve şifre alanları zorunludur!'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Geçerli bir e-posta adresi giriniz!'
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Şifre en az 6 karakter olmalıdır!'
      });
    }

    // E-posta kontrolü
    const [existingUsers] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Bu e-posta adresi zaten kullanılıyor!'
      });
    }

    // Şifreyi hashle
    const hashedPassword = await hashPassword(password);

    // Kullanıcıyı veritabanına kaydet
    const [result] = await db.execute(
      `INSERT INTO users (email, password, first_name, last_name, phone, date_of_birth, gender, address, city) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [email, hashedPassword, first_name, last_name, phone || null, date_of_birth || null, gender || null, address || null, city || null]
    );

    // Token oluştur
    const token = generateToken(result.insertId);

    res.status(201).json({
      success: true,
      message: 'Kayıt başarılı!',
      data: {
        token,
        user: {
          id: result.insertId,
          email,
          first_name,
          last_name,
          role: 'student'
        }
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Kayıt sırasında bir hata oluştu!'
    });
  }
};

// Kullanıcı giriş
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasyon
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'E-posta ve şifre alanları zorunludur!'
      });
    }

    // Kullanıcıyı bul
    const [users] = await db.execute(
      'SELECT id, email, password, first_name, last_name, role FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'E-posta veya şifre hatalı!'
      });
    }

    const user = users[0];

    // Şifre kontrolü
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'E-posta veya şifre hatalı!'
      });
    }

    // Token oluştur
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Giriş başarılı!',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Giriş sırasında bir hata oluştu!'
    });
  }
};

// Kullanıcı bilgilerini getir
const getMe = async (req, res) => {
  try {
    const [users] = await db.execute(
      `SELECT id, email, first_name, last_name, phone, date_of_birth, 
              gender, address, city, profile_image, role, created_at 
       FROM users WHERE id = ?`,
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı!'
      });
    }

    res.json({
      success: true,
      data: { user: users[0] }
    });

  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({
      success: false,
      message: 'Kullanıcı bilgileri alınırken hata oluştu!'
    });
  }
};

// Profil güncelle
const updateProfile = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone,
      date_of_birth,
      gender,
      address,
      city
    } = req.body;

    // Güncelleme
    await db.execute(
      `UPDATE users SET 
        first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, 
        gender = ?, address = ?, city = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [first_name, last_name, phone || null, date_of_birth || null, 
       gender || null, address || null, city || null, req.user.id]
    );

    // Güncellenmiş kullanıcı bilgilerini getir
    const [users] = await db.execute(
      `SELECT id, email, first_name, last_name, phone, date_of_birth, 
              gender, address, city, profile_image, role 
       FROM users WHERE id = ?`,
      [req.user.id]
    );

    res.json({
      success: true,
      message: 'Profil başarıyla güncellendi!',
      data: { user: users[0] }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Profil güncellenirken hata oluştu!'
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile
};