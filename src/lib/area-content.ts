export interface AreaContent {
  name: string;
  slug: string;
  intro: string;
  rentRanges: { bhk: string; range: string }[];
  popularSocieties: string[];
  connectivity: string[];
  employmentHubs: string[];
  schoolsHospitals: string[];
  tenantTips: string[];
  faqs: { q: string; a: string }[];
}

const AREAS: Record<string, AreaContent> = {
  hennur: {
    name: 'Hennur',
    slug: 'hennur',
    intro: 'Hennur is one of North Bangalore\'s fastest-growing residential corridors, stretching from Hennur Main Road to Hennur Bande and beyond towards Kothanur. Over the past decade, the area has transformed from a quiet suburb into a bustling rental hotspot thanks to excellent IT connectivity, wide roads, and rapid infrastructure development. Hennur offers the perfect balance of urban convenience and relatively affordable rents compared to areas like Indiranagar or Koramangala. The neighbourhood is popular among young professionals working in Manyata Tech Park, Kirloskar Business Park, and the Outer Ring Road IT belt. Families are drawn to Hennur for its reputable schools, proximity to Hebbal, and an expanding social infrastructure with malls, restaurants, and healthcare facilities. Whether you are a bachelor looking for a budget-friendly 1 BHK or a family seeking a spacious 3 BHK apartment, Hennur has a wide variety of rental options to suit every need and budget.',
    rentRanges: [
      { bhk: '1 BHK', range: '₹10,000 – ₹18,000/month' },
      { bhk: '2 BHK', range: '₹16,000 – ₹30,000/month' },
      { bhk: '3 BHK', range: '₹25,000 – ₹50,000/month' },
    ],
    popularSocieties: ['Sobha Dream Acres', 'Brigade Lakefront', 'Prestige Ferns Residency', 'Shriram Greenfield', 'Godrej Avenues', 'Mantri Webcity'],
    connectivity: ['Hennur Main Road connects directly to Hebbal Flyover and ORR', 'BMTC bus routes to Majestic, KR Puram, and Whitefield', 'Upcoming Nagawara Metro Station (Purple Line extension)', 'Easy access to Kempegowda International Airport via NH44 (35 min)', 'Bellary Road and Thanisandra Main Road within 10 minutes'],
    employmentHubs: ['Manyata Tech Park (5 km)', 'Kirloskar Business Park (3 km)', 'Outer Ring Road IT Corridor (8 km)', 'Bagmane Tech Park (12 km)', 'HBR Layout commercial zone (4 km)'],
    schoolsHospitals: ['Delhi Public School North', 'Ryan International School', 'Inventure Academy', 'Columbia Asia Hospital Hebbal', 'Aster CMI Hospital', 'Manipal Hospital Hebbal'],
    tenantTips: ['Check water supply — some apartments depend on borewell and tanker water', 'Verify if the society has power backup for common areas and individual flats', 'Ask about maintenance charges — they can range from ₹2,000 to ₹6,000 depending on the society', 'Confirm parking availability, especially if you own two vehicles', 'Check the commute time to your office during peak hours (8–10 AM)'],
    faqs: [
      { q: 'What is the average rent for a 2 BHK in Hennur?', a: 'A 2 BHK apartment in Hennur typically rents between ₹16,000 and ₹30,000 per month depending on furnishing, floor, and society amenities.' },
      { q: 'Is Hennur good for families?', a: 'Yes. Hennur has reputed schools like DPS North and Ryan International, hospitals like Columbia Asia, parks, and supermarkets making it very family-friendly.' },
      { q: 'How far is Hennur from the airport?', a: 'Kempegowda International Airport is approximately 30–35 km from Hennur, reachable in about 35–45 minutes via NH44.' },
      { q: 'Is there metro connectivity in Hennur?', a: 'The Nagawara Metro Station on the Purple Line extension is under construction and will significantly improve connectivity once operational.' },
    ],
  },
  hebbal: {
    name: 'Hebbal',
    slug: 'hebbal',
    intro: 'Hebbal is a premium residential locality in North Bangalore, renowned for its proximity to Manyata Tech Park, the Hebbal Flyover junction, and Kempegowda International Airport. Situated at the convergence of Bellary Road, Outer Ring Road, and NH44, Hebbal enjoys unmatched connectivity across Bangalore. The area has evolved into one of the most sought-after rental destinations for IT professionals, corporate executives, and families. Hebbal Lake and the surrounding green spaces add a serene touch to the otherwise bustling neighbourhood. The rental market here caters to a wide spectrum — from affordable 1 BHK units for young professionals to luxury 3 BHK apartments with lake views. Gated communities by top developers like Prestige, Brigade, and Sobha dominate the skyline, offering world-class amenities including swimming pools, gyms, clubhouses, and 24/7 security. Hebbal is also a prime choice for NRI investors looking for rental income properties.',
    rentRanges: [
      { bhk: '1 BHK', range: '₹12,000 – ₹22,000/month' },
      { bhk: '2 BHK', range: '₹20,000 – ₹40,000/month' },
      { bhk: '3 BHK', range: '₹35,000 – ₹70,000/month' },
    ],
    popularSocieties: ['Prestige Shantiniketan', 'Brigade Caladium', 'Sobha Lake Garden', 'Godrej Platinum', 'Mantri Espana', 'RMZ Galleria'],
    connectivity: ['Hebbal Flyover connects to ORR, Bellary Road, and NH44', 'Direct access to Kempegowda International Airport (25 km)', 'Nagawara Metro Station (under construction)', 'BMTC Volvo services to all major IT parks', 'Proximity to Yeshwanthpur Railway Station (8 km)'],
    employmentHubs: ['Manyata Tech Park (2 km)', 'Kirloskar Business Park (4 km)', 'RMZ Infinity (6 km)', 'Embassy Manyata (3 km)', 'Outer Ring Road belt (5 km)'],
    schoolsHospitals: ['Canadian International School', 'Presidency School', 'Jain International School', 'Columbia Asia Hospital', 'Aster CMI Hospital', 'Manipal Hospital'],
    tenantTips: ['Hebbal flyover traffic can be heavy during peak hours — consider commute times carefully', 'Lake-facing apartments command a premium of 15–25% over non-lake-facing units', 'Several premium societies have high maintenance costs — factor this into your budget', 'Check for corporate leasing options which may offer better terms'],
    faqs: [
      { q: 'What is the average rent for a 2 BHK in Hebbal?', a: 'A 2 BHK in Hebbal typically costs between ₹20,000 and ₹40,000/month depending on the society, floor, and furnishing status.' },
      { q: 'Is Hebbal well-connected to the airport?', a: 'Yes, Hebbal is one of the best-connected areas to the airport via NH44/Bellary Road. The airport is about 25 km away (30–40 minutes).' },
      { q: 'Why is Hebbal popular for rentals?', a: 'Hebbal offers proximity to major IT parks, excellent road connectivity, premium gated communities, and a lakeside environment — a rare combination in Bangalore.' },
    ],
  },
  yelahanka: {
    name: 'Yelahanka',
    slug: 'yelahanka',
    intro: 'Yelahanka is a well-established residential area in North Bangalore that has become increasingly popular with renters seeking affordable housing close to the airport and major employment hubs. Originally an independent town, Yelahanka was incorporated into Bangalore and has since developed rapidly with modern apartments, shopping centres, and improved infrastructure. The area is divided into Old Yelahanka and New Town, with New Town offering more contemporary housing options. Yelahanka\'s biggest advantage is its strategic location on NH44, providing easy access to Kempegowda International Airport (just 15 km away) and Hebbal (10 km). The Indian Air Force Station and several defence establishments give the area a safe, well-maintained character. With rents significantly lower than central Bangalore, Yelahanka attracts a diverse tenant base including air force families, IT professionals, and small business owners. The area boasts excellent schools, hospitals, and recreational facilities making it ideal for long-term family rentals.',
    rentRanges: [
      { bhk: '1 BHK', range: '₹8,000 – ₹15,000/month' },
      { bhk: '2 BHK', range: '₹14,000 – ₹25,000/month' },
      { bhk: '3 BHK', range: '₹20,000 – ₹40,000/month' },
    ],
    popularSocieties: ['Prestige Lake Ridge', 'Sobha Forest View', 'Brigade Orchards', 'Salarpuria Greenage', 'SJR Verity', 'Mahaveer Ranches'],
    connectivity: ['NH44 direct route to airport (15 km, 20 min)', 'Yelahanka Railway Station on Bangalore-Guntakal line', 'BMTC buses to Majestic, Hebbal, and Peenya', 'Upcoming metro extension planned', 'Bellary Road access to city centre'],
    employmentHubs: ['Manyata Tech Park (12 km)', 'Peenya Industrial Area (8 km)', 'Devanahalli Business Park (15 km)', 'KIADB Aerospace Park (18 km)', 'IAF Station Yelahanka (2 km)'],
    schoolsHospitals: ['St. Claret School', 'Air Force School Yelahanka', 'Presidency School', 'MS Ramaiah Hospital', 'Akash Hospital', 'Regal Hospital'],
    tenantTips: ['Old Yelahanka has older buildings with lower rents but limited amenities', 'New Town apartments offer modern amenities at competitive rates', 'Check for air force noise — some areas are under the flight path', 'Water supply is generally good compared to other North Bangalore areas'],
    faqs: [
      { q: 'Is Yelahanka affordable for rentals?', a: 'Yes, Yelahanka offers some of the most affordable rental rates in North Bangalore. A 2 BHK starts from ₹14,000/month.' },
      { q: 'How far is Yelahanka from the airport?', a: 'Kempegowda International Airport is just 15 km from Yelahanka — about 20 minutes by road via NH44.' },
      { q: 'Is Yelahanka safe for families?', a: 'Very safe. The presence of the Indian Air Force station and defence establishments contributes to a well-maintained and secure environment.' },
    ],
  },
  thanisandra: {
    name: 'Thanisandra',
    slug: 'thanisandra',
    intro: 'Thanisandra, located along Thanisandra Main Road in North Bangalore, has emerged as a prime rental destination for IT professionals and young families. The area sits strategically between Hebbal and Yelahanka, providing excellent access to Manyata Tech Park, the Outer Ring Road, and the airport highway. Thanisandra\'s real estate boom has brought numerous apartment complexes from reputed developers, offering modern amenities at competitive rental rates. The neighbourhood is characterized by its mix of established residential layouts and new gated communities. Thanisandra Main Road itself is lined with restaurants, supermarkets, banks, and retail outlets, ensuring residents have everything they need within walking distance. The area is popular among bachelor groups and young couples thanks to its vibrant food scene and social infrastructure. For families, the proximity to schools like Orchids International and hospitals provides added convenience.',
    rentRanges: [
      { bhk: '1 BHK', range: '₹10,000 – ₹17,000/month' },
      { bhk: '2 BHK', range: '₹17,000 – ₹30,000/month' },
      { bhk: '3 BHK', range: '₹28,000 – ₹50,000/month' },
    ],
    popularSocieties: ['SNN Raj Serenity', 'Assetz Marq', 'Prestige Ferns Galaxy', 'Sumadhura Acropolis', 'Sobha Silicon Oasis', 'Brigade Northridge'],
    connectivity: ['Thanisandra Main Road connects to Hebbal and ORR', 'Close to Nagawara Junction and upcoming metro station', 'BMTC buses to Majestic, Whitefield, and Electronic City', 'Airport accessible via Hebbal flyover (30 km)', 'Bellary Road and Hennur Road within 5 km'],
    employmentHubs: ['Manyata Tech Park (4 km)', 'Kirloskar Business Park (5 km)', 'RMZ Galleria (6 km)', 'Embassy Manyata (5 km)', 'Outer Ring Road IT parks (8 km)'],
    schoolsHospitals: ['Orchids International School', 'Presidency School', 'The HDFC School', 'Aster CMI Hospital (5 km)', 'Motherhood Hospital', 'Manipal Hospital Hebbal (6 km)'],
    tenantTips: ['Traffic on Thanisandra Main Road can be heavy during peak hours', 'Newer societies on cross roads tend to be quieter and offer better value', 'Many PG accommodations available for bachelors near Manyata Tech Park', 'Check for gym and pool access — most new societies include them'],
    faqs: [
      { q: 'Why is Thanisandra popular for rentals?', a: 'Thanisandra offers proximity to Manyata Tech Park, modern apartment complexes, vibrant food scene, and competitive rents — making it a top choice for IT professionals.' },
      { q: 'What is the average rent for a 2 BHK in Thanisandra?', a: 'A 2 BHK in Thanisandra typically rents for ₹17,000 to ₹30,000/month depending on furnishing and society amenities.' },
      { q: 'Is Thanisandra good for bachelors?', a: 'Yes, Thanisandra has many bachelor-friendly apartments and PGs, a vibrant food scene, and easy access to IT parks.' },
    ],
  },
  devanahalli: {
    name: 'Devanahalli',
    slug: 'devanahalli',
    intro: 'Devanahalli, once known primarily as the location of Kempegowda International Airport, has evolved into North Bangalore\'s most ambitious growth corridor. The area is witnessing massive infrastructure development including the KIADB Aerospace SEZ, the upcoming International Exhibition Centre, a business park, and planned ITIR (Information Technology Investment Region). Devanahalli town retains its heritage charm with the historic Devanahalli Fort, while the surrounding areas are rapidly developing with modern residential projects. Rental demand here is driven by airport employees, aerospace professionals, and those working in the growing commercial establishments along the airport road. The area offers significantly lower rents compared to the city, with the trade-off being a longer commute to central Bangalore. However, with the planned metro extension and the Satellite Town Ring Road, connectivity is set to improve dramatically. Devanahalli is particularly popular among tenants who value open spaces, lower population density, and proximity to the airport.',
    rentRanges: [
      { bhk: '1 BHK', range: '₹7,000 – ₹12,000/month' },
      { bhk: '2 BHK', range: '₹12,000 – ₹22,000/month' },
      { bhk: '3 BHK', range: '₹18,000 – ₹35,000/month' },
    ],
    popularSocieties: ['Prestige Tech Park Residences', 'Brigade Orchards', 'Nandi Hills View Apartments', 'Godrej Reserve', 'Century Eden', 'Tata The Promont'],
    connectivity: ['Adjacent to Kempegowda International Airport', 'NH44 connects to Hebbal and city centre (40 km)', 'Satellite Town Ring Road (under construction)', 'Planned metro extension from Nagawara', 'KSRTC and private airport shuttle services'],
    employmentHubs: ['Kempegowda International Airport (5 km)', 'KIADB Aerospace SEZ (3 km)', 'Hardware Technology Park (8 km)', 'Devanahalli Business Park (2 km)', 'Embassy Business Park (10 km)'],
    schoolsHospitals: ['Greenwood High School', 'North Star International School', 'Akash International School', 'Narayana Multispeciality Hospital', 'Aster Hospital Devanahalli', 'Sakra World Hospital (25 km)'],
    tenantTips: ['Factor in the commute time to the city — it can take 45–60 minutes during peak hours', 'Several new projects are still under construction — verify possession timelines', 'Water and electricity supply can be inconsistent in some newer developments', 'Great for those who travel frequently — airport is just 5 minutes away'],
    faqs: [
      { q: 'Is Devanahalli good for renting?', a: 'Yes, if you work near the airport or in the aerospace/IT parks in the area. Rents are 30–40% lower than central Bangalore with modern amenities.' },
      { q: 'How far is Devanahalli from Bangalore city?', a: 'Devanahalli is about 35–40 km from central Bangalore (MG Road). The commute takes 45–75 minutes depending on traffic.' },
      { q: 'What are the advantages of living in Devanahalli?', a: 'Lower rents, proximity to the airport, less congestion, modern gated communities, and upcoming infrastructure projects make Devanahalli attractive.' },
    ],
  },
  horamavu: {
    name: 'Horamavu',
    slug: 'horamavu',
    intro: 'Horamavu is a well-connected residential area in North-East Bangalore that has become a popular rental choice for working professionals and families. Located between Hennur and Kalyan Nagar, Horamavu offers easy access to the Outer Ring Road, Banaswadi, and Ramamurthy Nagar. The area is divided into Horamavu Main Road and Horamavu Agara, with both segments offering diverse rental options from independent houses to modern apartment complexes. Horamavu\'s appeal lies in its central location within North Bangalore — it provides connectivity to IT parks on both the ORR and Whitefield corridors while maintaining relatively affordable rents. The neighbourhood has a strong social infrastructure with numerous restaurants, supermarkets (including Big Bazaar and More), banks, and entertainment options. For fitness enthusiasts, several gyms and yoga studios dot the area. The mix of old Bangalore charm in the independent house layouts and modern amenities in newer gated communities makes Horamavu suitable for all types of tenants.',
    rentRanges: [
      { bhk: '1 BHK', range: '₹9,000 – ₹16,000/month' },
      { bhk: '2 BHK', range: '₹15,000 – ₹28,000/month' },
      { bhk: '3 BHK', range: '₹22,000 – ₹45,000/month' },
    ],
    popularSocieties: ['SJR Brooklyn', 'Sumadhura Sawan', 'Salarpuria Sattva Greenage', 'Purva Windermere', 'Mantri Tranquil', 'Brigade Pinnacle'],
    connectivity: ['Horamavu Main Road connects to Hennur and Banaswadi', 'Outer Ring Road access via HRBR Layout (5 km)', 'KR Puram Railway Station (6 km)', 'BMTC buses to Majestic, Whitefield, and Hebbal', 'Close to Kalyan Nagar and Kammanahalli hubs'],
    employmentHubs: ['Manyata Tech Park (8 km)', 'Bagmane Tech Park (10 km)', 'ITPL Whitefield (15 km)', 'RMZ Infinity (7 km)', 'Banaswadi commercial area (3 km)'],
    schoolsHospitals: ['The Valley School', 'Greenwood High', 'Delhi Public Academy', 'Baptist Hospital (5 km)', 'Vydehi Hospital (6 km)', 'Fortis Hospital (8 km)'],
    tenantTips: ['Independent houses in Horamavu are great value — often cheaper than apartments with more space', 'Traffic towards ORR can be heavy in the mornings — leave early', 'Ask about water supply schedule — some areas have limited municipal supply', 'Horamavu Agara tends to be quieter than Horamavu Main Road area'],
    faqs: [
      { q: 'What is the average rent in Horamavu?', a: 'A 2 BHK in Horamavu typically costs ₹15,000 to ₹28,000/month. Independent houses can be more affordable than apartment complexes.' },
      { q: 'Is Horamavu good for working professionals?', a: 'Yes, Horamavu offers easy access to IT parks on ORR and Whitefield, with numerous food and entertainment options nearby.' },
      { q: 'How is the connectivity from Horamavu?', a: 'Horamavu connects well to Hennur, Banaswadi, Kalyan Nagar, and ORR. BMTC buses run frequently to major parts of the city.' },
    ],
  },
  jakkur: {
    name: 'Jakkur',
    slug: 'jakkur',
    intro: 'Jakkur is an upscale residential area in North Bangalore, known for the scenic Jakkur Lake, the Jakkur Aerodrome (one of India\'s oldest flying clubs), and premium gated communities. Nestled between Yelahanka and Hebbal, Jakkur offers the dual advantage of being close to major IT parks while maintaining a peaceful, green environment. The area has seen significant development with luxury apartment projects from developers like Prestige, Sobha, and Puravankara. Jakkur\'s rental market is dominated by spacious 2 and 3 BHK apartments in gated communities, making it particularly popular with families and senior IT professionals. The Jakkur Lake area provides a beautiful jogging and cycling environment, and the neighbourhood\'s tree-lined streets give it a distinctly premium feel. Rents in Jakkur sit between Hebbal\'s premium pricing and Yelahanka\'s budget-friendly rates, offering excellent value for the quality of life on offer.',
    rentRanges: [
      { bhk: '1 BHK', range: '₹10,000 – ₹18,000/month' },
      { bhk: '2 BHK', range: '₹18,000 – ₹35,000/month' },
      { bhk: '3 BHK', range: '₹30,000 – ₹55,000/month' },
    ],
    popularSocieties: ['Prestige Ozone', 'Sobha Lake Garden', 'Puravankara Skydale', 'Mantri Serenity', 'Brigade Pinnacle', 'Salarpuria Opus'],
    connectivity: ['Jakkur Main Road connects to Hebbal and Yelahanka', 'Bellary Road / NH44 access (3 km)', 'Close to Hebbal Flyover and ORR junction', 'Airport via NH44 (22 km, 25 min)', 'Planned metro extension via Hebbal'],
    employmentHubs: ['Manyata Tech Park (5 km)', 'Embassy Manyata (6 km)', 'Kirloskar Business Park (4 km)', 'Peenya Industrial Area (10 km)', 'Hebbal commercial area (3 km)'],
    schoolsHospitals: ['Canadian International School', 'Jain International School', 'Vidyashilp Academy', 'Aster CMI Hospital (4 km)', 'Columbia Asia Hebbal (5 km)', 'Manipal Hospital (6 km)'],
    tenantTips: ['Jakkur is one of the greenest areas in North Bangalore — great for families with kids', 'Premium societies have high maintenance charges (₹4,000–₹8,000/month) — budget accordingly', 'Check for lake-view apartments — they offer a premium but are worth it for the lifestyle', 'The aerodrome area occasionally has light aircraft noise — visit before deciding'],
    faqs: [
      { q: 'Is Jakkur a good area to rent in Bangalore?', a: 'Yes, Jakkur offers premium gated communities, a green lakeside environment, and great connectivity to IT parks — making it excellent for families and professionals.' },
      { q: 'What are the rents like in Jakkur?', a: 'A 2 BHK in Jakkur typically rents for ₹18,000 to ₹35,000/month. Premium lake-view units can command higher prices.' },
      { q: 'How far is Jakkur from Manyata Tech Park?', a: 'Jakkur is approximately 5 km from Manyata Tech Park, usually a 10–15 minute drive.' },
    ],
  },
};

export const AREA_SLUGS = Object.keys(AREAS);

export function getAreaContent(slug: string): AreaContent | null {
  return AREAS[slug.toLowerCase()] || null;
}

export function getAllAreaSlugs(): string[] {
  return AREA_SLUGS;
}
