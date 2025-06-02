// Test real breach APIs with actual credentials
import fetch from 'node-fetch';

// API Keys from environment
const HIBP_API_KEY = "897dc2bdbd814997a2cab80e237c0987";
const LEAKOSINT_API_KEY = "7779445189:TMeEIJEh";
const DEHASHED_API_KEY = "9Sqby+i3vD5fpa6MwTRmcoTaEBtunmDMPN8bKeImypEURMbSlj2VcNM9Sqby+i3vD5fpa6MwTRmcoTaEBtunmDMPN8bKeImypEURMbSlj2VcNM=";
const DEHASHED_USERNAME = "calebmills99@gmail.com";

async function testHIBP(email) {
  console.log(`🔍 Testing HIBP for: ${email}`);
  
  try {
    const response = await fetch(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`,
      {
        headers: {
          'User-Agent': 'Real-Breach-Test',
          'hibp-api-key': HIBP_API_KEY
        }
      }
    );

    console.log(`HIBP Status: ${response.status}`);
    
    if (response.status === 404) {
      console.log('✅ HIBP: No breaches found (clean account)');
      return [];
    }

    if (response.ok) {
      const breaches = await response.json();
      console.log(`✅ HIBP: Found ${breaches.length} breaches`);
      breaches.forEach(breach => {
        console.log(`  - ${breach.Name} (${breach.BreachDate}): ${breach.DataClasses.join(', ')}`);
      });
      return breaches;
    } else {
      console.log(`❌ HIBP Error: ${response.status} ${response.statusText}`);
      return [];
    }

  } catch (error) {
    console.log(`❌ HIBP Exception: ${error.message}`);
    return [];
  }
}

async function testLeakOSINT(email) {
  console.log(`🔍 Testing LeakOSINT for: ${email}`);
  
  try {
    const response = await fetch('https://leakosintapi.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Real-Breach-Test'
      },
      body: JSON.stringify({
        token: LEAKOSINT_API_KEY,
        request: email,
        limit: 100,
        lang: 'en'
      })
    });

    console.log(`LeakOSINT Status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      
      if (data["Error code"]) {
        console.log(`❌ LeakOSINT Error: ${data["Error code"]}`);
        return [];
      }
      
      if (data.List) {
        const passwords = [];
        Object.keys(data.List).forEach(dbName => {
          if (dbName !== "No results found" && data.List[dbName].Data) {
            console.log(`✅ LeakOSINT: Found data in ${dbName}`);
            data.List[dbName].Data.forEach(record => {
              if (record.Password || record.password) {
                passwords.push(record.Password || record.password);
                console.log(`  - Password: ${record.Password || record.password}`);
              }
              if (record.Email || record.email) {
                console.log(`  - Email: ${record.Email || record.email}`);
              }
            });
          }
        });
        console.log(`✅ LeakOSINT: Total ${passwords.length} passwords found`);
        return passwords;
      }
      
      console.log('✅ LeakOSINT: No results found');
      return [];
      
    } else {
      console.log(`❌ LeakOSINT HTTP Error: ${response.status}`);
      return [];
    }

  } catch (error) {
    console.log(`❌ LeakOSINT Exception: ${error.message}`);
    return [];
  }
}

async function testDeHashed(email) {
  console.log(`🔍 Testing DeHashed for: ${email}`);
  
  try {
    const auth = Buffer.from(`${DEHASHED_USERNAME}:${DEHASHED_API_KEY}`).toString('base64');
    
    const response = await fetch(
      `https://api.dehashed.com/search?query=email:${encodeURIComponent(email)}`,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Accept': 'application/json',
          'User-Agent': 'Real-Breach-Test'
        }
      }
    );

    console.log(`DeHashed Status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.entries && data.entries.length > 0) {
        console.log(`✅ DeHashed: Found ${data.entries.length} entries`);
        data.entries.forEach(entry => {
          console.log(`  - Database: ${entry.database_name}`);
          console.log(`  - Email: ${entry.email}`);
          console.log(`  - Password: ${entry.password || 'N/A'}`);
          console.log(`  - Hash: ${entry.hashed_password || 'N/A'}`);
        });
        return data.entries;
      } else {
        console.log('✅ DeHashed: No results found');
        return [];
      }
      
    } else {
      console.log(`❌ DeHashed Error: ${response.status} ${response.statusText}`);
      return [];
    }

  } catch (error) {
    console.log(`❌ DeHashed Exception: ${error.message}`);
    return [];
  }
}

async function searchPasswordInBreaches(password) {
  console.log(`🔍 Searching for password: ${password} across breach databases\n`);
  
  try {
    // Search LeakOSINT for the specific password
    const response = await fetch('https://leakosintapi.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Password-Search-Test'
      },
      body: JSON.stringify({
        token: LEAKOSINT_API_KEY,
        request: password,
        limit: 100,
        lang: 'en'
      })
    });

    console.log(`LeakOSINT Status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      
      if (data["Error code"]) {
        console.log(`❌ LeakOSINT Error: ${data["Error code"]}`);
        return [];
      }
      
      if (data.List) {
        const results = [];
        Object.keys(data.List).forEach(dbName => {
          if (dbName !== "No results found" && data.List[dbName].Data) {
            console.log(`✅ Found "${password}" in: ${dbName}`);
            data.List[dbName].Data.forEach(record => {
              console.log(`  - Email: ${record.Email || record.email || 'N/A'}`);
              console.log(`  - Password: ${record.Password || record.password || 'N/A'}`);
              if (record.Username || record.username) {
                console.log(`  - Username: ${record.Username || record.username}`);
              }
              console.log('');
              results.push({
                database: dbName,
                email: record.Email || record.email,
                password: record.Password || record.password,
                username: record.Username || record.username
              });
            });
          }
        });
        
        if (results.length === 0) {
          console.log(`❌ Password "${password}" not found in any breach databases`);
        } else {
          console.log(`✅ Password "${password}" found in ${results.length} records across ${Object.keys(data.List).length} databases`);
        }
        
        return results;
      }
      
      console.log(`❌ Password "${password}" not found`);
      return [];
      
    } else {
      console.log(`❌ LeakOSINT HTTP Error: ${response.status}`);
      return [];
    }

  } catch (error) {
    console.log(`❌ Search Exception: ${error.message}`);
    return [];
  }
}

// Test with known email addresses
async function runTests() {
  console.log('🚀 Starting Real Breach API Tests\n');
  
  // First search for the reverse password
  console.log('🔄 REVERSE PASSWORD SEARCH');
  console.log('=' + '='.repeat(60));
  await searchPasswordInBreaches('32reyals');
  
  console.log('\n' + '-'.repeat(80) + '\n');
  
  // Also test other strategic variants
  const strategicPasswords = [
    '32reyals!',
    '32Reyals', 
    'reyals23',
    'slayer32',
    '23slayer'
  ];
  
  for (const password of strategicPasswords) {
    console.log(`🎯 STRATEGIC PASSWORD SEARCH: ${password}`);
    console.log('=' + '='.repeat(60));
    await searchPasswordInBreaches(password);
    console.log('\n' + '-'.repeat(80) + '\n');
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  console.log('\n✅ All strategic password searches completed');
}

// Run the tests
runTests().catch(console.error);