const express = require("express"); 
const router = express.Router(); 
const errorController = require("../controllers/errorController"); 
const authController = require("../controllers/authController"); 

// Vérifie que l'utilisateur est connecté pour toutes les routes 
router.use(authController.ensureLoggedIn); 

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

module.exports = router; 
