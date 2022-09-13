const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { dirname } = require('path')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//PACKAGES USED - Express, hbs

const app = express()

//FOR HEROKU OR LOCAL-MACHINE(3000)
const port = process.env.PORT || 3000

//SETTING UP DIRECTORY FOR STATIC ASSETS
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

//SETTING UP CUSTOM PATH FOR HANDLEBARS FOR EXPRESS SERVER
const viewsPath = path.join(__dirname, '../templates/views')

//SETTING UP PARTIALS PATH - PARTIALS ARE BASICALLY SMALL PARTS OF AN HTML PAGE THAT ARE RE-USABLE THROUGHTOUT THE WHOLE SITE
const partialsPath = path.join(__dirname, '../templates/partials')

//TEMPLATING ENGINE for using HANDLEBARS with EXPRESS SERVER - USED FOR DYNAMIC HTML
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res)=>{
    res.render('index', {
        title: 'WEB WEATHER APP',
        name : 'FAIZY'
    })
})


app.get('/about', (req, res)=>{
    res.render('about', {
        title : 'ABOUT PAGE',
        name : 'ASAD'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title : 'HELP PAGE',
        name : 'MONI'
    })
})


//http://localhost:3000/weather?address=lahore
app.get('/weather', (req, res)=>{

    if(!req.query.address)
    {
        return res.send({
            error : 'No address provided.'
        })
    }

    geocode(req.query.address, (error, data)=>{
    
        //OBJECT DESTRUCTURING
        const {longitude:lg, latitude:lt, location} = data 
        
        forecast(lg, lt, (error, forecastdata)=>{
            if(error) return
            
            //OBJECT DESTRUCTURING
            const {CurrentTemperature: ct, WeatherType: wt, WindSpeed, Country, TimeZone: tz} = forecastdata
    
            // console.log('Location : '+ location)
    
            // console.log('Current Temperature : '+ ct)
            // console.log('Weather Type : '+ wt)
            // console.log('Wind speed : '+ WindSpeed)
            // console.log('Country : '+ Country)
            // console.log('Time Zone : '+ tz)

            res.send({
                location: location,
                CurrentTemperature : ct,
                WeatherType : wt,
                WindSpeed: WindSpeed,
                Country: Country,
                TimeZone: tz
            })
        })
    })


    
})


app.get('/products', (req, res)=>{

    if(!req.query.search)
    {
        return res.send({
            error : 'You must provide a search term'
        })
    }
    
    res.send({
        products : []
    })
    
})


//THIS NEEDS TO COME LAST
app.get('*', (req, res)=>{
    res.render('404', {
        title : '404 PAGE',
        name : 'CHOTY SHAH'
    })
})



//FOR LOCAL SETUP
app.listen(port, ()=>{
    console.log('Server is running on port '+ port)
})