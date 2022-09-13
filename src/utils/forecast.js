const request = require('request')



const forecast = (longitude, latitude, callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude +'&units=metric&appid=74cbc0fea13bb3bc08019b9daa632218'

    request({url, json: true}, (error, {body}) =>{

    if(error) 
    {
        callback('Something went wrong.')
    } 
    else if(body.error)
    {
        callback('Unable to find the provided location.')
    }
    else 
    {
        // const data = JSON.parse(response.body)

        callback(undefined, {
            CurrentTemperature : body.main.temp,
            WeatherType : body.weather[0].description,
            WindSpeed : body.wind.speed,
            Country : body.sys.country,
            TimeZone : body.timezone
        })
    }
    
})
}

module.exports = forecast