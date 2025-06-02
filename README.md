# dirtyD4N2dotSI - Strategic Intelligence System

Advanced OSINT platform with Darwin Gödel Machine evolution for dynamic password analysis and strategic intelligence gathering.

## 🚀 Live Deployment

**Vercel Endpoints:**
- Generation 3: `/generation3` (hybrid_adaptive)
- Generation 6: `/generation6` (recency_first - OPTIMAL)
- Generation 9: `/generation9` (hybrid_adaptive)
- Custom: `/api/strategic-osint?generation=N`

## 🧬 Evolution System

The system uses a Darwin Gödel Machine to evolve strategic intelligence capabilities:

- **Dynamic Password Analysis** - No hardcoded assumptions
- **Multi-Hash Support** - MD5, SHA1, SHA256, bcrypt detection
- **Temporal Intelligence** - Recent passwords prioritized
- **Pattern Recognition** - Adaptive scoring without fixed patterns
- **Strategic Targeting** - Cross-platform username generation

## 🎯 Generation Performance

| Generation | Strategy | Fitness | Temporal Weight | Status |
|------------|----------|---------|-----------------|--------|
| 3 | hybrid_adaptive | 0.542 | 0.823 | ✅ Verified |
| 6 | recency_first | 0.680 | 1.000 | 🏆 **OPTIMAL** |
| 9 | hybrid_adaptive | 0.645 | 0.891 | ✅ Verified |

## 📡 API Usage

```bash
# Test Generation 6 (Optimal)
curl https://YOUR_VERCEL_URL/generation6

# Custom generation
curl https://YOUR_VERCEL_URL/api/strategic-osint?generation=6

# Response includes:
# - evolvedConfiguration (strategy, fitness, weights)
# - analysis (patterns, hashes, strategic score)
# - evolvedScoring (top patterns with evolved weights)
# - strategicTargets (cross-platform usernames)
# - performance (metric breakdown)
```

## 🛠️ Local Development

```bash
npm install
npm run dev     # Start Vercel development server
npm test        # Run strategic analysis tests
npm run deploy  # Deploy to Vercel
```

## 🎯 Strategic Intelligence Features

- **Real Evolution**: Genetic algorithms with empirical validation
- **Dynamic Analysis**: No hardcoded password assumptions
- **Hash Intelligence**: Multi-format detection and smart cracking
- **Temporal Scoring**: Recent data prioritized automatically
- **Strategic Targeting**: Username permutations across platforms
- **Performance Metrics**: Real-time effectiveness measurement

## 📊 Architecture

```
dirtyD4N2dotSI/
├── api/strategic-osint.js      # Main API endpoint
├── engines/
│   ├── password-analyzer.js    # Dynamic password analysis
│   ├── strategic-evolution.js  # Darwin Gödel Machine
│   └── strategic-scorer.js     # Evolved scoring system
├── test/                       # Verification & testing
└── vercel.json                 # Deployment configuration
```

Generation 6 represents the optimal configuration with 0.680 fitness, perfect temporal intelligence (1.000), and recency_first strategy for maximum real-world effectiveness.

## Fresh Start Context: Lessons from dirtyD4N2dotNO

### What We Learned
- **Password diversity**: Real targets use multiple passwords across time/services
- **Hash complexity**: MD5, bcrypt, SHA variants require different approaches
- **Pattern flexibility**: Can't assume any single password family (like "Slayer23") is primary
- **Frequency matters**: Most common passwords ≠ most valuable passwords
- **Temporal relevance**: 2024 password > 2017 password for active accounts

### New Strategic Approach
- Dynamic password intelligence that analyzes ALL patterns
- Flexible hash strategy with auto-detection
- Adaptive pattern recognition without hardcoded assumptions
- Intelligence prioritization based on temporal relevance and strategic value