// Real Strategic OSINT API - Connects to actual breach databases and OSINT sources
// Performs genuine intelligence analysis using real data

import RealBreachCollector from '../engines/real-breach-collector.js';
import EmpiricalEvolution from '../engines/empirical-evolution.js';
import RealOSINTCorrelator from '../engines/real-osint-correlator.js';

export default async function handler(req, res) {
  // Set CORS headers for API access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    console.log('🕵️ Real Strategic OSINT Analysis Started');
    
    // Extract target email from query parameters
    const targetEmail = req.query.email || req.body?.email || 'danieloobregon23@gmail.com';
    const analysisDepth = req.query.depth || 'standard'; // 'basic', 'standard', 'comprehensive'
    const evolutionEnabled = req.query.evolution !== 'false';
    
    console.log(`🎯 Target: ${targetEmail}`);
    console.log(`📊 Analysis Depth: ${analysisDepth}`);
    console.log(`🧬 Evolution: ${evolutionEnabled ? 'Enabled' : 'Disabled'}`);

    // Initialize real intelligence systems
    const breachCollector = new RealBreachCollector();
    const osintCorrelator = new RealOSINTCorrelator();
    const empiricalEvolution = evolutionEnabled ? new EmpiricalEvolution() : null;

    const analysisResults = {
      target: targetEmail,
      analysisType: 'Real Strategic OSINT',
      depth: analysisDepth,
      timestamp: new Date().toISOString(),
      realDataSources: [],
      breachIntelligence: null,
      osintCorrelation: null,
      empiricalEvolution: null,
      strategicAssessment: null,
      actionableIntelligence: null,
      executionTime: null
    };

    const startTime = Date.now();

    // Phase 1: Real Breach Data Collection
    console.log('📡 Phase 1: Collecting real breach data...');
    try {
      analysisResults.breachIntelligence = await breachCollector.collectRealBreachData(targetEmail);
      analysisResults.realDataSources.push(...analysisResults.breachIntelligence.sources);
      
      if (analysisResults.breachIntelligence.breaches.length > 0) {
        console.log(`✅ Found ${analysisResults.breachIntelligence.breaches.length} real breaches`);
      }
      if (analysisResults.breachIntelligence.passwords.length > 0) {
        console.log(`✅ Recovered ${analysisResults.breachIntelligence.passwords.length} real passwords`);
      }
    } catch (error) {
      console.error(`❌ Breach collection error: ${error.message}`);
      analysisResults.breachIntelligence = { error: error.message, fallback: true };
    }

    // Phase 2: OSINT Correlation Analysis
    console.log('🔍 Phase 2: Performing OSINT correlation...');
    try {
      analysisResults.osintCorrelation = await osintCorrelator.correlateRealOSINT(
        targetEmail, 
        analysisResults.breachIntelligence
      );
      
      const socialPlatforms = Object.keys(analysisResults.osintCorrelation.socialPresence.platforms || {});
      const technicalSources = Object.keys(analysisResults.osintCorrelation.technicalFootprint.infrastructure || {});
      
      console.log(`✅ Correlated ${socialPlatforms.length} social platforms, ${technicalSources.length} technical sources`);
    } catch (error) {
      console.error(`❌ OSINT correlation error: ${error.message}`);
      analysisResults.osintCorrelation = { error: error.message, partial: true };
    }

    // Phase 3: Empirical Evolution (if enabled and sufficient data)
    if (empiricalEvolution && analysisResults.breachIntelligence && 
        (analysisResults.breachIntelligence.passwords?.length > 0 || analysisResults.breachIntelligence.breaches?.length > 0)) {
      
      console.log('🧬 Phase 3: Running empirical evolution...');
      try {
        analysisResults.empiricalEvolution = await empiricalEvolution.evolveFromRealData(
          analysisResults.breachIntelligence,
          targetEmail
        );
        
        console.log(`✅ Evolution complete: Generation ${analysisResults.empiricalEvolution.generation}, Fitness: ${analysisResults.empiricalEvolution.evolvedAgent.fitness.toFixed(3)}`);
      } catch (error) {
        console.error(`❌ Empirical evolution error: ${error.message}`);
        analysisResults.empiricalEvolution = { error: error.message };
      }
    }

    // Phase 4: Strategic Assessment
    console.log('⚔️ Phase 4: Generating strategic assessment...');
    analysisResults.strategicAssessment = generateStrategicAssessment(
      analysisResults.breachIntelligence,
      analysisResults.osintCorrelation,
      analysisResults.empiricalEvolution
    );

    // Phase 5: Actionable Intelligence Generation
    console.log('🎯 Phase 5: Generating actionable intelligence...');
    analysisResults.actionableIntelligence = generateActionableIntelligence(
      targetEmail,
      analysisResults
    );

    // Calculate execution time
    analysisResults.executionTime = Date.now() - startTime;

    // Generate final response
    const response = {
      status: 'Real Strategic OSINT Complete',
      target: targetEmail,
      summary: generateExecutiveSummary(analysisResults),
      intelligence: {
        breachExposure: formatBreachIntelligence(analysisResults.breachIntelligence),
        osintCorrelation: formatOSINTCorrelation(analysisResults.osintCorrelation),
        empiricalEvolution: formatEmpiricalEvolution(analysisResults.empiricalEvolution),
        strategicAssessment: analysisResults.strategicAssessment,
        actionableIntelligence: analysisResults.actionableIntelligence
      },
      metadata: {
        realDataSources: analysisResults.realDataSources,
        analysisDepth: analysisDepth,
        executionTime: `${analysisResults.executionTime}ms`,
        timestamp: analysisResults.timestamp,
        apiVersion: '2.0.0-real'
      }
    };

    console.log(`✅ Real Strategic OSINT Analysis Complete (${analysisResults.executionTime}ms)`);
    console.log(`📊 Data Sources: ${analysisResults.realDataSources.join(', ')}`);
    
    res.status(200).json(response);

  } catch (error) {
    console.error('❌ Real Strategic OSINT Analysis Failed:', error);
    res.status(500).json({
      error: 'Real Strategic OSINT Analysis Failed',
      message: error.message,
      timestamp: new Date().toISOString(),
      apiVersion: '2.0.0-real'
    });
  }
}

function generateStrategicAssessment(breachData, osintData, evolutionData) {
  const assessment = {
    overallRisk: 'UNKNOWN',
    confidence: 'MEDIUM',
    threatLevel: 'UNKNOWN',
    exposureVector: [],
    strategicValue: 'UNKNOWN',
    operationalRecommendations: []
  };

  // Assess based on real breach data
  if (breachData && !breachData.error) {
    let riskScore = 0;
    
    // Real breach exposure
    if (breachData.breaches && breachData.breaches.length > 0) {
      riskScore += Math.min(breachData.breaches.length * 10, 50);
      assessment.exposureVector.push(`${breachData.breaches.length} verified breaches`);
    }
    
    // Real password exposure
    if (breachData.passwords && breachData.passwords.length > 0) {
      riskScore += Math.min(breachData.passwords.length * 15, 50);
      assessment.exposureVector.push(`${breachData.passwords.length} exposed passwords`);
    }
    
    // Recent activity assessment
    if (breachData.analysis && breachData.analysis.temporalAnalysis) {
      const recentActivity = breachData.analysis.temporalAnalysis.recentActivity || 0;
      if (recentActivity > 0) {
        riskScore += 20;
        assessment.exposureVector.push(`${recentActivity} recent breach events`);
      }
    }
    
    // Determine risk level based on real data
    if (riskScore > 70) {
      assessment.overallRisk = 'HIGH';
      assessment.threatLevel = 'CRITICAL';
    } else if (riskScore > 40) {
      assessment.overallRisk = 'MEDIUM';
      assessment.threatLevel = 'ELEVATED';
    } else if (riskScore > 0) {
      assessment.overallRisk = 'LOW';
      assessment.threatLevel = 'BASELINE';
    }
  }

  // Factor in OSINT correlation
  if (osintData && !osintData.error) {
    const socialExposure = Object.keys(osintData.socialPresence?.platforms || {}).length;
    const technicalExposure = Object.keys(osintData.technicalFootprint?.infrastructure || {}).length;
    
    if (socialExposure > 2 || technicalExposure > 1) {
      assessment.exposureVector.push(`${socialExposure} social platforms, ${technicalExposure} technical footprints`);
    }
  }

  // Factor in empirical evolution results
  if (evolutionData && !evolutionData.error) {
    assessment.strategicValue = 'HIGH'; // Real evolution indicates valuable target
    assessment.confidence = 'HIGH';
    assessment.operationalRecommendations.push('Target suitable for advanced strategic operations');
  }

  // Generate operational recommendations
  if (assessment.overallRisk === 'HIGH') {
    assessment.operationalRecommendations.push('Immediate password rotation required');
    assessment.operationalRecommendations.push('Enable MFA on all exposed accounts');
    assessment.operationalRecommendations.push('Monitor for account takeover attempts');
  }

  return assessment;
}

function generateActionableIntelligence(targetEmail, analysisResults) {
  const actionableIntel = {
    immediateThreat: {
      level: 'UNKNOWN',
      indicators: [],
      mitigationSteps: []
    },
    strategicTargets: {
      primaryTargets: [],
      secondaryTargets: [],
      tertaryTargets: []
    },
    operationalVectors: {
      passwordAttack: { feasibility: 'UNKNOWN', vectors: [] },
      socialEngineering: { feasibility: 'UNKNOWN', vectors: [] },
      technicalExploit: { feasibility: 'UNKNOWN', vectors: [] }
    },
    intelligenceGaps: [],
    continuousMonitoring: {
      recommended: true,
      sources: [],
      frequency: 'weekly'
    }
  };

  // Analyze breach intelligence for actionable data
  if (analysisResults.breachIntelligence && !analysisResults.breachIntelligence.error) {
    const breachData = analysisResults.breachIntelligence;
    
    // Password attack vectors
    if (breachData.passwords && breachData.passwords.length > 0) {
      actionableIntel.operationalVectors.passwordAttack.feasibility = 'HIGH';
      actionableIntel.operationalVectors.passwordAttack.vectors = [
        'Credential stuffing attacks using exposed passwords',
        'Password pattern analysis for mutation generation',
        'Cross-platform password reuse exploitation'
      ];
      
      // Generate strategic targets from real password patterns
      const passwordBases = breachData.passwords
        .filter(p => p.password)
        .map(p => extractPasswordBase(p.password))
        .filter(base => base && base.length > 2);
      
      actionableIntel.strategicTargets.primaryTargets = [
        ...new Set(passwordBases.map(base => `${base}2024`)),
        ...new Set(passwordBases.map(base => `${base}2025`)),
        ...new Set(passwordBases.map(base => `${base}!`))
      ].slice(0, 10);
    }
    
    // Immediate threat assessment
    if (breachData.analysis && breachData.analysis.riskAssessment) {
      actionableIntel.immediateThreat.level = breachData.analysis.riskAssessment.level;
      actionableIntel.immediateThreat.indicators = breachData.analysis.riskAssessment.factors;
    }
  }

  // Analyze OSINT correlation for social engineering vectors
  if (analysisResults.osintCorrelation && !analysisResults.osintCorrelation.error) {
    const osintData = analysisResults.osintCorrelation;
    
    // Social engineering feasibility
    const socialPlatforms = Object.keys(osintData.socialPresence?.platforms || {});
    if (socialPlatforms.length > 0) {
      actionableIntel.operationalVectors.socialEngineering.feasibility = 'MEDIUM';
      actionableIntel.operationalVectors.socialEngineering.vectors = [
        `Profile analysis from ${socialPlatforms.join(', ')}`,
        'Social connection mapping',
        'Personal information extraction for password hints'
      ];
    }
    
    // Technical exploit vectors
    const techFootprint = osintData.technicalFootprint?.infrastructure || {};
    if (Object.keys(techFootprint).length > 0) {
      actionableIntel.operationalVectors.technicalExploit.feasibility = 'MEDIUM';
      actionableIntel.operationalVectors.technicalExploit.vectors = [
        'Infrastructure vulnerability analysis',
        'Service enumeration and exploitation',
        'Domain takeover opportunities'
      ];
    }
  }

  // Add empirical evolution insights
  if (analysisResults.empiricalEvolution && !analysisResults.empiricalEvolution.error) {
    const evolutionData = analysisResults.empiricalEvolution;
    
    // Add evolved strategic targets
    if (evolutionData.evolvedAgent && evolutionData.evolvedAgent.genes) {
      const evolvedTargets = generateEvolvedTargets(
        analysisResults.breachIntelligence,
        evolutionData.evolvedAgent.genes
      );
      actionableIntel.strategicTargets.secondaryTargets = evolvedTargets.slice(0, 10);
    }
  }

  // Identify intelligence gaps
  actionableIntel.intelligenceGaps = identifyIntelligenceGaps(analysisResults);
  
  // Set up continuous monitoring recommendations
  actionableIntel.continuousMonitoring.sources = [
    'Breach database monitoring',
    'Social media activity tracking',
    'Domain infrastructure changes',
    'Dark web mentions'
  ];

  return actionableIntel;
}

function generateExecutiveSummary(analysisResults) {
  const summary = {
    conclusion: 'Real strategic intelligence analysis completed',
    keyFindings: [],
    riskLevel: 'UNKNOWN',
    confidence: 'MEDIUM',
    recommendedActions: []
  };

  // Breach intelligence summary
  if (analysisResults.breachIntelligence && !analysisResults.breachIntelligence.error) {
    const breachCount = analysisResults.breachIntelligence.breaches?.length || 0;
    const passwordCount = analysisResults.breachIntelligence.passwords?.length || 0;
    
    summary.keyFindings.push(`Target exposed in ${breachCount} verified data breaches`);
    if (passwordCount > 0) {
      summary.keyFindings.push(`${passwordCount} passwords recovered from breach databases`);
    }
  }

  // OSINT correlation summary
  if (analysisResults.osintCorrelation && !analysisResults.osintCorrelation.error) {
    const socialCount = Object.keys(analysisResults.osintCorrelation.socialPresence?.platforms || {}).length;
    const techCount = Object.keys(analysisResults.osintCorrelation.technicalFootprint?.infrastructure || {}).length;
    
    if (socialCount > 0) {
      summary.keyFindings.push(`Active presence on ${socialCount} social media platforms`);
    }
    if (techCount > 0) {
      summary.keyFindings.push(`Technical footprint identified across ${techCount} infrastructure sources`);
    }
  }

  // Evolution results summary
  if (analysisResults.empiricalEvolution && !analysisResults.empiricalEvolution.error) {
    const generation = analysisResults.empiricalEvolution.generation;
    const fitness = analysisResults.empiricalEvolution.evolvedAgent?.fitness?.toFixed(3);
    
    summary.keyFindings.push(`Empirical evolution converged at generation ${generation} with fitness ${fitness}`);
  }

  // Overall assessment
  if (analysisResults.strategicAssessment) {
    summary.riskLevel = analysisResults.strategicAssessment.overallRisk;
    summary.confidence = analysisResults.strategicAssessment.confidence;
    summary.recommendedActions = analysisResults.strategicAssessment.operationalRecommendations;
  }

  return summary;
}

function formatBreachIntelligence(breachData) {
  if (!breachData || breachData.error) {
    return { status: 'unavailable', reason: breachData?.error || 'No data collected' };
  }

  return {
    status: 'available',
    breaches: breachData.breaches?.length || 0,
    passwords: breachData.passwords?.length || 0,
    sources: breachData.sources || [],
    analysis: breachData.analysis,
    riskAssessment: breachData.analysis?.riskAssessment
  };
}

function formatOSINTCorrelation(osintData) {
  if (!osintData || osintData.error) {
    return { status: 'unavailable', reason: osintData?.error || 'No correlation performed' };
  }

  return {
    status: 'available',
    socialPlatforms: Object.keys(osintData.socialPresence?.platforms || {}),
    technicalFootprint: Object.keys(osintData.technicalFootprint?.infrastructure || {}),
    riskAssessment: osintData.riskAssessment,
    fusedIntelligence: osintData.fusedIntelligence
  };
}

function formatEmpiricalEvolution(evolutionData) {
  if (!evolutionData || evolutionData.error) {
    return { status: 'unavailable', reason: evolutionData?.error || 'Evolution not performed' };
  }

  return {
    status: 'completed',
    generation: evolutionData.generation,
    fitness: evolutionData.evolvedAgent?.fitness,
    empiricalBasis: evolutionData.empiricalBasis,
    performance: evolutionData.realWorldPerformance
  };
}

// Utility functions
function extractPasswordBase(password) {
  if (!password) return '';
  return password.replace(/[0-9!@#$%^&*()_+=\-\[\]{}|;':",./<>?~`]/g, '').toLowerCase();
}

function generateEvolvedTargets(breachData, genes) {
  const targets = [];
  
  if (breachData && breachData.passwords) {
    const bases = breachData.passwords
      .filter(p => p.password)
      .map(p => extractPasswordBase(p.password))
      .filter(base => base && base.length > 2);
    
    // Apply evolved strategy
    bases.forEach(base => {
      switch (genes.primaryStrategy) {
        case 'temporal_prioritization':
          targets.push(`${base}2024`, `${base}2025`, `${base}New`);
          break;
        case 'pattern_mutation':
          targets.push(`${base}!@#`, `${base}_123`, `${base}$`);
          break;
        case 'service_reuse':
          targets.push(`${base}Work`, `${base}Home`, `${base}Personal`);
          break;
        default:
          targets.push(`${base}123`, `${base}!`, `${base}2024`);
      }
    });
  }
  
  return [...new Set(targets)];
}

function identifyIntelligenceGaps(analysisResults) {
  const gaps = [];
  
  if (!analysisResults.breachIntelligence || analysisResults.breachIntelligence.error) {
    gaps.push('Breach database access limited - consider additional data sources');
  }
  
  if (!analysisResults.osintCorrelation || analysisResults.osintCorrelation.error) {
    gaps.push('OSINT correlation incomplete - manual verification recommended');
  }
  
  if (!analysisResults.empiricalEvolution || analysisResults.empiricalEvolution.error) {
    gaps.push('Empirical evolution unavailable - pattern analysis limited');
  }
  
  return gaps;
}