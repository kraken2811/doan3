var express = require('express');
var router = express.Router();
const Don_hangController = require("../controllers/don_hang.controller");

/* GET all records */
router.get('/', Don_hangController.getAll);
/* GET record by ID */
router.get('/:id', Don_hangController.getById);
/* INSERT a new record */
router.post('/', Don_hangController.insert);
/* UPDATE an existing record */
router.put('/:id', Don_hangController.update);
/* DELETE a record */
router.delete('/:id', Don_hangController.delete);

module.exports = router;
