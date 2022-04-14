import { AuthController } from "../controllers/authController";
import { Router } from "express";
import { AuthService } from "../services/authService";

const router = Router();
const authCtrl = new AuthController(AuthService);


router.post('/login', authCtrl.login)
router.post('/signup', authCtrl.signup)
router.post('/send-recovery-token', authCtrl.sendRecoveryToken)
router.post('/change-password', authCtrl.changePassword)


export default router;