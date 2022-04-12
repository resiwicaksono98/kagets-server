const router = require('express').Router()
const supportItemsController = require('./controller')

router.get('/support_items', supportItemsController.getSupportItems)
router.post('/support_items', supportItemsController.storeSupportItems)
router.put('/support_items/:id', supportItemsController.updateSupportItems)
router.delete('/support_items/:id', supportItemsController.destroySupportItems)

module.exports = router