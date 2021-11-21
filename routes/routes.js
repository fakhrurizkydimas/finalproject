const { req, res } = require('express')
const express = require ('express')
const routes = express.Router()
const newscontroller = require('../controllers/newscontroller')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (request, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
const upload = multer({ dest:'uploads/' })

//const { upload } = require('../helpers/multer')

const login = require('../controllers/login')

routes.post('/login',login.loginuser)
// routes.post('/createuser', login.create)
// routes.post('/createuser', upload.single('images'), login.create)
routes.post('/deleteuser',login.delete)
routes.post('/updateuser',login.update)
routes.get('/viewuser',login.view)
routes.post('/logintes',login.uploadtest)

routes.post('/createnews',newscontroller.create)
routes.post('/updatenews',newscontroller.update)
routes.post('/deletenews',newscontroller.delete)
routes.get('/viewnews',newscontroller.view)


module.exports = routes