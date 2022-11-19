export const statusCodes = {
  OK: 200,
  NOT_FOUND: 404,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NO_CONTENT: 204,
  INTERNAL_ERROR: 500,
};

export const PORT = process.env.PORT ?? 3001;

export const MIN_USERNAME_LENGTH = 3;
