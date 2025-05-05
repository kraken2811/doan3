var express = require('express');
var router = express.Router();
const QuizController = require("../controllers/quiz.controller");

/* GET all records */
router.get('/', QuizController.getAll);
/* GET record by ID */
router.get('/:id', QuizController.getById);
/* INSERT a new record */
router.post('/', QuizController.insert);
/* UPDATE an existing record */
router.put('/:id', QuizController.update);
/* DELETE a record */
router.delete('/:id', QuizController.delete);

module.exports = router;
