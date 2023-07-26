var express = require('express');
const HocVienController = require('../controllers/hocvien.controller');
const { checkIdHocVien } = require('../middlewares/checkIdHocVien.middleware');
const ErrorController = require('../controllers/errors.controller');
var router = express.Router();

// Router-level Middleware
router.param('uid', (req, res, next) => {
  console.log('req.query: ', req.query);
  console.log('req.params: ', req.params);
  next();
});

/* Student management */
router.route('/students')
  .get(HocVienController.getAllStudent)
  .post(HocVienController.addStudent)
  .put([checkIdHocVien, HocVienController.editStudent])
  .delete([checkIdHocVien, HocVienController.deleteStudent]);

router.get("/students/:uid", (req, res) => {
  console.log("Then this function will be called - students");
  res.end();
});
router.get("/hocvien/:uid", (req, res) => {
  console.log("Then this function will be called - hocvien");
  res.end();
});



router.route('*').all(ErrorController.pathNotFound);

module.exports = router;
