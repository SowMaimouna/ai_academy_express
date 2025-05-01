const express = require("express"); 
const router = express.Router(); 
const homeController = require("../controllers/homeController"); 
const authController = require("../controllers/authController"); 

// Vérifie que l'utilisateur est connecté pour toutes les routes 
router.use(authController.ensureLoggedIn); 

router.get('/favicon.ico', (req, res) => res.status(204));
router.get("/", homeController.index);
router.get("/about", homeController.about);
//router.get("/courses", homeController.courses);
router.get("/contact", homeController.contact);
router.post("/contact", homeController.processContact);
router.get("/faq", homeController.faq);
router.get("/thanks", (req, res) => {
  const formData = req.session.formData;
  if (!formData) return res.redirect("/contact"); // empêche accès direct

  delete req.session.formData; // nettoyer après usage
  res.render("thanks", { pageTitle: "Merci", formData });
});

module.exports = router; 