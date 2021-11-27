'use strict'

class Stack {
	constructor() {
		this.items = []
	}
	isEmpty = () => this.items.length === 0
	push = (item) => this.items.unshift(item)
	pop = () => (this.isEmpty() ? false : this.items.shift())
	peek = () => (this.isEmpty() ? false : this.items[0])
	print = () => {
		let str = '['
		this.items.forEach((item) => (str += item.toString() + ', '))
		return (str += ']')
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
}

module.exports = {
    Stack,
    Queue
}