const codeAnalyzer = require('./codeAnalyzer');

test('analyze code correctly', () => {
	expect(codeAnalyzer.analyze('const a = 1;')).toEqual({ variables: ['a'], functions: [] });
});

test('handle empty code', () => {
	expect(codeAnalyzer.analyze('')).toEqual({ variables: [], functions: [] });
});