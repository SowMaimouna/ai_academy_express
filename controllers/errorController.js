const httpStatus = require("http-status-codes"); 


exports.pageNotFoundError = (req, res) => {
    console.log("404 captée sur :", req.url);
    res.status(404).render("error", {
      pageTitle: "Page introuvable",
      errorCode: 404,
      message: "La page demandée n'existe pas."
    });
  };
  
  exports.internalServerError = (error, req, res, next) => {
    console.log("500 captée :", error.message);
    res.status(500).render("error", {
      pageTitle: "Erreur serveur",
      errorCode: 500,
      message: "Une erreur interne du serveur est survenue."
    });
  };
   