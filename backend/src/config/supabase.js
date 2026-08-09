import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { SPARE_PARTS as INITIAL_PARTS, VINTAGE_CARS as INITIAL_CARS, ORDERS as INITIAL_ORDERS } from '../data/db.js';

dotenv.config();

const supabaseUrl = (process.env.SUPABASE_URL || '').trim();
const supabaseKey = (process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseKey && 
  !supabaseUrl.includes('your-supabase-url')
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

if (isSupabaseConfigured) {
  console.log('✅ Connected to Supabase Cloud Database:', supabaseUrl);
} else {
  console.log('⚠️ Supabase credentials not found in .env — using local memory storage with seed data.');
}

// In-Memory fallback store if Supabase is not configured yet
let memoryParts = [...INITIAL_PARTS];
let memoryCars = [...INITIAL_CARS];
let memoryOrders = [...INITIAL_ORDERS];
let memoryUsers = [];

// Helper Data Mappers for SQL snake_case <-> Frontend camelCase
export function mapPartFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    oemNumber: row.oem_number || row.oemNumber || '',
    carModelId: row.car_model_id || row.carModelId || '',
    carModelName: row.car_model_name || row.carModelName || '',
    engineType: row.engine_type || row.engineType || '',
    category: row.category || '',
    era: row.era || '',
    price: parseFloat(row.price) || 0,
    rating: parseFloat(row.rating) || 5.0,
    reviewsCount: parseInt(row.reviews_count ?? row.reviewsCount, 10) || 1,
    condition: row.condition || 'NOS (New Old Stock)',
    rarityScore: row.rarity_score || row.rarityScore || 'Rare (85/100)',
    stock: parseInt(row.stock, 10) || 0,
    inStock: Boolean(row.in_stock ?? row.inStock ?? true),
    image: row.image || '',
    castingCode: row.casting_code || row.castingCode || '',
    provenance: row.provenance || '',
    specifications: Array.isArray(row.specifications) ? row.specifications : (typeof row.specifications === 'string' ? JSON.parse(row.specifications) : []),
    compatibleVehicles: Array.isArray(row.compatible_vehicles) ? row.compatible_vehicles : (Array.isArray(row.compatibleVehicles) ? row.compatibleVehicles : []),
    created_at: row.created_at || new Date().toISOString()
  };
}

export function mapPartToDb(part) {
  return {
    id: part.id,
    title: part.title,
    oem_number: part.oemNumber || part.oem_number || '',
    car_model_id: part.carModelId || part.car_model_id || '',
    car_model_name: part.carModelName || part.car_model_name || '',
    engine_type: part.engineType || part.engine_type || '',
    category: part.category || '',
    era: part.era || '',
    price: parseFloat(part.price) || 0,
    rating: parseFloat(part.rating) || 5.0,
    reviews_count: parseInt(part.reviewsCount ?? part.reviews_count, 10) || 1,
    condition: part.condition || 'NOS (New Old Stock)',
    rarity_score: part.rarityScore || part.rarity_score || 'Rare (85/100)',
    stock: parseInt(part.stock, 10) || 1,
    in_stock: Boolean(part.inStock ?? part.in_stock ?? true),
    image: part.image || '',
    casting_code: part.castingCode || part.casting_code || '',
    provenance: part.provenance || '',
    specifications: part.specifications || [],
    compatible_vehicles: part.compatibleVehicles || part.compatible_vehicles || []
  };
}

export function mapCarFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    make: row.make || '',
    model: row.model || '',
    era: row.era || '',
    yearRange: row.year_range || row.yearRange || '',
    engineName: row.engine_name || row.engineName || '',
    engineType: row.engine_type || row.engineType || '',
    carImage: row.car_image || row.carImage || row.image || '',
    engineImage: row.engine_image || row.engineImage || '',
    horsepower: row.horsepower || '',
    torque: row.torque || '',
    description: row.description || '',
    created_at: row.created_at || new Date().toISOString()
  };
}

export function mapCarToDb(car) {
  return {
    id: car.id,
    name: car.name,
    make: car.make || '',
    model: car.model || car.name || '',
    era: car.era || '',
    year_range: car.yearRange || car.year_range || '',
    engine_name: car.engineName || car.engine_name || '',
    engine_type: car.engineType || car.engine_type || '',
    car_image: car.carImage || car.car_image || car.image || '',
    engine_image: car.engineImage || car.engine_image || car.carImage || '',
    horsepower: car.horsepower || '',
    torque: car.torque || '',
    description: car.description || ''
  };
}

export function mapOrderFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id || row.userId || '',
    userName: row.user_name || row.userName || '',
    userEmail: row.user_email || row.userEmail || '',
    items: Array.isArray(row.items) ? row.items : (typeof row.items === 'string' ? JSON.parse(row.items) : []),
    totalAmount: parseFloat(row.total_amount ?? row.totalAmount) || 0,
    shippingAddress: row.shipping_address || row.shippingAddress || '',
    status: row.status || 'CONFIRMED',
    createdAt: row.created_at || row.createdAt || new Date().toISOString()
  };
}

export function mapOrderToDb(order) {
  return {
    id: order.id,
    user_id: order.userId || order.user_id || '',
    user_name: order.userName || order.user_name || '',
    user_email: order.userEmail || order.user_email || '',
    items: order.items || [],
    total_amount: parseFloat(order.totalAmount || order.total_amount) || 0,
    shipping_address: order.shippingAddress || order.shipping_address || '',
    status: order.status || 'CONFIRMED'
  };
}

export function mapUserFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash || row.passwordHash || '',
    role: row.role || 'USER',
    phone: row.phone || '',
    city: row.city || '',
    createdAt: row.created_at || row.createdAt || new Date().toISOString()
  };
}

export function mapUserToDb(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password_hash: user.passwordHash || user.password_hash || '',
    role: user.role || 'USER',
    phone: user.phone || '',
    city: user.city || ''
  };
}

/**
 * DB Data Access Abstraction Layer
 */
export const dbService = {
  // --- SPARE PARTS ---
  async getParts() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('spare_parts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []).map(mapPartFromDb);
    }
    return memoryParts;
  },

  async addPart(partData) {
    const rawPart = {
      id: partData.id || `part-${Date.now()}`,
      title: partData.title || 'Untitled Part',
      sku: partData.sku || partData.oemNumber || '',
      oemNumber: partData.oemNumber || partData.sku || 'NOS-GENUINE',
      listingType: partData.listingType || 'spare-part',
      vehicleCategory: partData.vehicleCategory || 'type-1',
      modelYearRange: partData.modelYearRange || 'Beetle 1968–1979',
      carModelId: partData.carModelId || partData.vehicleCategory || 'vw-beetle-1600',
      carModelName: partData.carModelName || partData.modelYearRange || 'VW Beetle',
      systemCategory: partData.systemCategory || partData.mainSystem || partData.partSystem || 'engine-system',
      partSystem: partData.partSystem || partData.mainSystem || 'engine-system',
      subcatId: partData.subcatId || partData.subcategory || partData.partSubcategory || 'Cylinder Heads',
      partSubcategory: partData.partSubcategory || partData.subcategory || 'Cylinder Heads',
      specificPartCategory: partData.specificPartCategory || partData.subcategory || 'Cylinder Heads',
      engineType: partData.engineType || partData.engineSize || '1600cc Air-Cooled',
      engineSize: partData.engineSize || '1600cc',
      performanceType: partData.performanceType || 'Stock',
      category: partData.category || partData.systemCategory || 'Engine Parts',
      era: partData.era || partData.modelYearRange || '1960s',
      price: parseFloat(partData.price) || 0,
      wholesalePrice: parseFloat(partData.wholesalePrice) || 0,
      rating: 5.0,
      reviewsCount: 1,
      condition: partData.condition || 'New',
      status: partData.status || 'Available',
      rarityScore: partData.rarityScore || 'Rare (85/100)',
      stock: parseInt(partData.stock, 10) || 1,
      inStock: (parseInt(partData.stock, 10) || 1) > 0,
      storageLocation: partData.storageLocation || '',
      compatibleEngineSizes: Array.isArray(partData.compatibleEngineSizes) ? partData.compatibleEngineSizes : [],
      compatibleModels: Array.isArray(partData.compatibleModels) ? partData.compatibleModels : [],
      image: partData.image || 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      additionalImages: Array.isArray(partData.additionalImages) ? partData.additionalImages : [],
      videoUrl: partData.videoUrl || '',
      castingCode: partData.castingCode || partData.sku || 'GEN-CASTING',
      provenance: partData.description || 'Verified by VW Specialist Mechanics.',
      description: partData.description || '',
      specifications: partData.specifications || [
        { key: 'Material', value: partData.material || 'Aluminum Alloy' },
        { key: 'Weight', value: partData.weight || 'N/A' },
        { key: 'Dimensions', value: partData.dimensions || 'N/A' },
        { key: 'Finish', value: partData.finish || 'Standard' }
      ],
      compatibleVehicles: partData.compatibleModels && partData.compatibleModels.length > 0 
        ? partData.compatibleModels 
        : [partData.modelYearRange || 'VW Beetle'],
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      const dbRow = mapPartToDb(rawPart);
      const { data, error } = await supabase.from('spare_parts').insert([dbRow]).select();
      if (error) throw error;
      return mapPartFromDb(data[0]);
    }

    memoryParts.unshift(rawPart);
    return rawPart;
  },

  async updatePart(id, updates) {
    if (isSupabaseConfigured) {
      const dbRow = mapPartToDb({ ...updates, id });
      const { data, error } = await supabase.from('spare_parts').update(dbRow).eq('id', id).select();
      if (error) throw error;
      return mapPartFromDb(data[0]);
    }

    const index = memoryParts.findIndex(p => p.id === id);
    if (index !== -1) {
      memoryParts[index] = { ...memoryParts[index], ...updates };
      return memoryParts[index];
    }
    return null;
  },

  async deletePart(id) {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('spare_parts').delete().eq('id', id);
      if (error) throw error;
      return true;
    }

    memoryParts = memoryParts.filter(p => p.id !== id);
    return true;
  },

  // --- VINTAGE CARS ---
  async getCars() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('vintage_cars').select('*');
      if (error) throw error;
      return (data || []).map(mapCarFromDb);
    }
    return memoryCars;
  },

  async addCar(carData) {
    const rawCar = {
      id: `car-${Date.now()}`,
      name: carData.name,
      make: carData.make || 'Classic Make',
      model: carData.model || carData.name,
      era: carData.era || '1960s',
      yearRange: carData.yearRange || '1960-1970',
      engineName: carData.engineName || 'V8 Engine',
      engineType: carData.engineType || 'Aircooled / V8',
      carImage: carData.carImage || carData.image || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
      engineImage: carData.engineImage || carData.carImage || carData.image,
      horsepower: carData.horsepower || '300 HP',
      torque: carData.torque || '350 lb-ft',
      description: carData.description || 'Vintage automobile architecture.'
    };

    if (isSupabaseConfigured) {
      const dbRow = mapCarToDb(rawCar);
      const { data, error } = await supabase.from('vintage_cars').insert([dbRow]).select();
      if (error) throw error;
      return mapCarFromDb(data[0]);
    }

    memoryCars.push(rawCar);
    return rawCar;
  },

  async deleteCar(id) {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('vintage_cars').delete().eq('id', id);
      if (error) throw error;
      return true;
    }

    memoryCars = memoryCars.filter(c => c.id !== id);
    return true;
  },

  // --- ORDERS ---
  async getOrders(userId) {
    if (isSupabaseConfigured) {
      let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (userId) query = query.eq('user_id', userId);
      const { data, error } = await query;
      if (error) throw error;
      return (data || []).map(mapOrderFromDb);
    }
    return userId ? memoryOrders.filter(o => o.userId === userId) : memoryOrders;
  },

  async addOrder(orderData) {
    if (isSupabaseConfigured) {
      const dbRow = mapOrderToDb(orderData);
      const { data, error } = await supabase.from('orders').insert([dbRow]).select();
      if (error) throw error;
      return mapOrderFromDb(data[0]);
    }

    memoryOrders.unshift(orderData);
    return orderData;
  },

  // --- USERS ---
  async getUserByEmail(email) {
    if (!email) return null;
    const cleanEmail = email.trim().toLowerCase();
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('users').select('*').eq('email', cleanEmail).maybeSingle();
        if (!error && data) return mapUserFromDb(data);
      } catch (err) {
        console.warn('Supabase users query fallback to memory store:', err.message);
      }
    }
    const match = memoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
    return match ? mapUserFromDb(match) : null;
  },

  async getUserById(id) {
    if (!id) return null;
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();
        if (!error && data) return mapUserFromDb(data);
      } catch (err) {
        console.warn('Supabase users query fallback to memory store:', err.message);
      }
    }
    const match = memoryUsers.find(u => u.id === id);
    return match ? mapUserFromDb(match) : null;
  },

  async createUser(userData) {
    const rawUser = {
      id: userData.id || `user-${Date.now()}`,
      name: userData.name || 'Vintage Collector',
      email: userData.email.trim().toLowerCase(),
      password_hash: userData.passwordHash || userData.password_hash || '',
      role: userData.role || 'USER',
      phone: userData.phone || '',
      city: userData.city || '',
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      try {
        const dbRow = mapUserToDb(rawUser);
        const { data, error } = await supabase.from('users').insert([dbRow]).select();
        if (!error && data && data[0]) return mapUserFromDb(data[0]);
      } catch (err) {
        console.warn('Supabase users insert fallback to memory store:', err.message);
      }
    }

    memoryUsers.push(rawUser);
    return mapUserFromDb(rawUser);
  }
};
