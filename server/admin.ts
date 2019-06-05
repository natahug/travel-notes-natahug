import * as express from "express";
import {DB, Rows, InsertResult} from "./db";
import { async } from "q";
import * as bcrypt from "bcrypt";
import * as cookieParser from "cookie-parser";

let path = (req: express.Request): string => {
    return `${req.baseUrl}${req.path}`;
}

let router = express.Router();
//new object

//cookir parser will read and write secure cookies that are protected by our cookie secret
router.use(cookieParser(process.env.COOKIE_SECRET));

router.get("/", (req, res) => {
    res.render("admin/index", {
        layout: "admin"
    });
});

//login form
router.get("/login", (req, res) => {
    res.render("admin/login", {
        layout:"admin",
        message: req.query.message
    });
});

//test password validity
router.post("/login", async(req, res) => {
    let isValid = await bcrypt.compare(req.body.password, process.env.ADMIN_PASSWORD_HASH);
    if(isValid){
        res.cookie("authenticated", "true",{
            signed:true //by using the signed opetion, our cookie is secure
        });
        res.redirect(`${req.baseUrl}`); //redirect to main admin page
    } else {
        res.redirect(`${req.baseUrl}/login?message=Password Incorrect`);
    }
    // const SALT_ROUNDS = 12;
    // res.send(await bcrypt.hash(req.body.password, SALT_ROUNDS));
});

//logout
router.get("/logout", (req, res) => {
    res.clearCookie("authenticated");
    res.redirect(`${req.baseUrl}/login`);
});

//middleware to authenticate the user
router.use((req, res, next) => {
    if(req.signedCookies.authenticated) {
        next();
    } else {
        return res.redirect(`${req.baseUrl}/login`)
    }
});



//path will be admin/todos
//listing all todos
router.get("/todos", async(req, res)=> {
    let [rows] = await DB.query<Rows>("SELECT * FROM todos");
    res.render("admin/todos/index", {
        todos:rows, 
        layout:"admin"
    });

});
//defining this route above to ensure its tested

router.get("/todos/new",(req, res) => {
    res.render("admin/todos/editor",{
        action: `${req.baseUrl}/todos`,
        layout: "admin",
        todo: {
            description: "",
            url:"",
        },
    });
});
//the route for creating a new todo is just todos bc the the http spec says when you create a new resource, it should be suboridinate to the url you posted data to

router.post("/todos", async (req, res) => {
    try {
        let sql = `INSERT INTO todos
        (description, url)
        VALUES
        (:description, :url)`;
        let params = {
            description: req.body.description,
            url: req.body.url
        };

        if(req.body.description === ""){
            res.redirect(path(req) + "/new?message=Invalid Description");
            return;
        }
        //creating a new record in the DB is special bc we need to know the id that the DB assifned to our new record
        let [result] = await DB.execute<InsertResult>(sql, params);
        res.redirect(`${path(req)}/${result.insertId}?message=Saved!`);
    } catch(e) {
        console.error(e);
        res.redirect(`${path(req)}?message=Error Saving`);
    }
});


//view the editor
router.get("/todos/:id", async (req, res) => {


    let sql = "SELECT * FROM todos WHERE id=:id";
    let params = { id: req.params.id };

    try{
        let [rows] = await DB.query<Rows>(sql, params);
        if(rows.length ===1){
            res.render("admin/todos/editor", {
                todo: rows[0],
                action: path(req),
                layout:"admin",
                message: req.query.message
            });
        }else {
            res.redirect(`${path(req)}/../`);
        }
    }catch (e) {
        console.error(e);
        res.redirect(`${path(req)}/../`);
    }
});


router.post("/todos/:id", async (req, res) => {
    try {
        //you can use MYSQL workbench to generate this sql with specific values
        //replace specific values with placeholders prefixed by :
        let sql = `UPDATE todos     
                   SET description=:description, 
                       url=:url 
                   WHERE id=:id`;
        let params = {
            id: req.params.id,
            description: req.body.description,
            url: req.body.url
        };
        await DB.execute<Rows>(sql, params);
        res.redirect(`${path(req)}?message=Saved!`);
    } catch(e) {
        console.error(e);
        res.redirect(`${path(req)}?message=Error Saving`);
    }
});

//add delete support
router.post("/todos/:id/delete", async(req, res)=> {
    let sql = "DELETE FROM todos WHERE id=:id";
    let params = {
        id: req.params.id
    };
    try{
        await DB.execute<Rows>(sql, params);
        res.redirect(`${path(req)}/../../`);
    } catch (e){
        console.error(e);
        res.redirect(`${path(req)}/../../`);
    }
});

export default router;