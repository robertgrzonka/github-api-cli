module.exports = {
	env: {
		es6: true,
		node: true
	},
	// extends: eslint:recommended,
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: module
	},
	rules: {
		indent: [
			error,
			4
		],
		linebreakStyle: [
			error,
			unix
		],
		quotes: [
			error,
			single
		],
		semi: [
			error,
			never
		]
	}
}
