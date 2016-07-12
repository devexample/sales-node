var mongoose = require("mongoose");

var schema = mongoose.Schema({
	// link: { type: mongoose.Schema.Types.ObjectId, ref: "modelo" }
	name: String, 
	email: String
}, { collection: "clients" });

module.exports = mongoose.model("client", schema);