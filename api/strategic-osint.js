// Strategic OSINT API - Evolved Intelligence System
import PasswordAnalyzer from '../engines/password-analyzer.js';
import StrategicEvolution from '../engines/strategic-evolution.js';

export default async function handler(req, res) {
  try {
    console.log('🧬 Strategic OSINT Agent Started');
    
    // Initialize systems
    const analyzer = new PasswordAnalyzer();
    const evolution = new StrategicEvolution();
    
    // Determine which generation to deploy based on query parameter
    const targetGeneration = parseInt(req.query.generation) || 3;
    console.log(`🎯 Deploying Generation ${targetGeneration} Configuration`);
    
    // Initialize evolution and run to target generation
    evolution.initializePopulation();
    
    let evolvedConfig = null;
    for (let i = 0; i < targetGeneration; i++) {
      const result = await evolution.evolve();
      evolvedConfig = result;
      console.log(`Gen ${i + 1}: ${result.bestAgent.genes.passwordStrategy} | Fitness: ${result.bestAgent.fitness.toFixed(3)}`);
    }
    
    const finalAgent = evolvedConfig.bestAgent;
    
    // Test with sample danieloobregon23@gmail.com data
    const testData = {
      email: 'danieloobregon23@gmail.com',
      databases: [
        {
          name: 'LinkedIn 2024',
          entries: [{ Email: 'danieloobregon23@gmail.com', Password: 'Work2024!', LastActive: '2024-03-15' }]
        },
        {
          name: 'Steam Gaming 2023', 
          entries: [{ Email: 'danieloobregon23@gmail.com', Password: 'Gaming123', LastActive: '2023-08-20' }]
        },
        {
          name: 'Old Breach 2019',
          entries: [{ Email: 'danieloobregon23@gmail.com', Password: 'slayer23', LastActive: '2019-01-10' }]
        },
        {
          name: 'Facebook 2022',
          entries: [{ Email: 'danieloobregon23@gmail.com', Password: 'Daniel@Home', LastActive: '2022-11-05' }]
        }
      ]
    };
    
    // Analyze with evolved configuration
    const analysis = analyzer.analyzePasswordSet(testData);
    
    // Apply evolved scoring
    const evolvedScoring = applyEvolvedConfiguration(analysis, finalAgent.genes);
    
    // Generate strategic targets
    const strategicTargets = generateStrategicTargets(analysis, finalAgent.genes);
    
    const response = {
      status: 'Strategic OSINT Complete',
      generation: targetGeneration,
      evolvedConfiguration: {
        strategy: finalAgent.genes.passwordStrategy,
        temporalWeight: finalAgent.genes.temporalWeight,
        patternSensitivity: finalAgent.genes.patternSensitivity,
        hashPriority: finalAgent.genes.hashPriority,
        fitness: finalAgent.fitness
      },
      analysis: {
        totalPatterns: analysis.patterns.size,
        plaintextPasswords: analysis.plaintext.length,
        hashedPasswords: analysis.hashed.length,
        strategicScore: analysis.strategicScore
      },
      evolvedScoring: evolvedScoring,
      strategicTargets: strategicTargets.slice(0, 10),
      performance: finalAgent.performance,
      timestamp: new Date().toISOString()
    };
    
    console.log(`✅ Generation ${targetGeneration} Analysis Complete`);
    console.log(`Strategy: ${finalAgent.genes.passwordStrategy}`);
    console.log(`Fitness: ${finalAgent.fitness.toFixed(3)}`);
    console.log(`Patterns Found: ${analysis.patterns.size}`);
    
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

function applyEvolvedConfiguration(analysis, genes) {
  const evolvedScores = [];
  
  analysis.patterns.forEach((pattern, base) => {
    let score = 0;
    
    // Apply evolved temporal weighting
    pattern.variations.forEach(variation => {
      const year = extractYear(variation.timestamp);
      if (year >= 2024) score += genes.recencyBonus * genes.temporalWeight;
      if (year >= 2023) score += genes.recencyBonus * genes.temporalWeight * 0.7;
      if (year >= 2022) score += genes.recencyBonus * genes.temporalWeight * 0.4;
    });
    
    // Apply evolved uniqueness scoring
    if (pattern.frequency === 1) {
      score += genes.uniquenessBonus;
    }
    
    // Apply evolved reuse scoring
    if (pattern.services.size > 1) {
      score += genes.reuseBonus * pattern.services.size;
    }
    
    evolvedScores.push({
      base: base,
      frequency: pattern.frequency,
      services: Array.from(pattern.services),
      evolvedScore: score,
      variations: pattern.variations.map(v => v.full)
    });
  });
  
  // Sort by evolved scoring
  evolvedScores.sort((a, b) => b.evolvedScore - a.evolvedScore);
  
  return evolvedScores;
}

function generateStrategicTargets(analysis, genes) {
  const targets = [];
  
  // Generate based on evolved strategy
  analysis.patterns.forEach((pattern, base) => {
    const variationCount = Math.min(genes.variationGeneration, 5);
    
    switch (genes.passwordStrategy) {
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

function extractYear(timestamp) {
  const yearMatch = timestamp?.match(/(20\d{2})/);
  return yearMatch ? parseInt(yearMatch[1]) : 2020;
}