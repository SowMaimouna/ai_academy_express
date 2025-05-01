const express = require("express"); 
const router = express.Router(); 
const authController = require("../controllers/authController"); 
const authController = require("../controllers/authController"); 

// Vérifie que l'utilisateur est connecté pour toutes les routes 
router.use(authController.ensureLoggedIn); 

// Routes d'authentification 
router.get("/login", authController.login); 
router.post("/login", authController.authenticate); 
router.get("/logout", authController.logout, usersController.redirectView); 
router.get("/signup", authController.signup); 
router.post("/signup", authController.register, usersController.redirectView); 
// Routes protégées - accessibles uniquement aux utilisateurs connectés 
router.use("/users", authController.ensureLoggedIn); 
router.use("/courses/new", authController.ensureLoggedIn); 
router.use("/courses/:id/edit", authController.ensureLoggedIn); 

module.exports = router; 
