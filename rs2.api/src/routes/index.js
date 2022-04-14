import { Router } from "express";
import authRoutes from "./authRoutes"
import userRoutes from "./userRoutes"
import productRoutes from "./productRoutes"
import basketRoutes from "./basketRoutes"

const appRouter = Router();

appRouter.use('/auth', authRoutes)
appRouter.use('/user', userRoutes)
appRouter.use('/product', productRoutes)
appRouter.use('/basket', basketRoutes)


export default appRouter;