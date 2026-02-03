#!/usr/bin/env python3
"""
Parse JSON location data and convert to globe-locations.js format.

Usage:
    python parse_locations.py input.json > output.js
    
    Or just run it and paste the JSON when prompted:
    python parse_locations.py
"""

import json
import sys
from collections import defaultdict

# Threshold: countries with total contribution below this will be aggregated
COUNTRY_THRESHOLD = 200  # Adjust this value as needed

def extract_country(city_string):
    """Extract country from 'City, Country' format."""
    parts = city_string.split(', ')
    if len(parts) >= 2:
        return parts[-1].strip()
    return city_string

def parse_locations(data):
    """Parse location data and return formatted entries."""
    # First pass: group by country and calculate totals
    country_data = defaultdict(lambda: {'cities': [], 'total': 0})
    
    for item in data:
        city = item.get('city', 'Unknown')
        count = item.get('count', 0)
        coords = item.get('coordinates', [])
        
        # Use first coordinate
        if coords and len(coords) > 0:
            lat = coords[0].get('latitude', 0)
            lng = coords[0].get('longitude', 0)
        else:
            lat, lng = 0, 0
        
        country = extract_country(city)
        country_data[country]['cities'].append({
            'name': city,
            'lat': lat,
            'lng': lng,
            'contribution': count
        })
        country_data[country]['total'] += count
    
    # Second pass: decide whether to show cities or aggregate to country
    locations = []
    
    for country, data in country_data.items():
        if data['total'] >= COUNTRY_THRESHOLD:
            # Large country: show individual cities
            for city in data['cities']:
                locations.append({
                    'name': city['name'],
                    'lat': round(city['lat'], 4),
                    'lng': round(city['lng'], 4),
                    'contribution': city['contribution']
                })
        else:
            # Small country: aggregate to single point
            # Use weighted average of coordinates
            total_contrib = data['total']
            if total_contrib > 0:
                avg_lat = sum(c['lat'] * c['contribution'] for c in data['cities']) / total_contrib
                avg_lng = sum(c['lng'] * c['contribution'] for c in data['cities']) / total_contrib
            else:
                avg_lat = data['cities'][0]['lat'] if data['cities'] else 0
                avg_lng = data['cities'][0]['lng'] if data['cities'] else 0
            
            locations.append({
                'name': country,
                'lat': round(avg_lat, 4),
                'lng': round(avg_lng, 4),
                'contribution': total_contrib
            })
    
    # Sort by contribution (descending)
    locations.sort(key=lambda x: x['contribution'], reverse=True)
    
    return locations

def format_as_js(locations):
    """Format locations as JavaScript for globe-locations.js"""
    lines = [
        "// Globe locations data - edit this file to add/modify collection locations",
        "// Each location has: name (displayed), lat, lng, and contribution (count)",
        "// The contribution value determines the size of the label/dot on the globe",
        "// Large countries show individual cities; small countries are aggregated",
        "const GLOBE_LOCATIONS = ["
    ]
    
    for loc in locations:
        lines.append(f'  {{ name: "{loc["name"]}", lat: {loc["lat"]}, lng: {loc["lng"]}, contribution: {loc["contribution"]} }},')
    
    lines.append("];")
    return "\n".join(lines)

def main():
    # Read from file if provided, otherwise from stdin
    if len(sys.argv) > 1:
        with open(sys.argv[1], 'r') as f:
            raw = f.read()
    else:
        print("Paste your JSON data (press Ctrl+D when done):", file=sys.stderr)
        raw = sys.stdin.read()
    
    # Handle Python dict format (single quotes) by converting to JSON
    raw = raw.replace("'", '"')
    
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}", file=sys.stderr)
        sys.exit(1)
    
    # Handle both list and single object
    if isinstance(data, dict):
        data = [data]
    
    locations = parse_locations(data)
    print(format_as_js(locations))
    
    print(f"\n// Parsed {len(locations)} locations", file=sys.stderr)

if __name__ == "__main__":
    main()
