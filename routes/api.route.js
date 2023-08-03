var express = require('express');
const HocVienController = require('../controllers/hocvien.controller');
const { checkIdHocVien } = require('../middlewares/checkIdHocVien.middleware');
const ErrorController = require('../controllers/errors.controller');
const AuthController = require('../controllers/auth.controller');
const restrictTo = require('../middlewares/auth.middleware');
var router = express.Router();

// Router-level Middleware
router.param('uid', (req, res, next) => {
  console.log('req.query: ', req.query);
  console.log('req.params: ', req.params);
  next();
});

/* Student management */
router.route('/students')
  .get([AuthController.restrictTo('admin', 'editor'), HocVienController.getAllStudent])
  .post(HocVienController.addStudent)
  .put([checkIdHocVien, HocVienController.editStudent])
  .delete([checkIdHocVien, HocVienController.deleteStudent]);

router.route('/auth/signup').post(AuthController.signUp);
router.route('/auth/signin').post(AuthController.signIn);


router.route('*').all(ErrorController.pathNotFound);

module.exports = router;
