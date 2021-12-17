module.exports = class ProblemSolver {
	answer = 0
	template = new Array<string>()
	pairs: {
		[index: string]: string
	} = {}
	elements: {
		[index: string]: number
	} = {}
	steps = 0

	constructor(lines: Array<string>, steps: number) {
		this.steps = steps
		for (let [index, entry] of lines.entries()) {
			if (entry) {
				// row of input
				if (index === 0) {
					this.template = entry.split('')
					this.template.forEach(element => {
						if (this.elements[element]) {
							this.elements[element]++
						} else {
							this.elements[element] = 1
						}
					})
					console.log(this.elements)
				} else {
					const instruction = entry.split(' -> ')
					const pair = instruction[0]
					const insertionChar = instruction[1]
					this.pairs[pair] = insertionChar
				}
			}
		}

		for (let i = 0; i < this.template.length - 1; i++) {
			const pair = this.template[i] + this.template[i + 1]
			const insertionChar = this.pairs[pair]
			if (this.elements[insertionChar]) {
				this.elements[insertionChar]++
			} else {
				this.elements[insertionChar] = 1
			}
			// console.log('inserting: ', insertionChar, ' between ', pair, 'on step ', 1)

			this.insert(this.template[i], insertionChar, 1)
			this.insert(insertionChar, this.template[i + 1], 1)
		}

		this.answer = this.calculateAnswer()
  	}

	calculateAnswer(): number {
		const counts = Object.values(this.elements)
		const max = Math.max(...counts)
		const min = Math.min(...counts)
		return max - min
	}

	insert(leftChar: string, rightChar: string, step: number): void {
		if (step < this.steps) {
			const insertionChar = this.pairs[leftChar + rightChar]
			if (this.elements[insertionChar]) {
				this.elements[insertionChar]++
			} else {
				this.elements[insertionChar] = 1
			}
			// console.log('inserting: ', insertionChar, ' between ', pair, 'on step ', step)
			this.insert(leftChar, insertionChar, step + 1)
			this.insert(insertionChar, rightChar, step + 1)
		}
	}
}