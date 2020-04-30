const router = require('express-promise-router')();
const controller = require('../controllers/category');

// create a new item
router.post('/create', controller.create);

router.post('/edit', controller.edit);

router.post("/delete", controller.delete)

router.post("/getall", controller.getAll)

router.post("/findone", controller.findOne)

router.post("/finaldelete", controller.finalDelete)


module.exports = router;