const LOGGER_TAGS = {
  FOOTPRINT: "footprint",
  HEALTHCHECK: "healthcheck",
  TEST: "test",
  SCHEDULER: "scheduler",
  ADMIN: "admin",
  AWS: "aws",
};

const ENVIRONMENTS = {
  LOCAL: "local",
  DEVELOPMENT: "development",
  STAGING: "staging",
  PRODUCTION: "production",
};

const HTTP_STATUS = {
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  MOVED_TEMPORARILY: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  TEMPORARY_REDIRECT: 307,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIME_OUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  REQUEST_ENTITY_TOO_LARGE: 413,
  "REQUEST-URI TOO LARGE": 414,
  "UNSUPPORTED MEDIA TYPE": 415,
  "REQUESTED RANGE NOT SATISFIABLE": 416,
  "EXPECTATION FAILED": 417,
  "I'M A TEAPOT": 418,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  "FAILED DEPENDENCY": 424,
  "UNORDERED COLLECTION": 425,
  "UPGRADE REQUIRED": 426,
  "PRECONDITION REQUIRED": 428,
  "TOO MANY REQUESTS": 429,
  "REQUEST HEADER FIELDS TOO LARGE": 431,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIME_OUT: 504,
  "HTTP VERSION NOT SUPPORTED": 505,
  "VARIANT ALSO NEGOTIATES": 506,
  INSUFFICIENT_STORAGE: 507,
  BANDWIDTH_LIMIT_EXCEEDED: 509,
  NOT_EXTENDED: 510,
  NETWORK_AUTHENTICATION_REQUIRED: 511,
};

module.exports = {
  LOGGER_TAGS,
  HTTP_STATUS,
  ENVIRONMENTS,
};
