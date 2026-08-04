// Vintage Engines & Spare Parts Mock Database

export const VINTAGE_ENGINES = [
  {
    id: 'vw-1600-flat4',
    name: '1600cc Dual-Port Air-Cooled Flat-4',
    era: '1960s',
    make: 'VW Air-Cooled',
    engineName: '1600cc Dual-Port Flat-4',
    engineType: 'Flat-4 Air-Cooled',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    horsepower: '60 HP @ 4200 RPM',
    torque: '82 lb-ft @ 2800 RPM',
    description: 'Iconic dual-port air-cooled boxer engine with magnesium alloy crankcase and Solex 34 PICT carburetion.'
  },
  {
    id: 'cobra-jet-428',
    name: '428 Cobra Jet 7.0L V8',
    era: '1960s',
    make: 'Performance V8',
    engineName: '7.0L V8 Cobra Jet (428 cu in)',
    engineType: 'V8 Big Block',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    horsepower: '355 HP @ 5400 RPM',
    torque: '420 lb-ft @ 3200 RPM',
    description: 'High-performance V8 engine block with high-rise aluminum intake manifolds and Holley 4-barrel carburetors.'
  },
  {
    id: 'm901-flat6',
    name: 'M901 2.2L Air-Cooled Flat-6',
    era: '1970s',
    make: 'Air-Cooled Flat-6',
    engineName: '2.2L Air-Cooled Flat-6 (M901)',
    engineType: 'Air-Cooled Boxer-6',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    horsepower: '180 HP @ 6500 RPM',
    torque: '147 lb-ft @ 5200 RPM',
    description: 'Mechanical fuel injection with dry-sump lubrication and magnesium alloy crankcase architecture.'
  },
  {
    id: 'vw-2000-flat4',
    name: '2.0L Type 4 Air-Cooled Flat-4',
    era: '1970s',
    make: 'VW Heavy Duty',
    engineName: '2.0L Type 4 Flat-4',
    engineType: 'Type 4 Air-Cooled',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80',
    horsepower: '70 HP @ 4200 RPM',
    torque: '105 lb-ft @ 3000 RPM',
    description: 'Heavy-duty air-cooled boxer platform with reinforced cylinder heads and dual Zenith carburetors.'
  },
  {
    id: 'm198-inline6',
    name: '3.0L M198 Mechanical Injection Inline-6',
    era: '1950s',
    make: 'Classic Inline-6',
    engineName: '3.0L Inline-6 M198 Direct Injection',
    engineType: 'Inline-6 Dry Sump',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    horsepower: '240 HP @ 6100 RPM',
    torque: '217 lb-ft @ 4800 RPM',
    description: 'Pioneered mechanical direct fuel injection with dry-sump lubrication system.'
  }
];

export const VINTAGE_CARS = VINTAGE_ENGINES;

export const ENGINE_HOTSPOTS = [
  {
    id: 'hotspot-carb',
    name: 'Dual Holley 4-Barrel Carburetors',
    x: 50,
    y: 28,
    partId: 'part-001',
    category: 'Fuel & Carburetion',
    shortDesc: 'Matched pair 600 CFM vacuum secondary carbs for 428 Cobra Jet V8.'
  },
  {
    id: 'hotspot-intake',
    name: 'High-Rise Aluminum Intake Manifold',
    x: 48,
    y: 38,
    partId: 'part-002',
    category: 'Engine Block & Internals',
    shortDesc: 'Cast C8OE-9425-K dual-plane performance manifold.'
  },
  {
    id: 'hotspot-distributor',
    name: 'Dual-Point Mechanical Ignition Distributor',
    x: 68,
    y: 32,
    partId: 'part-003',
    category: 'Ignition & Electrical',
    shortDesc: 'Original vacuum advance distributor with phenolic rotor.'
  },
  {
    id: 'hotspot-headers',
    name: 'Tubular Steel Exhaust Headers',
    x: 28,
    y: 52,
    partId: 'part-004',
    category: 'Exhaust & Manifold',
    shortDesc: 'Equal-length primary tubes for optimal backpressure release.'
  },
  {
    id: 'hotspot-valve-covers',
    name: 'Forged Aluminum Valve Covers',
    x: 62,
    y: 45,
    partId: 'part-005',
    category: 'Engine Block & Internals',
    shortDesc: 'Finned aluminum covers with oil breather caps.'
  }
];

export const SPARE_PARTS = [
  {
    id: 'part-001',
    title: 'Dual Holley 4-Barrel Carburetor Assembly (428 Cobra Jet V8)',
    oemNumber: 'C8OF-9510-AA / List-4279',
    carModelId: 'cobra-jet-428',
    carModelName: '428 Cobra Jet 7.0L V8',
    engineType: '7.0L V8 Cobra Jet',
    category: 'Fuel & Carburetion',
    era: '1960s',
    price: 3450,
    rating: 4.9,
    reviewsCount: 14,
    condition: 'NOS (New Old Stock)',
    rarityScore: 'Extremely Rare (98/100)',
    stock: 2,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    castingCode: 'C8OF-9510-AA',
    provenance: 'Acquired from private collector inventory. Factory vacuum sealed in original blue box.',
    specifications: [
      { key: 'Choke Type', value: 'Manual Dual Choke' },
      { key: 'Air Flow Rate', value: '600 CFM Per Unit' },
      { key: 'Material', value: 'Die-Cast Zinc Alloy / Brass Jets' },
      { key: 'Mounting Flange', value: 'Square Bore 4-Bolt' },
      { key: 'Weight', value: '14.2 lbs (6.4 kg)' }
    ],
    compatibleVehicles: [
      '428 Cobra Jet 7.0L V8',
      '427 High-Performance V8',
      '390 FE Big Block V8'
    ]
  },
  {
    id: 'part-002',
    title: 'Dual-Port Aluminum Cylinder Head Set (1600cc Air-Cooled)',
    oemNumber: 'VW-113-101-065',
    carModelId: 'vw-1600-flat4',
    carModelName: '1600cc Dual-Port Flat-4',
    engineType: '1600cc Dual-Port Flat-4',
    category: 'Engine Block & Internals',
    era: '1960s',
    price: 850,
    rating: 4.9,
    reviewsCount: 19,
    condition: 'NOS (New Old Stock)',
    rarityScore: 'Rare (88/100)',
    stock: 4,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    castingCode: 'VW-113-101-065-C',
    provenance: 'Matched pair of NOS dual-port cylinder heads with stainless valves and hardened seats.',
    specifications: [
      { key: 'Intake Valve Dia.', value: '35.5 mm' },
      { key: 'Exhaust Valve Dia.', value: '32.0 mm' },
      { key: 'Chamber Volume', value: '52.0 cc' },
      { key: 'Material', value: 'High-Density Aluminum Alloy' }
    ],
    compatibleVehicles: [
      '1600cc Dual-Port Flat-4 Engine',
      '1500cc Single-Port Flat-4 Engine',
      '1300cc Flat-4 Engine'
    ]
  },
  {
    id: 'part-003',
    title: 'Solex 34 PICT-3 Carburetor (1600cc Air-Cooled)',
    oemNumber: '113-129-031-K',
    carModelId: 'vw-1600-flat4',
    carModelName: '1600cc Dual-Port Flat-4',
    engineType: '1600cc Dual-Port Flat-4',
    category: 'Fuel & Carburetion',
    era: '1970s',
    price: 340,
    rating: 4.8,
    reviewsCount: 31,
    condition: 'Factory Restored',
    rarityScore: 'Uncommon (76/100)',
    stock: 6,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
    castingCode: 'SOLEX-34-PICT3',
    provenance: 'Ultrasonically cleaned and rebuilt with ethanol-resistant brass floats and viton needle valves.',
    specifications: [
      { key: 'Choke Type', value: '12V Electric Auto Choke' },
      { key: 'Main Jet', value: '127.5 Air Correction 65Z' },
      { key: 'Flange Pattern', value: 'Single-Barrel 2-Bolt' }
    ],
    compatibleVehicles: [
      '1600cc Dual-Port Flat-4 Engine',
      '1600cc Single-Port Flat-4 Engine'
    ]
  },
  {
    id: 'part-004',
    title: 'Mahle 85.5mm Forged Piston & Cylinder Kit',
    oemNumber: 'MAHLE-311-198-069',
    carModelId: 'vw-1600-flat4',
    carModelName: '1600cc Dual-Port Flat-4',
    engineType: '1600cc Dual-Port Flat-4',
    category: 'Engine Block & Internals',
    era: '1960s',
    price: 620,
    rating: 5.0,
    reviewsCount: 15,
    condition: 'NOS (New Old Stock)',
    rarityScore: 'Rare (92/100)',
    stock: 3,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    castingCode: 'MAHLE-85.5MM',
    provenance: 'Original Mahle Stuttgart forged aluminum pistons with cast iron cylinders and wrist pins.',
    specifications: [
      { key: 'Bore Diameter', value: '85.5 mm Standard' },
      { key: 'Stroke Displacement', value: '69 mm (1584cc)' },
      { key: 'Compression Ratio', value: '7.5:1' }
    ],
    compatibleVehicles: [
      '1600cc Dual-Port Flat-4 Engine',
      '1600cc Single-Port Flat-4 Engine'
    ]
  },
  {
    id: 'part-005',
    title: 'Bosch Mechanical Fuel Injection Pump (M198 Inline-6)',
    oemNumber: 'PES-6KL-70/300-R11',
    carModelId: 'm198-inline6',
    carModelName: '3.0L Inline-6 M198',
    engineType: '3.0L Inline-6 M198',
    category: 'Fuel & Carburetion',
    era: '1950s',
    price: 8900,
    rating: 5.0,
    reviewsCount: 6,
    condition: 'Factory Restored',
    rarityScore: 'Ultra Museum Grade (99/100)',
    stock: 1,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    castingCode: 'PES6KL70-R11',
    provenance: 'Precision calibrated on Bosch bench with certified flow test results included.',
    specifications: [
      { key: 'Plunger Diameter', value: '7.0 mm Micro-ground' },
      { key: 'Operating Pressure', value: '45 Bar Injection' },
      { key: 'Lubrication', value: 'Engine Oil Circuit Fed' }
    ],
    compatibleVehicles: [
      '3.0L M198 Mechanical Injection Inline-6',
      '3.0L M198 II Inline-6'
    ]
  },
  {
    id: 'part-006',
    title: 'Air-Cooled Magnesium Crankcase (2.2L Flat-6 M901)',
    oemNumber: '901.101.101.2R',
    carModelId: 'm901-flat6',
    carModelName: '2.2L Air-Cooled Flat-6 (M901)',
    engineType: '2.2L Air-Cooled Flat-6',
    category: 'Engine Block & Internals',
    era: '1970s',
    price: 5400,
    rating: 4.8,
    reviewsCount: 5,
    condition: 'Factory Restored',
    rarityScore: 'Very Rare (91/100)',
    stock: 2,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    castingCode: '901.101.101.2R',
    provenance: 'Inspected with Magnaflux non-destructive crack detection, line-bored to std specifications.',
    specifications: [
      { key: 'Material', value: 'Electron Magnesium Alloy' },
      { key: 'Bore Size', value: '84.0 mm Standard' }
    ],
    compatibleVehicles: [
      '2.2L Air-Cooled Flat-6 Engine',
      '2.4L Air-Cooled Flat-6 Engine'
    ]
  },
  {
    id: 'part-007',
    title: 'Dual Weber 40 IDF Carburetor Kit with Intake Manifolds',
    oemNumber: 'WEBER-40-IDF-PAIR',
    carModelId: 'vw-2000-flat4',
    carModelName: '2.0L Type 4 Flat-4',
    engineType: '2.0L Type 4 Flat-4',
    category: 'Fuel & Carburetion',
    era: '1970s',
    price: 1450,
    rating: 4.9,
    reviewsCount: 27,
    condition: 'NOS (New Old Stock)',
    rarityScore: 'Rare (89/100)',
    stock: 3,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    castingCode: 'WEBER-40-IDF-ITALY',
    provenance: 'Original Italian-made Weber 40 IDF carburetors complete with hex-bar throttle linkage.',
    specifications: [
      { key: 'Venturi Size', value: '28 mm Main Venturi' },
      { key: 'Main Jet', value: '115 Main / 200 Air Corrector' },
      { key: 'Idle Jet', value: '52 Idle Jet' }
    ],
    compatibleVehicles: [
      '2.0L Type 4 Air-Cooled Flat-4 Engine',
      '1.8L Type 4 Air-Cooled Flat-4 Engine',
      '1.7L Type 4 Air-Cooled Flat-4 Engine'
    ]
  }
];

export const YOUTUBE_SHOWCASE = [
  {
    id: 'dyno-run-v8',
    title: '428 Cobra Jet V8 Engine Dyno Test & Throttle Sound',
    description: 'Listen to the raw roaring sound of a fully restored 7.0L V8 Cobra Jet engine on the dyno producing 435 HP.',
    youtubeId: '3G8mS7wE0bM',
    duration: '04:12',
    category: 'Dyno & Sound Test',
    thumbnail: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'flat4-rebuild',
    title: '1600cc Dual-Port Air-Cooled Flat-4 Engine Rebuild',
    description: 'Complete step-by-step assembly of an air-cooled flat-four engine block, dual-port heads, and Solex carburetion.',
    youtubeId: 'dDk5_Erh0mY',
    duration: '08:45',
    category: 'Engine Assembly Workshop',
    thumbnail: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'flat6-unboxing',
    title: 'M901 2.2L Flat-6 Magnesium Crankcase & Calibration',
    description: 'Detailed inspection of electron magnesium crankcases, oil galleries, and precision line-boring.',
    youtubeId: 'L_LUpnjgPso',
    duration: '06:30',
    category: 'Engine Inspection & Testing',
    thumbnail: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'
  }
];
