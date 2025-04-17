// Données des cours (seront remplacées par une base de données plus tard)                                                                                                                                 
const courses = [ 
{ 
title: "Introduction à l'IA", 
description: "Découvrez les fondamentaux de l'intelligence artificielle.", 
price: 199, 
level: "Débutant" 
}, 
{ 
title: "Machine Learning Fondamental", 
description: "Apprenez les principes du machine learning et les algorithmes de base.", 
price: 299, 
level: "Intermédiaire" 
}, 
{ 
title: "Deep Learning Avancé", 
description: "Maîtrisez les réseaux de neurones profonds et leurs applications.", 
price: 399, 
level: "Avancé" 
} 
]; 
exports.index = (req, res) => { 
res.render("index", { pageTitle: "Accueil" }); 
}; 
exports.about = (req, res) => { 
res.render("about", { pageTitle: "À propos" }); 
}; 
// exports.courses = (req, res) => { 
// res.render("courses", {  
// pageTitle: "Nos Cours",  
// courses: courses  
// }); 
// }; 
exports.courses = (req, res) => {
  const selectedLevel = req.query.level;
  const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;

  let filteredCourses = courses;

  if (selectedLevel) {
    filteredCourses = filteredCourses.filter(course => course.level === selectedLevel);
  }

  if (maxPrice !== null) {
    filteredCourses = filteredCourses.filter(course => course.price <= maxPrice);
  }

  res.render("courses", {
    pageTitle: "Nos Cours",
    courses: filteredCourses,
    selectedLevel,
    maxPrice
  });
};

exports.contact = (req, res) => { 
res.render("contact", { pageTitle: "Contact" }); 
}; 

exports.processContact = (req, res) => {
  const { name, email, course, message } = req.body;

  const errors = [];

  // Validation du nom
  if (!name || name.trim().length < 2) {
    errors.push("Le nom est requis (au moins 2 caractères).");
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Adresse email invalide.");
  }

  // Validation du message
  if (!message || message.trim().length < 10) {
    errors.push("Le message doit contenir au moins 10 caractères.");
  }

  if (errors.length > 0) {
    // En cas d’erreurs, on enregistre les messages et on renvoie le formulaire
    req.session.alertMessage = errors.join(" ");
    req.session.formData = { name, email, course, message };
    return res.redirect("/contact");
  }

  // Si tout est OK, rediriger vers la page de remerciement
  req.session.formData = { name, email, course, message };
  res.redirect("/thanks");
};


exports.faq = (req, res) => { 
  res.render("faq", { pageTitle: "FAQ" }); 
};
// exports.processContact = (req, res) => {
//   // Ici, tu peux ajouter une logique de traitement (ex: envoi d’email)
  
//   req.session.successMessage = "Votre message a été envoyé avec succès !";
//   res.redirect("/contact");
// };


// exports.processContact = (req, res) => { 
//   console.log("Données du formulaire reçues:"); 
//   console.log(req.body); 
//   res.render("thanks", {  
//   pageTitle: "Merci",  
//   formData: req.body  
//   }); 