import express from 'express'
import { authController } from '../controllers/index.js'

export default (dependencies)=> {
    const router  = express.Router()
    const { registerController , loginController , refreshController } = authController(dependencies)
    
    router.post('/register' , registerController)
    router.post('/login' , loginController)
    router.post('/refresh',refreshController)
    return router
}

