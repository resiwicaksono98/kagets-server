const router = require('express').Router()
const complaintController = require('./controller')
const multer = require('multer')
const path = require('path')

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/complaints'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
})

router.get('/complaints', complaintController.getComplaint)
router.get('/complaints/:id', complaintController.getComplaintById)
router.post('/complaints',
    multer({ storage: diskStorage }).single('support_image'),
    complaintController.storeComplaint);
router.put('/complaints/:id',
    multer({ storage: diskStorage }).single('support_image'),
    complaintController.updateComplaint
)
router.delete('/complaints/:id', complaintController.destroyComplaint)


module.exports = router
