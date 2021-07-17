module.exports = {
  database: {
    host: process.env.HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "8462",
    database: process.env.DB_NAME || "vita_smile",
  },
};
