// Strategic OSINT API - Standalone Version for Vercel
// Includes all dependencies inline for reliable deployment

export default async function handler(req, res) {
  try {
    console.log('🧬 Strategic OSINT Agent Started (Standalone)');
    
    // Determine which generation to deploy
    const targetGeneration = parseInt(req.query.generation) || 3;
    console.log(`🎯 Deploying Generation ${targetGeneration} Configuration`);
    
    // Simplified evolution system (inline)
    const strategicConfigurations = {
      3: {
        strategy: 'hybrid_adaptive',
        temporalWeight: 0.823,
        patternSensitivity: 0.765,
        hashPriority: 'crack_easy',
        fitness: 0.542,
        performance: {
          passwordAnalysis: 0.850,
          temporalIntelligence: 0.823,
          patternRecognition: 0.765,
          strategicPrioritization: 0.680,
          crossPlatformMapping: 0.590
        }
      },
      6: {
        strategy: 'recency_first',
        temporalWeight: 1.000,
        patternSensitivity: 0.834,
        hashPriority: 'smart_selective',
        fitness: 0.680,
        performance: {
          passwordAnalysis: 0.920,
          temporalIntelligence: 1.000,
          patternRecognition: 0.834,
          strategicPrioritization: 0.750,
          crossPlatformMapping: 0.695
        }
      },
      9: {
        strategy: 'uniqueness_first',
        temporalWeight: 0.891,
        patternSensitivity: 0.892,
        hashPriority: 'crack_all',
        fitness: 0.705,
        performance: {
          passwordAnalysis: 0.950,
          temporalIntelligence: 0.891,
          patternRecognition: 0.892,
          strategicPrioritization: 0.820,
          crossPlatformMapping: 0.772
        }
      }
    };
    
    // Get evolved configuration
    const evolvedConfig = strategicConfigurations[targetGeneration] || strategicConfigurations[6];
    
    // Test with sample danieloobregon23@gmail.com data
    const testData = {
      email: 'danieloobregon23@gmail.com',
      passwords: [
        { password: 'Work2024!', source: 'LinkedIn 2024', lastActive: '2024-03-15', type: 'plaintext' },
        { password: 'Gaming123', source: 'Steam Gaming 2023', lastActive: '2023-08-20', type: 'plaintext' },
        { password: 'slayer23', source: 'Old Breach 2019', lastActive: '2019-01-10', type: 'plaintext' },
        { password: 'Daniel@Home', source: 'Facebook 2022', lastActive: '2022-11-05', type: 'plaintext' }
      ]
    };
    
    // Analyze passwords with evolved intelligence
    const analysis = analyzePasswordSet(testData, evolvedConfig);
    
    // Generate strategic targets
    const strategicTargets = generateStrategicTargets(analysis, evolvedConfig);
    
    const response = {
      status: 'Strategic OSINT Complete',
      generation: targetGeneration,
      evolvedConfiguration: {
        strategy: evolvedConfig.strategy,
        temporalWeight: evolvedConfig.temporalWeight,
        patternSensitivity: evolvedConfig.patternSensitivity,
        hashPriority: evolvedConfig.hashPriority,
        fitness: evolvedConfig.fitness
      },
      analysis: {
        totalPatterns: analysis.patterns.length,
        plaintextPasswords: analysis.plaintext.length,
        hashedPasswords: analysis.hashed.length,
        strategicScore: analysis.strategicScore
      },
      evolvedScoring: analysis.evolvedScoring,
      strategicTargets: strategicTargets.slice(0, 10),
      performance: evolvedConfig.performance,
      timestamp: new Date().toISOString()
    };
    
    console.log(`✅ Generation ${targetGeneration} Analysis Complete`);
    console.log(`Strategy: ${evolvedConfig.strategy}`);
    console.log(`Fitness: ${evolvedConfig.fitness.toFixed(3)}`);
    console.log(`Patterns Found: ${analysis.patterns.length}`);
    
    res.status(200).json(response);
    
  } catch (error) {
    console.error('❌ Strategic OSINT Error:', error);
    res.status(500).json({ 
      error: 'Strategic OSINT failed', 
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

function analyzePasswordSet(data, config) {
  const patterns = new Map();
  const plaintext = [];
  const hashed = [];
  
  // Process each password
  data.passwords.forEach(entry => {
    if (entry.type === 'plaintext') {
      plaintext.push(entry);
      
      // Extract base pattern
      const base = extractBasePattern(entry.password);
      if (!patterns.has(base)) {
        patterns.set(base, {
          base: base,
          frequency: 0,
          services: new Set(),
          variations: [],
          evolvedScore: 0
        });
      }
      
      const pattern = patterns.get(base);
      pattern.frequency++;
      pattern.services.add(entry.source);
      pattern.variations.push({
        full: entry.password,
        timestamp: entry.lastActive,
        source: entry.source
      });
    } else {
      hashed.push(entry);
    }
  });
  
  // Apply evolved scoring
  const evolvedScoring = [];
  patterns.forEach((pattern, base) => {
    let score = 0;
    
    // Apply evolved temporal weighting
    pattern.variations.forEach(variation => {
      const year = extractYear(variation.timestamp);
      if (year >= 2024) score += 10 * config.temporalWeight;
      if (year >= 2023) score += 7 * config.temporalWeight;
      if (year >= 2022) score += 4 * config.temporalWeight;
      if (year <= 2020) score += 1 * config.temporalWeight;
    });
    
    // Apply evolved uniqueness scoring
    if (pattern.frequency === 1) {
      score += 5 * config.patternSensitivity;
    }
    
    // Apply evolved reuse scoring
    if (pattern.services.size > 1) {
      score += 3 * pattern.services.size;
    }
    
    pattern.evolvedScore = score;
    
    evolvedScoring.push({
      base: base,
      frequency: pattern.frequency,
      services: Array.from(pattern.services),
      evolvedScore: score,
      variations: pattern.variations.map(v => v.full)
    });
  });
  
  // Sort by evolved scoring
  evolvedScoring.sort((a, b) => b.evolvedScore - a.evolvedScore);
  
  const strategicScore = evolvedScoring.reduce((sum, item) => sum + item.evolvedScore, 0);
  
  return {
    patterns: Array.from(patterns.values()),
    plaintext,
    hashed,
    evolvedScoring,
    strategicScore
  };
}

function generateStrategicTargets(analysis, config) {
  const targets = [];
  
  // Generate based on evolved strategy
  analysis.patterns.forEach(pattern => {
    const base = pattern.base;
    
    switch (config.strategy) {
      case 'hybrid_adaptive':
        // Combine multiple approaches
        targets.push(`${base}2024`, `${base}2025`, `${base}!`, `${base}@Work`);
        targets.push(`${base.charAt(0).toUpperCase()}${base.slice(1)}2024!`);
        break;
      case 'recency_first':
        targets.push(`${base}2024`, `${base}2025`, `${base}New`, `${base}Current`);
        break;
      case 'uniqueness_first':
        targets.push(`${base}!@#`, `${base}_Unique`, `${base}$pecial`);
        break;
      case 'frequency_first':
        targets.push(`${base}123`, `${base}!`, `${base}2024`);
        break;
    }
  });
  
  return [...new Set(targets)]; // Remove duplicates
}

function extractBasePattern(password) {
  // Extract base word from password (remove numbers, special chars)
  const base = password.replace(/[0-9!@#$%^&*()_+=\-\[\]{}|;':",./<>?~`]/g, '').toLowerCase();
  return base || 'unknown';
}

function extractYear(timestamp) {
  const yearMatch = timestamp?.match(/(20\d{2})/);
  return yearMatch ? parseInt(yearMatch[1]) : 2020;
}