// Zamena za dotenv
const fs = require("fs");

const CONFIG_SOURCE = `${__dirname}/../../config.json`;
// ja ima patekata na nasiot konfiguraciski fajl

let config = null;

if (config === null) {
  const file = fs.readFileSync(CONFIG_SOURCE, "utf-8"); // config.json
  config = JSON.parse(file);
  // Vaka ke izgleda config koga ke se povika
  // config = {
  //    development:{...},
  //    staging: {...}
  //     live: {
  //       port: 8080,
  //       MONGO_USERNAME: "admin",
  //       MONGO_PASSWORD: "admin",
  //     },
  //   };
}

// getSection("development");

const getSection = (section) => {
  // section = "development"
  // !config[section] = config["development"] isto kako config.development
  // !config["development"] = false

  if (!config[section]) {
    throw `Configuration section ${section} does not exist!`;
  }

  return config[section];
  // development: {
  //         port: 3000,
  //         MONGO_USERNAME: "username",
  //         MONGO_PASSWORD: "lozinka",
  //         jwt_secret: "sto_podolga_tolku_pobezbedna"
  //     },
};

module.exports = { getSection };
