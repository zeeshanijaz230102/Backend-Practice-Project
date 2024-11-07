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
 