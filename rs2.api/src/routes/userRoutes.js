import { UserController } from "../controllers/userController";
import { Router } from "express";
import { UserService } from "../services/userService";
import { loginRequired } from "../middlewares/authMiddleware"

const router = Router();
const userCtrl = new UserController(UserService);


router.route('/')
        .get(loginRequired, userCtrl.getAllUsers)
        .post(loginRequired, userCtrl.createUser)
        .put(loginRequired, userCtrl.updateUser)

router.route('/:userid')
        .get(loginRequired, userCtrl.getUser)
        .delete(loginRequired, userCtrl.deleteUser)


export default router;