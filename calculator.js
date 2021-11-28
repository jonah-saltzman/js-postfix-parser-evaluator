'use strict'

const {Stack, Queue} = require('./classes')

const spaceRegEx = /\ /g
const digitRegEx = /\d/
const floatRegEx = /\d+\.\d+|\.\d+|\d+/
const operatorRE = /[\(\)\+\-\*\/]/
const opNotLeftParen = /[\)\+\-\*\/]/

let calculator = {
	queue: new Queue(),
	stack: new Stack(),
	tokens: [],
	string: '',
    master: (string) => {
		console.log(`parsing: `, string)
		calculator.string = string.replace(spaceRegEx, '')
        while (calculator.string) {
			const char = calculator.string[0]
			if (char.match(digitRegEx)) {
				calculator.getDigits()
			}
			else if (char.match(operatorRE)) {
				const noError = calculator.stack.push(char)
				if (!noError) {
					console.log(`there was an error pushing an operator to the stack!`)
					return false
				}
				calculator.string = calculator.string.slice(1)
			}
		}
		while (calculator.stack.peek()) {
			if (calculator.stack.peek() === '(') {
				console.log('after first loop, there is a mismatched parens!')
				return false
			}
			calculator.queue.enqueue(calculator.stack.pop())
		}
    },
	getDigits: () => {
		const digits = calculator.string.match(floatRegEx)
		if (digits) {
			calculator.string = calculator.string.slice(digits[0].length + 1)
			calculator.queue.enqueue(parseInt(digits[0]))
			return parseInt(digits[0])
		}
		console.log('getDigits error; regex match object:')
		console.log(digits)
		return false
	}
}

// module.exports = {
// 	calculator
// }

calculator.master('22 + 15 * (3 + 142)')
console.log(calculator.queue.getQueue())
console.log(calculator.string)