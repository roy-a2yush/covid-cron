const cron = require('node-cron')
const shell = require('shelljs')

cron.schedule('0 0 * * *', function() {
    console.log('resetEmailCron running...')
    if(shell.exec("node sayHello.js").code !== 0) {
        console.log("Something went wrong")
    }
})