#!/usr/bin/env node

/**
 * Pre-commit check to ensure calendar blur implementation remains intact
 * This script MUST pass before any commit affecting CalendarMiniView.tsx
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CALENDAR_FILE = path.join(__dirname, '../src/components/calendar/CalendarMiniView.tsx');
const CSS_FILE = path.join(__dirname, '../src/index.css');

// Critical patterns that MUST exist in the calendar file
const REQUIRED_PATTERNS = [
  // Container structure
  /<div className="relative calendar-blur-container">/,
  
  // Fallback background layer
  /<div[\s\n]+className="absolute inset-0 rounded-xl"/,
  
  // Blur effect layer
  /<div[\s\n]+className="absolute inset-0 rounded-xl calendar-blur-effect"/,
  
  // Inline styles for blur
  /backdropFilter:\s*['"]blur\(12px\)['"]/,
  /WebkitBackdropFilter:\s*['"]blur\(12px\)['"]/,
  
  // Content layer with z-index
  /style=\{\{\s*zIndex:\s*2\s*\}\}/,
];

// CSS patterns that must exist
const REQUIRED_CSS_PATTERNS = [
  /\.calendar-blur-container/,
  /\.calendar-blur-effect/,
  /backdrop-filter:\s*blur\(12px\)\s*!important/,
];

function checkFile() {
  try {
    // Read calendar file
    const calendarContent = fs.readFileSync(CALENDAR_FILE, 'utf8');
    
    // Check all required patterns
    const missingPatterns = [];
    REQUIRED_PATTERNS.forEach((pattern, index) => {
      if (!pattern.test(calendarContent)) {
        missingPatterns.push(`Pattern ${index + 1}: ${pattern.toString()}`);
      }
    });
    
    if (missingPatterns.length > 0) {
      console.error('❌ CALENDAR BLUR CHECK FAILED!');
      console.error('\nThe following critical patterns are missing from CalendarMiniView.tsx:');
      missingPatterns.forEach(p => console.error(`  - ${p}`));
      console.error('\nThe calendar blur effect MUST use the two-div layered approach.');
      console.error('See src/components/calendar/CALENDAR-BLUR-CRITICAL.md for details.');
      return false;
    }
    
    // Read CSS file
    const cssContent = fs.readFileSync(CSS_FILE, 'utf8');
    
    // Check CSS patterns
    const missingCSSPatterns = [];
    REQUIRED_CSS_PATTERNS.forEach((pattern, index) => {
      if (!pattern.test(cssContent)) {
        missingCSSPatterns.push(`CSS Pattern ${index + 1}: ${pattern.toString()}`);
      }
    });
    
    if (missingCSSPatterns.length > 0) {
      console.error('❌ CSS BLUR PROTECTION CHECK FAILED!');
      console.error('\nThe following critical CSS patterns are missing:');
      missingCSSPatterns.forEach(p => console.error(`  - ${p}`));
      return false;
    }
    
    console.log('✅ Calendar blur check passed! The glass blur effect is properly protected.');
    return true;
    
  } catch (error) {
    console.error('❌ Error checking calendar blur:', error.message);
    return false;
  }
}

// Run the check
const success = checkFile();
process.exit(success ? 0 : 1);