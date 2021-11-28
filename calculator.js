'use strict'

const spaceRegEx = /\ /g
const digitRegEx = /\d/
const floatRegEx = /\d+\.\d+|\.\d+|\d+/
const operatorRE = /[-\(\)\+\*\/\^]/
const opNotLeftParen = /[-\)\+\*\/\^]/
const operators = [
	{
		symbol: '^',
		precedence: 4,
		associativity: false,
	},
	{
		symbol: '*',
		precedence: 3,
		associativity: true,
	},
	{
		symbol: '/',
		precedence: 3,
		associativity: true,
	},
	{
		symbol: '+',
		precedence: 2,
		associativity: true,
	},
	{
		symbol: '-',
		precedence: 2,
		associativity: true,
	},
]

const operate = {
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	'*': (a, b) => a * b,
	'/': (a, b) => a / b,
	'^': (a, b) => Math.pow(a, b)
}

class Stack {
	constructor() {
		this.items = []
	}
	isEmpty = () => this.items.length === 0
	push = (operator) => {
		if (operator === '(') {
			this.items.unshift(operator)
			return true
		}
		if (operator === ')') {
			while (this.peek() !== '(') {
				if (this.isEmpty()) {
					console.log('mismatched parentheses!')
					return false
				}
				calculator.queue.enqueue(this.pop())
			}
			if (this.peek() === '(') {
				this.pop()
				return true
			} else {
				console.log('there should have been a left paren here!')
				return false
			}
		}
		while (this.needToPop(operator)) {
			calculator.queue.enqueue(this.pop())
		}
		this.items.unshift(operator)
		return true
	}
	pop = () => (this.isEmpty() ? false : this.items.shift())
	peek = () => (this.isEmpty() ? false : this.items[0])
	getStack = () => this.items
	needToPop = (operator) => {
		if (this.isEmpty()) return false
		const peekObj = operators.find((op) => op.symbol === this.peek())
		const opObj = operators.find((op) => op.symbol === operator)
		return (
			this.peek().match(opNotLeftParen) &&
			(peekObj.precedence > opObj.precedence ||
				(peekObj.precedence === opObj.precedence && opObj.associativity))
		)
	}
}

class Queue {
	constructor() {
		this.items = []
	}
	enqueue = (item) => this.items.push(item)
	dequeue = () => this.isEmpty() ? false : this.items.shift()
	isEmpty = () => this.items.length === 0
	front = () => (this.isEmpty() ? false : this.items[0])
	getQueue = () => this.items
}

class Calculator {
	constructor() {
		this.queue = new Queue()
		this.stack = new Stack()
		this.string = ''
	}
	master(string) {
		this.string = string.replace(spaceRegEx, '')
        while (this.string) {
			const char = this.string[0]
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
		this.printRPN()
		return this.evaluate()
    }

	evaluate() {
		const queue = this.queue.getQueue()
		const operands = []
		for (let i = 0; i < queue.length; i++) {
			const [token, type] = [queue[i], typeof queue[i]]
			if (type === 'number') operands.push(token)
			else {
				const [a, b] = [operands.pop(), operands.pop()]
				operands.push(operate[token](b, a))
			}
			console.log(operands)
		}
		console.log(`evaluated to: ${operands[0]}`)
		return operands[0]
	}

	printRPN() {
		let str = ''
		for (const token of this.queue.getQueue()) {
			str += token.toString()
		}
		console.log(`RPN: ${str}`)
	}
	getDigits() {
		const digits = this.string.match(floatRegEx)
		if (digits) {
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

const string = '(2 + 3 / 6) ^ (3 - 1)'

calculator.master(string)