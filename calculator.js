'use strict'

const {Stack, Queue} = require('./classes')

const spaceRegEx = /\ /g
const digitRegEx = /\d/
const floatRegEx = /\d+\.\d+|\.\d+|\d+/
const operatorRE = /[\(\)\+\-\*\/]/
const opNotLeftParen = /[\)\+\-\*\/]/

class Calculator {
	constructor() {
		this.queue = new Queue()
		this.stack = new Stack()
		this.string = ''
	}
	master(string) {
		console.log(`parsing: `, string)
		this.string = string.replace(spaceRegEx, '')
		console.log(`condensed: `, this.string)
        while (this.string) {
			const char = this.string[0]
			console.log(`current char is '${char}'`)
			if (char.match(digitRegEx)) {
				this.getDigits()
			}
			else if (char.match(operatorRE)) {
				const noError = this.stack.push(char)
				if (!noError) {
					console.log(`there was an error pushing an operator to the stack!`)
					return false
				}
				this.string = this.string.slice(1)
			}
		}
		while (this.stack.peek()) {
			if (this.stack.peek() === '(') {
				console.log('after first loop, there is a mismatched parens!')
				return false
			}
			this.queue.enqueue(this.stack.pop())
		}
    }
	getDigits() {
		const digits = this.string.match(floatRegEx)
		if (digits) {
			console.log(`adding digits '${digits}' to queue`)
			this.string = this.string.slice(digits[0].length)
			this.queue.enqueue(parseFloat(digits[0]))
			return parseInt(digits[0])
		}
		console.log('getDigits error; regex match object:')
		console.log(digits)
		return false
	}
}

const calculator = new Calculator()

calculator.master('2.2 + 15 * (3 + 142)')
console.log(calculator.queue.getQueue())
console.log(calculator.string)