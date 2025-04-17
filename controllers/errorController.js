const httpStatus = require("http-status-codes"); 
// exports.pageNotFoundError = (req, res) => {
//     console.log("404 captée sur :", req.url);
//     console.log("Variables envoyées :", {
//         pageTitle: "Page introuvable",
//         errorCode: 404,
//         message: "La page demandée n'existe pas."
//     });
//     res.status(404).render("error", {
//         pageTitle: "Page introuvable",
//         errorCode: 404,
//         message: "La page demandée n'existe pas."
//     });
// };
// exports.internalServerError = (error, req, res, next) => {
//     let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
//     console.log(`Erreur: ${error.stack}`);
//     console.log("Variables envoyées :", {
//         pageTitle: "Erreur 500",
//         errorCode: errorCode,
//         message: "Erreur interne du serveur"
//     });
//     res.status(errorCode).render("error", {
//         pageTitle: "Erreur 500",
//         errorCode: errorCode,
//         message: "Erreur interne du serveur"
//     });
// };

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
   