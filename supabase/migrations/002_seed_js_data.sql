-- ============================================================
-- JusRental Seed Data
-- Run AFTER 001_create_js_tables.sql
-- ============================================================

-- ============================================================
-- Seed js_properties (20 properties)
-- ============================================================
INSERT INTO js_properties (title, location, area, price, bhk, sqft, type, furnished, images, amenities, verified, available, description, deposit, floor, facing, nearby_places, sharing_type, posted_date) VALUES
('Prestige Lake Ridge 3BHK', 'Hennur Main Road, Hennur', 'Hennur', 35000, 3, 1850, 'Apartment', 'Semi-Furnished', ARRAY['/images/scene-1.png'], ARRAY['Pool','Gym','Parking','Security','Power Backup','Lift'], true, true, 'Spacious 3BHK apartment in the heart of Hennur with premium amenities. This well-maintained unit features a large living room, modular kitchen, and three spacious bedrooms with attached bathrooms.', 70000, '7th of 14', 'East', '[{"name":"Manyata Tech Park","distance":"3.2 km","type":"mall"},{"name":"Columbia Asia Hospital","distance":"1.5 km","type":"hospital"},{"name":"Hennur Bande Lake","distance":"800 m","type":"park"}]'::jsonb, 'Family', '2026-09-10'),

('Sobha HRC Pristine 2BHK', 'Jakkur Main Road, Jakkur', 'Jakkur', 28000, 2, 1180, 'Apartment', 'Furnished', ARRAY['/images/scene-2.png'], ARRAY['WiFi','Gym','Parking','Power Backup','AC','Lift'], true, true, 'Fully furnished 2BHK with modern interiors in Sobha HRC Pristine. Comes with split ACs in both bedrooms, a washing machine, refrigerator, and a fully equipped modular kitchen.', 56000, '5th of 12', 'North', '[{"name":"Jakkur Aerodrome","distance":"1 km","type":"park"},{"name":"IIM Bangalore","distance":"2.5 km","type":"school"},{"name":"Elements Mall","distance":"4 km","type":"mall"}]'::jsonb, 'Any', '2026-09-08'),

('Brigade Lakefront 2BHK', 'Hebbal Outer Ring Road, Hebbal', 'Hebbal', 32000, 2, 1250, 'Apartment', 'Furnished', ARRAY['/images/scene-3.png'], ARRAY['Pool','Security','Power Backup','Gym','Parking','AC'], true, true, 'Elegant 2BHK at Brigade Lakefront overlooking Hebbal Lake. This fully furnished unit boasts a lake-facing balcony, modern kitchen, and two en-suite bedrooms.', 64000, '12th of 20', 'West', '[{"name":"Hebbal Flyover","distance":"500 m","type":"metro"},{"name":"Esteem Mall","distance":"1.2 km","type":"mall"},{"name":"Manipal Hospital","distance":"2 km","type":"hospital"}]'::jsonb, 'Family', '2026-09-12'),

('Godrej Reflections 1BHK', 'Bellary Road, Near Esteem Mall', 'Hebbal', 18000, 1, 680, 'Apartment', 'Furnished', ARRAY['/images/scene-4.png'], ARRAY['WiFi','Power Backup','Water Purifier','Security','Lift'], true, true, 'Compact and cozy 1BHK ideal for singles or couples. Fully furnished with a queen bed, study table, wardrobe, and a functional kitchen.', 36000, '3rd of 10', 'South', '[{"name":"Esteem Mall","distance":"800 m","type":"mall"},{"name":"Meenakshi Temple","distance":"1.5 km","type":"park"},{"name":"Fortis Hospital","distance":"3 km","type":"hospital"}]'::jsonb, 'Any', '2026-09-05'),

('Purva Atmosphere 3BHK', 'Thanisandra Main Road, Thanisandra', 'Thanisandra', 30000, 3, 1700, 'Apartment', 'Semi-Furnished', ARRAY['/images/scene-5.png'], ARRAY['Parking','Gym','Pool','Power Backup','Security','Lift'], true, true, 'Large 3BHK in Purva Atmosphere with excellent ventilation and natural light. Semi-furnished with wardrobes and kitchen cabinets.', 60000, '9th of 16', 'East', '[{"name":"Manyata Tech Park","distance":"2 km","type":"mall"},{"name":"GKVK Campus","distance":"3 km","type":"school"},{"name":"Thanisandra Lake","distance":"1 km","type":"park"}]'::jsonb, 'Family', '2026-09-11'),

('Salarpuria Sattva 2BHK', 'Yelahanka New Town, Yelahanka', 'Yelahanka', 22000, 2, 1050, 'Apartment', 'Semi-Furnished', ARRAY['/images/scene-1.png'], ARRAY['Security','Parking','Power Backup','Gym','Lift'], true, true, 'Affordable 2BHK in a peaceful residential complex in Yelahanka New Town. Semi-furnished with wardrobes and modular kitchen.', 44000, '4th of 8', 'North', '[{"name":"Yelahanka Railway Station","distance":"1.5 km","type":"metro"},{"name":"Air Force Station","distance":"2 km","type":"park"},{"name":"Big Bazaar","distance":"1 km","type":"mall"}]'::jsonb, 'Any', '2026-09-09'),

('Suncity Meridian 1BHK', 'Horamavu Main Road, Horamavu', 'Horamavu', 14000, 1, 600, 'Apartment', 'Unfurnished', ARRAY['/images/scene-2.png'], ARRAY['Parking','Security','Power Backup','Water Purifier'], true, true, 'Budget-friendly 1BHK in Horamavu, ideal for bachelors or small families. Unfurnished with vitrified flooring throughout.', 28000, '2nd of 5', 'East', '[{"name":"HRBR Layout Market","distance":"1.5 km","type":"mall"},{"name":"Kalyan Nagar","distance":"3 km","type":"restaurant"},{"name":"Kammanahalli","distance":"2.5 km","type":"restaurant"}]'::jsonb, 'Bachelor', '2026-09-07'),

('Mantri Webcity 2BHK', 'Hennur-Bagalur Road, Hennur', 'Hennur', 25000, 2, 1100, 'Apartment', 'Furnished', ARRAY['/images/scene-3.png'], ARRAY['WiFi','Gym','Pool','Parking','AC','Lift'], true, true, 'Modern 2BHK in Mantri Webcity along Hennur-Bagalur Road. Fully furnished with contemporary interiors, split ACs, and a washing machine.', 50000, '6th of 18', 'West', '[{"name":"Kannur Lake","distance":"2 km","type":"park"},{"name":"Lulu Mall (upcoming)","distance":"5 km","type":"mall"},{"name":"Narayana Health","distance":"4 km","type":"hospital"}]'::jsonb, 'Family', '2026-09-13'),

('Brigade Panorama 3BHK', 'Yelahanka Old Town, Yelahanka', 'Yelahanka', 28000, 3, 1550, 'Apartment', 'Semi-Furnished', ARRAY['/images/scene-4.png'], ARRAY['Pool','Gym','Parking','Power Backup','Security'], true, true, 'Spacious 3BHK in Brigade Panorama with a lake-view balcony. Semi-furnished with wardrobes in all rooms.', 56000, '8th of 15', 'South', '[{"name":"Yelahanka Lake","distance":"500 m","type":"park"},{"name":"Sapthagiri Hospital","distance":"1 km","type":"hospital"},{"name":"Yelahanka Bus Station","distance":"800 m","type":"metro"}]'::jsonb, 'Family', '2026-09-06'),

('Prestige Shantiniketan 2BHK', 'ITPL Main Road, Thanisandra', 'Thanisandra', 26000, 2, 1200, 'Apartment', 'Furnished', ARRAY['/images/scene-5.png'], ARRAY['WiFi','Gym','Pool','Parking','AC','Security'], true, true, 'Well-furnished 2BHK in the premium Prestige Shantiniketan township. Features a spacious living area and modern bathrooms.', 52000, '11th of 22', 'North', '[{"name":"Manyata Tech Park","distance":"1.5 km","type":"mall"},{"name":"Thanisandra Main Road","distance":"500 m","type":"restaurant"},{"name":"Nagawara Lake","distance":"2 km","type":"park"}]'::jsonb, 'Any', '2026-09-14'),

('Elegant Villa in Devanahalli', 'Near Airport, Devanahalli', 'Devanahalli', 45000, 4, 2800, 'Villa', 'Semi-Furnished', ARRAY['/images/scene-1.png'], ARRAY['Parking','Security','Power Backup','Pool','Gym'], true, true, 'Luxurious 4BHK villa in a gated community near Kempegowda International Airport. Features a private garden and car parking for 2.', 90000, 'Ground + 1', 'East', '[{"name":"KIA Airport","distance":"5 km","type":"metro"},{"name":"Devanahalli Fort","distance":"2 km","type":"park"},{"name":"Akash Hospital","distance":"3 km","type":"hospital"}]'::jsonb, 'Family', '2026-09-04'),

('Indep. House Byrathi 2BHK', 'Byrathi Cross, Byrathi', 'Hennur', 16000, 2, 900, 'Independent House', 'Unfurnished', ARRAY['/images/scene-3.png'], ARRAY['Parking','Water Purifier','Power Backup'], true, true, 'Affordable independent house portion in Byrathi with separate entrance. Two spacious bedrooms, a hall, kitchen, and a small balcony.', 32000, '1st floor', 'South', '[{"name":"Hennur Main Road","distance":"1.5 km","type":"restaurant"},{"name":"Byrathi Lake","distance":"800 m","type":"park"},{"name":"Local Market","distance":"500 m","type":"mall"}]'::jsonb, 'Any', '2026-09-03'),

('TVS Emerald 2BHK', 'Narayanapura, Hennur', 'Hennur', 20000, 2, 1050, 'Apartment', 'Semi-Furnished', ARRAY['/images/scene-4.png'], ARRAY['Gym','Parking','Power Backup','Security','Lift'], true, true, 'Well-designed 2BHK in TVS Emerald township at Narayanapura. Features modular kitchen and wardrobes.', 40000, '3rd of 11', 'North', '[{"name":"Narayanapura Lake","distance":"1 km","type":"park"},{"name":"Hennur Market","distance":"2 km","type":"mall"},{"name":"Bangalore Baptist Hospital","distance":"5 km","type":"hospital"}]'::jsonb, 'Family', '2026-09-02'),

('Sumadhura Folium 1BHK', 'Jakkur Plantation, Jakkur', 'Jakkur', 15000, 1, 650, 'Apartment', 'Furnished', ARRAY['/images/scene-5.png'], ARRAY['WiFi','Parking','Security','Power Backup','AC'], true, true, 'Cozy 1BHK in Sumadhura Folium near Jakkur Plantation. Fully furnished with AC, bed, and kitchen appliances.', 30000, '4th of 9', 'West', '[{"name":"Jakkur Lake","distance":"1.5 km","type":"park"},{"name":"GKVK Campus","distance":"2 km","type":"school"},{"name":"IIM Bangalore","distance":"3 km","type":"school"}]'::jsonb, 'Bachelor', '2026-09-01'),

('Century Breeze 3BHK', 'Kogilu Cross, Yelahanka', 'Yelahanka', 24000, 3, 1400, 'Apartment', 'Semi-Furnished', ARRAY['/images/scene-2.png'], ARRAY['Gym','Parking','Power Backup','Security','Pool'], true, true, 'Spacious 3BHK in Century Breeze at Kogilu Cross. Semi-furnished with wardrobes and geysers.', 48000, '5th of 10', 'East', '[{"name":"NH44 Highway","distance":"1 km","type":"metro"},{"name":"Ryan International School","distance":"2 km","type":"school"},{"name":"Columbia Asia Hospital","distance":"3 km","type":"hospital"}]'::jsonb, 'Family', '2026-08-28'),

('Vaishnavi North 24 2BHK', 'Hebbal Kempapura, Hebbal', 'Hebbal', 30000, 2, 1150, 'Apartment', 'Furnished', ARRAY['/images/scene-1.png'], ARRAY['WiFi','Gym','Pool','AC','Parking','Security','Lift'], true, true, 'Premium 2BHK in Vaishnavi North 24, one of Hebbal''s most sought-after addresses. Fully furnished with designer interiors.', 60000, '14th of 24', 'North', '[{"name":"Hebbal Lake","distance":"1 km","type":"park"},{"name":"Esteem Mall","distance":"500 m","type":"mall"},{"name":"Manipal Hospital","distance":"1.5 km","type":"hospital"}]'::jsonb, 'Family', '2026-09-15'),

('Tata Carnatica 2BHK', 'Devanahalli North, Devanahalli', 'Devanahalli', 20000, 2, 1100, 'Apartment', 'Semi-Furnished', ARRAY['/images/scene-5.png'], ARRAY['Gym','Pool','Parking','Power Backup','Security'], true, true, 'Brand new 2BHK in the massive Tata Carnatica township near Devanahalli. Semi-furnished with premium fittings.', 40000, '7th of 14', 'East', '[{"name":"KIA Airport","distance":"8 km","type":"metro"},{"name":"KIAL IT Park","distance":"3 km","type":"mall"},{"name":"Nandi Hills","distance":"30 km","type":"park"}]'::jsonb, 'Any', '2026-09-10'),

('Assetz 63 East 1BHK', 'Bagalur Main Road, Horamavu', 'Horamavu', 16000, 1, 700, 'Apartment', 'Furnished', ARRAY['/images/scene-2.png'], ARRAY['WiFi','Parking','Power Backup','Security','AC'], true, true, 'Stylish 1BHK in Assetz 63 East with modern amenities. Fully furnished with a queen bed, study, and compact kitchen.', 32000, '3rd of 12', 'South', '[{"name":"Horamavu Agara Lake","distance":"1 km","type":"park"},{"name":"Ramamurthy Nagar","distance":"3 km","type":"restaurant"},{"name":"BIAL Expressway","distance":"5 km","type":"metro"}]'::jsonb, 'Bachelor', '2026-09-08'),

('Prestige Woodland Park 3BHK', 'Cooke Town, near Hennur', 'Hennur', 40000, 3, 1900, 'Apartment', 'Furnished', ARRAY['/images/scene-3.png'], ARRAY['WiFi','Gym','Pool','Parking','AC','Security','Power Backup','Lift'], true, true, 'Luxury 3BHK in Prestige Woodland Park near Cooke Town. Premium furnishing with Italian marble flooring and modular kitchen.', 80000, '10th of 18', 'East', '[{"name":"Commercial Street","distance":"4 km","type":"mall"},{"name":"Baptist Hospital","distance":"2 km","type":"hospital"},{"name":"MG Road Metro","distance":"5 km","type":"metro"}]'::jsonb, 'Family', '2026-09-14'),

('Bhartiya City Nikoo 2BHK', 'Thanisandra-Bagalur Road, Thanisandra', 'Thanisandra', 23000, 2, 1080, 'Apartment', 'Semi-Furnished', ARRAY['/images/scene-4.png'], ARRAY['Gym','Pool','Parking','Security','Power Backup','Lift'], true, true, 'Modern 2BHK in the Bhartiya City Nikoo Homes township. Semi-furnished with wardrobes and kitchen cabinets.', 46000, '6th of 15', 'West', '[{"name":"Bhartiya Mall of Bangalore","distance":"500 m","type":"mall"},{"name":"Leena Multispeciality Hospital","distance":"1.5 km","type":"hospital"},{"name":"Thanisandra Lake","distance":"2 km","type":"park"}]'::jsonb, 'Any', '2026-09-12');

-- ============================================================
-- Seed js_areas
-- ============================================================
INSERT INTO js_areas (name, properties_count, price_range, image, popular) VALUES
('Hennur', 180, '₹12K - ₹35K', '/images/area-koramangala.png', true),
('Hebbal', 220, '₹15K - ₹45K', '/images/area-indiranagar.png', true),
('Yelahanka', 310, '₹10K - ₹30K', '/images/area-hsr.png', true),
('Thanisandra', 260, '₹10K - ₹28K', '/images/area-whitefield.png', false),
('Devanahalli', 150, '₹8K - ₹25K', '/images/area-ecity.png', false),
('Horamavu', 200, '₹10K - ₹30K', '/images/area-marathahalli.png', false);

-- ============================================================
-- Seed js_testimonials
-- ============================================================
INSERT INTO js_testimonials (name, role, avatar, content, rating, type) VALUES
('Ananya Rao', 'Tenant', '/images/avatar-woman.jpg', 'I answered four questions on chat and got homes that actually matched my budget. The advisor even negotiated the deposit down by two months.', 5, 'text'),
('Karthik S.', 'Tenant', '/images/avatar-man.jpg', 'I visited two homes and both looked exactly like the photos. No fake listings, no brokers calling at midnight. Just a clean, fast close.', 5, 'text'),
('Venkatesh R.', 'Owner', '/images/avatar-owner.jpg', 'JusRental screened three families in a week. The tenant they found pays on time and treats the place like his own. Worth every rupee.', 5, 'text');

-- ============================================================
-- Seed js_key_features
-- ============================================================
INSERT INTO js_key_features (title, description, icon, sort_order) VALUES
('Zero Brokerage', 'Pay ₹599 one-time instead of 1 month rent as brokerage. Save ₹20,000+ on every rental.', 'BadgeIndianRupee', 1),
('Verified Listings', 'Every property is physically checked by our team. Real photos, real details, real availability.', 'ShieldCheck', 2),
('AI Property Matching', 'Our smart algorithm matches homes to your exact needs — budget, BHK, location, and lifestyle.', 'Sparkles', 3),
('Tenant KYC', 'Background-verified tenants for owner peace of mind. Safe and secure tenancy guaranteed.', 'UserCheck', 4),
('Online Token Payment', 'Secure online token and booking payments. No cash dealings, complete transparency.', 'CreditCard', 5),
('WhatsApp Notifications', 'Owners get instant alerts when tenants view their property. Stay updated in real-time.', 'MessageCircle', 6),
('NRI Services', 'Complete property management for NRI owners. From tenant finding to maintenance, we handle it all.', 'Globe', 7),
('Blog & Community', 'Read and write rental tips, area guides, and legal advice. Join our community of renters and owners.', 'BookOpen', 8);

-- ============================================================
-- Seed js_nri_services
-- ============================================================
INSERT INTO js_nri_services (title, description, icon, sort_order) VALUES
('Tenant Discovery', 'We find and verify quality tenants through our pool of 5,000+ screened renters. Background checks, employment verification, and reference calls included.', 'Users', 1),
('Rental Agreement', 'Complete rental agreement drafting, e-stamp paper, and registration assistance. Legally compliant documents delivered to your inbox.', 'FileText', 2),
('Rent Collection', 'Automated monthly rent collection with direct bank transfers. Receive timely payments without any follow-ups.', 'IndianRupee', 3),
('Property Maintenance', 'Regular maintenance, plumbing, electrical, and painting services coordinated on your behalf. Monthly property inspection reports.', 'Wrench', 4),
('Tax & Compliance', 'Rental income tax filing assistance, TDS handling, and compliance with local regulations. Stay worry-free from abroad.', 'Calculator', 5),
('Video Inspections', 'Monthly video walkthroughs of your property so you can see its condition from anywhere in the world. Photos and reports included.', 'Video', 6);

-- ============================================================
-- Seed js_blog_posts
-- ============================================================
INSERT INTO js_blog_posts (slug, title, excerpt, content, author, category, tags, cover_image, read_time, published_date) VALUES
('complete-guide-renting-hennur', 'Complete Guide to Renting in Hennur: 2026 Edition', 'Hennur has emerged as one of North Bangalore''s most desirable rental markets. Here''s everything you need to know before renting in this rapidly developing area.', '## Why Hennur?\n\nHennur has transformed from a quiet residential area to one of North Bangalore''s most sought-after neighborhoods.\n\n## Rental Price Trends\n\n- **1 BHK**: ₹10,000 - ₹16,000/month\n- **2 BHK**: ₹18,000 - ₹28,000/month\n- **3 BHK**: ₹28,000 - ₹42,000/month', 'JusRental Team', 'Area Guides', ARRAY['Hennur','North Bangalore','Rental Guide'], '/images/scene-1.png', 6, '2026-09-10'),

('tenant-rights-karnataka-rental-agreement', 'Tenant Rights in Karnataka: What Your Rental Agreement Must Include', 'Understanding your rights as a tenant in Karnataka can save you from disputes. Learn about the key clauses every rental agreement should have.', '## Know Your Rights\n\nAs a tenant in Karnataka, you are protected under the Karnataka Rent Control Act and the new Model Tenancy Act.', 'JusRental Team', 'Legal Advice', ARRAY['Rental Agreement','Tenant Rights','Karnataka'], '/images/scene-2.png', 7, '2026-09-05'),

('zero-brokerage-how-jusrental-works', 'Zero Brokerage: How JusRental Saves You ₹20,000+ on Your Next Rental', 'Traditional brokers charge 1 month''s rent as commission. Here''s how JusRental''s ₹599 model works.', '## The Problem with Traditional Brokers\n\nIn Bangalore, the standard brokerage fee is 1 month''s rent from the tenant.\n\n## The JusRental Model\n\nWe charge a flat ₹599 one-time fee. That''s it.', 'JusRental Team', 'Rental Tips', ARRAY['Zero Brokerage','Savings','How It Works'], '/images/scene-3.png', 5, '2026-08-28'),

('moving-to-bangalore-checklist', 'Moving to Bangalore? The Ultimate Relocation Checklist for 2026', 'Whether you''re moving for work or studies, this comprehensive checklist covers everything from finding a home to setting up utilities.', '## Before You Move\n\n### Research Neighborhoods\nNorth Bangalore offers the best value for IT professionals.\n\n### Set Your Budget\nRent should be 25-30% of monthly income.', 'JusRental Team', 'Moving Guide', ARRAY['Relocation','Bangalore','Moving Tips'], '/images/scene-4.png', 8, '2026-08-20'),

('owner-guide-maximizing-rental-income', 'Property Owner''s Guide: Maximize Your Rental Income in North Bangalore', 'Smart strategies for property owners to attract quality tenants and get the best rental yields.', '## The North Bangalore Advantage\n\nNorth Bangalore is currently one of the fastest-growing rental markets.\n\n## Pricing Your Property Right\n\nUse our rent estimator for accurate market rates.', 'JusRental Team', 'Owner Tips', ARRAY['Owner Guide','Rental Income','Investment'], '/images/scene-5.png', 7, '2026-08-15');

-- ============================================================
-- Seed js_rent_data (15 areas × 3 BHK types = 45 rows)
-- ============================================================
INSERT INTO js_rent_data (area, bhk, rent_range) VALUES
('Hennur', '1 BHK', '₹10,000 - ₹16,000'),
('Hennur', '2 BHK', '₹18,000 - ₹28,000'),
('Hennur', '3 BHK', '₹28,000 - ₹42,000'),
('Hebbal', '1 BHK', '₹12,000 - ₹18,000'),
('Hebbal', '2 BHK', '₹22,000 - ₹35,000'),
('Hebbal', '3 BHK', '₹32,000 - ₹50,000'),
('Yelahanka', '1 BHK', '₹8,000 - ₹14,000'),
('Yelahanka', '2 BHK', '₹15,000 - ₹25,000'),
('Yelahanka', '3 BHK', '₹22,000 - ₹38,000'),
('Thanisandra', '1 BHK', '₹9,000 - ₹15,000'),
('Thanisandra', '2 BHK', '₹16,000 - ₹26,000'),
('Thanisandra', '3 BHK', '₹25,000 - ₹40,000'),
('Jakkur', '1 BHK', '₹9,000 - ₹15,000'),
('Jakkur', '2 BHK', '₹16,000 - ₹25,000'),
('Jakkur', '3 BHK', '₹24,000 - ₹38,000'),
('Horamavu', '1 BHK', '₹8,000 - ₹14,000'),
('Horamavu', '2 BHK', '₹14,000 - ₹22,000'),
('Horamavu', '3 BHK', '₹22,000 - ₹35,000'),
('Devanahalli', '1 BHK', '₹7,000 - ₹12,000'),
('Devanahalli', '2 BHK', '₹12,000 - ₹20,000'),
('Devanahalli', '3 BHK', '₹18,000 - ₹30,000'),
('Bellary Road', '1 BHK', '₹11,000 - ₹17,000'),
('Bellary Road', '2 BHK', '₹20,000 - ₹32,000'),
('Bellary Road', '3 BHK', '₹30,000 - ₹48,000'),
('Bagalur', '1 BHK', '₹7,000 - ₹11,000'),
('Bagalur', '2 BHK', '₹12,000 - ₹18,000'),
('Bagalur', '3 BHK', '₹18,000 - ₹28,000'),
('Byrathi', '1 BHK', '₹8,000 - ₹13,000'),
('Byrathi', '2 BHK', '₹14,000 - ₹22,000'),
('Byrathi', '3 BHK', '₹22,000 - ₹35,000'),
('Narayanapura', '1 BHK', '₹8,000 - ₹13,000'),
('Narayanapura', '2 BHK', '₹15,000 - ₹24,000'),
('Narayanapura', '3 BHK', '₹24,000 - ₹38,000'),
('Yelahanka New Town', '1 BHK', '₹9,000 - ₹15,000'),
('Yelahanka New Town', '2 BHK', '₹16,000 - ₹26,000'),
('Yelahanka New Town', '3 BHK', '₹24,000 - ₹40,000'),
('Chikkajhala', '1 BHK', '₹6,000 - ₹10,000'),
('Chikkajhala', '2 BHK', '₹10,000 - ₹16,000'),
('Chikkajhala', '3 BHK', '₹16,000 - ₹25,000'),
('Sadahalli', '1 BHK', '₹6,000 - ₹10,000'),
('Sadahalli', '2 BHK', '₹10,000 - ₹16,000'),
('Sadahalli', '3 BHK', '₹16,000 - ₹25,000'),
('Vidya Nagar Cross', '1 BHK', '₹7,000 - ₹12,000'),
('Vidya Nagar Cross', '2 BHK', '₹13,000 - ₹20,000'),
('Vidya Nagar Cross', '3 BHK', '₹20,000 - ₹32,000');
