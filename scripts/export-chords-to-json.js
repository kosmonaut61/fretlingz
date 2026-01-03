// Simple script to export chord data to JSON
// Run with: node scripts/export-chords-to-json.js

const fs = require('fs');
const path = require('path');

// Read the TypeScript file
const filePath = path.join(__dirname, '../lib/chord-data.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Find the start and end of the chordDatabase array
const startMarker = 'export const chordDatabase: Chord[] = [';
const endMarker = ']';

const startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
  console.error('Could not find chordDatabase array');
  process.exit(1);
}

// Find the matching closing bracket (need to track brackets)
const arrayStart = startIdx + startMarker.length;
let bracketCount = 1;
let arrayEnd = arrayStart;

for (let i = arrayStart; i < content.length && bracketCount > 0; i++) {
  if (content[i] === '[') bracketCount++;
  if (content[i] === ']') bracketCount--;
  if (bracketCount === 0) {
    arrayEnd = i;
    break;
  }
}

let arrayStr = content.substring(arrayStart, arrayEnd);

// Clean up: remove comments
arrayStr = arrayStr.replace(/\/\/.*$/gm, '');

// Replace TypeScript property syntax with JSON
arrayStr = arrayStr.replace(/\bkey:\s*/g, '"key": ');
arrayStr = arrayStr.replace(/\bsuffix:\s*/g, '"suffix": ');
arrayStr = arrayStr.replace(/\bpositions:\s*/g, '"positions": ');
arrayStr = arrayStr.replace(/\bfingerings:\s*/g, '"fingerings": ');
arrayStr = arrayStr.replace(/\bbaseFret:\s*/g, '"baseFret": ');
arrayStr = arrayStr.replace(/\bbarres:\s*/g, '"barres": ');

// Replace single quotes with double quotes
arrayStr = arrayStr.replace(/'/g, '"');

// Remove trailing commas
arrayStr = arrayStr.replace(/,(\s*[}\]])/g, '$1');

// Parse as JavaScript and stringify as JSON
try {
  const chords = eval(`[${arrayStr}]`);
  const json = JSON.stringify(chords, null, 2);
  
  const outputPath = path.join(__dirname, '../chords.json');
  fs.writeFileSync(outputPath, json, 'utf8');
  console.log(`Successfully exported ${chords.length} chords to ${outputPath}`);
} catch (error) {
  console.error('Error parsing chord data:', error.message);
  console.error('Error at:', error.stack);
  process.exit(1);
}
