const fetch = require('node-fetch')
const fs = require('fs')

const path = 'repositories.txt'
const url = `https://api.github.com/users`

const logger = fs.createWriteStream(path, {
	flags: 'a'
})

const fetchAllRepositories = (url, username) => {
	fetch(`${url}/${username}/repos?per_page=300`)
	.then(reply => reply.json())
	.then(results => {
		results.map(repository => {
			console.log(repository.name)
			const name = `${repository.full_name}\n`
			logger.write(name)
			return true
		})
	}).then(() => logger.end()).catch(err => console.log(err))
}

fetchAllRepositories(url, 'robertgrzonka')
