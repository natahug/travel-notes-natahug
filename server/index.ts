import * as dotenv from "dotenv";
dotenv.config();

import { DB, Rows } from "./db";

import * as express from "express";
import * as exphbs from "express-handlebars";
import { async } from "q";
import admin from "./admin";

let app = express();

app.set("view engine", "hbs");
app.set("views", "server/views");
app.engine("hbs", exphbs({
    defaultLayout: "default",
    extname: "hbs",
}));

app.use(express.static("dist/"));
app.use(express.urlencoded({extended: true}));

app.use("/admin", admin);

// app.use(express.static("client/"));

app.get("/", async(req, res) => {
    let [rows] =  await DB.query<Rows>("SELECT * FROM posts ORDER BY publishAt DESC");
    res.render("index", {posts:rows, layout: "default-home.hbs",
    title: "README"});
});

app.get("/todos.json", async (req, res)=> {
    let results =  await DB.query<Rows>("SELECT * FROM todos");
    let rows = results[0];
    res.json(rows);
});

app.get("/todos", async (req, res)=> {
    let [rows] =  await DB.query<Rows>("SELECT * FROM todos");
    res.render("todos-demo", {todos:rows});

});

app.get("/todos/:id", async(req, res) => {
    let [rows] = await DB.query<Rows>("SELECT * FROM todos WHERE id = :id", {id: req.params.id});
    res.json(rows);
});



app.get("/about", (req, res) => {
    res.render("about",
    {title: "About"}
    );
});

app.get("/bucket", (req, res) => {
    res.render("bucket", 
    {title: "TODO"});
});

app.get("/gallery", (req, res) => {
    res.render("gallery",
    {title: "Gallery"});
});

export let main = async () => {
//const PORT = process.env.NODE_ENV === "production" ? 80 : 1234;
app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`))
   .on("error", (e) => console.error(e));
};
main();