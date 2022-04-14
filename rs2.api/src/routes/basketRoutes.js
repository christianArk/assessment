import { BasketController } from "../controllers/basketController";
import { Router } from "express";
import { BasketService } from "../services/basketService";
import { loginRequired } from "../middlewares/authMiddleware"
import { createBasketValidation } from "../validators/basket";
import { validateRequestBody } from "../utils/helpers";


const router = Router();

const basketCtrl = new BasketController(BasketService);


router.route('/')
        .get(loginRequired, basketCtrl.getAllBaskets)
        .post(loginRequired, validateRequestBody(createBasketValidation), basketCtrl.createBasket)
        .put(loginRequired, basketCtrl.updateBasket)

router.route('/:basketid')
        .get(loginRequired, basketCtrl.getBasket)
        .delete(loginRequired, basketCtrl.deleteBasket)


export default router;
