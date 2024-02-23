const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose'); //setting up db connection beffore firing up express

app.use(express.urlencoded());

app.use(cookieParser());

//use static files above layout
app.use(express.static('./assets'));

//use layouts before calling any other routes,
//To tell app that we are using some sort of layout
app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error on running the server: ${err}`);
        return;
    }
    console.log(`Server is up and running on port: ${port}`);
});
