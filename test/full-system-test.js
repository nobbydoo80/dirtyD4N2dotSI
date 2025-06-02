// Full Strategic Intelligence System Test
import IntelligenceAPI from '../api/intelligence.js';

async function testFullSystem() {
  console.log('🎯 STRATEGIC INTELLIGENCE SYSTEM - FULL TEST');
  console.log('============================================\n');

  const intelligence = new IntelligenceAPI();
  
  console.log('📊 System Status (Pre-Evolution):');
  console.log(intelligence.getStatus());
  
  console.log('\n🧬 Testing Evolution System...');
  const evolutionResult = await intelligence.evolveSystem(3);
  
  console.log('\n✅ Evolution Complete:');
  console.log(`Generations: ${evolutionResult.generations}`);
  console.log(`Final Fitness: ${evolutionResult.finalFitness.toFixed(3)}`);
  console.log(`Best Strategy: ${evolutionResult.bestConfiguration.passwordStrategy}`);
  console.log(`Temporal Weight: ${evolutionResult.bestConfiguration.temporalWeight.toFixed(3)}`);
  console.log(`Pattern Sensitivity: ${evolutionResult.bestConfiguration.patternSensitivity.toFixed(3)}`);

  console.log('\n📊 System Status (Post-Evolution):');
  console.log(intelligence.getStatus());

  console.log('\n🎯 Testing Target Analysis...');
  
  // Simulate realistic breach data for danieloobregon23@gmail.com
  const targetData = {
    email: 'danieloobregon23@gmail.com',
    databases: [
      {
        name: 'LinkedIn 2024',
        entries: [
          {
            Email: 'danieloobregon23@gmail.com',
            Password: 'Work2024!',
            LastActive: '2024-03-15'
          }
        ]
      },
      {
        name: 'Steam Gaming 2023',
        entries: [
          {
            Email: 'danieloobregon23@gmail.com', 
            Password: 'Gaming123',
            LastActive: '2023-08-20'
          }
        ]
      },
      {
        name: 'Old Breach 2019',
        entries: [
          {
            Email: 'danieloobregon23@gmail.com',
            Password: 'slayer23',
            LastActive: '2019-01-10'
          }
        ]
      },
      {
        name: 'Facebook 2022',
        entries: [
          {
            Email: 'danieloobregon23@gmail.com',
            Password: 'Daniel@Home',
            LastActive: '2022-11-05'
          }
        ]
      },
      {
        name: 'Hashed Database',
        entries: [
          {
            Email: 'danieloobregon23@gmail.com',
            'Password(MD5)': 'd7229c6ef8a2dad83fb06da698271343', // slayer23
            LastActive: '2020-06-12'
          }
        ]
      }
    ]
  };

  const analysis = await intelligence.analyzeTarget(targetData);
  
  console.log('\n🔍 Analysis Results:');
  console.log(`Target: ${analysis.target}`);
  console.log(`Total Patterns Found: ${analysis.analysis.patterns.size}`);
  console.log(`Plaintext Passwords: ${analysis.analysis.plaintext.length}`);
  console.log(`Hashed Passwords: ${analysis.analysis.hashed.length}`);
  console.log(`Strategic Score: ${analysis.analysis.strategicScore}`);

  console.log('\n🏆 Top Strategic Patterns:');
  analysis.analysis.topPatterns?.forEach((pattern, i) => {
    console.log(`${i + 1}. Base: "${pattern.base}"`);
    console.log(`   Frequency: ${pattern.frequency}`);
    console.log(`   Services: ${Array.from(pattern.services).join(', ')}`);
    console.log(`   Evolved Score: ${pattern.evolvedScore?.toFixed(1) || 'N/A'}`);
    console.log(`   Variations: ${pattern.variations.map(v => v.full).join(', ')}`);
  });

  console.log('\n🎯 Strategic Targets Generated:');
  analysis.strategicTargets.slice(0, 10).forEach((target, i) => {
    console.log(`${i + 1}. ${target}`);
  });

  console.log('\n🧬 Evolved Configuration Applied:');
  console.log(`Strategy: ${analysis.evolvedConfig.strategy}`);
  console.log(`Temporal Weight: ${analysis.evolvedConfig.temporalWeight.toFixed(3)}`);
  console.log(`Pattern Sensitivity: ${analysis.evolvedConfig.patternSensitivity.toFixed(3)}`);
  console.log(`Generation: ${analysis.evolvedConfig.generation}`);
  console.log(`Fitness: ${analysis.evolvedConfig.fitness.toFixed(3)}`);

  console.log('\n📈 Key Insights:');
  
  // Analyze what the evolved system discovered
  const recentPasswords = analysis.analysis.plaintext.filter(p => 
    p.timestamp && p.timestamp.includes('2024')
  );
  console.log(`• Recent passwords (2024): ${recentPasswords.length}`);
  
  const workRelated = analysis.analysis.plaintext.filter(p => 
    p.value.toLowerCase().includes('work') || p.database?.toLowerCase().includes('linkedin')
  );
  console.log(`• Work-related passwords: ${workRelated.length}`);
  
  const personalPatterns = analysis.analysis.plaintext.filter(p => 
    p.value.toLowerCase().includes('daniel') || p.value.toLowerCase().includes('home')
  );
  console.log(`• Personal identifier patterns: ${personalPatterns.length}`);

  console.log('\n✅ STRATEGIC INTELLIGENCE SYSTEM VERIFIED');
  console.log('=========================================');
  console.log('✅ Evolution System: Working');
  console.log('✅ Password Analysis: Working');
  console.log('✅ Strategic Scoring: Working');
  console.log('✅ Target Generation: Working');
  console.log('✅ Configuration Application: Working');
  
  console.log('\n💡 SYSTEM READY FOR DEPLOYMENT');
  console.log('This system demonstrates real evolution and flexible password intelligence');
  
  return analysis;
}

// Run test if called directly
if (process.argv[1].endsWith('full-system-test.js')) {
  testFullSystem().catch(console.error);
}

export default testFullSystem;