var express = require('express');
var router = express.Router();
const Bai_hocController = require("../controllers/bai_hoc.controller");

/* GET all records */
router.get('/', Bai_hocController.getAll);
/* GET record by ID */
router.get('/:id', Bai_hocController.getByCourseId);  // Route này sẽ lấy bài học theo khoa_hoc_id
/* INSERT a new record */
router.post('/', Bai_hocController.insert);
/* UPDATE an existing record */
router.put('/:id', Bai_hocController.update);
/* DELETE a record */
router.delete('/:id', Bai_hocController.delete);

module.exports = router;
