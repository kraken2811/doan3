var express = require('express');
var router = express.Router();
const Giao_vienController = require("../controllers/giao_vien.controller");

/* GET all records */
router.get('/', Giao_vienController.getAll);
/* GET record by ID */
router.get('/:id', Giao_vienController.getById);
/* INSERT a new record */
router.post('/', Giao_vienController.insert);
/* UPDATE an existing record */
router.put('/:id', Giao_vienController.update);
/* DELETE a record */
router.delete('/:id', Giao_vienController.delete);

module.exports = router;
