module.exports = class ProblemSolver {
	answer = 0
	template = new Array<string>()
	pairs: {
		[index: string]: string
	} = {}
	elements: {
		[index: string]: number
	} = {}

	constructor(lines: Array<string>, steps: number) {
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

		for (let i = 0; i < steps; i++) {
			this.template = this.insert(this.template)
		}

		this.answer = this.calculateAnswer()
  	}

	calculateAnswer(): number {
		const counts = Object.values(this.elements)
		const max = Math.max(...counts)
		const min = Math.min(...counts)
		return max - min
	}

	insert(template: Array<string>): Array<string> {
		for (let i = 0; i < template.length - 1; i++) {
			const pair = template[i] + template[i + 1]
			const insertionChar = this.pairs[pair]
			if (this.elements[insertionChar]) {
				this.elements[insertionChar]++
			} else {
				this.elements[insertionChar] = 1
			}
			template.splice(i + 1, 0, insertionChar)
			i++
		}
		return template
	}
}