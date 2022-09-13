const request = require('request')

const geocode = (address = 'lahore', callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1IjoiZmlhei1zaGFoNzIiLCJhIjoiY2ttdGlzY29wMGxueDJxbXczNXoxMm1vbCJ9.FIANee-D8_wJ8u8kQFEVig'

    request({url, json: true}, (error, {body}) =>{
        if(error)
        {
            callback('Something went wrong.')
        }
        else if(body.message)
        {
            callback('Unable to connect to API SERVICE')
        }
        else
        {
            // const data = JSON.parse(response.body)

            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
            
        }
    })
}

module.exports = geocode