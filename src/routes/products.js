const express=require('express');
const router=express.Router();
const productController=require('../controllers/productController');


router.get('/',productController.index);
router.get('/detail/:id',productController.detail);
router.get('/create',productController.create);
router.get('/edit/:id',productController.edit);
router.get('/search',productController.search);
router.get('/remove/:id',productController.remove);
router.get('/add',productController.add);
router.post('/create',productController.create);
router.put('/update/:id',productController.update);
router.get('/search',productController.search);


module.exports=router;