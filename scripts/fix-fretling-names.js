// Script to properly add fretling names to chord database
const fs = require('fs');
const path = require('path');

const namesData = [{"key":"A","suffix":"major","name":"Pufflet"},{"key":"A","suffix":"minor","name":"Draftshade"},{"key":"A","suffix":"7","name":"Skyblues"},{"key":"A","suffix":"m7","name":"Nightdraft"},{"key":"A","suffix":"maj7","name":"Stargust"},{"key":"A","suffix":"dim","name":"Vorthex"},{"key":"A","suffix":"aug","name":"Upflare"},{"key":"A","suffix":"6","name":"Zephyrloom"},{"key":"A","suffix":"m6","name":"Sablezephyr"},{"key":"A","suffix":"9","name":"Jetoracle"},{"key":"A","suffix":"sus2","name":"Tetherpuff"},{"key":"A","suffix":"sus4","name":"Knotgust"},{"key":"Bb","suffix":"major","name":"Slatelet"},{"key":"Bb","suffix":"minor","name":"Graveldread"},{"key":"Bb","suffix":"7","name":"Brassalt"},{"key":"Bb","suffix":"m7","name":"Chalkswing"},{"key":"Bb","suffix":"maj7","name":"Marbleglow"},{"key":"Bb","suffix":"dim","name":"Shardquake"},{"key":"Bb","suffix":"aug","name":"Overstone"},{"key":"Bb","suffix":"6","name":"Stonewarm"},{"key":"Bb","suffix":"m6","name":"Tombgrit"},{"key":"Bb","suffix":"9","name":"Titanbrass"},{"key":"Bb","suffix":"sus2","name":"Sliprift"},{"key":"Bb","suffix":"sus4","name":"Quakeclasp"},{"key":"B","suffix":"major","name":"Pebblit"},{"key":"B","suffix":"minor","name":"Cragwail"},{"key":"B","suffix":"7","name":"Basstalt"},{"key":"B","suffix":"m7","name":"Gravelgroove"},{"key":"B","suffix":"maj7","name":"Monolithglow"},{"key":"B","suffix":"dim","name":"Shatterhex"},{"key":"B","suffix":"aug","name":"Overcrag"},{"key":"B","suffix":"6","name":"Bedrockwarm"},{"key":"B","suffix":"m6","name":"Tombsigh"},{"key":"B","suffix":"9","name":"Titanriff"},{"key":"B","suffix":"sus2","name":"Riftgrip"},{"key":"B","suffix":"sus4","name":"Quarryclasp"},{"key":"C","suffix":"major","name":"Glintlet"},{"key":"C","suffix":"minor","name":"Shardveil"},{"key":"C","suffix":"7","name":"Prismblues"},{"key":"C","suffix":"m7","name":"Velvetfacet"},{"key":"C","suffix":"maj7","name":"Starprism"},{"key":"C","suffix":"dim","name":"Fracturehex"},{"key":"C","suffix":"aug","name":"Sunshard"},{"key":"C","suffix":"6","name":"Chimespark"},{"key":"C","suffix":"m6","name":"Gloomchime"},{"key":"C","suffix":"9","name":"Diamoracle"},{"key":"C","suffix":"sus2","name":"Prismtune"},{"key":"C","suffix":"sus4","name":"Facetclench"},{"key":"Db","suffix":"major","name":"Duskit"},{"key":"Db","suffix":"minor","name":"Wraithgloom"},{"key":"Db","suffix":"7","name":"Phantomblues"},{"key":"Db","suffix":"m7","name":"Fogserenade"},{"key":"Db","suffix":"maj7","name":"Spectralgleam"},{"key":"Db","suffix":"dim","name":"Cursewraith"},{"key":"Db","suffix":"aug","name":"Ghoulflare"},{"key":"Db","suffix":"6","name":"Lanternmurmur"},{"key":"Db","suffix":"m6","name":"Coffinhum"},{"key":"Db","suffix":"9","name":"Voidoracle"},{"key":"Db","suffix":"sus2","name":"Shadehinge"},{"key":"Db","suffix":"sus4","name":"Cryptclasp"},{"key":"D","suffix":"major","name":"Spooklet"},{"key":"D","suffix":"minor","name":"Dreadwail"},{"key":"D","suffix":"7","name":"Wraithblues"},{"key":"D","suffix":"m7","name":"Murkmuse"},{"key":"D","suffix":"maj7","name":"Palehalo"},{"key":"D","suffix":"dim","name":"Hexwraith"},{"key":"D","suffix":"aug","name":"Ghastflare"},{"key":"D","suffix":"6","name":"Lanternlull"},{"key":"D","suffix":"m6","name":"Coffinsigh"},{"key":"D","suffix":"9","name":"Cryptoracle"},{"key":"D","suffix":"sus2","name":"Hauntlink"},{"key":"D","suffix":"sus4","name":"Gravetug"},{"key":"Eb","suffix":"major","name":"Crescentlet"},{"key":"Eb","suffix":"minor","name":"Eclipsegloom"},{"key":"Eb","suffix":"7","name":"Nightblues"},{"key":"Eb","suffix":"m7","name":"Duskdrift"},{"key":"Eb","suffix":"maj7","name":"Silverglint"},{"key":"Eb","suffix":"dim","name":"Shadowhex"},{"key":"Eb","suffix":"aug","name":"Coronashard"},{"key":"Eb","suffix":"6","name":"Lunaloom"},{"key":"Eb","suffix":"m6","name":"Umbrasigh"},{"key":"Eb","suffix":"9","name":"Bloodmoon"},{"key":"Eb","suffix":"sus2","name":"Moonlink"},{"key":"Eb","suffix":"sus4","name":"Umbrahold"},{"key":"E","suffix":"major","name":"Moonyip"},{"key":"E","suffix":"minor","name":"Nightcres"},{"key":"E","suffix":"7","name":"Lunablues"},{"key":"E","suffix":"m7","name":"Duskserenade"},{"key":"E","suffix":"maj7","name":"Silverhalo"},{"key":"E","suffix":"dim","name":"Umbrahex"},{"key":"E","suffix":"aug","name":"Coronaflare"},{"key":"E","suffix":"6","name":"Lunalull"},{"key":"E","suffix":"m6","name":"Sableluna"},{"key":"E","suffix":"9","name":"Fullorac"},{"key":"E","suffix":"sus2","name":"Moonhinge"},{"key":"E","suffix":"sus4","name":"Eclipsclasp"},{"key":"F","suffix":"major","name":"Sparkit"},{"key":"F","suffix":"minor","name":"Ashmourn"},{"key":"F","suffix":"7","name":"Blazeblues"},{"key":"F","suffix":"m7","name":"Smokegroove"},{"key":"F","suffix":"maj7","name":"Goldglow"},{"key":"F","suffix":"dim","name":"Searhex"},{"key":"F","suffix":"aug","name":"Wildflare"},{"key":"F","suffix":"6","name":"Hearthhum"},{"key":"F","suffix":"m6","name":"Cindersigh"},{"key":"F","suffix":"9","name":"Inferorac"},{"key":"F","suffix":"sus2","name":"Emberlink"},{"key":"F","suffix":"sus4","name":"Pyreclasp"},{"key":"Gb","suffix":"major","name":"Mosslet"},{"key":"Gb","suffix":"minor","name":"Briarveil"},{"key":"Gb","suffix":"7","name":"Swampblues"},{"key":"Gb","suffix":"m7","name":"Fernhush"},{"key":"Gb","suffix":"maj7","name":"Dewshine"},{"key":"Gb","suffix":"dim","name":"Rotbloom"},{"key":"Gb","suffix":"aug","name":"Overbloom"},{"key":"Gb","suffix":"6","name":"Meadowmist"},{"key":"Gb","suffix":"m6","name":"Weepmoss"},{"key":"Gb","suffix":"9","name":"Ancientmoss"},{"key":"Gb","suffix":"sus2","name":"Budlink"},{"key":"Gb","suffix":"sus4","name":"Thistleclasp"},{"key":"G","suffix":"major","name":"Spriglet"},{"key":"G","suffix":"minor","name":"Thornveil"},{"key":"G","suffix":"7","name":"Groveblues"},{"key":"G","suffix":"m7","name":"Fernswing"},{"key":"G","suffix":"maj7","name":"Dewglimmer"},{"key":"G","suffix":"dim","name":"Rothex"},{"key":"G","suffix":"aug","name":"Bloomflare"},{"key":"G","suffix":"6","name":"Meadowhum"},{"key":"G","suffix":"m6","name":"Weedsigh"},{"key":"G","suffix":"9","name":"Eldergrove"},{"key":"G","suffix":"sus2","name":"Vinehinge"},{"key":"G","suffix":"sus4","name":"Rootclasp"},{"key":"Ab","suffix":"major","name":"Zephlet"},{"key":"Ab","suffix":"minor","name":"Siroccoshade"},{"key":"Ab","suffix":"7","name":"Siroccoblues"},{"key":"Ab","suffix":"m7","name":"Hushgale"},{"key":"Ab","suffix":"maj7","name":"Starzephyr"},{"key":"Ab","suffix":"dim","name":"Stormhex"},{"key":"Ab","suffix":"aug","name":"Skyflare"},{"key":"Ab","suffix":"6","name":"Highdraft"},{"key":"Ab","suffix":"m6","name":"Nightgale"},{"key":"Ab","suffix":"9","name":"Jetlegend"},{"key":"Ab","suffix":"sus2","name":"Zephlink"},{"key":"Ab","suffix":"sus4","name":"Galeclasp"}];

// Create a map for quick lookup
const nameMap = new Map();
namesData.forEach(item => {
  nameMap.set(`${item.key}-${item.suffix}`, item.name);
});

const filePath = path.join(__dirname, '../lib/chord-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the broken structure: find patterns like "positions:\n    name: "...", [" and replace
// Also fix patterns like "name: "...", [" that come before positions

// First, fix the broken patterns where name is before positions array
content = content.replace(/positions:\s*\n\s*name:\s*"([^"]+)",\s*\[/g, 'name: "$1",\n    positions: [');

// Also handle single-line broken patterns
content = content.replace(/positions:\s*name:\s*"([^"]+)",\s*\[/g, 'name: "$1",\n    positions: [');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed broken structure');

// Now read it back and do a proper replacement if needed
content = fs.readFileSync(filePath, 'utf8');

// Pattern to match: suffix: "...",\n    positions: [
// Replace with: suffix: "...",\n    name: "...",\n    positions: [
const suffixPattern = /(suffix:\s*"([^"]+)",)\s*\n\s*(positions:\s*\[)/g;

let updatedContent = content.replace(suffixPattern, (match, suffixPart, suffix, positionsPart) => {
  // Find the key for this chord by looking backwards
  const beforeMatch = content.substring(0, content.indexOf(match));
  const keyMatch = beforeMatch.match(/key:\s*"([^"]+)"/g);
  if (!keyMatch || keyMatch.length === 0) {
    console.warn('Could not find key for suffix:', suffix);
    return match;
  }
  const key = keyMatch[keyMatch.length - 1].match(/"([^"]+)"/)[1];
  const nameKey = `${key}-${suffix}`;
  const name = nameMap.get(nameKey);
  
  if (name) {
    return `${suffixPart}\n    name: "${name}",\n    ${positionsPart}`;
  }
  console.warn(`Warning: No name found for ${nameKey}`);
  return match;
});

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Successfully added fretling names to chord database');

