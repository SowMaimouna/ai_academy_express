const Subscriber = require("../models/subscriber");
exports.getAllSubscribers = (req, res, next) => { 
Subscriber.find({}) 
.exec() 
.then(subscribers => { 
res.render("subscribers/index", { 
subscribers: subscribers 
}); 
}) 
.catch(error => { 
console.log(`Erreur lors de la récupération des abonnés: ${error.message}`); 
next(error); 
}); 
}; 
exports.getSubscriptionPage = (req, res) => { 
res.render("subscribers/new"); 
}; 
// exports.saveSubscriber = (req, res) => { 
// let newSubscriber = new Subscriber({ 
// name: req.body.name, 
// email: req.body.email, 
// zipCode: req.body.zipCode 
// }); 
// newSubscriber.save() 
// .then(result => { 
// res.render("subscribers/thanks"); 
// }) 
// .catch(error => { 
// if (error) res.send(error); 
// }); 
// }; 
exports.saveSubscriber = (req, res) => {
    const { name, email, zipCode } = req.body;
  
    const errors = [];
  
    // Nom : obligatoire, min. 2 caractères
    if (!name || name.trim().length < 2) {
      errors.push("Le nom est requis (au moins 2 caractères).");
    }
  
    // Email : format valide requis
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push("Adresse email invalide.");
    }
  
    // Code postal : 5 chiffres requis
    const zipCodeRegex = /^\d{5}$/;
    if (!zipCode || !zipCodeRegex.test(zipCode)) {
      errors.push("Le code postal doit contenir exactement 5 chiffres.");
    }
  
    // Si erreurs, on renvoie au formulaire avec les infos + message
    if (errors.length > 0) {
      req.session.alertMessage = errors.join(" ");
      req.session.formData = { name, email, zipCode };
      return res.redirect("/subscribers/new");
    }
  
    // Si tout est bon : on enregistre l’abonné
    const newSubscriber = new Subscriber({ name, email, zipCode });
    newSubscriber.save()
      .then(() => {
        res.redirect("/subscribers/thanks");
      })
      .catch(error => {
        console.error("Erreur lors de l'enregistrement :", error);
        res.status(500).send("Erreur serveur.");
      });
  };
  
exports.show = (req, res, next) => { 
let subscriberId = req.params.id; 
Subscriber.findById(subscriberId) 
.then(subscriber => { 
res.render("subscribers/show", { 
subscriber: subscriber 
}); 
}) 
.catch(error => { 
console.log(`Erreur lors de la récupération d'un abonné par ID: ${error.message}`); 
next(error); 
}); 
};
exports.deleteSubscriber = (req, res) => {
    const subscriberId = req.params.id;
  
    Subscriber.findByIdAndDelete(subscriberId)
      .then(() => {
        console.log("Abonné supprimé :", subscriberId);
        res.redirect("/subscribers");
      })
      .catch(error => {
        console.error("Erreur lors de la suppression :", error);
        res.status(500).send("Erreur serveur lors de la suppression.");
      });
};
// Affiche le formulaire prérempli
exports.editSubscriber = (req, res) => {
    const id = req.params.id;
    Subscriber.findById(id)
      .then(subscriber => {
        if (!subscriber) return res.redirect("/subscribers");
        res.render("subscribers/edit", {
          pageTitle: "Modifier l'abonné",
          subscriber
        });
      })
      .catch(error => {
        console.error("Erreur de chargement :", error);
        res.status(500).send("Erreur serveur.");
      });
  };
  
  // Met à jour les données
  exports.updateSubscriber = (req, res) => {
    const id = req.params.id;
    const { name, email, zipCode } = req.body;
  
    Subscriber.findByIdAndUpdate(id, { name, email, zipCode })
      .then(() => {
        req.session.alertMessage = "Abonné modifié avec succès.";
        res.redirect(`/subscribers/${id}`);
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour :", error);
        res.status(500).send("Erreur serveur lors de la mise à jour.");
      });
  };
  exports.searchSubscriber = (req, res) => {
    const searchQuery = req.query.q;
    const regex = new RegExp(searchQuery, "i");
  
    Subscriber.find({
      $or: [
        { name: regex },
        { zipCode: regex }
      ]
    })
      .then(subscribers => {
        res.render("subscribers/index", {
          pageTitle: "Résultats de recherche",
          subscribers
        });
      })
      .catch(error => {
        console.error("Erreur de recherche :", error);
        res.status(500).send("Erreur serveur pendant la recherche.");
      });
  };
  
  