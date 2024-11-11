import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";
import express from 'express'

export const routes = (dependencies) =>{
    const route = express.Router()

    route.use('/',authRoutes(dependencies))
    route.use('/thoughtloom',userRoutes(dependencies))

    return route
} 