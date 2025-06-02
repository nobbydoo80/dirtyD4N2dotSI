// Extended Evolution Test - Run Through Generation 9
import StrategicEvolution from '../engines/strategic-evolution.js';

async function runExtendedEvolution() {
  console.log('🧬 EXTENDED STRATEGIC INTELLIGENCE EVOLUTION TEST');
  console.log('================================================\n');

  const evolution = new StrategicEvolution();
  
  console.log('📊 Initializing Strategic Intelligence Population...');
  evolution.initializePopulation();
  
  console.log('\n🧬 Running 9 Generation Evolution Cycle...\n');
  
  const evolutionHistory = [];
  
  // Run 9 generations
  for (let generation = 0; generation < 9; generation++) {
    const result = await evolution.evolve();
    evolutionHistory.push(result);
    
    console.log(`🎯 GENERATION ${result.generation} COMPLETE:`);
    console.log(`Best Fitness: ${result.bestAgent.fitness.toFixed(3)}`);
    console.log(`Strategy: ${result.bestAgent.genes.passwordStrategy}`);
    console.log(`Temporal Weight: ${result.bestAgent.genes.temporalWeight.toFixed(3)}`);
    console.log(`Pattern Sensitivity: ${result.bestAgent.genes.patternSensitivity.toFixed(3)}`);
    console.log(`Hash Priority: ${result.bestAgent.genes.hashPriority}`);
    console.log(`Avg Population Fitness: ${result.statistics.avgFitness.toFixed(3)}`);
    console.log('');
  }

  console.log('📈 EVOLUTION SUMMARY REPORT');
  console.log('===========================\n');

  console.log('Generation Progression:');
  evolutionHistory.forEach((gen, i) => {
    console.log(`Gen ${i + 1}: ${gen.bestAgent.genes.passwordStrategy.padEnd(15)} | Fitness: ${gen.bestAgent.fitness.toFixed(3)} | Avg: ${gen.statistics.avgFitness.toFixed(3)}`);
  });

  console.log('\nFitness Evolution:');
  const fitnessProgression = evolutionHistory.map(gen => gen.bestAgent.fitness);
  const improvement = fitnessProgression[fitnessProgression.length - 1] - fitnessProgression[0];
  console.log(`Starting Fitness: ${fitnessProgression[0].toFixed(3)}`);
  console.log(`Final Fitness: ${fitnessProgression[fitnessProgression.length - 1].toFixed(3)}`);
  console.log(`Total Improvement: ${improvement >= 0 ? '+' : ''}${(improvement * 100).toFixed(1)}%`);

  console.log('\nStrategy Evolution:');
  const strategies = evolutionHistory.map(gen => gen.bestAgent.genes.passwordStrategy);
  const uniqueStrategies = [...new Set(strategies)];
  console.log(`Strategies Explored: ${uniqueStrategies.join(', ')}`);
  console.log(`Final Strategy: ${strategies[strategies.length - 1]}`);

  console.log('\nOptimal Parameters (Generation 9):');
  const finalAgent = evolutionHistory[evolutionHistory.length - 1].bestAgent;
  console.log(`• Password Strategy: ${finalAgent.genes.passwordStrategy}`);
  console.log(`• Temporal Weight: ${finalAgent.genes.temporalWeight.toFixed(3)}`);
  console.log(`• Pattern Sensitivity: ${finalAgent.genes.patternSensitivity.toFixed(3)}`);
  console.log(`• Hash Priority: ${finalAgent.genes.hashPriority}`);
  console.log(`• Uniqueness Bonus: ${finalAgent.genes.uniquenessBonus.toFixed(1)}`);
  console.log(`• Recency Bonus: ${finalAgent.genes.recencyBonus.toFixed(1)}`);
  console.log(`• Reuse Bonus: ${finalAgent.genes.reuseBonus.toFixed(1)}`);
  console.log(`• Variation Generation: ${finalAgent.genes.variationGeneration}`);
  console.log(`• Search Breadth: ${finalAgent.genes.searchBreadth}`);

  console.log('\nPerformance Breakdown (Generation 9):');
  Object.entries(finalAgent.performance).forEach(([metric, score]) => {
    console.log(`• ${metric.padEnd(25)}: ${score.toFixed(3)}`);
  });

  console.log('\nEvolution Analysis:');
  
  // Analyze convergence
  const lastThreeFitness = fitnessProgression.slice(-3);
  const isConverged = lastThreeFitness.every(f => Math.abs(f - lastThreeFitness[0]) < 0.01);
  console.log(`• Convergence Status: ${isConverged ? 'CONVERGED' : 'STILL EVOLVING'}`);
  
  // Analyze strategy stability
  const lastThreeStrategies = strategies.slice(-3);
  const strategyStable = lastThreeStrategies.every(s => s === lastThreeStrategies[0]);
  console.log(`• Strategy Stability: ${strategyStable ? 'STABLE' : 'STILL CHANGING'}`);
  
  // Find peak fitness
  const peakFitness = Math.max(...fitnessProgression);
  const peakGeneration = fitnessProgression.indexOf(peakFitness) + 1;
  console.log(`• Peak Fitness: ${peakFitness.toFixed(3)} (Generation ${peakGeneration})`);

  console.log('\n🎯 EVOLUTION INSIGHTS:');
  
  if (finalAgent.genes.passwordStrategy === 'uniqueness_first') {
    console.log('• System learned to prioritize rare passwords over common ones');
  }
  if (finalAgent.genes.passwordStrategy === 'recency_first') {
    console.log('• System learned to prioritize recent passwords over old ones');
  }
  if (finalAgent.genes.temporalWeight > 0.7) {
    console.log('• High temporal weighting: Recent passwords heavily prioritized');
  }
  if (finalAgent.genes.patternSensitivity > 0.7) {
    console.log('• Aggressive pattern detection: System finds subtle patterns');
  }
  if (finalAgent.genes.hashPriority === 'smart_selective') {
    console.log('• Intelligent hash handling: Focus on crackable hashes');
  }

  console.log('\n✅ 9-GENERATION EVOLUTION COMPLETE!');
  console.log('===================================');
  console.log('Strategic Intelligence System has evolved optimal OSINT parameters');
  console.log('through empirical validation and genetic optimization.');
  
  return {
    evolutionHistory,
    finalConfiguration: finalAgent,
    improvement: improvement,
    converged: isConverged
  };
}

// Run test if called directly
if (process.argv[1].endsWith('extended-evolution-test.js')) {
  runExtendedEvolution().catch(console.error);
}

export default runExtendedEvolution;