import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

export function hello() {
    console.log("Hello, world!");
}

export function removeStatisticsFromProcesses(inputPath?: string, outputPath?: string) {
    // Get current directory in ES modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    
    // Default paths if not provided
    const defaultInputPath = join(__dirname, 'agents-log-gen', 'processes.json');
    const defaultOutputPath = join(__dirname, 'agents-log-gen', 'processes-clean.json');
    
    const finalInputPath = inputPath || defaultInputPath;
    const finalOutputPath = outputPath || defaultOutputPath;
    
    try {
        // Read the processes.json file
        const rawData = readFileSync(finalInputPath, 'utf8');
        const processesData = JSON.parse(rawData);
        
        // Remove statistics field from each process in the data array
        if (processesData.result && processesData.result.data && Array.isArray(processesData.result.data)) {
            processesData.result.data = processesData.result.data.map((process: any) => {
                const { statistics, ...processWithoutStats } = process;
                return processWithoutStats;
            });
        }
        
        // Write the cleaned data to output file
        writeFileSync(finalOutputPath, JSON.stringify(processesData, null, 2), 'utf8');
        
        console.log(`Successfully created clean processes file at: ${finalOutputPath}`);
        console.log(`Removed statistics from ${processesData.result?.data?.length || 0} processes`);
        
        return finalOutputPath;
    } catch (error) {
        console.error('Error processing processes.json:', error);
        throw error;
    }
}
