const experess = require('express')
const router = experess.Router()
const authRouter = require('../controllers/auth')
const authMiddleware = require('../middleware/auth')

router.post('/register', authRouter.register)
router.post('/login', authRouter.login)
// router.post('/refresh-token', authMiddleware.verifyJwtRefreshToken, authRouter.refreshToken)

module.exports = router