var express = require('express');
var router = express.Router();
const UsersController = require("../controllers/usere.controller");

/* GET all records */
router.get('/', UsersController.getAll);
/* GET record by ID */
router.get('/:id', UsersController.getById);
/* INSERT a new record */
router.post('/', UsersController.insert);
/* UPDATE an existing record */
router.put('/:id', UsersController.update);
/* DELETE a record */
router.delete('/:id', UsersController.delete);

module.exports = router;
