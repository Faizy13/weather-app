console.log('CLient side javascript')





const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')



weatherform.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    message1.textContent = 'LOADING...'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?address='+ location).then((res)=>{
    res.json().then((data)=>{
        if(data.error)
        {
            console.log(data.error)
            message1.textContent = data.error
        }
        else
        {
            console.log(data)
            message1.textContent = data.location
            message2.textContent = data.WeatherType
        }
        
    })
})

})