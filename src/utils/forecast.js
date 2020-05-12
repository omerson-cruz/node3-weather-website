// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&exclude=hourly&appid=381bd7caadb4e25669c82de852cf3407&units=metric';
    
    request({ url,    // used shorthand Object Property
        json: true, 
    }, 
    // (error, {response}) => {  // [13. @4:40 replaced with a destructured "body property of response"
        (error, {body}) => {
            if(error){          // if there is low level erro(e.g. NETWORK/Internet Error). error will not catch the error code received from the server [7. Handdling error @7:40]
                callback('Unable to connect to weather app service', undefined)
            } else if (body.message) {
                callback('Unable to find location', undefined);
            } else {    
                callback(undefined, body.current.weather[0].description + '. It is currently ' + body.current.temp +
                    ' degrees out. There is a ' + body.current.clouds + '% chance of raining.');
            }
        }
    );
}





  module.exports = forecast;