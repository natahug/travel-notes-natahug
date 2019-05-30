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

app.listen(1234, () => console.log("Listening on 1234"))
   .on("error", (e) => console.error(e));