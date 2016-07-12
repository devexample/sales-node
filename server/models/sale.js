var mongoose = require("mongoose");

var schema = mongoose.Schema({
	client: { type: mongoose.Schema.Types.ObjectId, ref: "client" },
	date: Date,
	products: [{
		//product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
		name: String,
		price: Number,
		quantity: Number
	}]
}, { collection: "sales" });

module.exports = mongoose.model("sale", schema);