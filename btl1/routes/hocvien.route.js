var express = require('express');
var router = express.Router();
const Hoc_vienController = require("../controllers/hocvien.controller");

/* GET all records */
router.get('/', Hoc_vienController.getAll);
/* GET record by ID */
router.get('/:id', Hoc_vienController.getById);
/* INSERT a new record */
router.post('/', Hoc_vienController.insert);
/* UPDATE an existing record */
router.put('/:id', Hoc_vienController.update);
/* DELETE a record */
router.delete('/:id', Hoc_vienController.delete);

module.exports = router;
