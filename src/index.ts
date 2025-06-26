import { hello, removeStatisticsFromProcesses } from "./utils";

hello();

// Test the removeStatisticsFromProcesses function
try {
    const outputPath = removeStatisticsFromProcesses();
    console.log(`Clean processes file created at: ${outputPath}`);
} catch (error) {
    console.error('Failed to process file:', error);
}
