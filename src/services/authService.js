const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { adminUsers } = require('../data/store');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

function loginAdmin({ email, password }) {
  const user = adminUsers.find((item) => item.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    const error = new Error('Credenciales inválidas');
    error.statusCode = 401;
    error.code = 'UNAUTHORIZED';
    throw error;
  }

  const validPassword = bcrypt.compareSync(password, user.passwordHash);

  if (!validPassword) {
    const error = new Error('Credenciales inválidas');
    error.statusCode = 401;
    error.code = 'UNAUTHORIZED';
    throw error;
  }

  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, jwtSecret, {
    expiresIn: jwtExpiresIn
  });

  return {
    accessToken: token,
    tokenType: 'Bearer',
    expiresIn: jwtExpiresIn,
    admin: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
}

function seedAdminIfNeeded() {
  if (!adminUsers.length) {
    const hashed = bcrypt.hashSync('Admin12345', 10);
    adminUsers.push({
      id: uuidv4(),
      name: 'Admin Principal',
      email: 'admin@albergue.pe',
      passwordHash: hashed,
      role: 'admin',
      createdAt: new Date().toISOString()
    });
  }
}

module.exports = { loginAdmin, seedAdminIfNeeded };
