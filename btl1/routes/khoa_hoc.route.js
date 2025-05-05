var express = require('express');
var router = express.Router();
const Khoa_hocController = require("../controllers/khoa_hoc.controller");

/* GET all records */
router.get('/', Khoa_hocController.getAll);
/* GET record by ID */
router.get('/:id', Khoa_hocController.getById);
/* INSERT a new record */
router.post('/', Khoa_hocController.insert);
/* UPDATE an existing record */
router.put('/:id', Khoa_hocController.update);
/* DELETE a record */
router.delete('/:id', Khoa_hocController.delete);

module.exports = router;
