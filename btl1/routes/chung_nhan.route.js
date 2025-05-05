var express = require('express');
var router = express.Router();
const Chung_nhanController = require("../controllers/chung_nhan.controller");

/* GET all records */
router.get('/', Chung_nhanController.getAll);
/* GET record by ID */
router.get('/:id', Chung_nhanController.getById);
/* INSERT a new record */
router.post('/', Chung_nhanController.insert);
/* UPDATE an existing record */
router.put('/:id', Chung_nhanController.update);
/* DELETE a record */
router.delete('/:id', Chung_nhanController.delete);

module.exports = router;
