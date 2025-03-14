const compareCodeEfficiency = (sourceStats, migratedStats) => {
    try {
        let totalSource = { lines: 0, functions: 0, classes: 0, objects: 0, variables: 0, conditions: 0, blocks: 0 };
        let totalMigrated = { lines: 0, functions: 0, classes: 0, objects: 0, variables: 0, conditions: 0, blocks: 0 };
        let fileComparisons = [];

        const migratedMap = new Map((migratedStats || []).map(file => [file.file, file]));

        (sourceStats || []).forEach(sourceFile => {
            const migratedFile = migratedMap.get(sourceFile.file);
            if (!migratedFile) {
                fileComparisons.push({
                    folder: sourceFile.folder,
                    file: sourceFile.file,
                    fileType: sourceFile.fileType,
                    status: "Not Found in Migrated Code",
                    lines: "0%",
                    functions: "0%",
                    classes: "0%",
                    objects: "0%",
                    variables: "0%",
                    conditions: "0%",
                    blocks: "0%"
                });
                return;
            }

            const efficiency = {
                lines: sourceFile.lines > 0 ? ((migratedFile.lines / sourceFile.lines) * 100).toFixed(2) + "%" : "N/A",
                functions: sourceFile.functions > 0 ? ((migratedFile.functions / sourceFile.functions) * 100).toFixed(2) + "%" : "N/A",
                classes: sourceFile.classes > 0 ? ((migratedFile.classes / sourceFile.classes) * 100).toFixed(2) + "%" : "N/A",
                objects: sourceFile.objects > 0 ? ((migratedFile.objects / sourceFile.objects) * 100).toFixed(2) + "%" : "N/A",
                variables: sourceFile.variables > 0 ? ((migratedFile.variables / sourceFile.variables) * 100).toFixed(2) + "%" : "N/A",
                conditions: sourceFile.conditions > 0 ? ((migratedFile.conditions / sourceFile.conditions) * 100).toFixed(2) + "%" : "N/A",
                blocks: sourceFile.blocks > 0 ? ((migratedFile.blocks / sourceFile.blocks) * 100).toFixed(2) + "%" : "N/A"
            };

            fileComparisons.push({
                folder: sourceFile.folder,
                file: sourceFile.file,
                fileType: sourceFile.fileType,
                status: "Compared Successfully",
                ...efficiency
            });

            Object.keys(totalSource).forEach(key => {
                totalSource[key] += sourceFile[key] || 0;
                totalMigrated[key] += migratedFile[key] || 0;
            });
        });

        // Calculate overall efficiency
        const overallEfficiency = {};
        Object.keys(totalSource).forEach(key => {
            overallEfficiency[key] = totalSource[key] > 0 ? ((totalMigrated[key] / totalSource[key]) * 100).toFixed(2) + "%" : "N/A";
        });

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
