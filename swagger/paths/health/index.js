const getHealth = {
  get: {
    tags: ["Health End-Points"],
    summary: "API for Health End-Point",
    security: [
      {
        bearerAuth: [],
      },
    ],

    responses: {
      200: {
        description: "Success",
      },
    },
  },
};

module.exports = {
  getHealth,
};
