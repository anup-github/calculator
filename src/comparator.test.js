test('comparator should return true for equal values', () => {
	expect(comparator(1, 1)).toBe(true);
});

test('comparator should return false for different values', () => {
	expect(comparator(1, 2)).toBe(false);
});

test('comparator should handle negative values', () => {
	expect(comparator(-1, -1)).toBe(true);
	expect(comparator(-1, 1)).toBe(false);
});

test('comparator should handle string values', () => {
	expect(comparator('test', 'test')).toBe(true);
	expect(comparator('test', 'TEST')).toBe(false);
});