const express =require ('express');
const path=require('path')
const app= express();

// file system module present in express package 
const fs=require ('fs');

const port=5000;

// for using the form
// Setting parsers for form
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// for joining the paths of different folders
// express can look static files in this path 
//(__dirname/public) , __dirname = your working folder complete address 
app.use(express.static(path.join(__dirname,'public')))

// for ejs files
// we render ejs pages
app.set ('view engine' , 'ejs');

app.get("/" , function (req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index"  , {files: files});
    });
   
});


app.get("/file/:filename" , function (req,res){
    const file_name=req.params.filename;
    const file_Data=req.params.filedata;
    fs.readFile(`./files/${file_name}` , "utf-8" , function(err,filedata){
      res.render('show' , {filename: file_name , filedata, file_Data })
    });
   
});


app.post('/create' , function (req,res){
    // frontend se any wali request ka title  Task_title varibale me store hoga 
    const Task_title=req.body.title;
    const Task_detail=req.body.details;

    // Task_title.split(" ").join("") 
    // title ke words me se space ko kahatm ker ke words ko join karo
    fs.writeFile(`./files/${Task_title.split(" ").join("")}.txt` , Task_detail , function(err){
        // file banany ke bad '/' route per chala jaye ga
       
        console.log(Task_title);
        res.redirect("/")

    });
});


// dynamic routing
// put : before the part which to be dynamic
app.get("/profile/:username/:id" , (req,res)=>{
    var Username=req.params.username
    res.send(`Welcome : ${Username} , ID = ${req.params.id}`);
});

app.listen( port , function(){
    console.log(`its Running on port ${port}`);
});
 


















// OLD PRACTICE CODE AND THEORY


// const express= require("express") // Import the Express.js module


// // This app object will be used to define routes, middleware, 
// // and to listen for incoming requests.
// const app = express();  // This line initializes a new Express application
// const PORT =3000; // Define the port number for the server


// // MIDDLEWARE
// // kisi bhi route ke liye request aye gi to sab se pehly app.use chaly ga
// // next(); request koo aggy forward kery ga us route ko jis ke liye request ai thi 
// //jitny bhi app.use hon ge pahly wo sab chaly ge fir request required route
// // per jaye gi 
// app.use(function(req,res,next){
//     console.log("middleware chala");
//     next();
// });
// app.use(function(req,res,next){
//     console.log("middleware chala aik or barr");
//     next();
// });



// // abb routes creates karry ge / , /zeeshan are routes
// // app.get(route , request handler=>{}); 
// app.get('/' ,function ( req , res){
//     res.send ("SERVER RUNNING PERFECTLLY!");
// });

// app.get('/zee' , function(req , res){

//     // res.send("Hello world.....!");


//     response.send("Hello world.....!");
//     // it deals with error print it to vs code console and move execution to error handler
//     return next(new Error("Not implimented"));
// });
    

// // Eror handller
// app.use((err,req,res,next)=>{
//     console.error(err.stack);
//     res.status(500).send('Something Went wrong');
// });



// // app.listen(PORT, ...): 
// // Starts the server and makes it listen for requests on port 5000. 
// // When the server is successfully running, it will log
// // "Server is running on http://localhost:3000".
// //  With backticks we write messeges and include variables within them like ${var_name}
// app.listen(PORT , ()=>{
//     console.log(`Server is running perfectlly onnn http://localhost:${PORT}`);
// });