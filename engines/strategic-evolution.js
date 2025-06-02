// Strategic Evolution Engine - Darwin Gödel Machine for Intelligence Systems
// Learns optimal OSINT strategies through empirical validation

export class StrategicEvolution {
  constructor() {
    this.populationSize = 8;
    this.generations = 0;
    this.population = [];
    this.fitnessHistory = [];
    this.mutationRate = 0.3;
    this.crossoverRate = 0.7;
    this.elitismCount = 2;
  }

  // Intelligence Agent Genome
  createAgent() {
    return {
      id: `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      genes: {
        // Password Analysis Strategy
        passwordStrategy: this.randomChoice(['frequency_first', 'recency_first', 'uniqueness_first', 'hybrid_adaptive']),
        hashPriority: this.randomChoice(['crack_all', 'crack_easy', 'ignore_hashes', 'smart_selective']),
        
        // Temporal Intelligence
        temporalWeight: Math.random(), // 0-1: How much to weight recent passwords
        historicalDepth: this.randomChoice([1, 2, 3, 5]), // Years back to analyze
        
        // Pattern Recognition
        patternSensitivity: Math.random(), // 0-1: How aggressive pattern matching
        baseWordExtraction: this.randomChoice(['conservative', 'aggressive', 'contextual']),
        variationGeneration: this.randomInt(5, 25), // Number of variations to generate
        
        // Strategic Scoring
        uniquenessBonus: Math.random() * 20, // Bonus for unique passwords
        recencyBonus: Math.random() * 15,    // Bonus for recent passwords
        reuseBonus: Math.random() * 10,      // Bonus for cross-platform reuse
        
        // Search Strategy
        searchBreadth: this.randomChoice(['narrow_deep', 'broad_shallow', 'adaptive_depth']),
        sourceWeighting: this.randomChoice(['equal_weight', 'quality_weighted', 'recency_weighted']),
        
        // Intelligence Thresholds
        minimumConfidence: Math.random() * 0.5 + 0.5, // 0.5-1.0
        alertThreshold: this.randomInt(1, 10),
        priorityThreshold: Math.random() * 0.8 + 0.2  // 0.2-1.0
      },
      fitness: 0,
      performance: {},
      generation: this.generations
    };
  }

  // Initialize population
  initializePopulation() {
    this.population = [];
    for (let i = 0; i < this.populationSize; i++) {
      this.population.push(this.createAgent());
    }
    console.log(`🧬 Initialized population of ${this.populationSize} strategic intelligence agents`);
  }

  // Benchmark agent performance on strategic intelligence tasks
  async benchmarkAgent(agent) {
    const benchmarks = {
      passwordAnalysis: await this.benchmarkPasswordAnalysis(agent),
      temporalIntelligence: await this.benchmarkTemporalIntelligence(agent),
      patternRecognition: await this.benchmarkPatternRecognition(agent),
      strategicPrioritization: await this.benchmarkStrategicPrioritization(agent),
      crossPlatformMapping: await this.benchmarkCrossPlatformMapping(agent)
    };

    // Calculate overall fitness
    const weights = {
      passwordAnalysis: 0.3,
      temporalIntelligence: 0.2,
      patternRecognition: 0.2,
      strategicPrioritization: 0.2,
      crossPlatformMapping: 0.1
    };

    let fitness = 0;
    Object.keys(benchmarks).forEach(key => {
      fitness += benchmarks[key] * weights[key];
    });

    agent.fitness = fitness;
    agent.performance = benchmarks;
    return agent;
  }

  async benchmarkPasswordAnalysis(agent) {
    // Test agent's ability to analyze diverse password sets
    const testData = this.generateTestPasswordData();
    let score = 0;

    // Test 1: Pattern Recognition Accuracy
    const patterns = this.simulatePatternExtraction(testData, agent);
    if (patterns.includes('work2024')) score += 0.25; // Correctly identified recent pattern
    if (patterns.includes('gaming123')) score += 0.15; // Gaming context
    if (patterns.includes('daniel')) score += 0.10;    // Personal identifier

    // Test 2: Hash Handling
    if (agent.genes.hashPriority === 'smart_selective') score += 0.2;
    if (agent.genes.hashPriority === 'crack_easy') score += 0.15;

    // Test 3: Temporal Weighting
    if (agent.genes.temporalWeight > 0.7) score += 0.15; // Values recent passwords
    
    return Math.min(1.0, score);
  }

  async benchmarkTemporalIntelligence(agent) {
    let score = 0;
    
    // Test ability to prioritize recent vs old passwords
    const testPasswords = [
      { password: 'OldPass2019', year: 2019, value: 0.2 },
      { password: 'Work2024!', year: 2024, value: 0.9 },
      { password: 'Gaming2023', year: 2023, value: 0.7 }
    ];

    // Agent should prioritize 2024 > 2023 > 2019
    const prioritized = this.simulateTemporalScoring(testPasswords, agent);
    if (prioritized[0].year === 2024) score += 0.4;
    if (prioritized[1].year === 2023) score += 0.3;
    if (prioritized[2].year === 2019) score += 0.2;

    // Bonus for appropriate historical depth
    if (agent.genes.historicalDepth >= 3 && agent.genes.historicalDepth <= 5) score += 0.1;

    return Math.min(1.0, score);
  }

  async benchmarkPatternRecognition(agent) {
    let score = 0;
    
    // Test pattern extraction from diverse passwords
    const testPatterns = [
      'Slayer23!',    // Gaming pattern
      'Daniel2024@',  // Personal + year + symbol
      'Work_Pass123', // Work context
      'qwerty',       // Common weak
      'MyDog_Rex2023' // Personal + pet + year
    ];

    testPatterns.forEach(password => {
      const pattern = this.simulatePatternAnalysis(password, agent);
      
      // Score based on pattern quality
      if (pattern.base && pattern.suffix) score += 0.15;
      if (pattern.context && pattern.context !== 'unknown') score += 0.05;
    });

    // Bonus for appropriate sensitivity
    if (agent.genes.patternSensitivity > 0.4 && agent.genes.patternSensitivity < 0.8) {
      score += 0.1; // Not too aggressive, not too conservative
    }

    return Math.min(1.0, score);
  }

  async benchmarkStrategicPrioritization(agent) {
    let score = 0;
    
    // Test strategic value calculation
    const testScenarios = [
      { password: 'Work2024!', unique: true, recent: true, reused: false, expectedScore: 'high' },
      { password: 'password123', unique: false, recent: false, reused: true, expectedScore: 'low' },
      { password: 'Gaming2023', unique: true, recent: true, reused: true, expectedScore: 'medium-high' }
    ];

    testScenarios.forEach(scenario => {
      const strategicValue = this.simulateStrategicScoring(scenario, agent);
      
      if (scenario.expectedScore === 'high' && strategicValue > 0.7) score += 0.25;
      if (scenario.expectedScore === 'low' && strategicValue < 0.3) score += 0.15;
      if (scenario.expectedScore === 'medium-high' && strategicValue > 0.5) score += 0.2;
    });

    // Bonus for balanced scoring weights
    const totalBonus = agent.genes.uniquenessBonus + agent.genes.recencyBonus + agent.genes.reuseBonus;
    if (totalBonus > 20 && totalBonus < 40) score += 0.15; // Balanced approach

    return Math.min(1.0, score);
  }

  async benchmarkCrossPlatformMapping(agent) {
    let score = 0;
    
    // Test cross-platform intelligence
    const platformData = [
      { platform: 'LinkedIn', password: 'Work2024!', context: 'professional' },
      { platform: 'Steam', password: 'Gaming123', context: 'gaming' },
      { platform: 'Facebook', password: 'Personal@2023', context: 'social' }
    ];

    // Agent should recognize context-password relationships
    if (agent.genes.baseWordExtraction === 'contextual') score += 0.3;
    if (agent.genes.searchBreadth === 'adaptive_depth') score += 0.2;
    if (agent.genes.sourceWeighting === 'quality_weighted') score += 0.2;

    // Bonus for appropriate search strategy
    if (agent.genes.variationGeneration >= 10 && agent.genes.variationGeneration <= 20) {
      score += 0.3; // Good balance of variations
    }

    return Math.min(1.0, score);
  }

  // Evolution operators
  mutate(agent) {
    const mutant = JSON.parse(JSON.stringify(agent)); // Deep clone
    const genes = mutant.genes;
    
    // Mutate random genes with probability
    if (Math.random() < this.mutationRate) {
      genes.passwordStrategy = this.randomChoice(['frequency_first', 'recency_first', 'uniqueness_first', 'hybrid_adaptive']);
    }
    
    if (Math.random() < this.mutationRate) {
      genes.temporalWeight = Math.max(0, Math.min(1, genes.temporalWeight + (Math.random() - 0.5) * 0.2));
    }
    
    if (Math.random() < this.mutationRate) {
      genes.patternSensitivity = Math.max(0, Math.min(1, genes.patternSensitivity + (Math.random() - 0.5) * 0.2));
    }
    
    if (Math.random() < this.mutationRate) {
      genes.uniquenessBonus = Math.max(0, Math.min(30, genes.uniquenessBonus + (Math.random() - 0.5) * 5));
    }
    
    if (Math.random() < this.mutationRate) {
      genes.variationGeneration = Math.max(5, Math.min(25, genes.variationGeneration + this.randomInt(-5, 5)));
    }

    mutant.id = `${agent.id}_mut_${Date.now()}`;
    return mutant;
  }

  crossover(parent1, parent2) {
    const offspring = {
      id: `cross_${parent1.id}_${parent2.id}_${Date.now()}`,
      genes: {},
      fitness: 0,
      performance: {},
      generation: this.generations
    };

    // Single-point crossover
    const crossoverPoint = Math.random();
    const geneKeys = Object.keys(parent1.genes);
    
    geneKeys.forEach((key, index) => {
      const ratio = index / geneKeys.length;
      offspring.genes[key] = ratio < crossoverPoint ? parent1.genes[key] : parent2.genes[key];
    });

    return offspring;
  }

  // Run evolution cycle
  async evolve() {
    console.log(`\n🧬 === GENERATION ${this.generations + 1} EVOLUTION ===`);
    
    // Benchmark all agents
    for (let i = 0; i < this.population.length; i++) {
      await this.benchmarkAgent(this.population[i]);
      console.log(`Agent ${i + 1}: Fitness = ${this.population[i].fitness.toFixed(3)}`);
    }

    // Sort by fitness
    this.population.sort((a, b) => b.fitness - a.fitness);

    const stats = {
      bestFitness: this.population[0].fitness,
      avgFitness: this.population.reduce((sum, agent) => sum + agent.fitness, 0) / this.population.length,
      worstFitness: this.population[this.population.length - 1].fitness
    };

    console.log(`\n📈 Generation ${this.generations + 1} Statistics:`);
    console.log(`Best Fitness:  ${stats.bestFitness.toFixed(3)}`);
    console.log(`Avg Fitness:   ${stats.avgFitness.toFixed(3)}`);
    console.log(`Worst Fitness: ${stats.worstFitness.toFixed(3)}`);

    console.log(`\n🏆 Best Agent Configuration:`);
    const best = this.population[0];
    console.log(`Strategy: ${best.genes.passwordStrategy}`);
    console.log(`Temporal Weight: ${best.genes.temporalWeight.toFixed(3)}`);
    console.log(`Pattern Sensitivity: ${best.genes.patternSensitivity.toFixed(3)}`);

    // Create next generation
    const newPopulation = [];
    
    // Elitism - keep best agents
    for (let i = 0; i < this.elitismCount; i++) {
      newPopulation.push(this.population[i]);
    }

    // Generate offspring
    while (newPopulation.length < this.populationSize) {
      const parent1 = this.tournamentSelection();
      const parent2 = this.tournamentSelection();
      
      if (Math.random() < this.crossoverRate) {
        const offspring = this.crossover(parent1, parent2);
        newPopulation.push(this.mutate(offspring));
      } else {
        newPopulation.push(this.mutate(parent1));
      }
    }

    this.population = newPopulation;
    this.generations++;
    this.fitnessHistory.push(stats);

    return {
      generation: this.generations,
      bestAgent: best,
      statistics: stats
    };
  }

  tournamentSelection() {
    const tournamentSize = 3;
    const tournament = [];
    
    for (let i = 0; i < tournamentSize; i++) {
      tournament.push(this.population[this.randomInt(0, this.population.length)]);
    }
    
    tournament.sort((a, b) => b.fitness - a.fitness);
    return tournament[0];
  }

  // Simulation helpers
  generateTestPasswordData() {
    return [
      { password: 'Work2024!', database: 'LinkedIn2024', timestamp: '2024-03-15' },
      { password: 'Gaming123', database: 'Steam2023', timestamp: '2023-08-20' },
      { password: 'password', database: 'OldBreach2019', timestamp: '2019-01-10' },
      { password: 'Daniel@Home', database: 'Facebook2022', timestamp: '2022-11-05' }
    ];
  }

  simulatePatternExtraction(testData, agent) {
    // Simulate pattern extraction based on agent genes
    const patterns = [];
    testData.forEach(item => {
      const base = item.password.toLowerCase().match(/^([a-z]+)/)?.[1];
      if (base && agent.genes.patternSensitivity > 0.5) {
        patterns.push(base);
      }
    });
    return patterns;
  }

  simulateTemporalScoring(passwords, agent) {
    return passwords.sort((a, b) => {
      const aScore = a.value + (agent.genes.temporalWeight * (a.year - 2020) / 4);
      const bScore = b.value + (agent.genes.temporalWeight * (b.year - 2020) / 4);
      return bScore - aScore;
    });
  }

  simulatePatternAnalysis(password, agent) {
    const baseMatch = password.match(/^([a-zA-Z]+)/);
    const suffixMatch = password.match(/([0-9!@#$%^&*()_+-=]+)$/);
    
    return {
      base: baseMatch?.[1]?.toLowerCase(),
      suffix: suffixMatch?.[1],
      context: agent.genes.baseWordExtraction === 'contextual' ? 'detected' : 'unknown'
    };
  }

  simulateStrategicScoring(scenario, agent) {
    let score = 0.5; // Base score
    
    if (scenario.unique) score += agent.genes.uniquenessBonus / 100;
    if (scenario.recent) score += agent.genes.recencyBonus / 100;
    if (scenario.reused) score += agent.genes.reuseBonus / 100;
    
    return Math.min(1.0, score);
  }

  // Utility functions
  randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Get best evolved configuration
  getBestConfiguration() {
    if (this.population.length === 0) return null;
    
    this.population.sort((a, b) => b.fitness - a.fitness);
    return {
      agent: this.population[0],
      generation: this.generations,
      fitnessHistory: this.fitnessHistory
    };
  }
}

export default StrategicEvolution;