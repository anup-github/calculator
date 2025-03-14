const { compareCodeEfficiency } = require('./comparator');

describe('compareCodeEfficiency', () => {
    test('should compare code efficiency correctly', () => {
        const sourceStats = [
            { file: 'file1.js', folder: 'src', fileType: 'js', lines: 10, functions: 2, classes: 1, objects: 1, variables: 2, conditions: 1, blocks: 1 },
            { file: 'file2.js', folder: 'src', fileType: 'js', lines: 5, functions: 1, classes: 0, objects: 0, variables: 1, conditions: 0, blocks: 1 }
        ];
        const migratedStats = [
            { file: 'file1.js', folder: 'src', fileType: 'js', lines: 8, functions: 1, classes: 1, objects: 1, variables: 1, conditions: 1, blocks: 1 },
            { file: 'file2.js', folder: 'src', fileType: 'js', lines: 5, functions: 1, classes: 0, objects: 0, variables: 1, conditions: 0, blocks: 1 }
        ];

        const result = compareCodeEfficiency(sourceStats, migratedStats);

        expect(result).toMatchObject({
            summary: {
                lines: '80.00%',
                functions: '50.00%',
                classes: '100.00%',
                objects: '100.00%',
                variables: '50.00%',
                conditions: '100.00%',
                blocks: '100.00%'
            },
            details: [
                {
                    folder: 'src',
                    file: 'file1.js',
                    fileType: 'js',
                    status: 'Compared Successfully',
                    lines: '80.00%',
                    functions: '50.00%',
                    classes: '100.00%',
                    objects: '100.00%',
                    variables: '50.00%',
                    conditions: '100.00%',
                    blocks: '100.00%'
                },
                {
                    folder: 'src',
                    file: 'file2.js',
                    fileType: 'js',
                    status: 'Compared Successfully',
                    lines: '100.00%',
                    functions: '100.00%',
                    classes: 'N/A',
                    objects: 'N/A',
                    variables: '100.00%',
                    conditions: 'N/A',
                    blocks: '100.00%'
                }
            ]
        });
    });

    test('should handle files not found in migrated code', () => {
        const sourceStats = [
            { file: 'file1.js', folder: 'src', fileType: 'js', lines: 10, functions: 2, classes: 1, objects: 1, variables: 2, conditions: 1, blocks: 1 }
        ];
        const migratedStats = [];

        const result = compareCodeEfficiency(sourceStats, migratedStats);

        expect(result).toEqual({
            summary: {
                lines: '0.00%',
                functions: '0.00%',
                classes: '0.00%',
                objects: '0.00%',
                variables: '0.00%',
                conditions: '0.00%',
                blocks: '0.00%'
            },
            details: [
                {
                    folder: 'src',
                    file: 'file1.js',
                    fileType: 'js',
                    status: 'Not Found in Migrated Code',
                    lines: '0%',
                    functions: '0%',
                    classes: '0%',
                    objects: '0%',
                    variables: '0%',
                    conditions: '0%',
                    blocks: '0%'
                }
            ]
        });
    });

    test('should handle empty sourceStats and migratedStats', () => {
        const sourceStats = [];
        const migratedStats = [];

        const result = compareCodeEfficiency(sourceStats, migratedStats);

        expect(result).toEqual({
            summary: {
                lines: 'N/A',
                functions: 'N/A',
                classes: 'N/A',
                objects: 'N/A',
                variables: 'N/A',
                conditions: 'N/A',
                blocks: 'N/A'
            },
            details: []
        });
    });

    test('should handle errors gracefully', () => {
        const sourceStats = null;
        const migratedStats = null;

        expect(() => compareCodeEfficiency(sourceStats, migratedStats)).toThrow();
    });
});