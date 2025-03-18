const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");
//-----------------------------------------

//-----------------------------------------

//----------- Sign Up ---------------------

exports.sendMailService = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.subject) {
    return next(
      new AppError(
        "Veuillez saisir votre adresse e-mail et Sujet de l'email",
        400
      )
    );
  }

  const message = `Bonjour,\n
  Merci de créer un compte a notre platform.\n
  Vore Compte est maintenant activer !`;
  try {
    await sendEmail({
      email: req.body.email,
      subject: req.body.subject || "Activation de compte",
      message,
    });
    res.status(201).json({
      status: "success",
      message: "Votre e-mail d'activation a été envoyé avec succès ",
    });
  } catch (err) {
    console.log(err);
    // newAccount.activeAccountToken = undefined;
    // newAccount.activeAccountTokenExpires = undefined;
    // newAccount.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "Une erreur s'est produite lors de l'envoi de l'e-mail ! Merci d'essayer plus tard .",
        500
      )
    );
  }
});
