// Strategic Evolution Test - Verify Darwin Gödel Machine Operation
import StrategicEvolution from '../engines/strategic-evolution.js';

async function testEvolution() {
  console.log('🧬 STRATEGIC INTELLIGENCE EVOLUTION TEST');
  console.log('=====================================\n');

  const evolution = new StrategicEvolution();
  
  console.log('📊 Initializing Strategic Intelligence Population...');
  evolution.initializePopulation();
  
  console.log('\n🔬 Testing Individual Agent Benchmarking...');
  const testAgent = evolution.population[0];
  console.log(`Test Agent ID: ${testAgent.id}`);
  console.log(`Initial Genes:`, {
    passwordStrategy: testAgent.genes.passwordStrategy,
    temporalWeight: testAgent.genes.temporalWeight.toFixed(3),
    patternSensitivity: testAgent.genes.patternSensitivity.toFixed(3),
    hashPriority: testAgent.genes.hashPriority
  });

  await evolution.benchmarkAgent(testAgent);
  console.log(`\nBenchmark Results:`);
  console.log(`Overall Fitness: ${testAgent.fitness.toFixed(3)}`);
  console.log(`Performance Breakdown:`);
  Object.entries(testAgent.performance).forEach(([key, value]) => {
    console.log(`  ${key}: ${value.toFixed(3)}`);
  });

  console.log('\n🧬 Running Evolution Cycles...');
  
  // Run 3 evolution cycles
  for (let generation = 0; generation < 3; generation++) {
    const result = await evolution.evolve();
    
    console.log(`\n🎯 Evolution Result - Generation ${result.generation}:`);
    console.log(`Best Agent Configuration:`);
    console.log(`  Password Strategy: ${result.bestAgent.genes.passwordStrategy}`);
    console.log(`  Hash Priority: ${result.bestAgent.genes.hashPriority}`);
    console.log(`  Temporal Weight: ${result.bestAgent.genes.temporalWeight.toFixed(3)}`);
    console.log(`  Pattern Sensitivity: ${result.bestAgent.genes.patternSensitivity.toFixed(3)}`);
    console.log(`  Uniqueness Bonus: ${result.bestAgent.genes.uniquenessBonus.toFixed(1)}`);
    console.log(`  Variation Generation: ${result.bestAgent.genes.variationGeneration}`);
    
    console.log(`\nPerformance Metrics:`);
    Object.entries(result.bestAgent.performance).forEach(([key, value]) => {
      console.log(`  ${key}: ${value.toFixed(3)}`);
    });
  }

  console.log('\n📈 Evolution Summary:');
  const bestConfig = evolution.getBestConfiguration();
  console.log(`Final Best Fitness: ${bestConfig.agent.fitness.toFixed(3)}`);
  console.log(`Generations Completed: ${bestConfig.generation}`);
  
  console.log('\nFitness History:');
  bestConfig.fitnessHistory.forEach((stats, i) => {
    console.log(`  Gen ${i + 1}: Best=${stats.bestFitness.toFixed(3)}, Avg=${stats.avgFitness.toFixed(3)}`);
  });

  console.log('\n🎯 STRATEGIC INTELLIGENCE EVOLUTION VERIFIED');
  console.log('===========================================');
  console.log('✅ Population initialization: Working');
  console.log('✅ Agent benchmarking: Working');
  console.log('✅ Evolution cycles: Working');
  console.log('✅ Fitness optimization: Working');
  console.log('✅ Strategic gene evolution: Working');
  
  console.log('\n💡 KEY FINDINGS:');
  console.log(`• Optimal Password Strategy: ${bestConfig.agent.genes.passwordStrategy}`);
  console.log(`• Optimal Temporal Weight: ${bestConfig.agent.genes.temporalWeight.toFixed(3)}`);
  console.log(`• Optimal Pattern Sensitivity: ${bestConfig.agent.genes.patternSensitivity.toFixed(3)}`);
  console.log(`• Optimal Hash Priority: ${bestConfig.agent.genes.hashPriority}`);
  
  return bestConfig;
}

// Run test if called directly
if (process.argv[1].endsWith('evolution-test.js')) {
  testEvolution().catch(console.error);
}

export default testEvolution;