require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const massive = require("massive");
const authCtrl = require("./controllers/authController");
const monthController = require("./controllers/monthController");
const categoryController = require("./controllers/categoryController");
const transactionController = require("./controllers/transactionController");

const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    console.log("db connected");
  })
  .catch((err) => console.log(err));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//# AUTH ENDPOINTS
app.get("/auth/user", authCtrl.getUser);
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.delete("/auth/logout", authCtrl.logout);

//# MONTH ENDPOINTS
app.get("/api/months/:id", monthController.getMonths);
app.post("/api/month/:id", monthController.addMonth);
app.delete("/api/month/:id/:userId", monthController.deleteMonth);

//#CATEGORY ENDPOINTS
app.get("/api/categories/:id", categoryController.getCategories);
app.post("/api/category/:id", categoryController.addCategory);
app.put("/api/category/:id", categoryController.editCategory);
app.delete("/api/category/:id/:userId", categoryController.deleteCategory);

//#TRANSACTION ENDPOINTS
app.get('/api/trans/:id', transactionController.getTransactions);
app.post('/api/trans/:id', transactionController.addTransaction);
app.put('/api/trans/:id', transactionController.editTransaction);
app.delete('/api/trans/:id/:monthId', transactionController.deleteTransaction);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
