var express = require('express');
var router = express.Router();
const Dang_ky_khoa_hocController = require("../controllers/dang_ky_khoa_hoc.controller");

/* GET all records */
router.get('/', Dang_ky_khoa_hocController.getAll);
/* GET record by ID */
router.get('/:id', Dang_ky_khoa_hocController.getById);
/* INSERT a new record */
router.post('/', Dang_ky_khoa_hocController.insert);
/* UPDATE an existing record */
router.put('/:id', Dang_ky_khoa_hocController.update);
/* DELETE a record */
router.delete('/:id', Dang_ky_khoa_hocController.delete);

module.exports = router;
