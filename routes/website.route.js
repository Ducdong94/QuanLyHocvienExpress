var express = require('express');
const RenderController = require('../controllers/render.controller');
var router = express.Router();

router.get('/', RenderController.home);
router.get('/students', RenderController.litsStudent);
router.get('/students/find', RenderController.findStudent);
router.get('/students/create', RenderController.createStudent);
router.get('/students/edit', RenderController.editStudent);
router.get('/students/delete', RenderController.deleteStudent);

router.get('/signup', RenderController.signUp);
router.get('/signin', RenderController.signIn);

// router.get('/error', RenderController.error);

module.exports = router;
