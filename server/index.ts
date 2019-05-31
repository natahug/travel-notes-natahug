import * as express from "express";
import * as exphbs from "express-handlebars";

let app = express();

app.set("view engine", "hbs");
app.set("views", "server/views");
app.engine("hbs", exphbs({
    defaultLayout: "default",
    extname: "hbs",
}));

app.use(express.static("dist/"));

app.get("/", (req, res) => {
    res.render("index",
    {layout: "default-home.hbs",
    title: "README"},
    
    );
});

app.get("/about", (req, res) => {
    res.render("about",
    {title: "About"}
    );
});

app.get("/bucket", (req, res) => {
    res.render("bucket", 
    {title: "Bucket List"});
});

app.get("/gallery", (req, res) => {
    res.render("gallery",
    {title: "Photo Gallery"});
});

const PORT = process.env.NODE_ENV === "production" ? 80 : 1234;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
   .on("error", (e) => console.error(e));