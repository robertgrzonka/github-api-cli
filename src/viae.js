/* Require modules */

const inquirer = require('inquirer')
const chalk = require('chalk')
const clear = require('clear')
const github = require('./github.js')
const octokit = require('@octokit/rest')
const CLI = require('clui')
const Spinner = CLI.Spinner
const Configstore = require('configstore')

const conf = new Configstore('viae', {
	good: 'morning'
})

/* Setups */
const header = chalk.bold.blueBright
const docs = chalk.gray
const info = chalk.bold.hex('#03a6ff')
const alert = chalk.bold.yellow

const statusAuthWait = new Spinner('Authenticating. Give us a second ▲')
const statusAuthDone = console.log(info('✓ Done!'))

/* UI BottomBar setup */
const ui = new inquirer.ui.BottomBar()
ui.log.write(`${chalk.bold.white.bgBlue('GitHub API CLI™')}`)


const viae = () => {
	/* Start */
	let whichAuth = {
		type: 'list',
		name: 'auth',
		message: 'Which authentication method would you like to choose?',
		choices: ['Basic', 'OAuth', new inquirer.Separator(), 'Exit']
	}

	function main() {
		console.log(header('\nAuthentication method.') + docs('\nMore: https://developer.github.com/v3/auth/\n'))
		makeAChoice()
	}

	/* Choose authentication method */
	function makeAChoice() {
		inquirer.prompt(whichAuth).then(answers => {
			if (answers.auth === 'Basic') {
				clear()
				console.log(header('\nTo use Basic Authentication with the GitHub API, simply send the username and password associated with the account.\n'))
				getBasicCredentials()
			} else if (answers.auth === 'OAuth') {
				clear()
				console.log(header('\nOAuth requires personal access token or OAuth token instead your password.\n'))
				getOauthCredentials()
			} else {
				clear()
				console.log('Bye!')
			}
		})
	}

	function getBasicCredentials() {
		const credentials = [{
			type: 'input',
			name: 'username',
			message: 'Username: ',
			validate: value => value ? true : 'Enter your username.'
		}, {
			type: 'password',
			name: 'password',
			message: 'Password: ',
			validate: value => value.length >= 6 ? true : 'Your GitHub password should have at least 6 signs.'
		}]
		ui.updateBottomBar(docs(`${chalk.bold('Note: ')}we do not store your password.\nMore info here: https://security.theguys.app\n\n`))
		return inquirer.prompt(credentials)
	}

	function getOauthCredentials() {
		let credentials = {
			type: 'list',
			name: 'createToken',
			message: `Whould you like to create ${chalk.bold('new token')} or use ${chalk.bold('existing one')}?`,
			choices: ['I would like to create new token', 'I will ustick with already created ones', new inquirer.Separator(), 'Change my mind. Take me to Basic Authentication.']
		}

		inquirer.prompt(credentials).then(answers => {
			let createToken = answers.createToken
			if (createToken === 'I would like to create new token') {
				createNewToken() // function for creating new token
			} else if (createToken === 'I will stick with already created ones') {
				useExistingToken() // function to get token in input
			} else {
				getBasicCredentials() // back to the Basic Authentication
			}
		})

	}

	/* Functions for tokens */
	function createNewToken() {
		let tokenCredentials = [{
			type: 'input',
			name: 'username',
			message: 'Username: ',
			validate: value => value ? true : 'Enter your username.'
		}, {
			type: 'password',
			name: 'token',
			message: 'Token: ',
			validate: value => value ? true : 'There is no chance it will work with this \"token\"'
		}]
		inquirer.prompt(tokenCredentials)
		ui.log.write(alert('\nviae™ will now create token in your GitHub profile. You will need `username` and token with odpowiednimi skołpami kurwa jebany angielski. Do not worry about remembering or writing it, because viae™ will save it in a safe place.\n'))
		ui.log.write(docs('ℹ︎ click any button to move forward\n'))
	}

	function useExistingToken() {
		statusAuthWait.start()
		// change later for real callback function
		setTimeout(() => {
			statusAuthWait.stop()
			ui.log.write(info('\n✓ Done!'))
		}, 2000) // change later to smth bigger
	}

	main()
}

module.exports = viae
