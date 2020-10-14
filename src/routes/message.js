const experess = require('express')
const router = experess.Router()
const messageRouter= require('../controllers/message')
const midAuth = require('../middleware/auth')

router.get('/:id', midAuth.verifyJwtToken, messageRouter.getAllMessage)
router.get('/:sender_id/:receiver_id', midAuth.verifyJwtToken, messageRouter.getPersonalMessage)
router.post('/', midAuth.verifyJwtToken,  messageRouter.postMessage)
router.put('/:id', midAuth.verifyJwtToken, messageRouter.putMessage)
router.delete('/:id', midAuth.verifyJwtToken, messageRouter.deleteMessage)

module.exports = router