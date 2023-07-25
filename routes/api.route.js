var express = require('express');
const HocVienController = require('../controllers/hocvien.controller');
const { checkIdHocVien } = require('../middlewares/checkIdHocVien.middleware');
var router = express.Router();

/* Student management */
router.route('/students')
  .get(HocVienController.getAllStudent)
  .post(HocVienController.addStudent)
  .put([checkIdHocVien, HocVienController.editStudent])
  .delete([checkIdHocVien, HocVienController.deleteStudent]);

module.exports = router;
