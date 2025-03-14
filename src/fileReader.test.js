const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const { readFiles } = require('./fileReader');

jest.mock('fs-extra');
jest.mock('glob');

describe('readFiles', () => {
    const mockDirPath = '/mock/dir';

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should read files and return their contents', async () => {
        const mockFiles = [`${mockDirPath}/file1.js`, `${mockDirPath}/file2.js`];
        const mockContents = ['content of file1', 'content of file2'];

        glob.sync.mockReturnValue(mockFiles);
        fs.readFile.mockImplementation((file) => {
            if (file === mockFiles[0]) return Promise.resolve(mockContents[0]);
            if (file === mockFiles[1]) return Promise.resolve(mockContents[1]);
        });

        const result = await readFiles(mockDirPath);

        expect(result).toEqual([
            { file: 'file1.js', content: 'content of file1' },
            { file: 'file2.js', content: 'content of file2' }
        ]);
        expect(glob.sync).toHaveBeenCalledWith(`${mockDirPath}/**/*.{js,ts,py,java}`);
        expect(fs.readFile).toHaveBeenCalledTimes(2);
        expect(fs.readFile).toHaveBeenCalledWith(mockFiles[0], 'utf-8');
        expect(fs.readFile).toHaveBeenCalledWith(mockFiles[1], 'utf-8');
    });

    test('should throw an error if no valid source files are found', async () => {
        glob.sync.mockReturnValue([]);

        await expect(readFiles(mockDirPath)).rejects.toThrow(`No valid source files found in ${mockDirPath}`);
        expect(glob.sync).toHaveBeenCalledWith(`${mockDirPath}/**/*.{js,ts,py,java}`);
    });

    test('should handle errors gracefully', async () => {
        const mockError = new Error('Mock error');
        glob.sync.mockImplementation(() => { throw mockError; });

        await expect(readFiles(mockDirPath)).rejects.toThrow('Mock error');
        expect(glob.sync).toHaveBeenCalledWith(`${mockDirPath}/**/*.{js,ts,py,java}`);
    });
});