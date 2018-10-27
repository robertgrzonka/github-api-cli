const readline = require('readline')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question('What is your GitHub username? ', (answer) => {
	console.log(`Thank you for your answer, ${answer}!`);

	rl.close();
});
