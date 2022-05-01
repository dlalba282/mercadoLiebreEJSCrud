// ************ Require's ************
const express = require('express');
const router = express.Router();
let path = require("path")

//multer

const multer = require("multer")
let storage=multer.diskStorage({
    destination: function (req, file, cb ){
        cb(null, "/public/images/imported")
    }
,

    filename: function(req,file,cb){
        cb(null,file.fieldname + "-" +Date.now()+path.extname(file.originalname) )
    }
})
let upload =multer({storage:storage})

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
//router.post('/create', upload.single("productImage"), (req,res)=>{console.log(req.file)}); //antes estaba solo /

router.post('/create', productsController.store); //antes estaba solo /


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail);// esta linea estaba sin detail solo id  

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); //'/:id/edit'
router.put('/edit/:id', productsController.update); // original '/:id'


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
