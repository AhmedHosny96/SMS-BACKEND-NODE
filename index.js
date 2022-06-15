const app = require("express")();
const winston = require("winston");
const cors = require("cors");

app.use(cors());
require("dotenv").config();
require("./config/db");
// require("./routes/subjects.route")(app);
require("./startup/routes")(app);
require("./startup/logging")();

const port = process.env.PORT;

app.listen(port, () => {
  winston.info(`listening on port ${port}`);
});
