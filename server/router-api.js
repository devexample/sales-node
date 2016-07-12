// var config = require("./config");
var auth = require("./auth");
var bodyParser = require("body-parser");
var connection = require("./databases/connection");
var express = require("express");

var router = express.Router();

router.use(bodyParser.json());

var enviroment = process.env.NODE_ENV || "develop";

var databases = {
	sales: connection.create( require("./databases/" + enviroment + "/sales") )
};

// Clients =======================================================================
var clientsCtrl = require("./controllers/clients")( databases );
router.post("/api/clients", auth.api, clientsCtrl.create);
router.get("/api/clients", auth.api, clientsCtrl.read);
router.get("/api/clients/:id", auth.api, clientsCtrl.readOne);
router.put("/api/clients", auth.api, clientsCtrl.update);
router.delete("/api/clients/:id", auth.api, clientsCtrl.delete);
// Products =======================================================================
var productsCtrl = require("./controllers/products")( databases );
router.post("/api/products", auth.api, productsCtrl.create);
router.get("/api/products", auth.api, productsCtrl.read);
router.get("/api/products/:id", auth.api, productsCtrl.readOne);
router.put("/api/products", auth.api, productsCtrl.update);
router.delete("/api/products/:id", auth.api, productsCtrl.delete);
// Sales =======================================================================
var salesCtrl = require("./controllers/sales")( databases );
router.post("/api/sales", auth.api, salesCtrl.create);
router.get("/api/sales", auth.api, salesCtrl.read);
router.get("/api/sales/client/:clientID", auth.api, salesCtrl.readByClient);
router.get("/api/sales/:id", auth.api, salesCtrl.readOne);
router.put("/api/sales", auth.api, salesCtrl.update);
router.delete("/api/sales/:id", auth.api, salesCtrl.delete);
// Users =======================================================================
var userCtrl = require("./controllers/users")( databases );
router.post("/api/sign-in", userCtrl.signIn);
router.get("/api/user/info", auth.api, userCtrl.signedInInfo);
// Handle the 404 status
router.use('/api/*', function( req, res ){
	res.status(404).send("The API that you are trying to request not exist.");
});

module.exports = router;