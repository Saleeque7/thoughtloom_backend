import express from 'express'
import { userController } from '../controllers/index.js'
import { verifyToken } from '../Middleware/authMiddleware.js'
import { uploadImage } from '../Middleware/multer.js'

export default (dependencies) => {
    const router = express.Router()
    const { addPreferenceController, articleController ,browseArticleController , editArticleController , deleteArticleController} = userController(dependencies)
    router.get('/article/explore',  browseArticleController)
    router.post('/article/preference', verifyToken, addPreferenceController)
    router.post('/article', uploadImage.single("file"), verifyToken, articleController)
    router.get('/article', verifyToken, browseArticleController)
    router.get('/article/:id', verifyToken, browseArticleController)
    router.put('/article/edit/:id',uploadImage.single("file"), verifyToken, editArticleController)
    router.delete('/article/delete/:id', verifyToken, deleteArticleController)

    return router
}
