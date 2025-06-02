// Strategic Intelligence API - Evolved OSINT System
import PasswordAnalyzer from '../engines/password-analyzer.js';
import StrategicEvolution from '../engines/strategic-evolution.js';

export class IntelligenceAPI {
  constructor() {
    this.analyzer = new PasswordAnalyzer();
    this.evolution = new StrategicEvolution();
    this.evolvedConfig = null;
    this.isEvolved = false;
  }

  // Initialize with evolved configuration
  async initialize() {
    console.log('🧠 Initializing Strategic Intelligence System...');
    
    // Run evolution to find optimal configuration
    this.evolution.initializePopulation();
    
    // Quick evolution (3 generations for initialization)
    for (let i = 0; i < 3; i++) {
      await this.evolution.evolve();
    }
    
    this.evolvedConfig = this.evolution.getBestConfiguration();
    this.isEvolved = true;
    
    console.log('✅ System initialized with evolved configuration');
    console.log(`Best Strategy: ${this.evolvedConfig.agent.genes.passwordStrategy}`);
    console.log(`Fitness Score: ${this.evolvedConfig.agent.fitness.toFixed(3)}`);
  }

  // Main intelligence analysis endpoint
  async analyzeTarget(targetData) {
    if (!this.isEvolved) {
      await this.initialize();
    }

    console.log(`🎯 Analyzing target: ${targetData.email || 'Unknown'}`);
    
    // Apply evolved configuration to analysis
    const analysis = this.analyzer.analyzePasswordSet(targetData);
    
    // Apply evolved strategic scoring
    this.applyEvolvedScoring(analysis);
    
    // Generate evolved search targets
    const strategicTargets = this.generateEvolvedTargets(analysis);
    
    return {
      target: targetData.email || 'Unknown',
      analysis: analysis,
      strategicTargets: strategicTargets,
      evolvedConfig: {
        strategy: this.evolvedConfig.agent.genes.passwordStrategy,
        temporalWeight: this.evolvedConfig.agent.genes.temporalWeight,
        patternSensitivity: this.evolvedConfig.agent.genes.patternSensitivity,
        generation: this.evolvedConfig.generation,
        fitness: this.evolvedConfig.agent.fitness
      },
      timestamp: new Date().toISOString()
    };
  }

  applyEvolvedScoring(analysis) {
    const config = this.evolvedConfig.agent.genes;
    
    // Apply evolved bonuses to strategic scoring
    analysis.patterns.forEach(pattern => {
      let evolvedScore = 0;
      
      // Apply temporal weighting based on evolution
      pattern.variations.forEach(variation => {
        const year = this.extractYear(variation.timestamp);
        if (year >= 2024) evolvedScore += config.recencyBonus;
        if (year >= 2023) evolvedScore += config.recencyBonus * 0.7;
        if (year >= 2022) evolvedScore += config.recencyBonus * 0.4;
      });
      
      // Apply uniqueness bonus
      if (pattern.frequency === 1) {
        evolvedScore += config.uniquenessBonus;
      }
      
      // Apply reuse bonus
      if (pattern.services.size > 1) {
        evolvedScore += config.reuseBonus * pattern.services.size;
      }
      
      pattern.evolvedScore = evolvedScore;
    });
    
    // Re-sort by evolved scoring
    const sortedPatterns = Array.from(analysis.patterns.values())
      .sort((a, b) => (b.evolvedScore || 0) - (a.evolvedScore || 0));
    
    analysis.topPatterns = sortedPatterns.slice(0, 5);
  }

  generateEvolvedTargets(analysis) {
    const config = this.evolvedConfig.agent.genes;
    const targets = [];
    
    // Generate targets based on evolved strategy
    analysis.topPatterns?.forEach(pattern => {
      const base = pattern.base;
      
      // Generate variations based on evolved configuration
      const variationCount = config.variationGeneration;
      
      // Strategy-specific target generation
      switch (config.passwordStrategy) {
        case 'recency_first':
          targets.push(...this.generateRecentTargets(base, variationCount));
          break;
        case 'uniqueness_first':
          targets.push(...this.generateUniqueTargets(base, variationCount));
          break;
        case 'frequency_first':
          targets.push(...this.generateFrequentTargets(base, variationCount));
          break;
        case 'hybrid_adaptive':
          targets.push(...this.generateAdaptiveTargets(base, variationCount, pattern));
          break;
      }
    });
    
    return targets.slice(0, 20); // Return top 20 strategic targets
  }

  generateRecentTargets(base, count) {
    const currentYear = new Date().getFullYear();
    const targets = [];
    
    for (let i = 0; i < count && i < 10; i++) {
      targets.push(`${base}${currentYear + i}`);
      targets.push(`${base.charAt(0).toUpperCase()}${base.slice(1)}${currentYear}!`);
    }
    
    return targets;
  }

  generateUniqueTargets(base, count) {
    const uniqueSuffixes = ['!@#', '2024$', '_Pro', '@Work', '!New'];
    const targets = [];
    
    uniqueSuffixes.slice(0, count).forEach(suffix => {
      targets.push(`${base}${suffix}`);
      targets.push(`${base.charAt(0).toUpperCase()}${base.slice(1)}${suffix}`);
    });
    
    return targets;
  }

  generateFrequentTargets(base, count) {
    const commonSuffixes = ['123', '!', '2024', '@', '456'];
    const targets = [];
    
    commonSuffixes.slice(0, count).forEach(suffix => {
      targets.push(`${base}${suffix}`);
    });
    
    return targets;
  }

  generateAdaptiveTargets(base, count, pattern) {
    const targets = [];
    
    // Adaptive based on pattern characteristics
    if (pattern.services.has('LinkedIn') || pattern.services.has('Work')) {
      targets.push(`${base}Work2024`, `${base}@Office`, `${base}_Job`);
    }
    
    if (pattern.services.has('Steam') || pattern.services.has('Gaming')) {
      targets.push(`${base}Game`, `${base}Play2024`, `${base}_Gaming`);
    }
    
    // Add temporal adaptations
    const recentYears = [2024, 2025];
    recentYears.forEach(year => {
      targets.push(`${base}${year}`, `${base}${year}!`);
    });
    
    return targets.slice(0, count);
  }

  extractYear(timestamp) {
    const yearMatch = timestamp?.match(/(20\d{2})/);
    return yearMatch ? parseInt(yearMatch[1]) : 2020;
  }

  // Evolution endpoint
  async evolveSystem(generations = 5) {
    console.log(`🧬 Running ${generations} evolution cycles...`);
    
    // Initialize if not already done
    if (this.evolution.population.length === 0) {
      this.evolution.initializePopulation();
    }
    
    for (let i = 0; i < generations; i++) {
      await this.evolution.evolve();
    }
    
    this.evolvedConfig = this.evolution.getBestConfiguration();
    
    return {
      generations: generations,
      finalFitness: this.evolvedConfig.agent.fitness,
      bestConfiguration: this.evolvedConfig.agent.genes,
      fitnessHistory: this.evolvedConfig.fitnessHistory
    };
  }

  // Get current system status
  getStatus() {
    return {
      isEvolved: this.isEvolved,
      currentGeneration: this.evolvedConfig?.generation || 0,
      currentFitness: this.evolvedConfig?.agent.fitness || 0,
      currentStrategy: this.evolvedConfig?.agent.genes.passwordStrategy || 'uninitialized'
    };
  }
}

export default IntelligenceAPI;