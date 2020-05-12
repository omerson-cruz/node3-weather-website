const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, '../public'));

const app = express();  

// DEFINING the PATH this webserver
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// SERVING STATIC FILES (will first find index.html or any default public static html)
app.use(express.static(publicDirectoryPath));   
 
// CONFIGURING SETTING OF EXPRESS TO USE HBS(handlebars) MODULE as TEMPLATING ENGINE
app.set('view engine', 'hbs');
app.set('views', viewsPath);  // pointing the views FILE path into the "template" directory instead of the default view folder
hbs.registerPartials(partialsPath);  // pointing to the partial files 



// ROUTES

/** 1st argument of get is the route if it is root domain then empty string */
/** 2nd argument is  */
// Route

/** callback funct arguments (1st -> is object request containing details of the request)
 *                     (2nd -> response to the client requester (can be JSON, Text, etc.))
 */// this one will not be called since there is already the "app.use(<public path>)"
// app.get('', (req, res) => {          // Changed [6. Dynamic Pages with Templating @8:20
//     res.send('<h1>Weather</h1>');
// })

// express will automatically JSON.stringify the object before sending back to client
// app.get('/help', (req, res)=> {
//     res.send([{
//         name: 'Omerson',
//         age: 29
//     }, {
//         name: 'Joe', 
//         age: 28
//     }]);
// });

// app.get('/about', (req, res) => { 
//     res.send('<h1>About</h1>');
// });

// app.get('/weather', (req, res) => {
//     res.send({
//         location: 'Taytay, Rizal Philippines',
//         temperature: 27,
//         forecast: 'It is hotting',
//     });
// })

// app.get('/title', (req, res) => {
//     res.send('<h1>Title</h1>')
// })


// this will become the default page when you enter the main webisite in the browser
// argv2 => is the value we're sending to the .hbs template
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Omerson Cruz'
    });
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Omerson' ,
        helpText: 'This is some helpful text'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Omerson Cruz'
    })
})


// sending JSON file
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({       // return used here in order to stop sending back something to the request
            error: 'You must provide an address'
        })
    }
    console.log(req.query);

    //     geocode(req.query.address, (error, {latitude, longitude, location} <putting an default empty object value here>) => { [8.4 Default Function Params. @10:00

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){ 
            return res.send({ error })
            // shorthand for { error: error }
        } 

        /** CALLBACK  chaining by putting forecast here */
        forecast(latitude, longitude, (error, forecastData) => { 
            if (error){
                return console.log(error)
            }

            console.log(location);
            console.log(forecastData);

            res.send({
                forecast: forecastData, 
                location,   // using shorthand object property syntax
                address: req.query.address
            })
        }) 
    })
})


// For concept testing only 
app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }    
    console.log(req.query);
    res.send({
        products: []
    })
})




// 404: Web ERROR 
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Help Page Error',
        name: 'Omerson Cruz', 
        errorMessage: 'Help page not Found',
    })
})


app.get('*', (req, res)=> {
    res.render('404', {
        title: '404 ERROR',
        name: 'Omerson Cruz', 
        errorMessage: 'Help page not Found',
    })
})

// argv1 => port that the server will be listening to 
// argv2 => 
app.listen(3000, () => {
    console.log('Server is up on port 3000');
})




 

  