const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//multer

const multer = require("multer")
let storage=multer.diskStorage({
    destination: function (req, file, cb ){
        cb(null, "public/images/imported")
    }
,

    filename: function(req,file,cb){
        cb(null,file.fieldname + "-" +Date.now()+path.extname(file.originalname) )
    }
})
let upload =multer({storage:storage})
//din de multer

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		//res.send("esto es index de products")
		res.render("products",{products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		const {id }=req.params
		const info= req.params.id
		const converted_id2 = parseInt(info);
		const converted_id1 = parseInt(id);
		let product = products.find(product => product.id===converted_id1)
		res.render("detail",{product})
		console.log(product.name)
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		//verificar el id maximo del arreglo productos y asignar +1.

		const arregloIds =[];
		products.forEach(item => arregloIds.push(item.id))
		//console.log(arregloIds)
		//let max = Math.max(...arregloIds)
		//console.log(max)
		//console.log(Math.max.apply(null,arregloIds))

		let newProduct = {};
		newProduct.id = Math.max(...arregloIds)+1
		//console.log(newProduct)
		//--const {id }=req.params //esta no funcionò para body
		//const converted_id2 = parseInt(info);
		//--const converted_id1 = parseInt(id);
		//console.log(converted_id1 )
		//console.log(req.body)
		
		newProduct.name=req.body.name
		newProduct.description=req.body.description
		newProduct.price=req.body.price
		newProduct.discount=req.body.discount
		newProduct.category=req.body.category
		newProduct.image=req.body.productImage
		products.push(newProduct);
		
		//console.log(products)

	let productsUpdatedDB=JSON.stringify(products)
		//console.log(productsUpdatedDB)
	fs.writeFileSync(productsFilePath,productsUpdatedDB)
	console.log(req.file)
	console.log(newProduct)
 
	res.redirect('/products')
	//res.send("entrè a creaciòn por post")

	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const {id }=req.params
		const info= req.params.id
		const converted_id2 = parseInt(info);
		const converted_id1 = parseInt(id);
		const productToEdit = products.find(product => product.id===converted_id1)
		

		res.render("product-edit-form", {productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic

		const {id }=req.params //esta no funcionò para body
		//const converted_id2 = parseInt(info);
		const converted_id1 = parseInt(id);
		//console.log(converted_id1 )
		//console.log(req.body)
		
		products.forEach(product => {if(product.id===converted_id1){
			product.name=req.body.name
			product.description=req.body.description
			product.price=req.body.price
			product.discount=req.body.discount
			product.category=req.body.category
			product.image=req.body.productImage
			
		}})

		
		//console.log(products) 
		//res.send("entro a update")
		let productsUpdatedDB=JSON.stringify(products)
		//console.log(productsUpdatedDB)
		fs.writeFileSync(productsFilePath,productsUpdatedDB)
		let product = products.find(product => product.id===converted_id1)
		console.log(req.body) 
		res.redirect('/products/')

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
//const idUrl = parseInt(req.params.id);

		products=products.filter(item => item.id !== parseInt(req.params.id))
		console.log(products)

		let productsUpdatedDB=JSON.stringify(products)
		fs.writeFileSync(productsFilePath,productsUpdatedDB)

		res.redirect("/products")
	}
};

module.exports = controller;