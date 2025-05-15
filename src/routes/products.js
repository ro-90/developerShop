const express=require('express');
const router=express.Router();
const productController=require('../controllers/productController');
const uploadfile = require('../middleware/uploadfile');


router.get('/',productController.index);
router.get('/detail/:id',productController.detail);
router.get('/search',productController.search);
router.get('/add',productController.add);
router.post('/create', uploadfile.single('image'), productController.create);
router.get('/edit/:id', productController.edit);
router.put('/update/:id', uploadfile.single('image'), productController.update);
router.delete('/remove/:id',productController.remove);




module.exports=router;