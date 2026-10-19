require('dotenv').config();

module.exports = {
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_key',
  jwtExpiresIn: Number(process.env.JWT_EXPIRES_IN || 3600),
  uploadDir: process.env.UPLOAD_DIR || './uploads'
};
