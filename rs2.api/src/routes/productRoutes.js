import { ProductController } from "../controllers/productController";
import { Router } from "express";
import { ProductService } from "../services/productService";


const router = Router();

const productCtrl = new ProductController(ProductService);


router.route('/')
        .get(productCtrl.getAllProducts)
        .post(productCtrl.createProduct)
        .put(productCtrl.updateProduct)

router.get('/types', productCtrl.getProductTypes)

router.route('/:productid')
        .get(productCtrl.getProduct)
        .delete(productCtrl.deleteProduct)


export default router;
