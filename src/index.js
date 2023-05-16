const fetch = require("node-fetch");
const path = require("path");
// const { sampleMiddlewareFn } = require("./middlewareFn");
const express = require("express");
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const bodyParser = require("body-parser");
const { demoAPI } = require("./controllers/adminController");
const {
  getOpenAPISpecFile,
  getAIPluginFile,
} = require("./controllers/openapiController");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminRouter);
// app.use(shopRouter);

app.get("/openapi.json", getOpenAPISpecFile);
app.get("/.well-known/ai-plugin.json", getAIPluginFile);

app.get(
  "/user/:id",
  (req, res, next) => {
    // if the user ID is 0, skip to the next route
    if (req.params.id === "0") next("route");
    // otherwise pass the control to the next middleware function in this stack
    else next();
  },
  (req, res, next) => {
    // send a regular response
    res.send("regular");
  }
);

// handler for the /user/:id path, which sends a special response
app.get("/user/:id", (req, res, next) => {
  res.send("special");
});

app.use(
  "/generic",
  (req, res, next) => {
    console.log(" use generic middleware", 1);
    next();
  },
  (req, res, next) => {
    console.log(" use generic middleware", 2);
    next();
  }
);
app.use(
  "/generic",
  (req, res, next) => {
    console.log(" use generic next stack middleware", 1);
    res.send({ stoppedExecutionOn: "use generic next stack middleware 1" });
  },
  (req, res, next) => {
    console.log(" use generic next stack middleware", 2);
    next();
  }
);
app.post(
  "/generic",
  (req, res, next) => {
    console.log(" use generic next get stack middleware", 1);
    next();
  },
  (req, res, next) => {
    console.log(" use generic next get stack middleware", 2);
    next();
  }
);

app.get("/demoAPI", demoAPI);

app.use("*", (req, res, next) => {
  res.status(400).render("404", { pageTitle: "404 Error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
