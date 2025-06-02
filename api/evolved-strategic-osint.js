// Evolved Strategic OSINT API - Real Empirical Agent with Confirmed Intelligence
// Begins evolution from hardwired confirmed breach patterns

import RealEmpiricalAgent from '../engines/real-empirical-agent.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    console.log('🧬 Evolved Strategic OSINT Analysis Started');
    
    const targetEmail = req.query.email || 'danieloobregon23@gmail.com';
    const evolutionGenerations = parseInt(req.query.generations) || 5;
    const strategyMode = req.query.strategy || 'empirical_evolution';
    
    console.log(`🎯 Target: ${targetEmail}`);
    console.log(`🔬 Evolution Generations: ${evolutionGenerations}`);
    console.log(`⚡ Strategy Mode: ${strategyMode}`);

    const startTime = Date.now();
    
    // Initialize Real Empirical Agent with confirmed intelligence
    console.log('🚀 Initializing Real Empirical Agent...');
    const agent = new RealEmpiricalAgent();
    
    // Generate initial strategic intelligence report
    console.log('📊 Generating initial strategic intelligence...');
    let currentReport = agent.generateEvolutionReport();
    
    const evolutionResults = [];
    
    // Evolution Phase - Iterate through generations
    console.log(`🧬 Beginning ${evolutionGenerations} generation evolution...`);
    for (let gen = 0; gen < evolutionGenerations; gen++) {
      console.log(`\n🔄 Evolution Generation ${gen + 1}/${evolutionGenerations}`);
      
      const evolutionResult = agent.evolveStrategicIntelligence();
      evolutionResults.push(evolutionResult);
      
      console.log(`📈 Generation ${gen + 1} Fitness: ${evolutionResult.fitness.toFixed(3)}`);
      console.log(`🎯 Confidence Level: ${evolutionResult.confidence}`);
      console.log(`🔬 Active Mutations: ${evolutionResult.strategicTargets.highConfidence.length} high-confidence targets`);
    }
    
    // Generate final evolved report
    const finalReport = agent.generateEvolutionReport();
    
    const executionTime = Date.now() - startTime;
    
    const response = {
      status: 'Evolved Strategic OSINT Complete',
      target: targetEmail,
      agentType: 'Real Empirical Strategic Agent',
      
      // Base Intelligence - Confirmed from real breach data
      confirmedIntelligence: {
        realPasswordsFound: agent.confirmedIntelligence.confirmedPasswords.map(p => ({
          password: p.password,
          databases: p.databases,
          confidence: p.confidence
        })),
        verifiedStrategicPatterns: agent.confirmedIntelligence.confirmedStrategicPatterns.filter(p => p.found),
        breachExposure: {
          databases: agent.confirmedIntelligence.breachExposure.leakosintDatabases.length,
          hibpBreaches: agent.confirmedIntelligence.breachExposure.hibpBreaches
        }
      },
      
      // Evolution Results
      evolutionAnalysis: {
        generations: evolutionGenerations,
        initialFitness: currentReport.currentFitness,
        finalFitness: finalReport.currentFitness,
        improvementFactor: (finalReport.currentFitness / currentReport.currentFitness).toFixed(3),
        convergenceRate: calculateConvergenceRate(evolutionResults),
        evolutionHistory: evolutionResults
      },
      
      // Strategic Intelligence Output
      strategicTargets: finalReport.strategicTargets,
      
      // Actionable Intelligence
      actionableIntelligence: {
        immediatePriority: finalReport.strategicTargets.highConfidence.slice(0, 10),
        confirmedVulnerabilities: agent.confirmedIntelligence.confirmedPasswords.map(p => p.password),
        strategicRecommendations: generateStrategicRecommendations(finalReport),
        operationalVectors: generateOperationalVectors(finalReport),
        riskAssessment: assessEvolvedRisk(finalReport)
      },
      
      // Intelligence Metrics
      intelligenceMetrics: {
        confidenceLevel: finalReport.confidenceLevel,
        realDataValidation: finalReport.realDataValidation,
        patternAccuracy: calculatePatternAccuracy(agent),
        strategicEffectiveness: finalReport.currentFitness,
        empiricalBasis: 'CONFIRMED_BREACH_INTELLIGENCE'
      },
      
      // System Metadata
      metadata: {
        executionTime: `${executionTime}ms`,
        timestamp: new Date().toISOString(),
        apiVersion: '4.0.0-evolved-empirical',
        dataAuthenticity: 'REAL_BREACH_VALIDATED',
        evolutionBasis: 'CONFIRMED_PATTERN_INTELLIGENCE'
      }
    };

    console.log(`✅ Evolved Strategic OSINT Complete (${executionTime}ms)`);
    console.log(`🏆 Final Fitness: ${finalReport.currentFitness.toFixed(3)}`);
    console.log(`🎯 High-Confidence Targets: ${finalReport.strategicTargets.highConfidence.length}`);
    console.log(`📊 Confidence Level: ${finalReport.confidenceLevel}`);
    
    res.status(200).json(response);

  } catch (error) {
    console.error('❌ Evolved Strategic OSINT Failed:', error);
    res.status(500).json({
      error: 'Evolved Strategic OSINT Failed',
      message: error.message,
      timestamp: new Date().toISOString(),
      apiVersion: '4.0.0-evolved-empirical'
    });
  }
}

function calculateConvergenceRate(evolutionResults) {
  if (evolutionResults.length < 2) return 'INSUFFICIENT_DATA';
  
  const fitnessChanges = [];
  for (let i = 1; i < evolutionResults.length; i++) {
    fitnessChanges.push(evolutionResults[i].fitness - evolutionResults[i-1].fitness);
  }
  
  const avgChange = fitnessChanges.reduce((sum, change) => sum + change, 0) / fitnessChanges.length;
  
  if (avgChange > 0.05) return 'RAPID_IMPROVEMENT';
  if (avgChange > 0.02) return 'STEADY_IMPROVEMENT';
  if (avgChange > 0.005) return 'SLOW_IMPROVEMENT';
  if (avgChange > -0.005) return 'CONVERGED';
  return 'DECLINING';
}

function generateStrategicRecommendations(report) {
  const recommendations = [];
  
  // Based on confirmed intelligence
  if (report.baseKnowledge.confirmedPasswords > 0) {
    recommendations.push('CRITICAL: Immediate password rotation required - confirmed exposure in breach databases');
  }
  
  if (report.baseKnowledge.breachDatabases > 5) {
    recommendations.push('HIGH: Extensive breach exposure detected - implement comprehensive security review');
  }
  
  if (report.confidenceLevel === 'VERY_HIGH' || report.confidenceLevel === 'HIGH') {
    recommendations.push('STRATEGIC: High-confidence pattern intelligence available - prioritize evolved targets');
  }
  
  // Evolution-specific recommendations
  if (report.currentFitness > 0.8) {
    recommendations.push('TACTICAL: Agent achieved high fitness - strategic targets highly reliable');
  }
  
  return recommendations;
}

function generateOperationalVectors(report) {
  return {
    passwordAttack: {
      feasibility: report.baseKnowledge.confirmedPasswords > 0 ? 'CRITICAL' : 'MEDIUM',
      vectors: [
        'Credential stuffing with confirmed passwords',
        'Pattern-based mutations using evolved intelligence',
        'Strategic target enumeration from empirical patterns'
      ],
      targetList: report.strategicTargets.highConfidence.slice(0, 15)
    },
    
    socialEngineering: {
      feasibility: 'HIGH',
      vectors: [
        'Pattern-based social manipulation',
        'Breach exposure timeline exploitation',
        'Cross-platform correlation attacks'
      ]
    },
    
    technicalExploit: {
      feasibility: 'MEDIUM',
      vectors: [
        'Account recovery exploitation',
        'Security question pattern analysis',
        'Multi-factor authentication bypass attempts'
      ]
    }
  };
}

function assessEvolvedRisk(report) {
  let riskScore = 0;
  
  // Base risk from confirmed intelligence
  riskScore += report.baseKnowledge.confirmedPasswords * 20;
  riskScore += report.baseKnowledge.breachDatabases * 5;
  riskScore += report.baseKnowledge.verifiedPatterns * 10;
  
  // Evolution effectiveness multiplier
  const effectivenessMultiplier = report.currentFitness;
  riskScore *= effectivenessMultiplier;
  
  // Confidence level impact
  const confidenceLevels = {
    'VERY_HIGH': 1.2,
    'HIGH': 1.1,
    'MEDIUM': 1.0,
    'LOW': 0.8
  };
  
  riskScore *= confidenceLevels[report.confidenceLevel] || 1.0;
  
  // Cap at 100
  riskScore = Math.min(riskScore, 100);
  
  return {
    score: Math.round(riskScore),
    level: riskScore > 80 ? 'CRITICAL' : riskScore > 60 ? 'HIGH' : riskScore > 40 ? 'MEDIUM' : 'LOW',
    factors: [
      `${report.baseKnowledge.confirmedPasswords} confirmed password exposures`,
      `${report.baseKnowledge.breachDatabases} breach database exposures`,
      `${report.confidenceLevel} confidence strategic intelligence`,
      `${(report.currentFitness * 100).toFixed(1)}% evolution effectiveness`
    ]
  };
}

function calculatePatternAccuracy(agent) {
  const totalPatterns = agent.confirmedIntelligence.confirmedStrategicPatterns.length;
  const confirmedPatterns = agent.confirmedIntelligence.confirmedStrategicPatterns.filter(p => p.found).length;
  
  if (totalPatterns === 0) return 0;
  
  return (confirmedPatterns / totalPatterns * 100).toFixed(1);
}