const fs = require('fs');
const path = require('path');

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

test('reads a valid file', () => {
    const content = readFile(path.join(__dirname, 'testFile.txt'));
    expect(content).toBe('Hello, World!');
});

test('throws an error for a non-existent file', () => {
    expect(() => readFile('nonExistentFile.txt')).toThrow();
});

test('reads an empty file', () => {
    const content = readFile(path.join(__dirname, 'emptyFile.txt'));
    expect(content).toBe('');
});