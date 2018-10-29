const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

clear()

console.log(
    chalk.red(
        figlet.textSync('G-easy', {
            horizontalLayout: 'full'
        })
    )
)
