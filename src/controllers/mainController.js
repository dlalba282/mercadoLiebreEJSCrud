const { Console } = require('console');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
	index: (req, res) => {
		// Do the magic
		const visitados = products.filter(item => {return item.category === "visited"})
		const ofertas = products.filter(item=> item.category === "in-sale")
		//const visual = visitados.map(item => item.price +1)
		//console.log(visitados.map(item => item.price +1))
		
		res.render("index", {visitados, ofertas}) // es igual a visitados:visitados, ofertas:ofertas, porque la llave es igual 
	},
	search: (req, res) => {
		// Do the magic
	},
};


module.exports = controller;
