// Standalone Generation Test - Direct Function Testing
import handler from '../api/strategic-osint.js';

async function testGenerationDirect(generation) {
  console.log(`🎯 Testing Generation ${generation} (Direct Function Call)`);
  
  // Mock request object
  const mockReq = {
    query: { generation: generation.toString() },
    url: `/api/strategic-osint?generation=${generation}`,
    method: 'GET'
  };
  
  // Mock response object
  let responseData = null;
  let statusCode = null;
  
  const mockRes = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseData = data;
      return this;
    }
  };
  
  try {
    await handler(mockReq, mockRes);
    
    if (statusCode === 200 && responseData) {
      console.log(`✅ Generation ${generation} - SUCCESS`);
      console.log(`Strategy: ${responseData.evolvedConfiguration.strategy}`);
      console.log(`Fitness: ${responseData.evolvedConfiguration.fitness.toFixed(3)}`);
      console.log(`Temporal Weight: ${responseData.evolvedConfiguration.temporalWeight.toFixed(3)}`);
      console.log(`Patterns Found: ${responseData.analysis.totalPatterns}`);
      console.log(`Strategic Targets: ${responseData.strategicTargets.length}`);
      
      if (responseData.evolvedScoring && responseData.evolvedScoring.length > 0) {
        console.log(`Top Pattern: "${responseData.evolvedScoring[0].base}" (Score: ${responseData.evolvedScoring[0].evolvedScore.toFixed(1)})`);
        console.log(`Top Targets: ${responseData.strategicTargets.slice(0, 3).join(', ')}`);
      }
      
      console.log('');
      
      return {
        generation: generation,
        success: true,
        data: responseData
      };
    } else {
      console.log(`❌ Generation ${generation} - FAILED`);
      console.log(`Status: ${statusCode}`);
      console.log(`Response: ${JSON.stringify(responseData, null, 2)}`);
      console.log('');
      
      return {
        generation: generation,
        success: false,
        error: `HTTP ${statusCode}`,
        data: responseData
      };
    }
  } catch (error) {
    console.log(`❌ Generation ${generation} - ERROR`);
    console.log(`Error: ${error.message}`);
    console.log('');
    
    return {
      generation: generation,
      success: false,
      error: error.message
    };
  }
}

async function runStandaloneTests() {
  console.log('🧬 STANDALONE GENERATION TESTING');
  console.log('================================\n');

  const generations = [3, 6, 9];
  const results = [];

  for (const gen of generations) {
    const result = await testGenerationDirect(gen);
    results.push(result);
  }

  console.log('📊 STANDALONE TEST SUMMARY');
  console.log('==========================');
  
  results.forEach(result => {
    if (result.success) {
      const config = result.data.evolvedConfiguration;
      console.log(`✅ Gen ${result.generation}: ${config.strategy} | Fitness: ${config.fitness.toFixed(3)} | Temporal: ${config.temporalWeight.toFixed(3)}`);
    } else {
      console.log(`❌ Gen ${result.generation}: FAILED - ${result.error}`);
    }
  });

  const successCount = results.filter(r => r.success).length;
  console.log(`\n🎯 Success Rate: ${successCount}/${results.length} generations`);
  
  if (successCount === results.length) {
    console.log('🚀 ALL GENERATIONS FUNCTIONAL - EVOLUTION SYSTEM VERIFIED');
  } else {
    console.log('⚠️  Some generations failed - check implementation');
  }

  return results;
}

// Run if called directly
if (process.argv[1].endsWith('standalone-generation-test.js')) {
  runStandaloneTests().catch(console.error);
}

export default runStandaloneTests;