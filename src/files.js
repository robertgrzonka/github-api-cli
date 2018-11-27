const fs = require('fs')
const path = require('path')

module.exports = {
	getCurrentDirectory: () => {
		return path.basename(process.cwd())
	}
}
