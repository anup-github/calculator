const express = require('express');
const path = require('path');
const { readFiles } = require('./src/fileReader');
const { extractCodeStats } = require('./src/codeAnalyzer');
const { compareCodeEfficiency } = require('./src/comparator');
const { saveReport } = require('./src/reportWriter');

const app = express();
const PORT = 3000;

const SOURCE_DIR = path.join(__dirname, 'source-code');
const MIGRATED_DIR = path.join(__dirname, 'migrated-code');

app.get('/api/report', async (req, res) => {
    try {
        const sourceFiles = await readFiles(SOURCE_DIR);
        const migratedFiles = await readFiles(MIGRATED_DIR);

        if (sourceFiles.length === 0 || migratedFiles.length === 0) {
            return res.status(400).json({ error: "One or both directories are empty. Cannot compare." });
        }

        const sourceStats = extractCodeStats(sourceFiles);
        const migratedStats = extractCodeStats(migratedFiles);
        const report = compareCodeEfficiency(sourceStats, migratedStats);

        // Save report to file before responding
        const reportPath = await saveReport(report);

        return res.status(200).json({
            message: "Migration efficiency report generated successfully.",
            report,
            reportFile: reportPath
        });

    } catch (error) {
        console.error("❌ Error generating report:", error);
        return res.status(500).json({ error: "An error occurred while processing the files. Please check your input." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
