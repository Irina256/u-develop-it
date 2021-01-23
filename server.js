const db = require("./db/database");
const apiRoutes = require("./routes/apiRoutes");
const inputCheck = require("./utils/inputCheck");

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
app.use("/api", apiRoutes);
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.get("/", (req, res) => {
//   res.json({
//     message: "Hello World",
//   });
// });

// Default response for any other request(Not Found) Catch all
app.use((req, res) => {
  res.status(404).end();
});
// Start server after DB connection
db.connect("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
