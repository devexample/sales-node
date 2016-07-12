var mongoose = require("mongoose");

var schema = mongoose.Schema({
	// link: { type: mongoose.Schema.Types.ObjectId, ref: "modelo" }
	name: String, 
	price: Number
}, { collection: "products" });

module.exports = mongoose.model("product", schema);