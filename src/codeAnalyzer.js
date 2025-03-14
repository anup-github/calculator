const extractCodeStats = (files) => {
    try {
        return files.map(file => {
            const lines = file.content.split('\n').length;
            const functions = (file.content.match(/function |def |const .*=\s*\(.*\)\s*=>|class /g) || []).length;
            const classes = (file.content.match(/class /g) || []).length;

            return { file: file.file, lines, functions, classes };
        });
    } catch (error) {
        console.error("❌ Error extracting code stats:", error);
        throw error;
    }
};

module.exports = { extractCodeStats };
