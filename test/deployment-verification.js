// Deployment Verification - Test All Generations
import handler from '../api/strategic-osint.js';

async function verifyGeneration(generation) {
  console.log(`\n🎯 VERIFYING GENERATION ${generation}`);
  console.log('='.repeat(40));
  
  const mockReq = {
    query: { generation: generation.toString() },
    url: `/generation${generation}`,
    method: 'GET'
  };
  
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
  
  const startTime = Date.now();
  
  try {
    await handler(mockReq, mockRes);
    const duration = Date.now() - startTime;
    
    if (statusCode === 200 && responseData) {
      const config = responseData.evolvedConfiguration;
      
      console.log(`✅ GENERATION ${generation} - VERIFIED`);
      console.log(`⏱️  Execution Time: ${duration}ms`);
      console.log(`📊 Strategy: ${config.strategy}`);
      console.log(`🎯 Fitness: ${config.fitness.toFixed(3)}`);
      console.log(`⏰ Temporal Weight: ${config.temporalWeight.toFixed(3)}`);
      console.log(`🧠 Pattern Sensitivity: ${config.patternSensitivity.toFixed(3)}`);
      console.log(`🔐 Hash Priority: ${config.hashPriority}`);
      console.log(`📈 Patterns Analyzed: ${responseData.analysis.totalPatterns}`);
      console.log(`🎯 Strategic Targets: ${responseData.strategicTargets.length}`);
      
      if (responseData.evolvedScoring && responseData.evolvedScoring.length > 0) {
        const topPattern = responseData.evolvedScoring[0];
        console.log(`🏆 Top Pattern: "${topPattern.base}" (Score: ${topPattern.evolvedScore.toFixed(1)})`);
        console.log(`🔍 Pattern Services: ${topPattern.services.join(', ')}`);
        console.log(`🎯 Example Targets: ${responseData.strategicTargets.slice(0, 3).join(', ')}`);
      }
      
      // Performance breakdown
      if (responseData.performance) {
        console.log(`📊 Performance Metrics:`);
        Object.entries(responseData.performance).forEach(([metric, score]) => {
          const emoji = score > 0.8 ? '🟢' : score > 0.5 ? '🟡' : '🔴';
          console.log(`   ${emoji} ${metric}: ${score.toFixed(3)}`);
        });
      }
      
      return {
        generation,
        success: true,
        duration,
        config,
        performance: responseData.performance
      };
    } else {
      console.log(`❌ GENERATION ${generation} - FAILED`);
      console.log(`Status: ${statusCode}`);
      return { generation, success: false, error: `HTTP ${statusCode}` };
    }
  } catch (error) {
    console.log(`❌ GENERATION ${generation} - ERROR: ${error.message}`);
    return { generation, success: false, error: error.message };
  }
}

async function runDeploymentVerification() {
  console.log('🚀 STRATEGIC INTELLIGENCE DEPLOYMENT VERIFICATION');
  console.log('================================================');
  
  const generations = [3, 6, 9];
  const results = [];
  
  for (const gen of generations) {
    const result = await verifyGeneration(gen);
    results.push(result);
  }
  
  console.log('\n📈 DEPLOYMENT SUMMARY');
  console.log('====================');
  
  results.forEach(result => {
    if (result.success) {
      const strategy = result.config.strategy.padEnd(15);
      const fitness = result.config.fitness.toFixed(3);
      const duration = `${result.duration}ms`.padEnd(8);
      console.log(`✅ Gen ${result.generation}: ${strategy} | ${fitness} | ${duration}`);
    } else {
      console.log(`❌ Gen ${result.generation}: FAILED - ${result.error}`);
    }
  });
  
  const successCount = results.filter(r => r.success).length;
  console.log(`\n🎯 VERIFICATION RESULTS:`);
  console.log(`✅ Successful: ${successCount}/${results.length} generations`);
  console.log(`⚡ Average Duration: ${Math.round(results.filter(r => r.success).reduce((sum, r) => sum + r.duration, 0) / successCount)}ms`);
  
  if (successCount === results.length) {
    console.log('\n🚀 ALL GENERATIONS VERIFIED FOR DEPLOYMENT');
    console.log('🎯 Strategic Intelligence System Ready');
    
    console.log('\n📡 DEPLOYMENT ENDPOINTS:');
    console.log('• Generation 3: /generation3 (hybrid_adaptive)');
    console.log('• Generation 6: /generation6 (recency_first)'); 
    console.log('• Generation 9: /generation9 (hybrid_adaptive)');
    console.log('• Custom: /api/strategic-osint?generation=N');
  } else {
    console.log('\n⚠️  DEPLOYMENT ISSUES DETECTED');
  }
  
  return results;
}

// Run if called directly
if (process.argv[1].endsWith('deployment-verification.js')) {
  runDeploymentVerification().catch(console.error);
}

export default runDeploymentVerification;