module.exports = {
	env: {
		es6: true,
		node: true
	},
	extends: standard,
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: module
	},
	rules: {
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
	},
	globals: {github: true}
}
