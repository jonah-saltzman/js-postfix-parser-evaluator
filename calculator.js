'use strict'

const {Stack, Queue} = require('classes.js')

let calculator = {
	add: (a, b) => {
		let result = undefined
		if (b !== undefined) {
			result = a + b
			calculator.value = result
			return result
		}
		result = calculator.value + a
		calculator.value = result
		return result
	},
	subtract: (a, b) => {
		let result = undefined
		if (b !== undefined) {
			result = a - b
			calculator.value = result
			return result
		}
		result = calculator.value - a
		calculator.value = result
		return result
	},
	multiply: (a, b) => {
		let result = undefined
		if (b !== undefined) {
			result = a * b
			calculator.value = result
			return result
		}
		result = calculator.value * a
		calculator.value = result
		return result
	},
	divide: (a, b) => {
		let result = undefined
		if (b !== undefined) {
			result = a / b
			calculator.value = result
			return result
		}
		result = calculator.value / a
		calculator.value = result
		return result
	},
	raise: (a, b) => {
		let result = undefined
		if (b !== undefined) {
			result = Math.pow(a, b)
			calculator.value = result
			return result
		}
		result = Math.pow(calculator.value, a)
		calculator.value = result
		return result
	},
	value: 0,
	clear: () => (calculator.value = 0),
    master: (string) => {
        const reduced = string.replace(/ /g, '')
        const output = []
		const operators = []
		for (let i = 0; i < reduced.length; i++) {

		}
    },
	isDigit: (n) => {}
}

let queue = {
	items: [],
	enqueue: (item) => this.items.push(item)
}

calculator.master('(2 - 1) * (5 ^ 2)')