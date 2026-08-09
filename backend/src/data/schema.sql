-- ===================================================
-- SUPABASE DATABASE SETUP FOR VINTAGE CAR SPARE PARTS
-- Copy and paste this into Supabase Dashboard -> SQL Editor -> Run
-- ===================================================

-- 1. Create Spare Parts Table
CREATE TABLE IF NOT EXISTS spare_parts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  oem_number TEXT,
  car_model_id TEXT,
  car_model_name TEXT,
  engine_type TEXT,
  category TEXT NOT NULL,
  era TEXT,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  reviews_count INT DEFAULT 1,
  condition TEXT DEFAULT 'NOS (New Old Stock)',
  rarity_score TEXT DEFAULT 'Rare (85/100)',
  stock INT DEFAULT 1,
  in_stock BOOLEAN DEFAULT true,
  image TEXT,
  casting_code TEXT,
  provenance TEXT,
  specifications JSONB DEFAULT '[]'::jsonb,
  compatible_vehicles JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Vintage Cars Table
CREATE TABLE IF NOT EXISTS vintage_cars (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  make TEXT,
  model TEXT,
  era TEXT,
  year_range TEXT,
  engine_name TEXT,
  engine_type TEXT,
  car_image TEXT,
  engine_image TEXT,
  horsepower TEXT,
  torque TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  user_name TEXT,
  user_email TEXT,
  items JSONB NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  shipping_address TEXT,
  status TEXT DEFAULT 'CONFIRMED',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'USER',
  phone TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Requests Table (Item Requests & Reservations)
CREATE TABLE IF NOT EXISTS requests (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  user_city TEXT,
  part_id TEXT,
  part_title TEXT,
  part_image TEXT,
  sku TEXT,
  price NUMERIC(10, 2),
  compatibility TEXT,
  type TEXT DEFAULT 'REQUEST',
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE spare_parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE vintage_cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Clean Policies
DROP POLICY IF EXISTS "Allow public read access to spare_parts" ON spare_parts;
DROP POLICY IF EXISTS "Allow public read access to vintage_cars" ON vintage_cars;
DROP POLICY IF EXISTS "Allow public all access to spare_parts" ON spare_parts;
DROP POLICY IF EXISTS "Allow public all access to vintage_cars" ON vintage_cars;
DROP POLICY IF EXISTS "Allow all actions for orders" ON orders;
DROP POLICY IF EXISTS "Allow all actions for users" ON users;
DROP POLICY IF EXISTS "Allow all actions for requests" ON requests;

CREATE POLICY "Allow public all access to spare_parts" ON spare_parts FOR ALL USING (true);
CREATE POLICY "Allow public all access to vintage_cars" ON vintage_cars FOR ALL USING (true);
CREATE POLICY "Allow all actions for orders" ON orders FOR ALL USING (true);
CREATE POLICY "Allow all actions for users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all actions for requests" ON requests FOR ALL USING (true);

-- 4. Initial Seed Data (Vintage Cars)
INSERT INTO vintage_cars (id, name, era, make, model, year_range, engine_name, engine_type, car_image, engine_image, horsepower, torque, description)
VALUES 
('shelby-gt500-1967', '1967 Ford Mustang Shelby GT500', '1960s', 'Ford / Shelby', 'Mustang Shelby GT500', '1967', '7.0L V8 Cobra Jet (428 cu in)', 'V8 Big Block', 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80', '355 HP @ 5400 RPM', '420 lb-ft @ 3200 RPM', 'The pinnacle of American muscle engineering with high-rise aluminum intake manifolds and twin Holley 4-barrel carburetors.'),
('mercedes-300sl-1954', '1954 Mercedes-Benz 300SL Gullwing', '1950s', 'Mercedes-Benz', '300SL Gullwing', '1954-1957', '3.0L Inline-6 M198 Direct Injection', 'Inline-6 Dry Sump', 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80', '240 HP @ 6100 RPM', '217 lb-ft @ 4800 RPM', 'Pioneered mechanical direct fuel injection on a production car with tubular spaceframe chassis compatibility.'),
('jaguar-etype-1961', '1961 Jaguar E-Type Series 1 3.8', '1960s', 'Jaguar', 'E-Type Series 1', '1961-1964', '3.8L XK Inline-6 Twin-Cam', 'DOHC Inline-6', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80', '265 HP @ 5500 RPM', '260 lb-ft @ 4000 RPM', 'Hemispherical aluminum cylinder head with triple SU HD8 carburetors and dual overhead camshafts.'),
('corvette-stingray-1963', '1963 Chevrolet Corvette Stingray Split-Window', '1960s', 'Chevrolet', 'Corvette Stingray', '1963', '5.4L L84 327 cu in V8 Fuelie', 'Small Block V8', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80', '360 HP @ 6000 RPM', '352 lb-ft @ 4000 RPM', 'Iconic Rochester mechanical fuel injection small block V8 with high-compression domed pistons.'),
('porsche-911s-1970', '1970 Porsche 911 S 2.2L Coupe', '1970s', 'Porsche', '911 S', '1970', '2.2L Air-Cooled Flat-6 (M901)', 'Air-Cooled Boxer-6', 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80', '180 HP @ 6500 RPM', '147 lb-ft @ 5200 RPM', 'Bosch mechanical fuel injection with dry-sump lubrication and magnesium alloy crankcase.')
ON CONFLICT (id) DO NOTHING;

-- 5. Initial Seed Data (Spare Parts)
INSERT INTO spare_parts (id, title, oem_number, car_model_id, car_model_name, engine_type, category, era, price, rating, reviews_count, condition, rarity_score, stock, in_stock, image, casting_code, provenance, specifications, compatible_vehicles)
VALUES
('part-001', 'Dual Holley 4-Barrel Carburetor Assembly (428 Cobra Jet)', 'C8OF-9510-AA / List-4279', 'shelby-gt500-1967', '1967 Ford Mustang Shelby GT500', '7.0L V8 Cobra Jet', 'Fuel & Carburetion', '1960s', 3450.00, 4.9, 14, 'NOS (New Old Stock)', 'Extremely Rare (98/100)', 2, true, 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80', 'C8OF-9510-AA', 'Acquired from private collector inventory in Dearborn, MI. Factory vacuum sealed in original Ford blue box.', '[{"key": "Choke Type", "value": "Manual Dual Choke"}, {"key": "Air Flow Rate", "value": "600 CFM Per Unit"}]'::jsonb, '["1967 Ford Mustang Shelby GT500 (428 V8)", "1968 Ford Fairlane Cobra Jet 428"]'::jsonb),
('part-002', 'Cobra Jet High-Rise Aluminum Intake Manifold', 'C8OE-9425-K', 'shelby-gt500-1967', '1967 Ford Mustang Shelby GT500', '7.0L V8 Cobra Jet', 'Engine Block & Internals', '1960s', 2150.00, 4.8, 9, 'Factory Restored', 'Rare (85/100)', 3, true, 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80', 'C8OE-9425-K', 'Ultrasonically cleaned, pressure tested to 45 PSI, and vapor blasted to original factory matte aluminum finish.', '[{"key": "Configuration", "value": "Dual-Plane High Rise"}, {"key": "Carburetor Fitment", "value": "Dual 4-Barrel Square Flange"}]'::jsonb, '["1967-1969 Shelby GT500 428 V8"]'::jsonb),
('part-003', 'Autolite Dual-Point Mechanical Distributor Assembly', 'C7OF-12127-D', 'shelby-gt500-1967', '1967 Ford Mustang Shelby GT500', '7.0L V8 Cobra Jet', 'Ignition & Electrical', '1960s', 980.00, 4.7, 22, 'NOS (New Old Stock)', 'Uncommon (72/100)', 5, true, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80', 'C7OF-12127-D', 'Unused vintage stock with original copper contacts and phenolic rotor button intact.', '[{"key": "Advance Mechanism", "value": "Centrifugal Mechanical & Vacuum"}]'::jsonb, '["1967 Shelby GT500 428 V8"]'::jsonb),
('part-004', 'Bosch Mechanical Direct Fuel Injection Pump (M198)', 'PES-6KL-70/300-R11', 'mercedes-300sl-1954', '1954 Mercedes-Benz 300SL Gullwing', '3.0L Inline-6 M198', 'Fuel & Carburetion', '1950s', 8900.00, 5.0, 6, 'Factory Restored', 'Ultra Museum Grade (99/100)', 1, true, 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80', 'PES6KL70-R11', 'Precision calibrated on Bosch bench in Stuttgart, Germany with certified flow test results included.', '[{"key": "Plunger Diameter", "value": "7.0 mm Micro-ground"}]'::jsonb, '["1954-1957 Mercedes-Benz 300SL Gullwing W198"]'::jsonb),
('part-005', 'Jaguar XK Triple SU HD8 Carburetor Setup on Intake', 'AUC-9488-TRIPLE', 'jaguar-etype-1961', '1961 Jaguar E-Type Series 1 3.8', '3.8L XK Inline-6 Twin-Cam', 'Fuel & Carburetion', '1960s', 4200.00, 4.9, 11, 'NOS (New Old Stock)', 'Extremely Rare (94/100)', 2, true, 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80', 'SU-HD8-2INCH', 'Matched trio of 2-inch SU HD8 carbs mounted on factory polished intake manifold with throttle linkages.', '[{"key": "Throat Diameter", "value": "2.00 Inches (50.8 mm)"}]'::jsonb, '["1961-1964 Jaguar E-Type Series 1 3.8L"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
