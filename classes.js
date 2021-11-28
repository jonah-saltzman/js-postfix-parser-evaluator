'use strict'

// const {calculator} = require('./calculator')

const opNotLeftParen = /[\)\+\-\*\/]/

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

class Stack {
	constructor() {
		this.items = []
	}
	isEmpty = () => this.items.length === 0
	push = (operator) => {
        console.log(`parsing '${operator}'`)
        if (operator === '(') {
            this.items.unshift(operator)
            return true
        }
        if (operator === ')') {
            while(this.peek() !== '(') {
                if (this.isEmpty()) {
                    console.log("mismatched parentheses!")
                    return false
                }
                this.queue.enqueue(this.pop())
            }
            if (this.peek() === '(') {
                this.pop()
                return true
            }
            else {
                console.log('there should have been a left paren here!')
                return false
            }
        }
        while (this.needToPop(operator)) calculator.queue.enqueue(this.pop())
        this.items.unshift(operator)
        return true
    }
	pop = () => this.isEmpty() ? false : this.items.shift()
	peek = () => this.isEmpty() ? false : this.items[0]
	print = () => {
		let str = '['
		this.items.forEach((item) => (str += item.toString() + ', '))
		return (str += ']')
	}
	getStack = () => this.items
    needToPop = (operator) => {
        if (this.isEmpty) return false
        const peekObj = operators.find(op => op.symbol === this.peek())
        const opObj = operators.find(op => op.symbol === operator)
        return this.peek().match(opNotLeftParen) && (peekObj.precedence > opObj.precedence || (peekObj.precedence === opObj.precedence && opObj.associativity))
    }
}

class Queue {
	constructor() {
		this.items = []
	}
	enqueue = (item) => this.items.push(item)
	dequeue = () => (this.isEmpty() ? false : this.items.shift())
	isEmpty = () => this.items.length === 0
	front = () => (this.isEmpty() ? false : this.items[0])
	print = () => {
		let str = '['
		this.items.forEach((item) => (str += item.toString() + ', '))
		return (str += ']')
	}
    getQueue = () => this.items
}

module.exports = {
    Stack,
    Queue
}