const { loginAdmin, seedAdminIfNeeded } = require('../services/authService');

function login(req, res, next) {
  try {
    seedAdminIfNeeded();
    const result = loginAdmin(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = { login };
