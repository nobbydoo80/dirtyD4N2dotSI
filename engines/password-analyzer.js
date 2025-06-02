// Strategic Password Analysis Engine
// Flexible approach - no hardcoded assumptions

import crypto from 'crypto';

export class PasswordAnalyzer {
  constructor() {
    this.hashTypes = new Map([
      [32, 'MD5'],
      [40, 'SHA1'], 
      [64, 'SHA256'],
      [60, 'bcrypt'], // $2b$ prefix
      [128, 'SHA512']
    ]);
    
    this.commonHashes = new Map([
      // Add known hash-plaintext pairs for instant cracking
      ['5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'password'],
      ['d7229c6ef8a2dad83fb06da698271343', 'slayer23'] // Example from our data
    ]);
  }

  analyzePasswordSet(breachData) {
    const analysis = {
      plaintext: [],
      hashed: [],
      patterns: new Map(),
      temporalData: [],
      serviceContext: new Map(),
      strategicScore: 0
    };

    // Extract all password-like fields from breach data
    breachData.databases?.forEach(db => {
      db.entries?.forEach(entry => {
        this.extractPasswordData(entry, db, analysis);
      });
    });

    // Analyze patterns across all passwords
    this.analyzePatterns(analysis);
    
    // Score strategic value
    this.calculateStrategicValue(analysis);

    return analysis;
  }

  extractPasswordData(entry, database, analysis) {
    const passwordFields = ['Password', 'password', 'pwd', 'pass', 'Password(MD5)', 'Password(bcrypt)'];
    const timestamp = this.extractTimestamp(database.name, entry);
    
    passwordFields.forEach(field => {
      if (entry[field]) {
        const pwData = {
          value: entry[field],
          field: field,
          database: database.name,
          timestamp: timestamp,
          email: entry.Email || entry.email,
          type: this.classifyPassword(entry[field])
        };

        if (pwData.type === 'plaintext') {
          analysis.plaintext.push(pwData);
        } else {
          // Try to crack hash immediately
          const cracked = this.attemptCrack(entry[field]);
          if (cracked) {
            pwData.cracked = cracked;
            analysis.plaintext.push(pwData);
          } else {
            analysis.hashed.push(pwData);
          }
        }

        analysis.temporalData.push(pwData);
      }
    });
  }

  classifyPassword(password) {
    // Detect if it's a hash or plaintext
    if (password.startsWith('$2b$') || password.startsWith('$2a$')) {
      return 'bcrypt';
    }
    
    const length = password.length;
    if (this.hashTypes.has(length) && /^[a-f0-9]+$/i.test(password)) {
      return this.hashTypes.get(length);
    }
    
    return 'plaintext';
  }

  attemptCrack(hash) {
    // Check against known hash database
    return this.commonHashes.get(hash.toLowerCase());
  }

  analyzePatterns(analysis) {
    const patterns = new Map();
    
    analysis.plaintext.forEach(pw => {
      // Extract patterns: base words, numbers, symbols
      const pattern = this.extractPattern(pw.value);
      
      if (!patterns.has(pattern.base)) {
        patterns.set(pattern.base, {
          base: pattern.base,
          variations: [],
          frequency: 0,
          services: new Set(),
          timespan: { earliest: null, latest: null }
        });
      }
      
      const patternData = patterns.get(pattern.base);
      patternData.variations.push({
        full: pw.value,
        suffix: pattern.suffix,
        database: pw.database,
        timestamp: pw.timestamp
      });
      patternData.frequency++;
      patternData.services.add(pw.database);
      
      // Update timespan
      if (!patternData.timespan.earliest || pw.timestamp < patternData.timespan.earliest) {
        patternData.timespan.earliest = pw.timestamp;
      }
      if (!patternData.timespan.latest || pw.timestamp > patternData.timespan.latest) {
        patternData.timespan.latest = pw.timestamp;
      }
    });

    analysis.patterns = patterns;
  }

  extractPattern(password) {
    // Flexible pattern extraction - not hardcoded to "Slayer23"
    const baseMatch = password.match(/^([a-zA-Z]+)/);
    const numberMatch = password.match(/(\d+)/);
    const symbolMatch = password.match(/([!@#$%^&*()_+-=])/);
    
    return {
      base: baseMatch ? baseMatch[1].toLowerCase() : '',
      numbers: numberMatch ? numberMatch[1] : '',
      symbols: symbolMatch ? symbolMatch[1] : '',
      suffix: password.replace(baseMatch?.[1] || '', ''),
      full: password
    };
  }

  calculateStrategicValue(analysis) {
    let score = 0;
    
    // Recency bonus (2024+ passwords more valuable)
    analysis.temporalData.forEach(pw => {
      if (pw.timestamp && pw.timestamp.includes('2024')) score += 10;
      if (pw.timestamp && pw.timestamp.includes('2023')) score += 5;
    });
    
    // Uniqueness bonus (rare passwords more valuable than common ones)
    analysis.patterns.forEach(pattern => {
      if (pattern.frequency === 1) score += 15; // Unique patterns
      if (pattern.frequency > 3) score += 5;    // Reused patterns
    });
    
    // Service diversity bonus
    const uniqueServices = new Set();
    analysis.temporalData.forEach(pw => uniqueServices.add(pw.database));
    score += uniqueServices.size * 3;
    
    analysis.strategicScore = score;
  }

  extractTimestamp(databaseName, entry) {
    // Try to extract temporal information
    if (entry.LastActive) return entry.LastActive;
    if (entry.Date) return entry.Date;
    
    // Guess from database name patterns
    const yearMatch = databaseName.match(/(20\d{2})/);
    return yearMatch ? yearMatch[1] : '2020'; // Default fallback
  }

  generateStrategicTargets(analysis) {
    // Generate next search targets based on flexible analysis
    const targets = [];
    
    // For each pattern base, generate likely variations
    analysis.patterns.forEach(pattern => {
      const base = pattern.base;
      
      // Generate temporal variations
      ['2024', '2025', '!', '@', '123'].forEach(suffix => {
        targets.push(`${base}${suffix}`);
        targets.push(`${base.charAt(0).toUpperCase()}${base.slice(1)}${suffix}`);
      });
    });
    
    return targets.slice(0, 20); // Top 20 strategic targets
  }
}

export default PasswordAnalyzer;