const cron = require('node-cron')
const shell = require('shelljs')
const express = require('express')
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 6000

const server = app.listen(
    PORT,
    cron.schedule('0 0 * * *', function() {
        console.log('resetEmailCron running...')
        if(shell.exec("node sayHello.js").code !== 0) {
            console.log("Something went wrong")
        }
    })
  )