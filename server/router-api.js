// var config = require("./config");
var bodyParser = require("body-parser");
var connection = require("./databases/connection");
var express = require("express");

var router = express.Router();

router.use(bodyParser.json());

var enviroment = process.env.NODE_ENV || "develop";

var databases = {
	sales: connection.create( require("./databases/" + enviroment + "/sales") )
};

var clientsCtrl = require("./controllers/clients")( databases );
router.post("/api/clients", clientsCtrl.create);
router.get("/api/clients", clientsCtrl.read);
router.get("/api/clients/:id", clientsCtrl.readOne);
router.put("/api/clients", clientsCtrl.update);
router.delete("/api/clients/:id", clientsCtrl.delete);

var productsCtrl = require("./controllers/products")( databases );
router.post("/api/products", productsCtrl.create);
router.get("/api/products", productsCtrl.read);
router.get("/api/products/:id", productsCtrl.readOne);
router.put("/api/products", productsCtrl.update);
router.delete("/api/products/:id", productsCtrl.delete);

var salesCtrl = require("./controllers/sales")( databases );
router.post("/api/sales", salesCtrl.create);
router.get("/api/sales", salesCtrl.read);
router.get("/api/sales/client/:clientID", salesCtrl.readByClient);
router.get("/api/sales/:id", salesCtrl.readOne);
router.put("/api/sales", salesCtrl.update);
router.delete("/api/sales/:id", salesCtrl.delete);

// Handle the 404 status
router.use('/api/*', function( req, res ){
	res.status(404).send("The API that you are trying to request not exist.");
});

module.exports = router;