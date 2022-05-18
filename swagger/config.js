const basicInfo = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Acensio Api",
    description: "Acensio Api Application API",
  },
};

const server = [
  {
    url: "http://localhost:3000",
    description: "Acensio API Documentation",
  },
  {
    url: "",
    description: "Acensio API Documentation",
  },
];

module.exports = {
  basicInfo,
  server,
};
