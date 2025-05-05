var express = require('express');
var router = express.Router();
const Lich_su_hocController = require("../controllers/lich_su_hoc.controller");

/* GET all records */
router.get('/', Lich_su_hocController.getAll);
/* GET record by ID */
router.get('/:id', Lich_su_hocController.getById);
/* INSERT a new record */
router.post('/', Lich_su_hocController.insert);
/* UPDATE an existing record */
router.put('/:id', Lich_su_hocController.update);
/* DELETE a record */
router.delete('/:id', Lich_su_hocController.delete);

module.exports = router;
