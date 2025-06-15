import ResponseCodes from "./ResponseCodes";

const getResponseCodeMessage = (code: keyof typeof ResponseCodes) => {
  switch (code) {
    case ResponseCodes.BAD_REQUEST.code:
      return "La requête est invalide.";
    case ResponseCodes.UNAUTHORIZED.code:
      return "Vous n'êtes pas autorisé à accéder à cette ressource.";
    case ResponseCodes.FORBIDDEN.code:
      return "Vous n'avez pas accès à cette ressource.";
    case ResponseCodes.NOT_FOUND.code:
      return "La ressource demandée n'existe pas.";
    case ResponseCodes.INTERNAL_SERVER_ERROR.code:
      return "Une erreur interne est survenue.";
    case ResponseCodes.REGISTER_SUCCESS.code:
      return "Inscription réussie.";
    case ResponseCodes.REGISTER_FAILED_USER_ALREADY_EXISTS.code:
      return "Cet email est déjà utilisé.";
    case ResponseCodes.LOGIN_SUCCESS.code:
      return "Connexion réussie.";
    case ResponseCodes.LOGOUT_SUCCESS.code:
      return "Déconnexion réussie.";
    case ResponseCodes.LOGOUT_FAILED_INVALID_TOKEN.code:
      return "Token invalide. Veuillez vous reconnecter.";
    default:
      return "Une erreur inconnue est survenue, veuillez réessayer plus tard.";
  }
};

export default getResponseCodeMessage;
