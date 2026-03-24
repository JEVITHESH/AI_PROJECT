
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scheduleDataPath = path.join(__dirname, 'src/data/scheduleData.ts');
const outputPath = path.join(__dirname, 'src/data/teamsData.ts');
const fileContent = fs.readFileSync(scheduleDataPath, 'utf8');

const regex = /team1:\s*"([^"]+)",\s*team2:\s*"([^"]+)"/g;
let match;
const teams = new Set();

while ((match = regex.exec(fileContent)) !== null) {
    if (!match[1].startsWith('Winner') && !match[1].startsWith('Loser')) teams.add(match[1]);
    if (!match[2].startsWith('Winner') && !match[2].startsWith('Loser')) teams.add(match[2]);
}

const sortedTeams = Array.from(teams).sort();
const pools = ['Pool A', 'Pool B', 'Pool C', 'Pool D'];
const teamPools = {};

sortedTeams.forEach((team, index) => {
    if (team === 'TNPESU CHENNAI' || team === 'HINDUSTAN UNIVERSITY') {
        teamPools[team] = 'Pool A';
    } else {
        teamPools[team] = pools[index % pools.length];
    }
});

const content = `export const TEAM_POOLS: Record<string, string> = ${JSON.stringify(teamPools, null, 4)};\n`;

fs.writeFileSync(outputPath, content);
console.log('src/data/teamsData.ts created successfully');
