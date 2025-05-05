var express = require('express');
var router = express.Router();
const Danh_giaController = require("../controllers/danh_gia.controller");

/* GET all records */
router.get('/', Danh_giaController.getAll);
/* GET record by ID */
router.get('/:id', Danh_giaController.getById);
/* INSERT a new record */
router.post('/', Danh_giaController.insert);
/* UPDATE an existing record */
router.put('/:id', Danh_giaController.update);
/* DELETE a record */
router.delete('/:id', Danh_giaController.delete);

module.exports = router;
