const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, './public')

// import from utils
const {get_client_details, write_details_to_csv} = require('./utils')
// file to write clients details
const csvFilename = "./data/clients.csv";

app.use(bodyParser.json())
// handle with crollers activitiy
app.use('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send("User-agent: *\nDisallow: /");
});

app.get('/', (req, res) => {
    res.sendFile(`${publicDirectoryPath}/l.html`)
})

app.get('/homePage', (req, res) => {
    res.sendFile(`${publicDirectoryPath}/index.html`)
})

app.post('/d', (req, res) => {
    const client_details = get_client_details(req, res)
    write_details_to_csv(csvFilename, client_details)
    res.send({data : ''})
})

app.listen(port, () => {
  console.log(`server listening at http://63.250.35.162:${port}`)
})

/////////////// not obfuscated js //////////////////////////////////////

// const b = new Date()
// const nl = navigator.languages.toString()
// const d = {
//     dd : b.toString(),
//     nl
// }
// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(d)
// }
// fetch('/d', options)
// .then((res) => {})
// .catch(err => console.log(`The error is: ${err}`))

////////////////////////////////////////////////////////////////////////