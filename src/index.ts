import { hello, removeStatisticsFromProcesses, countEventsInAuditLog } from "./utils.js";

hello();

// Count events in audit log and write to lines.txt
try {
    const eventCount = await countEventsInAuditLog();
    console.log(`Total events counted: ${eventCount}`);
} catch (error) {
    console.error('Failed to count events:', error);
}

// Test the removeStatisticsFromProcesses function
try {
    const outputPath = removeStatisticsFromProcesses();
    console.log(`Clean processes file created at: ${outputPath}`);
} catch (error) {
    console.error('Failed to process file:', error);
}
