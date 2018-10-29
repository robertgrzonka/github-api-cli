'use strict'

const inquirer = require('inquirer')
const files = require('./files')

module.exports = {

    askCredentials: () => {
        const questions = [{
            name: 'authentication',
            type: 'list',
            message: 'Which method will you authenticate with GitHub?',
            choices: [
                'Basic',
                'OAuth'
            ]
        },
        {
            name: 'username',
            type: 'input',
            message: 'What is your GitHub username?',
            validate: value => {
                value.length ? true : 'Please, enter your GitHub username.'
            }
        },
        {
            name: 'password',
            type: 'password',
            message: 'What is your password?',
            validate: value => {
                value.length ? true : 'Please, enter your GitHub password.'
            }
        }
        ]
    }
}
