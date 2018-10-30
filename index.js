const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const viae = require('./lib/viae')
const intro = chalk.bold.hex('#03a6ff')

require('dotenv').config({
	path: '~/Projects/viae/.env'
})

clear()

console.log(intro(
	figlet.textSync('viae™', {
		horizontalLayout: 'full'
	})
))

viae()
