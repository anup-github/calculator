const compareCodeEfficiency = (sourceStats, migratedStats) => {
    try {
        let totalSource = { lines: 0, functions: 0, classes: 0 };
        let totalMigrated = { lines: 0, functions: 0, classes: 0 };
        let fileComparisons = [];

        const migratedMap = new Map(migratedStats.map(file => [file.file, file]));

        sourceStats.forEach(sourceFile => {
            const migratedFile = migratedMap.get(sourceFile.file);
            if (!migratedFile) {
                fileComparisons.push({
                    file: sourceFile.file,
                    status: "Not Found in Migrated Code",
                    lines: "0%",
                    functions: "0%",
                    classes: "0%"
                });
                return;
            }

            const efficiency = {
                lines: sourceFile.lines > 0 ? ((migratedFile.lines / sourceFile.lines) * 100).toFixed(2) + "%" : "N/A",
                functions: sourceFile.functions > 0 ? ((migratedFile.functions / sourceFile.functions) * 100).toFixed(2) + "%" : "N/A",
                classes: sourceFile.classes > 0 ? ((migratedFile.classes / sourceFile.classes) * 100).toFixed(2) + "%" : "N/A"
            };

            fileComparisons.push({
                file: sourceFile.file,
                status: "Compared Successfully",
                ...efficiency
            });

            totalSource.lines += sourceFile.lines;
            totalSource.functions += sourceFile.functions;
            totalSource.classes += sourceFile.classes;

            totalMigrated.lines += migratedFile.lines;
            totalMigrated.functions += migratedFile.functions;
            totalMigrated.classes += migratedFile.classes;
        });

        // Calculate overall efficiency
        const overallEfficiency = {
            lines: totalSource.lines > 0 ? ((totalMigrated.lines / totalSource.lines) * 100).toFixed(2) + "%" : "N/A",
            functions: totalSource.functions > 0 ? ((totalMigrated.functions / totalSource.functions) * 100).toFixed(2) + "%" : "N/A",
            classes: totalSource.classes > 0 ? ((totalMigrated.classes / totalSource.classes) * 100).toFixed(2) + "%" : "N/A"
        };

        return {
            summary: overallEfficiency,
            details: fileComparisons
        };
    } catch (error) {
        console.error("❌ Error comparing efficiency:", error);
        throw error;
    }
};

module.exports = { compareCodeEfficiency };
