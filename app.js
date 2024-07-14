import express from "express";
import chalk from "chalk";
import debug from "debug";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import sessionsRouter from "./src/routers/sessionsRouter.js";
import adminRouter from "./src/routers/adminRouter.js";
import authRouter from "./src/routers/authRouter.js";
import passport from 'passport'
import cookieParser from "cookie-parser";
import session from "express-session";

const PORT = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// mongodb+srv://saksben2:3Na1MoIQu4fE6fQB@globomantics.3v6qzpv.mongodb.net/?retryWrites=true&w=majority&appName=Globomantics

// .use() means middleware
// app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/"))); // Look into this folder to find an index.html page
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({secret: 'globomantics', resave: false, saveUninitialized: false}))

import passportConfig from "./src/config/passport.js";
passportConfig(passport)

app.set("views", "./src/views");
app.set("view engine", "ejs");

// Since the html for Sessions link navigates to the href="sessions", this is middleware setting the /sessions endpoint to the sessionsRouter router
app.use("/sessions", sessionsRouter);
app.use("/admin", adminRouter);
app.use('/auth', authRouter)

app.get("/", (req, res) => {
  //   res.send("Hello from my app"); // Becomes default if nothing found from path
  res.render("index", { title: "Globomantics", data: ["a", "b", "c"] });
});

app.listen(PORT, () => {
  console.log(`listening to port ${chalk.green(PORT)}`);
});
