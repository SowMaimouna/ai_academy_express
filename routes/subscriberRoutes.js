const express = require("express"); 
const router = express.Router(); 
const subscribersController = require("../controllers/subscribersController"); 
const authController = require("../controllers/authController"); 

// Vérifie que l'utilisateur est connecté pour toutes les routes 
router.use(authController.ensureLoggedIn); 

router.get("/subscribers", subscribersController.getAllSubscribers);
router.get("/subscribers/new", subscribersController.getSubscriptionPage);
router.post("/subscribers/create", subscribersController.saveSubscriber);
router.get("/subscribers/search", subscribersController.searchSubscriber);
router.get("/subscribers/:id", subscribersController.show);
router.post("/subscribers/:id/delete", subscribersController.deleteSubscriber);
router.get("/subscribers/:id/edit", subscribersController.editSubscriber);
router.post("/subscribers/:id/update", subscribersController.updateSubscriber);

module.exports = router; 