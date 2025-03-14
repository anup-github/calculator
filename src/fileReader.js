const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const readFiles = async (dirPath) => {
    try {
        const files = glob.sync(`${dirPath}/**/*.{js,ts,py,java}`);
        
        if (files.length === 0) {
            throw new Error(`No valid source files found in ${dirPath}`);
        }

        const contents = await Promise.all(files.map(file => fs.readFile(file, 'utf-8')));
        return contents.map((content, index) => ({
            file: path.basename(files[index]),
            content
        }));

    } catch (error) {
        console.error(`❌ Error reading files from ${dirPath}:`, error.message);
        throw error;
    }
};

module.exports = { readFiles };
