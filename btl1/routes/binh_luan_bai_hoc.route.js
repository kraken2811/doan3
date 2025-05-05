var express = require('express');
var router = express.Router();
const Binh_luan_bai_hocController = require("../controllers/binh_luan_bai_hoc.controller");

/* GET all records */
router.get('/', Binh_luan_bai_hocController.getAll);
/* GET record by ID */
router.get('/:id', Binh_luan_bai_hocController.getById);
/* INSERT a new record */
router.post('/', Binh_luan_bai_hocController.insert);
/* UPDATE an existing record */
router.put('/:id', Binh_luan_bai_hocController.update);
/* DELETE a record */
router.delete('/:id', Binh_luan_bai_hocController.delete);

module.exports = router;
