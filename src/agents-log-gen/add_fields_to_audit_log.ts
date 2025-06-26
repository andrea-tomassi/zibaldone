import * as fs from 'fs';
import * as readline from 'readline';

/**
 * Copies a JSONL audit log file, adding sl_event_time (timestamp millis) and sl_application fields to each event.
 * @param inputPath Path to the source JSONL file
 * @param outputPath Path to the destination JSONL file
 */
export async function addFieldsToAuditLog(inputPath: string, outputPath: string) {
  const inputStream = fs.createReadStream(inputPath);
  const outputStream = fs.createWriteStream(outputPath);
  const rl = readline.createInterface({ input: inputStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const event = JSON.parse(line);
      // Add sl_event_time (timestamp millis)
      if (event.sl_event_time_str) {
        event.sl_event_time = Date.parse(event.sl_event_time_str);
      } else {
        event.sl_event_time = null;
      }
      // Add sl_application
      event.sl_application = "Sharelok Agentic AI";
      outputStream.write(JSON.stringify(event) + '\n');
    } catch (e) {
      // Optionally log or skip malformed lines
      continue;
    }
  }
  outputStream.end();
}

// Example usage (uncomment to run directly):
if (import.meta.url === `file://${process.argv[1]}`) {
  addFieldsToAuditLog(
    './src/agents-log-gen/audit_logs.jsonl',
    './src/agents-log-gen/audit_logs_with_fields.jsonl'
  ).then(() => {
    console.log('Audit log file processed successfully.');
  }).catch((err) => {
    console.error('Error processing audit log file:', err);
  });
}
