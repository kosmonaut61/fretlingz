"""
Chord Database Validation Script
Analyzes chord-data.ts to identify potential issues like:
- Duplicate fingerings for different chord types
- Suspicious identical patterns
- Invalid data structures
- Music theory inconsistencies
"""

import re
import json
from collections import defaultdict
import os
import sys

def parse_chord_data(file_path):
    """Parse the TypeScript chord data file"""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Extract the chordDatabase array
    match = re.search(r'export const chordDatabase: Chord\[\] = \[(.*)\];', content, re.DOTALL)
    if not match:
        print("Could not find chordDatabase in file")
        return []
    
    # Parse individual chord objects
    chord_pattern = r'\{[^}]*key:\s*"([^"]+)"[^}]*suffix:\s*"([^"]+)"[^}]*positions:\s*\[(.*?)\]\s*\}'
    chords = []
    
    for match in re.finditer(chord_pattern, content, re.DOTALL):
        key = match.group(1)
        suffix = match.group(2)
        positions_str = match.group(3)
        
        # Parse positions array
        position_pattern = r'\{\s*positions:\s*\[([^\]]+)\]\s*,\s*fingerings:\s*\[([^\]]+)\]\s*,\s*baseFret:\s*(\d+)(?:\s*,\s*barres:\s*\[([^\]]*)\])?\s*\}'
        
        positions = []
        for pos_match in re.finditer(position_pattern, positions_str):
            pos_array = pos_match.group(1).replace('"x"', '-1').replace('"', '').split(',')
            positions_nums = [int(p.strip()) if p.strip() != 'x' else -1 for p in pos_array]
            
            fing_array = pos_match.group(2).split(',')
            fingerings = [int(f.strip()) for f in fing_array]
            
            base_fret = int(pos_match.group(3))
            
            barres = []
            if pos_match.group(4):
                barres = [int(b.strip()) for b in pos_match.group(4).split(',') if b.strip()]
            
            positions.append({
                'positions': positions_nums,
                'fingerings': fingerings,
                'baseFret': base_fret,
                'barres': barres
            })
        
        chords.append({
            'key': key,
            'suffix': suffix,
            'positions': positions
        })
    
    return chords

def validate_chords(chords):
    """Run validation checks on chord database"""
    issues = []
    
    # Group chords by key for comparison
    chords_by_key = defaultdict(list)
    for chord in chords:
        chords_by_key[chord['key']].append(chord)
    
    print("=" * 60)
    print("CHORD DATABASE VALIDATION REPORT")
    print("=" * 60)
    print(f"\nTotal chords: {len(chords)}")
    print(f"Keys: {len(chords_by_key)}")
    print()
    
    # Check 1: Find duplicate positions/fingerings
    print("🔍 Checking for duplicate fingerings within each key...\n")
    
    for key, key_chords in chords_by_key.items():
        # Compare all chord types within this key
        for i, chord1 in enumerate(key_chords):
            for chord2 in key_chords[i+1:]:
                # Compare first position of each chord
                if chord1['positions'] and chord2['positions']:
                    pos1 = chord1['positions'][0]
                    pos2 = chord2['positions'][0]
                    
                    # Check if positions are identical or very similar
                    if pos1['positions'] == pos2['positions']:
                        issue = f"⚠️  {key}{chord1['suffix']} and {key}{chord2['suffix']} have IDENTICAL positions: {pos1['positions']}"
                        print(issue)
                        issues.append(issue)
                    
                    # Check if fingerings are identical (but positions differ)
                    elif pos1['fingerings'] == pos2['fingerings'] and pos1['positions'] != pos2['positions']:
                        issue = f"⚠️  {key}{chord1['suffix']} and {key}{chord2['suffix']} have identical fingerings but different positions"
                        print(f"   {issue}")
                        print(f"     {chord1['suffix']}: positions={pos1['positions']}, fingerings={pos1['fingerings']}")
                        print(f"     {chord2['suffix']}: positions={pos2['positions']}, fingerings={pos2['fingerings']}")
                        issues.append(issue)
    
    # Check 2: Validate data structure
    print("\n🔍 Checking data structure validity...\n")
    
    for chord in chords:
        for i, pos in enumerate(chord['positions']):
            # Check that positions and fingerings have same length
            if len(pos['positions']) != len(pos['fingerings']):
                issue = f"❌ {chord['key']}{chord['suffix']} position {i}: positions length ({len(pos['positions'])}) != fingerings length ({len(pos['fingerings'])})"
                print(issue)
                issues.append(issue)
            
            # Check that positions and fingerings have 6 elements (6 strings)
            if len(pos['positions']) != 6:
                issue = f"❌ {chord['key']}{chord['suffix']} position {i}: should have 6 positions (has {len(pos['positions'])})"
                print(issue)
                issues.append(issue)
            
            # Check for invalid fingerings (should be 0-4)
            invalid_fingerings = [f for f in pos['fingerings'] if f < 0 or f > 4]
            if invalid_fingerings:
                issue = f"❌ {chord['key']}{chord['suffix']} position {i}: invalid fingerings {invalid_fingerings}"
                print(issue)
                issues.append(issue)
    
    # Check 3: Look for suspicious sus2/sus4 patterns
    print("\n🔍 Checking sus2/sus4 chords specifically...\n")
    
    for key, key_chords in chords_by_key.items():
        sus2 = next((c for c in key_chords if c['suffix'] == 'sus2'), None)
        sus4 = next((c for c in key_chords if c['suffix'] == 'sus4'), None)
        
        if sus2 and sus4:
            if sus2['positions'] and sus4['positions']:
                pos_sus2 = sus2['positions'][0]['positions']
                pos_sus4 = sus4['positions'][0]['positions']
                
                # sus2 and sus4 should differ (usually by the position on one string)
                differences = sum(1 for a, b in zip(pos_sus2, pos_sus4) if a != b)
                
                if differences == 0:
                    issue = f"⚠️  {key}sus2 and {key}sus4 are IDENTICAL - likely an error!"
                    print(issue)
                    issues.append(issue)
                elif differences > 2:
                    # They can differ by more than one position, but let's flag it for review
                    print(f"ℹ️  {key}sus2 and {key}sus4 differ in {differences} positions (may be normal)")
    
    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    if issues:
        print(f"\n❌ Found {len(issues)} potential issues")
        print("\nRecommendation: Review the flagged chords above")
    else:
        print("\n✅ No issues found! Chord database looks good.")
    print()
    
    return issues

if __name__ == "__main__":
    # Try multiple possible paths
    possible_paths = [
        "lib/chord-data.ts",
        "../lib/chord-data.ts",
        "/tmp/test-repo-cline/lib/chord-data.ts",
    ]
    
    # Find the correct path
    chord_file = None
    for path in possible_paths:
        if os.path.exists(path):
            chord_file = path
            break
    
    if not chord_file:
        # Try to find it relative to script location
        script_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(script_dir)
        chord_file = os.path.join(project_root, "lib", "chord-data.ts")
    
    try:
        print(f"Looking for chord data at: {chord_file}")
        
        if not os.path.exists(chord_file):
            print(f"❌ Could not find file: {chord_file}")
            print("Make sure you're running this from the project root directory")
            sys.exit(1)
        
        print("Parsing chord database...")
        chords = parse_chord_data(chord_file)
        
        if not chords:
            print("❌ Could not parse chords from file")
            sys.exit(1)
        
        print(f"✅ Parsed {len(chords)} chords\n")
        
        # Run validation
        issues = validate_chords(chords)
        
        # Exit with error code if issues found
        sys.exit(1 if issues else 0)
        
    except FileNotFoundError:
        print(f"❌ Could not find file: {chord_file}")
        print("Make sure you're running this from the project root directory")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
