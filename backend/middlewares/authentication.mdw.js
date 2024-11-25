const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
exports.isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
      const user = await User.findById(decode.userId);
      if (!user) {
        console.log('User not found or invalid token');
        return res.json({ success: false, message: 'Unauthorized access!' });
      }

      req.user = user;  
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.json({ success: false, message: 'unauthorized access!', error: error.message });
      }
      if (error.name === 'TokenExpiredError') {
        return res.json({
          success: false,
          message: 'sesson expired try sign in!',
        });
      }
      console.error('Error in isAuth middleware:', error); // Log lỗi
      res.json({ success: false, message: 'Internal server error!', error: error.message });

    }
  } else {
    res.json({ success: false, message: 'unauthorized access!' });
  }
};