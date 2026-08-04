// Vintage Car Models & Engines Mock Database

export const VINTAGE_CARS = [
  {
    id: 'shelby-gt500-1967',
    name: '1967 Ford Mustang Shelby GT500',
    era: '1960s',
    make: 'Ford / Shelby',
    engineName: '7.0L V8 Cobra Jet (428 cu in)',
    engineType: 'V8 Big Block',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    horsepower: '355 HP @ 5400 RPM',
    torque: '420 lb-ft @ 3200 RPM',
    description: 'The pinnacle of American muscle engineering with high-rise aluminum intake manifolds and twin Holley 4-barrel carburetors.'
  },
  {
    id: 'mercedes-300sl-1954',
    name: '1954 Mercedes-Benz 300SL Gullwing',
    era: '1950s',
    make: 'Mercedes-Benz',
    engineName: '3.0L Inline-6 M198 Direct Injection',
    engineType: 'Inline-6 Dry Sump',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    horsepower: '240 HP @ 6100 RPM',
    torque: '217 lb-ft @ 4800 RPM',
    description: 'Pioneered mechanical direct fuel injection on a production car with tubular spaceframe chassis compatibility.'
  },
  {
    id: 'jaguar-etype-1961',
    name: '1961 Jaguar E-Type Series 1 3.8',
    era: '1960s',
    make: 'Jaguar',
    engineName: '3.8L XK Inline-6 Twin-Cam',
    engineType: 'DOHC Inline-6',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    horsepower: '265 HP @ 5500 RPM',
    torque: '260 lb-ft @ 4000 RPM',
    description: 'Hemispherical aluminum cylinder head with triple SU HD8 carburetors and dual overhead camshafts.'
  },
  {
    id: 'corvette-stingray-1963',
    name: '1963 Chevrolet Corvette Stingray Split-Window',
    era: '1960s',
    make: 'Chevrolet',
    engineName: '5.4L L84 327 cu in V8 Fuelie',
    engineType: 'Small Block V8',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    horsepower: '360 HP @ 6000 RPM',
    torque: '352 lb-ft @ 4000 RPM',
    description: 'Iconic Rochester mechanical fuel injection small block V8 with high-compression domed pistons.'
  },
  {
    id: 'porsche-911s-1970',
    name: '1970 Porsche 911 S 2.2L Coupe',
    era: '1970s',
    make: 'Porsche',
    engineName: '2.2L Air-Cooled Flat-6 (M901)',
    engineType: 'Air-Cooled Boxer-6',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    horsepower: '180 HP @ 6500 RPM',
    torque: '147 lb-ft @ 5200 RPM',
    description: 'Bosch mechanical fuel injection with dry-sump lubrication and magnesium alloy crankcase.'
  }
];

export const ENGINE_HOTSPOTS = [
  {
    id: 'hotspot-carb',
    name: 'Dual Holley 4-Barrel Carburetors',
    x: 50,
    y: 28,
    partId: 'part-001',
    category: 'Fuel & Carburetion',
    shortDesc: 'Matched pair 600 CFM vacuum secondary carbs for Cobra Jet V8.'
  },
  {
    id: 'hotspot-intake',
    name: 'Cobra Jet High-Rise Aluminum Intake Manifold',
    x: 48,
    y: 38,
    partId: 'part-002',
    category: 'Engine Block & Internals',
    shortDesc: 'Cast C8OE-9425-K dual-plane performance manifold.'
  },
  {
    id: 'hotspot-distributor',
    name: 'Autolite Dual-Point Mechanical Distributor',
    x: 68,
    y: 32,
    partId: 'part-003',
    category: 'Ignition & Electrical',
    shortDesc: 'Original vacuum advance distributor with phenolic rotor.'
  },
  {
    id: 'hotspot-headers',
    name: 'Tubular Steel Exhaust Headers (Chrome Finish)',
    x: 28,
    y: 52,
    partId: 'part-004',
    category: 'Exhaust & Manifold',
    shortDesc: 'Equal-length primary tubes for optimal backpressure release.'
  },
  {
    id: 'hotspot-valve-covers',
    name: 'Forged Cobra Le Mans Aluminum Valve Covers',
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
    title: 'Dual Holley 4-Barrel Carburetor Assembly (428 Cobra Jet)',
    oemNumber: 'C8OF-9510-AA / List-4279',
    carModelId: 'shelby-gt500-1967',
    carModelName: '1967 Ford Mustang Shelby GT500',
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
    provenance: 'Acquired from private collector inventory in Dearborn, MI. Factory vacuum sealed in original Ford blue box.',
    specifications: [
      { key: 'Choke Type', value: 'Manual Dual Choke' },
      { key: 'Air Flow Rate', value: '600 CFM Per Unit' },
      { key: 'Material', value: 'Die-Cast Zinc Alloy / Brass Jets' },
      { key: 'Mounting Flange', value: 'Square Bore 4-Bolt' },
      { key: 'Weight', value: '14.2 lbs (6.4 kg)' }
    ],
    compatibleVehicles: [
      '1967 Ford Mustang Shelby GT500 (428 V8)',
      '1968 Ford Fairlane Cobra Jet 428',
      '1968 Mercury Cougar XR7-G 428'
    ]
  },
  {
    id: 'part-002',
    title: 'Cobra Jet High-Rise Aluminum Intake Manifold',
    oemNumber: 'C8OE-9425-K',
    carModelId: 'shelby-gt500-1967',
    carModelName: '1967 Ford Mustang Shelby GT500',
    engineType: '7.0L V8 Cobra Jet',
    category: 'Engine Block & Internals',
    era: '1960s',
    price: 2150,
    rating: 4.8,
    reviewsCount: 9,
    condition: 'Factory Restored',
    rarityScore: 'Rare (85/100)',
    stock: 3,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
    castingCode: 'C8OE-9425-K',
    provenance: 'Ultrasonically cleaned, pressure tested to 45 PSI, and vapor blasted to original factory matte aluminum finish.',
    specifications: [
      { key: 'Configuration', value: 'Dual-Plane High Rise' },
      { key: 'Carburetor Fitment', value: 'Dual 4-Barrel Square Flange' },
      { key: 'Material', value: 'A356 T6 Aircraft Grade Aluminum' },
      { key: 'Port Size', value: '2.10" x 1.34" Oval Intake Ports' }
    ],
    compatibleVehicles: [
      '1967-1969 Shelby GT500 428 V8',
      '1968 Ford Mustang GT 428 Cobra Jet'
    ]
  },
  {
    id: 'part-003',
    title: 'Autolite Dual-Point Mechanical Distributor Assembly',
    oemNumber: 'C7OF-12127-D',
    carModelId: 'shelby-gt500-1967',
    carModelName: '1967 Ford Mustang Shelby GT500',
    engineType: '7.0L V8 Cobra Jet',
    category: 'Ignition & Electrical',
    era: '1960s',
    price: 980,
    rating: 4.7,
    reviewsCount: 22,
    condition: 'NOS (New Old Stock)',
    rarityScore: 'Uncommon (72/100)',
    stock: 5,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    castingCode: 'C7OF-12127-D',
    provenance: 'Unused vintage stock with original copper contacts and phenolic rotor button intact.',
    specifications: [
      { key: 'Advance Mechanism', value: 'Centrifugal Mechanical & Vacuum' },
      { key: 'Contact Points', value: 'Tungsten Dual Points' },
      { key: 'Housing Material', value: 'Cast Iron with Phenolic Cap' }
    ],
    compatibleVehicles: [
      '1967 Shelby GT500 428 V8',
      '1967 Ford Galaxie 500 427 V8'
    ]
  },
  {
    id: 'part-004',
    title: 'Bosch Mechanical Direct Fuel Injection Pump (M198)',
    oemNumber: 'PES-6KL-70/300-R11',
    carModelId: 'mercedes-300sl-1954',
    carModelName: '1954 Mercedes-Benz 300SL Gullwing',
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
    provenance: 'Precision calibrated on Bosch bench in Stuttgart, Germany with certified flow test results included.',
    specifications: [
      { key: 'Plunger Diameter', value: '7.0 mm Micro-ground' },
      { key: 'Operating Pressure', value: '45 Bar Injection' },
      { key: 'Lubrication', value: 'Engine Oil Circuit Fed' }
    ],
    compatibleVehicles: [
      '1954-1957 Mercedes-Benz 300SL Gullwing W198',
      '1957-1963 Mercedes-Benz 300SL Roadster W198 II'
    ]
  },
  {
    id: 'part-005',
    title: 'Jaguar XK Triple SU HD8 Carburetor Setup on Intake',
    oemNumber: 'AUC-9488-TRIPLE',
    carModelId: 'jaguar-etype-1961',
    carModelName: '1961 Jaguar E-Type Series 1 3.8',
    engineType: '3.8L XK Inline-6 Twin-Cam',
    category: 'Fuel & Carburetion',
    era: '1960s',
    price: 4200,
    rating: 4.9,
    reviewsCount: 11,
    condition: 'NOS (New Old Stock)',
    rarityScore: 'Extremely Rare (94/100)',
    stock: 2,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    castingCode: 'SU-HD8-2INCH',
    provenance: 'Matched trio of 2-inch SU HD8 carbs mounted on factory polished intake manifold with throttle linkages.',
    specifications: [
      { key: 'Throat Diameter', value: '2.00 Inches (50.8 mm)' },
      { key: 'Needle Code', value: 'UM Constant Vacuum' },
      { key: 'Damper Cap', value: 'Brass Knurled Tops' }
    ],
    compatibleVehicles: [
      '1961-1964 Jaguar E-Type Series 1 3.8L',
      '1964-1967 Jaguar E-Type Series 1 4.2L',
      '1960 Jaguar MK II 3.8 Sports Saloon'
    ]
  },
  {
    id: 'part-006',
    title: 'Rochester Mechanical Fuel Injection Unit (327 V8 Fuelie)',
    oemNumber: '7017375-RAMJET',
    carModelId: 'corvette-stingray-1963',
    carModelName: '1963 Chevrolet Corvette Stingray',
    engineType: '5.4L L84 327 cu in V8',
    category: 'Fuel & Carburetion',
    era: '1960s',
    price: 6800,
    rating: 4.9,
    reviewsCount: 8,
    condition: 'Original Vintage Grade A',
    rarityScore: 'Museum Grade (96/100)',
    stock: 1,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    castingCode: '7017375',
    provenance: 'Original matching number plenum and air meter from low-mileage 1963 Split-Window coupe barn find.',
    specifications: [
      { key: 'Plenum Type', value: 'Cast Aluminum Ramjet' },
      { key: 'Fuel Drive', value: 'Cable-Driven High Pressure Pump' }
    ],
    compatibleVehicles: [
      '1963-1965 Chevrolet Corvette Stingray 327 Fuelie'
    ]
  },
  {
    id: 'part-007',
    title: 'Porsche Air-Cooled Magnesium Crankcase (2.2L Flat-6)',
    oemNumber: '901.101.101.2R',
    carModelId: 'porsche-911s-1970',
    carModelName: '1970 Porsche 911 S 2.2L Coupe',
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
      '1970-1971 Porsche 911 S / T / E 2.2L'
    ]
  },
  {
    id: 'part-008',
    title: 'Borg-Warner T-10 4-Speed Manual Transmission',
    oemNumber: 'T10-1B-4SPEED',
    carModelId: 'shelby-gt500-1967',
    carModelName: '1967 Ford Mustang Shelby GT500',
    engineType: '7.0L V8 Cobra Jet',
    category: 'Transmission & Clutch',
    era: '1960s',
    price: 2850,
    rating: 4.7,
    reviewsCount: 16,
    condition: 'Factory Restored',
    rarityScore: 'Rare (84/100)',
    stock: 3,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
    castingCode: 'T10-1B',
    provenance: 'Fully overhauled with new brass synchronizers, heavy-duty bearings, and Hurst competition shifter linkages.',
    specifications: [
      { key: 'Gear Ratios', value: '2.20 / 1.64 / 1.31 / 1.00' },
      { key: 'Input Shaft Spline', value: '10-Spline 1-1/16 Inch' }
    ],
    compatibleVehicles: [
      '1965-1968 Ford Mustang / Shelby Cobra V8',
      '1963-1967 Chevrolet Corvette 327/427'
    ]
  }
];

export const YOUTUBE_SHOWCASE = [
  {
    id: 'dyno-run-v8',
    title: '428 Cobra Jet V8 Dyno Test & Full Throttle Sound',
    description: 'Listen to the raw roaring sound of a fully restored 1967 Shelby GT500 engine on the dyno producing 435 HP.',
    youtubeId: '3G8mS7wE0bM', // Sample YouTube video ID
    duration: '04:12',
    category: 'Dyno & Sound Test',
    thumbnail: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'carb-tuning-guide',
    title: 'Restoring Dual Holley 4-Barrel Carburetors (Step-by-Step)',
    description: 'Master master restorer walkthrough on disassembling, sonic cleaning, re-jetting, and tuning vintage carbs.',
    youtubeId: 'dDk5_Erh0mY',
    duration: '08:45',
    category: 'Restoration Workshop',
    thumbnail: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gullwing-unboxing',
    title: 'Unboxing $50,000 NOS Parts for 1954 Mercedes 300SL Gullwing',
    description: 'Inspection of direct fuel injection pumps, tubular spaceframe brackets, and rare original factory chrome.',
    youtubeId: 'L_LUpnjgPso',
    duration: '06:30',
    category: 'Unboxing & Authentication',
    thumbnail: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80'
  }
];
