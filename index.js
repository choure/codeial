const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

//use static files above layout
app.use(express.static('./assets'));

//we need to use layouts before calling any other routes,
//To tell app that we are using some sort of layout
app.use(expressLayouts);

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
