
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scheduleDataPath = path.join(__dirname, 'src/data/scheduleData.ts');
const fileContent = fs.readFileSync(scheduleDataPath, 'utf8');

// Regex to find team names
const regex = /team1:\s*"([^"]+)",\s*team2:\s*"([^"]+)"/g;
let match;
const teams = new Set();

while ((match = regex.exec(fileContent)) !== null) {
    if (!match[1].startsWith('Winner') && !match[1].startsWith('Loser')) teams.add(match[1]);
    if (!match[2].startsWith('Winner') && !match[2].startsWith('Loser')) teams.add(match[2]);
}

const sortedTeams = Array.from(teams).sort();
console.log(JSON.stringify(sortedTeams, null, 2));
