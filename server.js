const express = require("express");
const setupRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupRoutes(app);

app.listen(PORT, () => {
  console.log(`Accédez à l'application sur http://localhost:${PORT}`);
});
