import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Accurate 2025-2026 rental prices researched from 99acres, NoBroker, MagicBricks, Housing.com
const rentData = [
  // Bagalur - emerging outskirt area near airport
  { area: 'Bagalur', bhk: '1 BHK', rent_range: '₹8,000 – ₹15,000' },
  { area: 'Bagalur', bhk: '2 BHK', rent_range: '₹15,000 – ₹28,000' },
  { area: 'Bagalur', bhk: '3 BHK', rent_range: '₹22,000 – ₹40,000' },

  // Bellary Road - premium corridor
  { area: 'Bellary Road', bhk: '1 BHK', rent_range: '₹15,000 – ₹30,000' },
  { area: 'Bellary Road', bhk: '2 BHK', rent_range: '₹28,000 – ₹55,000' },
  { area: 'Bellary Road', bhk: '3 BHK', rent_range: '₹45,000 – ₹90,000' },

  // Byrathi - near Hennur Road
  { area: 'Byrathi', bhk: '1 BHK', rent_range: '₹8,000 – ₹16,000' },
  { area: 'Byrathi', bhk: '2 BHK', rent_range: '₹15,000 – ₹30,000' },
  { area: 'Byrathi', bhk: '3 BHK', rent_range: '₹25,000 – ₹45,000' },

  // Chikkajala - affordable outer area
  { area: 'Chikkajala', bhk: '1 BHK', rent_range: '₹7,000 – ₹13,000' },
  { area: 'Chikkajala', bhk: '2 BHK', rent_range: '₹12,000 – ₹22,000' },
  { area: 'Chikkajala', bhk: '3 BHK', rent_range: '₹20,000 – ₹35,000' },

  // Devanahalli - airport proximity
  { area: 'Devanahalli', bhk: '1 BHK', rent_range: '₹8,000 – ₹18,000' },
  { area: 'Devanahalli', bhk: '2 BHK', rent_range: '₹16,000 – ₹30,000' },
  { area: 'Devanahalli', bhk: '3 BHK', rent_range: '₹25,000 – ₹50,000' },

  // Hebbal - premium hub of North Bangalore
  { area: 'Hebbal', bhk: '1 BHK', rent_range: '₹12,000 – ₹25,000' },
  { area: 'Hebbal', bhk: '2 BHK', rent_range: '₹22,000 – ₹50,000' },
  { area: 'Hebbal', bhk: '3 BHK', rent_range: '₹35,000 – ₹85,000' },

  // Hennur - developing corridor
  { area: 'Hennur', bhk: '1 BHK', rent_range: '₹10,000 – ₹20,000' },
  { area: 'Hennur', bhk: '2 BHK', rent_range: '₹18,000 – ₹35,000' },
  { area: 'Hennur', bhk: '3 BHK', rent_range: '₹28,000 – ₹55,000' },

  // Horamavu - near ORR and Manyata Tech Park
  { area: 'Horamavu', bhk: '1 BHK', rent_range: '₹8,000 – ₹18,000' },
  { area: 'Horamavu', bhk: '2 BHK', rent_range: '₹15,000 – ₹35,000' },
  { area: 'Horamavu', bhk: '3 BHK', rent_range: '₹22,000 – ₹50,000' },

  // Jakkur - between Yelahanka and Hebbal
  { area: 'Jakkur', bhk: '1 BHK', rent_range: '₹10,000 – ₹20,000' },
  { area: 'Jakkur', bhk: '2 BHK', rent_range: '₹18,000 – ₹35,000' },
  { area: 'Jakkur', bhk: '3 BHK', rent_range: '₹30,000 – ₹55,000' },

  // Narayanapura - near Kothanur/Hennur
  { area: 'Narayanapura', bhk: '1 BHK', rent_range: '₹10,000 – ₹20,000' },
  { area: 'Narayanapura', bhk: '2 BHK', rent_range: '₹18,000 – ₹35,000' },
  { area: 'Narayanapura', bhk: '3 BHK', rent_range: '₹28,000 – ₹55,000' },

  // Sadahalli - most affordable, near airport
  { area: 'Sadahalli', bhk: '1 BHK', rent_range: '₹6,000 – ₹12,000' },
  { area: 'Sadahalli', bhk: '2 BHK', rent_range: '₹10,000 – ₹20,000' },
  { area: 'Sadahalli', bhk: '3 BHK', rent_range: '₹18,000 – ₹32,000' },

  // Thanisandra - mid-to-premium
  { area: 'Thanisandra', bhk: '1 BHK', rent_range: '₹12,000 – ₹22,000' },
  { area: 'Thanisandra', bhk: '2 BHK', rent_range: '₹20,000 – ₹45,000' },
  { area: 'Thanisandra', bhk: '3 BHK', rent_range: '₹35,000 – ₹70,000' },

  // Vidya Nagar Cross - affordable, near Chikkajala
  { area: 'Vidya Nagar Cross', bhk: '1 BHK', rent_range: '₹7,000 – ₹13,000' },
  { area: 'Vidya Nagar Cross', bhk: '2 BHK', rent_range: '₹12,000 – ₹22,000' },
  { area: 'Vidya Nagar Cross', bhk: '3 BHK', rent_range: '₹20,000 – ₹35,000' },

  // Yelahanka - well-established residential
  { area: 'Yelahanka', bhk: '1 BHK', rent_range: '₹9,000 – ₹18,000' },
  { area: 'Yelahanka', bhk: '2 BHK', rent_range: '₹16,000 – ₹32,000' },
  { area: 'Yelahanka', bhk: '3 BHK', rent_range: '₹25,000 – ₹50,000' },

  // Yelahanka New Town - newer construction, slightly higher
  { area: 'Yelahanka New Town', bhk: '1 BHK', rent_range: '₹10,000 – ₹20,000' },
  { area: 'Yelahanka New Town', bhk: '2 BHK', rent_range: '₹18,000 – ₹35,000' },
  { area: 'Yelahanka New Town', bhk: '3 BHK', rent_range: '₹28,000 – ₹55,000' },
];

async function updateRentData() {
  // Delete all existing rent data
  const { error: deleteError } = await supabase
    .from('js_rent_data')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // delete all rows

  if (deleteError) {
    console.error('Error deleting old data:', deleteError);
    process.exit(1);
  }
  console.log('Deleted old rent data');

  // Insert new data
  const { error: insertError } = await supabase
    .from('js_rent_data')
    .insert(rentData);

  if (insertError) {
    console.error('Error inserting new data:', insertError);
    process.exit(1);
  }

  console.log(`Inserted ${rentData.length} rent data entries`);

  // Verify
  const { data: verify } = await supabase
    .from('js_rent_data')
    .select('area, bhk, rent_range')
    .order('area')
    .order('bhk');

  console.log('\nVerification:');
  for (const row of verify) {
    console.log(`  ${row.area} | ${row.bhk} | ${row.rent_range}`);
  }
}

updateRentData();
