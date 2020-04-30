const router = require('express-promise-router')();
const controller = require('../controllers/task');

// create a new item
router.post('/create', controller.create);

router.post('/gettaskday', controller.gettaskday)

router.post('/edit', controller.edit);

router.post("/delete", controller.delete)

router.post("/getall", controller.getAll)

router.post("/findone", controller.findOne)

router.post("/finaldelete", controller.finalDelete)


module.exports = router;