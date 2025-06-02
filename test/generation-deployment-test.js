// Generation Deployment Test - Test Each Generation Configuration
import http from 'http';

async function testGeneration(generation) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/strategic-osint?generation=${generation}`,
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response);
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function runGenerationTests() {
  console.log('🧬 GENERATION DEPLOYMENT TESTING');
  console.log('================================\n');

  const generations = [3, 6, 9];
  const results = [];

  for (const gen of generations) {
    console.log(`🎯 Testing Generation ${gen}...`);
    
    try {
      const result = await testGeneration(gen);
      
      console.log(`✅ Generation ${gen} - SUCCESS`);
      console.log(`Strategy: ${result.evolvedConfiguration.strategy}`);
      console.log(`Fitness: ${result.evolvedConfiguration.fitness.toFixed(3)}`);
      console.log(`Temporal Weight: ${result.evolvedConfiguration.temporalWeight.toFixed(3)}`);
      console.log(`Patterns Found: ${result.analysis.totalPatterns}`);
      console.log(`Strategic Targets: ${result.strategicTargets.length}`);
      
      if (result.evolvedScoring && result.evolvedScoring.length > 0) {
        console.log(`Top Pattern: "${result.evolvedScoring[0].base}" (Score: ${result.evolvedScoring[0].evolvedScore.toFixed(1)})`);
      }
      
      console.log('');
      
      results.push({
        generation: gen,
        success: true,
        strategy: result.evolvedConfiguration.strategy,
        fitness: result.evolvedConfiguration.fitness,
        temporalWeight: result.evolvedConfiguration.temporalWeight,
        patternsFound: result.analysis.totalPatterns,
        targetCount: result.strategicTargets.length
      });
      
    } catch (error) {
      console.log(`❌ Generation ${gen} - FAILED`);
      console.log(`Error: ${error.message}`);
      console.log('');
      
      results.push({
        generation: gen,
        success: false,
        error: error.message
      });
    }
  }

  console.log('📊 DEPLOYMENT TEST SUMMARY');
  console.log('==========================');
  
  results.forEach(result => {
    if (result.success) {
      console.log(`✅ Gen ${result.generation}: ${result.strategy} | Fitness: ${result.fitness.toFixed(3)} | Patterns: ${result.patternsFound}`);
    } else {
      console.log(`❌ Gen ${result.generation}: FAILED - ${result.error}`);
    }
  });

  const successCount = results.filter(r => r.success).length;
  console.log(`\n🎯 Success Rate: ${successCount}/${results.length} generations`);
  
  if (successCount === results.length) {
    console.log('🚀 ALL GENERATIONS FUNCTIONAL - READY FOR DEPLOYMENT');
  } else {
    console.log('⚠️  Some generations failed - check implementation');
  }

  return results;
}

export default runGenerationTests;

// Run if called directly
if (process.argv[1].endsWith('generation-deployment-test.js')) {
  runGenerationTests().catch(console.error);
}