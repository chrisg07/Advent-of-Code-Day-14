var assert = require('assert');
const fs = require('fs')
var ProblemSolver = require('./ProblemSolver.ts')

describe('ProblemSolver', function() {

	var problemSolver;
	var lines: Array<string>

	beforeEach(function(done) {
		fs.readFile('test-input.txt', 'utf8', (err, data) => {
			if (err) {
				console.error(err)
				return
			}

			lines = data.split(/\r?\n/).map(line => line.trim());
			done()
		})
	
  });	
  
	it('read input', function(done) {
		problemSolver = new ProblemSolver(lines);
		assert.deepEqual(problemSolver.template, ['N', 'N', 'C', 'B'])
		assert.equal(Object.entries(problemSolver.pairs).length, 16)
		done()
	})

	it('match template after 1 step', function(done) {
		problemSolver = new ProblemSolver(lines, 1);
		assert.equal(problemSolver.elements['N'], 2)
		done()
	})

	it('solve test input for 10 step', function(done) {
		problemSolver = new ProblemSolver(lines, 10);
		assert.equal(problemSolver.elements['B'], 1749)
		assert.equal(problemSolver.elements['H'], 161)
		assert.equal(problemSolver.answer, 1588)
		done()
	})

	// it('solve test input for 40 step', function(done) {
	// 	problemSolver = new ProblemSolver(lines, 40);
	// 	assert.equal(problemSolver.elements['B'], 2192039569602)
	// 	assert.equal(problemSolver.elements['H'], 3849876073)
	// 	assert.equal(problemSolver.answer, 2188189693529)
	// 	done()
	// })
});