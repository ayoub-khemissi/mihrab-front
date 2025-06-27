const ResponseCodes = {
  BAD_REQUEST: { status: 400, code: "BAD_REQUEST" },
  UNAUTHORIZED: { status: 401, code: "UNAUTHORIZED" },
  FORBIDDEN: { status: 403, code: "FORBIDDEN" },
  NOT_FOUND: { status: 404, code: "NOT_FOUND" },
  INTERNAL_SERVER_ERROR: { status: 500, code: "INTERNAL_SERVER_ERROR" },

  REGISTER_SUCCESS: { status: 201, code: "REGISTER_SUCCESS" },
  REGISTER_FAILED_USER_ALREADY_EXISTS: {
    status: 409,
    code: "REGISTER_FAILED_USER_ALREADY_EXISTS",
  },

  REGISTER_PROFILE_MOSQUE_MANAGER_SUCCESS: {
    status: 201,
    code: "REGISTER_PROFILE_MOSQUE_MANAGER_SUCCESS",
  },

  REGISTER_PROFILE_IMAM_SUCCESS: {
    status: 201,
    code: "REGISTER_PROFILE_IMAM_SUCCESS",
  },

  LOGIN_SUCCESS: { status: 200, code: "LOGIN_SUCCESS" },

  LOGOUT_SUCCESS: { status: 200, code: "LOGOUT_SUCCESS" },
  LOGOUT_FAILED_INVALID_TOKEN: {
    status: 401,
    code: "LOGOUT_FAILED_INVALID_TOKEN",
  },
};

export default ResponseCodes;
