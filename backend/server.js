const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//setting up config file
dotenv.config({ path: "config/config.env" });

//connecting to databse
connectDatabase();
const PORT = process.env.PORT || 3000;
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT:  ${PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//Handle unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`ERROR:${err.stack}`);
  console.log("Shutting down the server due to unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
