const codeAnalyzer = require('./codeAnalyzer');

test('extract code stats correctly', () => {
    const files = [
        { file: 'file1.js', content: 'const a = 1;\nfunction test() {}\nclass MyClass {}' },
        { file: 'file2.js', content: 'const b = 2;\nconst arrowFunc = () => {};' }
    ];
    const expected = [
        { file: 'file1.js', lines: 3, functions: 2, classes: 1 },
        { file: 'file2.js', lines: 2, functions: 1, classes: 0 }
    ];
    expect(codeAnalyzer.extractCodeStats(files)).toEqual(expected);
});

test('handle empty file content', () => {
    const files = [{ file: 'empty.js', content: '' }];
    const expected = [{ file: 'empty.js', lines: 1, functions: 0, classes: 0 }];
    expect(codeAnalyzer.extractCodeStats(files)).toEqual(expected);
});

test('handle multiple files with no functions or classes', () => {
    const files = [
        { file: 'file1.js', content: 'const a = 1;' },
        { file: 'file2.js', content: 'const b = 2;' }
    ];
    const expected = [
        { file: 'file1.js', lines: 1, functions: 0, classes: 0 },
        { file: 'file2.js', lines: 1, functions: 0, classes: 0 }
    ];
    expect(codeAnalyzer.extractCodeStats(files)).toEqual(expected);
});

test('handle file with only functions', () => {
    const files = [{ file: 'functions.js', content: 'function a() {}\nfunction b() {}' }];
    const expected = [{ file: 'functions.js', lines: 2, functions: 2, classes: 0 }];
    expect(codeAnalyzer.extractCodeStats(files)).toEqual(expected);
});

test('handle file with only classes', () => {
    const files = [{ file: 'classes.js', content: 'class A {}\nclass B {}' }];
    const expected = [{ file: 'classes.js', lines: 2, functions: 0, classes: 2 }];
    expect(codeAnalyzer.extractCodeStats(files)). toEqual(expected);
});

test('handle file with mixed content', () => {
    const files = [{ file: 'mixed.js', content: 'const a = 1;\nfunction b() {}\nclass C {}' }];
    const expected = [{ file: 'mixed.js', lines: 3, functions: 1, classes: 1 }];
    expect(codeAnalyzer.extractCodeStats(files)).toEqual(expected);
});

test('handle file with no content', () => {
    const files = [{ file: 'nocontent.js', content: '' }];
    const expected = [{ file: 'nocontent.js', lines: 1, functions: 0, classes: 0 }];
    expect(codeAnalyzer.extractCodeStats(files)).toEqual(expected);
});