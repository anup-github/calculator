const fs = require('fs-extra');
const path = require('path');

const saveReport = async (report) => {
    try {
        const reportsDir = path.join(__dirname, '../reports');
        await fs.ensureDir(reportsDir); // Ensures reports folder exists

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const reportPath = path.join(reportsDir, `migration-report-${timestamp}.json`);

        await fs.writeJson(reportPath, report, { spaces: 2 }); // Pretty print JSON

        console.log(`✅ Report saved successfully: ${reportPath}`);
        return reportPath;
    } catch (error) {
        console.error("❌ Error saving report:", error);
        throw error;
    }
};

module.exports = { saveReport };
