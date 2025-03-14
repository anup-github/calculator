const fs = require('fs-extra');
const path = require('path');
const { saveReport } = require('./reportWriter');

jest.mock('fs-extra');

describe('saveReport', () => {
    const mockReport = { summary: 'Test report' };
    const mockReportsDir = path.join(__dirname, '../reports');
    const mockTimestamp = '2025-03-14T12-00-00-000Z';
    const mockReportPath = path.join(mockReportsDir, `migration-report-${mockTimestamp}.json`);

    beforeAll(() => {
        jest.spyOn(global, 'Date').mockImplementation(() => ({
            toISOString: () => mockTimestamp
        }));
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should save report successfully', async () => {
        fs.ensureDir.mockResolvedValue();
        fs.writeJson.mockResolvedValue();

        const result = await saveReport(mockReport);

        expect(result).toBe(mockReportPath);
        expect(fs.ensureDir).toHaveBeenCalledWith(mockReportsDir);
        expect(fs.writeJson).toHaveBeenCalledWith(mockReportPath, mockReport, { spaces: 2 });
        expect(console.log).toHaveBeenCalledWith(`✅ Report saved successfully: ${mockReportPath}`);
    });

    test('should handle errors gracefully', async () => {
        const mockError = new Error('Mock error');
        fs.ensureDir.mockRejectedValue(mockError);

        await expect(saveReport(mockReport)).rejects.toThrow('Mock error');
        expect(fs.ensureDir).toHaveBeenCalledWith(mockReportsDir);
        expect(console.error).toHaveBeenCalledWith("❌ Error saving report:", mockError);
    });
});