const { generateReport } = require('./reportWriter');

test('generates report correctly for valid input', () => {
    const inputData = { /* valid input data */ };
    const expectedReport = { /* expected report output */ };
    expect(generateReport(inputData)).toEqual(expectedReport);
});

test('returns error for invalid input', () => {
    const inputData = { /* invalid input data */ };
    expect(() => generateReport(inputData)).toThrow('Invalid input data');
});