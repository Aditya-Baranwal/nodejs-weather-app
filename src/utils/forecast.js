const request = require('request');

const requestWeather = (lat,long,location,callback) => {
    const url1 = 'https://api.darksky.net/forecast/6315321d6f04ad11956c444f1edd7be0/'+lat+','+long;
    request({url : url1},(error,response) => {
        if(error) callback("Unable To Connect Weather Service.",undefined);
        else if(response.body.error) callback(response.body.error,undefined);
        else {
            const apiData = JSON.parse(response.body);
            const temperature = ((apiData.currently.temperature-32)*0.55).toPrecision(4);
            const weather = apiData.daily.data[0].summary+' It is currently '+temperature+' degree Celsius.'; 
            callback(undefined,{ weather : weather, temperature : temperature, location : location });
        }
    });
};

module.exports = {
    requestWeather : requestWeather
}