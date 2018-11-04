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
const intro = chalk.bold.hex('#03a6ff')

const statusAuthWait = new Spinner('Authenticating. Give us a second ▲')
const statusAuthDone = console.log(intro('✓ Done!'))

/* UI BottomBar setup */
const ui = new inquirer.ui.BottomBar()
// clear()
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
				console.log(header('\nTo use Basic Authentication with the GitHub API,\nsimply send the username and password associated with the account.\n'))
				getBasicCredentials()
			} else if (answers.auth === 'OAuth') {
				clear()
				console.log(header('\nOAuth requires personal access token\nor OAuth token instead your password.\n'))
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
			message: 'Username:',
			validate: getUsername => getUsername ? true : 'Enter your username.'
		}, {
			type: 'password',
			name: 'password',
			message: 'Password:',
			validate: getPassword => getPassword.length >= 6 ? true : 'Your GitHub password should have at least 6 signs.',
		}]
		ui.updateBottomBar(docs(`${chalk.bold('Note: ')}we do not store your password.\nMore info here: https://security.theguys.app\n\n`))
		inquirer.prompt(credentials).then(inputs => {
			console.log(conf.set('username', credentials.getUsername))
		})
	}

	function getOauthCredentials() {
		const credentials = [{
			type: 'input',
			name: 'username',
			message: `What is your ${chalk.bold('username')}?`,
			validate: value => value ? true : 'Enter your username',
		}, {
			type: 'list',
			name: 'createToken',
			message: `Whould you like to create ${chalk.bold('new token')} or use ${chalk.bold('existing one')}?`,
			choices: ['I\'d like to create new token', 'I\'ll use one of already created', new inquirer.Separator(), 'I would like to use Basic Authentication.'],
		}]
		inquirer.prompt(credentials).then(answers => {
			let createToken = answers.createToken
			if (createToken === 'I\'d like to create new token') {
				createNewToken() // function for creating new token
			} else if (createToken === 'I\'ll use one of already created') {
				useExistingToken() // function to get token in input
			} else {
				getBasicCredentials() // back to the Basic Authentication
			}
		})
	}

	/* Functions for tokens */
	function createNewToken() {
		statusAuthWait.start()
		// change later for real callback function
		setTimeout(() => {
			statusAuthWait.stop()
			console.log(intro('✓ Done!'))
		}, 9000) // change later to smth bigger 
	}

	function useExistingToken() {
		statusAuthWait.start()
		// change later for real callback function
		setTimeout(() => {
			statusAuthWait.stop()
			console.log(intro('✓ Done!'))
		}, 9000) // change later to smth bigger
	}

	main()
}

module.exports = viae
