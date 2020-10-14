const experess = require('express')
const router = experess.Router()
const detailUserRouter = require('../controllers/userDetail')
const midAuth = require('../middleware/auth')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const splitName = file.originalname.split('.');
        const ext = splitName.pop();
        const newName = splitName.join('-');
        cb(null, `${newName}.${ext}`);
    }
})
const upload = multer({ storage: storage })

router.get('/', midAuth.verifyJwtToken, detailUserRouter.getAllUser)
router.get('/:id', midAuth.verifyJwtToken, detailUserRouter.getIdUser)
router.post('/', midAuth.verifyJwtToken, upload.single('image'), detailUserRouter.postUser)
router.put('/:id', midAuth.verifyJwtToken, upload.single('image'), detailUserRouter.putUser)
router.delete('/:id', midAuth.verifyJwtToken, detailUserRouter.deleteUser)

module.exports = router