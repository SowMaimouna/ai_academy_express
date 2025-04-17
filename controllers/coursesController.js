const Course = require("../models/course");
const Enrollment = require("../models/enrollment");

// Fonction utilitaire pour extraire les paramètres du cours du corps de la requête 
const getCourseParams = body => {
  return {
    title: body.title,
    description: body.description,
    maxStudents: body.maxStudents,
    cost: body.cost
  };
};

module.exports = {
  index: (req, res, next) => {
    Course.find({})
      .then(courses => {
        res.locals.courses = courses;
        next();
      })
      .catch(error => {
        console.log(`Erreur lors de la récupération des cours: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("courses/index");
  },

  new: (req, res) => {
    res.render("courses/new");
  },

  create: (req, res, next) => {
    let courseParams = getCourseParams(req.body);
    Course.create(courseParams)
      .then(course => {
        res.locals.redirect = "/courses";
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Erreur lors de la création du cours: ${error.message}`);
        res.locals.redirect = "/courses/new";
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  show: async (req, res, next) => {
    const courseId = req.params.id;
  
    try {
      const course = await Course.findById(courseId);
      const enrollments = await Enrollment.find({ course: courseId });
  
      res.locals.course = course;
      res.locals.enrollments = enrollments;
      next();
    } catch (error) {
      console.error("Erreur show cours :", error);
      next(error);
    }
  }
  ,

  showView: (req, res) => {
    res.render("courses/show");
  },

  edit: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then(course => {
        res.render("courses/edit", {
          course: course
        });
      })
      .catch(error => {
        console.log(`Erreur lors de la récupération du cours par ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let courseId = req.params.id,
      courseParams = getCourseParams(req.body);

    Course.findByIdAndUpdate(courseId, {
      $set: courseParams
    })
      .then(course => {
        res.locals.redirect = `/courses/${courseId}`;
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Erreur lors de la mise à jour du cours par ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let courseId = req.params.id;
    Course.findByIdAndRemove(courseId)
      .then(() => {
        res.locals.redirect = "/courses";
        next();
      })
      .catch(error => {
        console.log(`Erreur lors de la suppression du cours par ID: ${error.message}`);
        next();
      });
  },
  enrollForm: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then(course => {
        if (!course) return res.redirect("/courses");
        res.render("courses/enroll", {
          pageTitle: "Inscription au cours",
          courseId,
          course
        });
      })
      .catch(error => {
        console.error("Erreur de chargement :", error);
        res.status(500).send("Erreur serveur.");
      });
  },
  processEnrollment: (req, res, next) => {
    const courseId = req.params.id;
    const { name, email } = req.body;
  
    Enrollment.create({
      name,
      email,
      course: courseId
    })
      .then(() => {
        req.session.alertMessage = `Merci ${name}, vous êtes inscrit au cours avec succès !`;
        res.redirect(`/courses/${courseId}`);
      })
      .catch(error => {
        console.error("Erreur d'inscription :", error);
        res.status(500).send("Erreur serveur lors de l'inscription.");
      });
  }
  
};
