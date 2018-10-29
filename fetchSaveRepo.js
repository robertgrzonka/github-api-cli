const fetch = require('fetch')
const fs = require('fs')

const path = 'repos.txt'
const repoUrl = 'https://api.github.com/users/robertgrzonka/repos?per_page=300'

const logger = fs.createWriteStream(path, {
    flags: 'a',
})

const fetchRepos = (url = 'https://api.github.com/users/robertgrzonka/repos?per_page=300') => {
    fetch(url)
        .then(reply => reply.json())
        .then((results) => {
            results.map((repo) => {
                console.log(repo.name)
                const name = `${repo.full_name}\n`
                logger.write(name)
                return true
            })
        })
        .then(() => logger.end())
        .catch(err => console.log(err))
}

fetchRepos(repoUrl)
