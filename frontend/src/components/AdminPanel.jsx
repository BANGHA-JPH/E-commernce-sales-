import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Trash2, Edit3, ShieldAlert, Database, Layers, Car, Check, Search, 
  RefreshCw, DollarSign, Package, FileText, CheckCircle2, AlertTriangle, Eye, 
  Upload, Tag, Box, MapPin, Calendar, Cpu, Wrench, Bell, HelpCircle, User, 
  Sliders, Settings, ShoppingCart, ArrowLeft, Image as ImageIcon, Flame, Disc, Menu,
  Video, UploadCloud, Layers3, Sparkles
} from 'lucide-react';
import { SPARE_PARTS } from '../data/partsData';
import { 
  VW_NAV_CATEGORIES, 
  VEHICLE_SYSTEMS, 
  ADMIN_LISTING_TYPES,
  ADMIN_VEHICLE_CATEGORIES,
  ADMIN_SYSTEM_SUBCATEGORIES,
  ENGINE_COMPATIBILITIES 
} from '../data/vwNavigationData';

export default function AdminPanel({ 
  isOpen, 
  onClose, 
  onRefreshCatalog,
  userRequests = [],
  onUpdateUserRequestStatus,
  adminToken
}) {
  const [sidebarTab, setSidebarTab] = useState('inventory'); // 'inventory', 'orders', 'compatibility', 'settings'
  const [activeTab, setActiveTab] = useState('add-part'); // 'add-part', 'parts-list'
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [editingPartId, setEditingPartId] = useState(null);
  const [selectedCustomerReq, setSelectedCustomerReq] = useState(null);

  // 10-Section Form State
  const [formData, setFormData] = useState({
    // Section 1: Product Type
    listingType: 'spare-part', // 'spare-part' | 'engine' | 'vehicle'

    // Section 2: Vehicle Classification
    vehicleCategory: 'type-1',
    modelYearRange: 'Beetle 1968–1979',

    // Section 3: System Classification
    mainSystem: 'engine-system',
    subcategory: 'Cylinder Heads',

    // Section 4: Product Details
    partName: 'Dual Port Cylinder Head 1600cc',
    sku: '043-101-375-H',
    description: 'Factory original specification dual port cylinder head casting for Type 1 air-cooled engines.',

    // Section 5: Specifications
    material: 'Aluminum Alloy',
    weight: '4.8',
    dimensions: '32 x 24 x 18 cm',
    finish: 'Bare Aluminum',

    // Section 6: Engine-Specific (Conditional)
    engineSize: '1600cc',
    performanceType: 'Stock', // 'Stock' | 'Performance' | 'Racing'

    // Section 7: Condition & Status
    condition: 'New', // 'New' | 'Used' | 'Rebuilt / Restored'
    status: 'Available', // 'Available' | 'Sold' | 'Reserved'

    // Section 8: Pricing & Inventory
    retailPrice: '289.00',
    wholesalePrice: '210.00',
    stockQuantity: '12',
    storageLocation: 'Main Warehouse A (Bin 12-B)',

    // Section 9: Compatibility
    compatibleEngineSizes: ['1600cc', '1776cc'],
    compatibleModels: ['Beetle 1968–1979', 'Super Beetle (1302/1303)'],

    // Section 10: Media
    mediaImages: [],
    videoUrl: ''
  });

  // Dynamic Models based on Selected Vehicle Category
  const currentVehCategoryObj = ADMIN_VEHICLE_CATEGORIES.find(c => c.id === formData.vehicleCategory);
  const availableModelYearRanges = currentVehCategoryObj ? currentVehCategoryObj.models : [];

  // Dynamic Subcategories based on Main System
  const availableSubcategories = ADMIN_SYSTEM_SUBCATEGORIES[formData.mainSystem] || [];

  // Conditional logic for Engine Section 6
  const isEngineSectionVisible = formData.listingType === 'engine' || formData.mainSystem === 'engine-system';

  // Fetch admin catalog items (Merging localParts, serverParts & SPARE_PARTS with deleted filters)
  const fetchAdminData = async () => {
    setIsLoading(true);
    let serverParts = [];
    try {
      const res = await fetch('http://localhost:5000/api/admin/parts');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        serverParts = data.data;
      }
    } catch (err) {
      console.warn('Backend fetch fallback to local store');
    }

    const localParts = JSON.parse(localStorage.getItem('custom_parts') || '[]');
    const deletedIds = new Set(JSON.parse(localStorage.getItem('deleted_part_ids') || '[]'));
    const combinedMap = new Map();

    // Priority 1: Newly posted local parts
    localParts.forEach(p => {
      if (!deletedIds.has(p.id)) combinedMap.set(p.id, p);
    });
    // Priority 2: Server database parts
    serverParts.forEach(p => {
      if (!deletedIds.has(p.id) && !combinedMap.has(p.id)) combinedMap.set(p.id, p);
    });
    // Priority 3: Fallback seed catalog parts
    SPARE_PARTS.forEach(p => {
      if (!deletedIds.has(p.id) && !combinedMap.has(p.id)) combinedMap.set(p.id, p);
    });

    setParts(Array.from(combinedMap.values()));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchAdminData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Input Change Handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'vehicleCategory') {
      const categoryObj = ADMIN_VEHICLE_CATEGORIES.find(c => c.id === value);
      const firstModel = categoryObj && categoryObj.models.length > 0 ? categoryObj.models[0] : '';
      setFormData(prev => ({
        ...prev,
        vehicleCategory: value,
        modelYearRange: firstModel,
        compatibleModels: firstModel ? [firstModel] : []
      }));
    } else if (name === 'mainSystem') {
      const subcats = ADMIN_SYSTEM_SUBCATEGORIES[value] || [];
      const firstSub = subcats.length > 0 ? subcats[0] : '';
      setFormData(prev => ({
        ...prev,
        mainSystem: value,
        subcategory: firstSub
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Toggle multi-select items
  const toggleArrayItem = (fieldName, item) => {
    setFormData(prev => {
      const current = prev[fieldName] || [];
      const exists = current.includes(item);
      const updated = exists ? current.filter(i => i !== item) : [...current, item];
      return { ...prev, [fieldName]: updated };
    });
  };

  // Client-side Image Compression (Reduces 5MB photos to ~40KB WebP/JPEG)
  const compressImage = (file, callback, maxWidth = 800, quality = 0.75) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        callback(compressedDataUrl);
      };
    };
  };

  // Image Upload Handlers (Auto-Compressed)
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      compressImage(file, (compressedBase64) => {
        setFormData(prev => ({
          ...prev,
          mediaImages: [...prev.mediaImages, compressedBase64]
        }));
      });
    });
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      mediaImages: [...prev.mediaImages, imageUrlInput.trim()]
    }));
    setImageUrlInput('');
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      mediaImages: prev.mediaImages.filter((_, i) => i !== index)
    }));
  };

  // Form Reset / Discard
  const handleResetForm = () => {
    setEditingPartId(null);
    setFormData({
      listingType: 'spare-part',
      vehicleCategory: 'type-1',
      modelYearRange: 'Beetle 1968–1979',
      mainSystem: 'engine-system',
      subcategory: 'Cylinder Heads',
      partName: '',
      sku: '',
      description: '',
      material: '',
      weight: '',
      dimensions: '',
      finish: '',
      engineSize: '1600cc',
      performanceType: 'Stock',
      condition: 'New',
      status: 'Available',
      retailPrice: '',
      wholesalePrice: '',
      stockQuantity: '1',
      storageLocation: '',
      compatibleEngineSizes: ['1600cc'],
      compatibleModels: ['Beetle 1968–1979'],
      mediaImages: [],
      videoUrl: ''
    });
  };

  // Edit / Modify Part Handler
  const handleEditPart = (part) => {
    setEditingPartId(part.id);
    setFormData({
      listingType: part.listingType || 'spare-part',
      vehicleCategory: part.vehicleCategory || 'type-1',
      modelYearRange: part.modelYearRange || 'Beetle 1968–1979',
      mainSystem: part.partSystem || part.systemCategory || 'engine-system',
      subcategory: part.partSubcategory || part.subcatId || 'Cylinder Heads',
      partName: part.title || '',
      sku: part.sku || part.oemNumber || '',
      description: part.description || part.provenance || '',
      material: part.material || '',
      weight: part.weight || '',
      dimensions: part.dimensions || '',
      finish: part.finish || '',
      engineSize: part.engineSize || '1600cc',
      performanceType: part.performanceType || 'Stock',
      condition: part.condition || 'New',
      status: part.status || 'Available',
      retailPrice: part.price ? part.price.toString() : '',
      wholesalePrice: part.wholesalePrice ? part.wholesalePrice.toString() : '',
      stockQuantity: part.stock ? part.stock.toString() : '1',
      storageLocation: part.storageLocation || '',
      compatibleEngineSizes: Array.isArray(part.compatibleEngineSizes) ? part.compatibleEngineSizes : [],
      compatibleModels: Array.isArray(part.compatibleModels) ? part.compatibleModels : [],
      mediaImages: part.additionalImages && part.additionalImages.length > 0 ? part.additionalImages : (part.image ? [part.image] : []),
      videoUrl: part.videoUrl || ''
    });
    setActiveTab('add-part');
  };

  // Form Validation & Publish Submit
  const handleSaveProduct = async (saveStatus = 'Available') => {
    if (!formData.partName.trim()) {
      alert('⚠️ Required Field Missing: Please enter Part Name (Section 4).');
      return;
    }
    if (!formData.description.trim()) {
      alert('⚠️ Required Field Missing: Please enter Product Description (Section 4).');
      return;
    }
    if (!formData.retailPrice || parseFloat(formData.retailPrice) <= 0) {
      alert('⚠️ Required Field Missing: Please enter valid Retail Price (Section 8).');
      return;
    }
    if (!formData.stockQuantity) {
      alert('⚠️ Required Field Missing: Please enter Stock Quantity (Section 8).');
      return;
    }

    const targetId = editingPartId || `part-${Date.now()}`;

    const newPart = {
      id: targetId,
      title: formData.partName,
      sku: formData.sku,
      oemNumber: formData.sku,
      description: formData.description,
      listingType: formData.listingType,
      vehicleCategory: formData.vehicleCategory,
      modelYearRange: formData.modelYearRange,
      systemCategory: formData.mainSystem,
      partSystem: formData.mainSystem,
      subcatId: formData.subcategory,
      partSubcategory: formData.subcategory,
      specificPartCategory: formData.subcategory,
      material: formData.material,
      weight: formData.weight,
      dimensions: formData.dimensions,
      finish: formData.finish,
      engineSize: formData.engineSize,
      performanceType: formData.performanceType,
      condition: formData.condition,
      status: saveStatus,
      price: parseFloat(formData.retailPrice) || 0,
      wholesalePrice: parseFloat(formData.wholesalePrice) || 0,
      stock: parseInt(formData.stockQuantity) || 1,
      inStock: (parseInt(formData.stockQuantity) || 1) > 0,
      storageLocation: formData.storageLocation,
      compatibleEngineSizes: formData.compatibleEngineSizes,
      compatibleModels: formData.compatibleModels,
      image: formData.mediaImages[0] || 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      additionalImages: formData.mediaImages,
      videoUrl: formData.videoUrl,
      createdAt: new Date().toISOString()
    };

    try {
      setIsLoading(true);
      
      // Save to LocalStorage immediately for instant offline/frontend persistence
      const localParts = JSON.parse(localStorage.getItem('custom_parts') || '[]');
      const filteredLocal = localParts.filter(p => p.id !== targetId);
      localStorage.setItem('custom_parts', JSON.stringify([newPart, ...filteredLocal]));

      const method = editingPartId ? 'PUT' : 'POST';
      const apiUrl = editingPartId 
        ? `http://localhost:5000/api/admin/parts/${editingPartId}` 
        : 'http://localhost:5000/api/admin/parts';

      const headers = { 'Content-Type': 'application/json' };
      if (adminToken) {
        headers['Authorization'] = `Bearer ${adminToken}`;
      }

      const res = await fetch(apiUrl, {
        method,
        headers,
        body: JSON.stringify(newPart)
      });
      const data = await res.json();
      const actionText = editingPartId ? 'Updated' : 'Published';
      if (data.success) {
        setStatusMessage(`✅ Successfully ${actionText} "${formData.partName}" to Catalog!`);
      } else {
        setStatusMessage(`✅ ${actionText} "${formData.partName}" to Landing Page!`);
      }
    } catch (err) {
      const actionText = editingPartId ? 'Updated' : 'Published';
      setStatusMessage(`✅ ${actionText} "${formData.partName}" to Landing Page!`);
    } finally {
      setIsLoading(false);
      setEditingPartId(null);
      setTimeout(() => setStatusMessage(null), 3000);
      fetchAdminData();
      if (onRefreshCatalog) onRefreshCatalog();
      setActiveTab('parts-list');
    }
  };

  // Delete Item Handler
  const handleDeletePart = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    // Save ID to deleted_part_ids so hardcoded or server parts stay deleted
    const deletedIds = JSON.parse(localStorage.getItem('deleted_part_ids') || '[]');
    if (!deletedIds.includes(id)) {
      localStorage.setItem('deleted_part_ids', JSON.stringify([...deletedIds, id]));
    }

    // Remove from custom_parts in localStorage
    const localParts = JSON.parse(localStorage.getItem('custom_parts') || '[]');
    const updatedLocal = localParts.filter(p => p.id !== id);
    localStorage.setItem('custom_parts', JSON.stringify(updatedLocal));

    setParts(prev => prev.filter(p => p.id !== id));

    try {
      setIsLoading(true);
      const headers = {};
      if (adminToken) {
        headers['Authorization'] = `Bearer ${adminToken}`;
      }

      await fetch(`http://localhost:5000/api/admin/parts/${id}`, {
        method: 'DELETE',
        headers
      });
    } catch (err) {
      console.warn('Backend delete sync');
    } finally {
      setIsLoading(false);
      setStatusMessage(`Deleted "${title}"`);
      setTimeout(() => setStatusMessage(null), 3000);
      if (onRefreshCatalog) onRefreshCatalog();
    }
  };

  const filteredParts = parts.filter(p => 
    !searchQuery || 
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.oemNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#131314] text-white w-screen h-screen flex flex-col md:flex-row overflow-hidden font-technical-data select-none">
      
      {/* MOBILE BACKDROP OVERLAY WHEN SIDEBAR IS OPEN */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-50 h-full bg-[#141416] border-r border-[#262426] flex flex-col justify-between shrink-0 transition-all duration-300 overflow-hidden ${
        isSidebarOpen ? 'w-64 opacity-100 shadow-2xl' : 'w-0 opacity-0 p-0 border-r-0 pointer-events-none'
      }`}>
        <div className="w-64">
          {/* Logo & Header */}
          <div className="p-6 border-b border-[#262426] flex items-center justify-between">
            <div>
              <h1 className="font-h1 text-xl font-bold tracking-tight text-white flex items-center gap-2">
                VW Specialist
              </h1>
              <span className="text-[10px] text-[#ff7a1a] font-mono uppercase tracking-widest font-bold block mt-0.5">
                RESTORATION ADMIN
              </span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 text-[#a78b7d] hover:text-[#ff7a1a] transition-colors"
              title="Hide Sidebar"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-xs font-mono font-bold uppercase tracking-wider">
            <button
              onClick={() => { setSidebarTab('inventory'); setActiveTab('add-part'); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xs transition-all ${
                sidebarTab === 'inventory' 
                  ? 'bg-[#ff7a1a] text-black shadow-md' 
                  : 'text-[#a78b7d] hover:text-white hover:bg-[#1f1e20]'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>Inventory Form</span>
            </button>

            <button
              onClick={() => { setSidebarTab('orders'); setActiveTab('parts-list'); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xs transition-all ${
                sidebarTab === 'orders' 
                  ? 'bg-[#ff7a1a] text-black shadow-md' 
                  : 'text-[#a78b7d] hover:text-white hover:bg-[#1f1e20]'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Catalog Database ({parts.length})</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Buttons */}
        <div className="p-4 border-t border-[#262426] space-y-2 w-64">
          <button
            onClick={() => setActiveTab('add-part')}
            className="w-full bg-[#201f20] hover:bg-[#ff7a1a] hover:text-black border border-[#584236]/60 text-[#e0c0b1] py-2 px-3 text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>LOG NEW PART</span>
          </button>

          <button
            onClick={onClose}
            className="w-full text-left text-[11px] text-[#a78b7d] hover:text-white px-2 py-1.5 flex items-center justify-between"
          >
            <span>Exit Dashboard</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className="flex-1 flex flex-col h-full bg-[#131314] overflow-hidden relative">
        
        {/* TOP NAVBAR */}
        <header className="h-16 bg-[#181719] border-b border-[#262426] px-6 md:px-8 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(prev => !prev)}
              className="p-2 text-[#a78b7d] hover:text-[#ff7a1a] hover:bg-[#201f20] rounded-xs border border-[#584236]/40 transition-all flex items-center gap-2 group"
              title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            >
              <Menu className="w-5 h-5 text-[#ff7a1a] group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#a78b7d] group-hover:text-white hidden sm:inline">
                {isSidebarOpen ? "Hide Sidebar" : "Sidebar Menu"}
              </span>
            </button>

            <h2 className="text-xl font-bold font-h2 text-white">
              Parts Engine Admin
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => setActiveTab('requests-manage')}
              className={`text-xs px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xs font-mono font-bold transition-all border ${
                activeTab === 'requests-manage' 
                  ? 'bg-[#ff7a1a] text-black border-[#ff7a1a]' 
                  : 'bg-[#201f20] text-[#e0c0b1] border-[#584236]/40 hover:border-[#ff7a1a]'
              }`}
            >
              Requests ({userRequests.length})
            </button>
            <button 
              onClick={() => setActiveTab('parts-list')}
              className={`text-xs px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xs font-mono font-bold transition-all border ${
                activeTab === 'parts-list' 
                  ? 'bg-[#ff7a1a] text-black border-[#ff7a1a]' 
                  : 'bg-[#201f20] text-[#e0c0b1] border-[#584236]/40 hover:border-[#ff7a1a]'
              }`}
            >
              Catalog ({parts.length})
            </button>
            <button 
              onClick={() => setActiveTab('add-part')}
              className={`text-xs px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xs font-mono font-bold transition-all border ${
                activeTab === 'add-part' 
                  ? 'bg-[#ff7a1a] text-black border-[#ff7a1a]' 
                  : 'bg-[#201f20] text-[#e0c0b1] border-[#584236]/40 hover:border-[#ff7a1a]'
              }`}
            >
              + Add Item
            </button>
          </div>
        </header>

        {/* STATUS TOAST NOTIFICATION */}
        {statusMessage && (
          <div className="bg-[#ff7a1a] text-black font-bold text-xs py-2.5 px-8 text-center animate-fade-in shrink-0 z-20 shadow-lg">
            {statusMessage}
          </div>
        )}

        {/* WORKSPACE CONTENT SCROLL AREA */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 pb-24">
          
          {/* TAB 1: 10-SECTION GLASSMORPHISM ADMIN FORM */}
          {activeTab === 'add-part' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSaveProduct('Available'); }} className="max-w-5xl mx-auto space-y-6">
              
              {/* Form Title Banner */}
              <div className="bg-[#181719]/80 border border-[#584236]/40 backdrop-blur-md rounded-md p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                <div>
                  <span className="text-[10px] text-[#ff7a1a] uppercase font-bold tracking-widest font-mono block mb-1">
                    AUTOMOTIVE PARTS & VEHICLE MARKETPLACE // INVENTORY FORM
                  </span>
                  <h1 className="text-2xl font-bold font-h2 text-white">
                    Add Automotive Part / Vehicle Listing
                  </h1>
                </div>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-xs text-[#83cffb] hover:underline font-mono uppercase font-bold self-start md:self-auto"
                >
                  Reset All Fields
                </button>
              </div>

              {/* 📌 SECTION 1: PRODUCT TYPE */}
              <div className="bg-[#181719]/80 border border-[#584236]/40 backdrop-blur-md rounded-md p-6 shadow-xl space-y-4 hover:border-[#ff7a1a]/50 transition-all">
                <div className="flex items-center gap-2 border-b border-[#584236]/30 pb-3">
                  <Box className="w-5 h-5 text-[#ff7a1a]" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                    SECTION 1: PRODUCT TYPE
                  </h3>
                </div>

                <div>
                  <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold font-mono">
                    LISTING TYPE <span className="text-[#ff7a1a]">*</span>
                  </label>
                  <select
                    name="listingType"
                    value={formData.listingType}
                    onChange={handleInputChange}
                    className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs cursor-pointer font-mono"
                  >
                    {ADMIN_LISTING_TYPES.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 📌 SECTION 2: VEHICLE CLASSIFICATION */}
              <div className="bg-[#181719]/80 border border-[#584236]/40 backdrop-blur-md rounded-md p-6 shadow-xl space-y-4 hover:border-[#ff7a1a]/50 transition-all">
                <div className="flex items-center gap-2 border-b border-[#584236]/30 pb-3">
                  <Car className="w-5 h-5 text-[#ff7a1a]" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                    SECTION 2: VEHICLE CLASSIFICATION
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold font-mono">
                      VEHICLE CATEGORY <span className="text-[#ff7a1a]">*</span>
                    </label>
                    <select
                      name="vehicleCategory"
                      value={formData.vehicleCategory}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs cursor-pointer font-mono"
                    >
                      {ADMIN_VEHICLE_CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold font-mono">
                      MODEL / YEAR RANGE <span className="text-[#ff7a1a]">*</span>
                    </label>
                    <select
                      name="modelYearRange"
                      value={formData.modelYearRange}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs cursor-pointer font-mono"
                    >
                      {availableModelYearRanges.map(mod => (
                        <option key={mod} value={mod}>{mod}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 📌 SECTION 3: SYSTEM CLASSIFICATION */}
              <div className="bg-[#181719]/80 border border-[#584236]/40 backdrop-blur-md rounded-md p-6 shadow-xl space-y-4 hover:border-[#ff7a1a]/50 transition-all">
                <div className="flex items-center gap-2 border-b border-[#584236]/30 pb-3">
                  <Layers className="w-5 h-5 text-[#ff7a1a]" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                    SECTION 3: SYSTEM CLASSIFICATION
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold font-mono">
                      MAIN SYSTEM <span className="text-[#ff7a1a]">*</span>
                    </label>
                    <select
                      name="mainSystem"
                      value={formData.mainSystem}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs cursor-pointer font-mono"
                    >
                      {VEHICLE_SYSTEMS.map(sys => (
                        <option key={sys.id} value={sys.id}>{sys.emoji || '⚙️'} {sys.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold font-mono flex items-center justify-between">
                      <span>SUBCATEGORY (DYNAMIC) <span className="text-[#ff7a1a]">*</span></span>
                      <span className="text-[10px] text-[#ff7a1a] font-normal">Auto-filtered</span>
                    </label>
                    <select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs cursor-pointer font-mono"
                    >
                      {availableSubcategories.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 📌 SECTION 4: PRODUCT DETAILS */}
              <div className="bg-[#181719]/80 border border-[#584236]/40 backdrop-blur-md rounded-md p-6 shadow-xl space-y-4 hover:border-[#ff7a1a]/50 transition-all">
                <div className="flex items-center gap-2 border-b border-[#584236]/30 pb-3">
                  <FileText className="w-5 h-5 text-[#ff7a1a]" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                    SECTION 4: PRODUCT DETAILS
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold font-mono">
                      PART NAME <span className="text-[#ff7a1a]">*</span>
                    </label>
                    <input
                      type="text"
                      name="partName"
                      required
                      placeholder="e.g., Dual Port Cylinder Head 1600cc"
                      value={formData.partName}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold font-mono">
                      SKU / PART NUMBER
                    </label>
                    <input
                      type="text"
                      name="sku"
                      placeholder="e.g., 043-101-375-H"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold font-mono">
                    DESCRIPTION <span className="text-[#ff7a1a]">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    required
                    placeholder="Enter detailed technical description, casting numbers, valve specifications, and vehicle compatibility notes..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs font-mono"
                  ></textarea>
                </div>
              </div>

              {/* 📌 SECTION 5: SPECIFICATIONS */}
              <div className="bg-[#181719]/80 border border-[#584236]/40 backdrop-blur-md rounded-md p-6 shadow-xl space-y-4 hover:border-[#ff7a1a]/50 transition-all">
                <div className="flex items-center gap-2 border-b border-[#584236]/30 pb-3">
                  <Wrench className="w-5 h-5 text-[#ff7a1a]" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                    SECTION 5: SPECIFICATIONS
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono">
                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold">MATERIAL</label>
                    <input
                      type="text"
                      name="material"
                      placeholder="e.g., Aluminum Alloy"
                      value={formData.material}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold">WEIGHT (KG / LBS)</label>
                    <input
                      type="text"
                      name="weight"
                      placeholder="e.g., 4.8 kg"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold">DIMENSIONS</label>
                    <input
                      type="text"
                      name="dimensions"
                      placeholder="e.g., 32 x 24 x 18 cm"
                      value={formData.dimensions}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold">FINISH</label>
                    <input
                      type="text"
                      name="finish"
                      placeholder="e.g., Powder Coated"
                      value={formData.finish}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 📌 SECTION 6: ENGINE-SPECIFIC (CONDITIONAL) */}
              {isEngineSectionVisible && (
                <div className="bg-[#181719]/80 border border-[#ff7a1a]/60 backdrop-blur-md rounded-md p-6 shadow-xl space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 border-b border-[#ff7a1a]/30 pb-3">
                    <Cpu className="w-5 h-5 text-[#ff7a1a]" />
                    <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                      SECTION 6: ENGINE-SPECIFIC (ACTIVE)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
                    <div>
                      <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold">
                        ENGINE SIZE / DISPLACEMENT
                      </label>
                      <select
                        name="engineSize"
                        value={formData.engineSize}
                        onChange={handleInputChange}
                        className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs cursor-pointer"
                      >
                        {ENGINE_COMPATIBILITIES.map(size => (
                          <option key={size} value={size}>{size} Air-Cooled Engine</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold">
                        PERFORMANCE TYPE
                      </label>
                      <div className="flex gap-3 pt-1">
                        {['Stock', 'Performance', 'Racing'].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, performanceType: type }))}
                            className={`flex-1 py-2.5 text-xs font-bold rounded-xs border transition-all ${
                              formData.performanceType === type
                                ? 'bg-[#ff7a1a] text-black border-[#ff7a1a]'
                                : 'bg-[#131314] text-[#e0c0b1] border-[#584236]/60 hover:border-[#ff7a1a]'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 📌 SECTION 7: CONDITION & STATUS */}
              <div className="bg-[#181719]/80 border border-[#584236]/40 backdrop-blur-md rounded-md p-6 shadow-xl space-y-4 hover:border-[#ff7a1a]/50 transition-all">
                <div className="flex items-center gap-2 border-b border-[#584236]/30 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ff7a1a]" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                    SECTION 7: CONDITION & STATUS
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold">
                      CONDITION <span className="text-[#ff7a1a]">*</span>
                    </label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs cursor-pointer"
                    >
                      <option value="New">New (Factory OEM / Reproduction)</option>
                      <option value="Used">Used (Inspected Pre-owned)</option>
                      <option value="Rebuilt / Restored">Rebuilt / Restored (Bench Tested)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold">
                      AVAILABILITY STATUS <span className="text-[#ff7a1a]">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs cursor-pointer"
                    >
                      <option value="Available">Available (In Stock & Published)</option>
                      <option value="Reserved">Reserved (Draft / Hold)</option>
                      <option value="Sold">Sold (Out of Stock)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 📌 SECTION 8: PRICING & INVENTORY */}
              <div className="bg-[#181719]/80 border border-[#584236]/40 backdrop-blur-md rounded-md p-6 shadow-xl space-y-4 hover:border-[#ff7a1a]/50 transition-all">
                <div className="flex items-center gap-2 border-b border-[#584236]/30 pb-3">
                  <DollarSign className="w-5 h-5 text-[#ff7a1a]" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                    SECTION 8: PRICING & INVENTORY
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono">
                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold">
                      RETAIL PRICE ($) <span className="text-[#ff7a1a]">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="retailPrice"
                      required
                      placeholder="289.00"
                      value={formData.retailPrice}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold">WHOLESALE PRICE ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="wholesalePrice"
                      placeholder="210.00"
                      value={formData.wholesalePrice}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold">
                      STOCK QUANTITY <span className="text-[#ff7a1a]">*</span>
                    </label>
                    <input
                      type="number"
                      name="stockQuantity"
                      required
                      placeholder="12"
                      value={formData.stockQuantity}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1.5 font-bold">STORAGE LOCATION</label>
                    <input
                      type="text"
                      name="storageLocation"
                      placeholder="e.g., Main Warehouse (Shelf 12-B)"
                      value={formData.storageLocation}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-3 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 📌 SECTION 9: COMPATIBILITY */}
              <div className="bg-[#181719]/80 border border-[#584236]/40 backdrop-blur-md rounded-md p-6 shadow-xl space-y-4 hover:border-[#ff7a1a]/50 transition-all">
                <div className="flex items-center gap-2 border-b border-[#584236]/30 pb-3">
                  <Sliders className="w-5 h-5 text-[#ff7a1a]" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                    SECTION 9: COMPATIBILITY MATRIX
                  </h3>
                </div>

                <div className="space-y-4 font-mono">
                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-2 font-bold">
                      COMPATIBLE ENGINE SIZES (MULTI-SELECT)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ENGINE_COMPATIBILITIES.map(size => {
                        const isSelected = formData.compatibleEngineSizes.includes(size);
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => toggleArrayItem('compatibleEngineSizes', size)}
                            className={`text-xs px-3 py-1.5 rounded-xs font-bold border transition-all ${
                              isSelected
                                ? 'bg-[#ff7a1a] text-black border-[#ff7a1a]'
                                : 'bg-[#131314] text-[#e0c0b1] border-[#584236]/60 hover:border-[#ff7a1a]'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-2 font-bold">
                      COMPATIBLE VEHICLE MODELS ({currentVehCategoryObj?.name})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableModelYearRanges.map(mod => {
                        const isSelected = formData.compatibleModels.includes(mod);
                        return (
                          <button
                            key={mod}
                            type="button"
                            onClick={() => toggleArrayItem('compatibleModels', mod)}
                            className={`text-xs px-3 py-1.5 rounded-xs font-bold border transition-all ${
                              isSelected
                                ? 'bg-[#ff7a1a] text-black border-[#ff7a1a]'
                                : 'bg-[#131314] text-[#e0c0b1] border-[#584236]/60 hover:border-[#ff7a1a]'
                            }`}
                          >
                            {mod}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* 📌 SECTION 10: MEDIA */}
              <div className="bg-[#181719]/80 border border-[#584236]/40 backdrop-blur-md rounded-md p-6 shadow-xl space-y-4 hover:border-[#ff7a1a]/50 transition-all">
                <div className="flex items-center gap-2 border-b border-[#584236]/30 pb-3">
                  <ImageIcon className="w-5 h-5 text-[#ff7a1a]" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                    SECTION 10: MEDIA & IMAGES
                  </h3>
                </div>

                <div className="space-y-4 font-mono">
                  {/* Drag & Drop File Upload Box */}
                  <div className="border-2 border-dashed border-[#584236]/60 hover:border-[#ff7a1a] bg-[#131314] p-6 text-center rounded-xs transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <UploadCloud className="w-10 h-10 text-[#ff7a1a] mx-auto mb-2" />
                    <p className="text-xs text-[#e5e2e3] font-bold">
                      Drag & Drop Product Photos here, or <span className="text-[#ff7a1a]">Browse Files</span>
                    </p>
                    <p className="text-[10px] text-[#a78b7d] mt-1">Supports PNG, JPG, WEBP formats</p>
                  </div>

                  {/* URL Image Input Option */}
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Or paste Direct Image URL (https://...)"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="flex-1 bg-[#131314] border border-[#584236]/60 p-2.5 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="bg-[#201f20] hover:bg-[#ff7a1a] text-[#e0c0b1] hover:text-black border border-[#584236]/60 px-4 text-xs font-bold rounded-xs transition-all"
                    >
                      Add URL
                    </button>
                  </div>

                  {/* Uploaded Thumbnails Preview */}
                  {formData.mediaImages.length > 0 && (
                    <div>
                      <span className="text-xs text-[#a78b7d] uppercase block mb-2 font-bold">
                        Uploaded Photos ({formData.mediaImages.length})
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                        {formData.mediaImages.map((imgSrc, idx) => (
                          <div key={idx} className="relative group h-24 bg-black border border-[#584236]/50 rounded-xs overflow-hidden">
                            <img src={imgSrc} alt={`Upload ${idx+1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-xs opacity-80 hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Optional Video URL */}
                  <div>
                    <label className="text-xs text-[#a78b7d] uppercase block mb-1 font-bold">
                      OPTIONAL DEMO VIDEO URL
                    </label>
                    <input
                      type="url"
                      name="videoUrl"
                      placeholder="e.g., https://youtube.com/watch?v=..."
                      value={formData.videoUrl}
                      onChange={handleInputChange}
                      className="w-full bg-[#131314] border border-[#584236]/60 p-2.5 text-xs text-white focus:outline-none focus:border-[#ff7a1a] rounded-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 📌 STICKY BOTTOM ACTION BAR */}
              <div className="sticky bottom-0 bg-[#141416]/95 border-t border-[#ff7a1a]/40 p-4 rounded-t-md flex items-center justify-between gap-4 shadow-2xl backdrop-blur-xl z-30">
                <div className="text-xs font-mono text-[#a78b7d] hidden sm:block">
                  <span className="text-[#ff7a1a] font-bold">Ready:</span> {formData.partName || 'New Product Form'}
                </div>

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => handleSaveProduct('Reserved')}
                    className="border border-[#584236] hover:border-[#ff7a1a] text-[#e0c0b1] hover:text-white bg-[#201f20] px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-xs transition-all"
                  >
                    Save Draft
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveProduct('Available')}
                    disabled={isLoading}
                    className="bg-[#ff7a1a] hover:bg-[#ffb68e] text-black font-mono font-bold px-4 py-2 text-xs uppercase rounded-xs transition-all shadow-[0_0_20px_rgba(255,122,26,0.4)] glow-button flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isLoading ? 'Saving...' : editingPartId ? 'Update Item' : 'Publish Product'}</span>
                  </button>
                </div>
              </div>

            </form>
          )}

          {/* TAB: MANAGE CUSTOMER REQUESTS & RESERVATIONS */}
          {activeTab === 'requests-manage' && (
            <div className="space-y-4 font-mono max-w-5xl mx-auto">
              <div className="flex items-center justify-between border-b border-[#262426] pb-3">
                <h3 className="text-base font-bold text-[#ff7a1a] uppercase tracking-wider flex items-center gap-2">
                  <Box className="w-5 h-5" /> Customer Item Requests & Reservations ({userRequests.length})
                </h3>
                <span className="text-xs text-[#a78b7d]">Update request status live for user dashboard</span>
              </div>

              {userRequests.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-[#584236]/40 rounded-xs text-[#a78b7d] text-xs">
                  No active customer requests or reservations yet. Submissions from the storefront will appear here!
                </div>
              ) : (
                <div className="divide-y divide-[#262426] border border-[#262426] rounded-xs bg-[#141416]">
                  {userRequests.map((req) => (
                    <div 
                      key={req.id} 
                      className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#181719] transition-colors cursor-pointer group"
                      onClick={() => setSelectedCustomerReq(req)}
                    >
                      <div className="flex items-center gap-4">
                        {req.partImage ? (
                          <img src={req.partImage} alt={req.partTitle} className="w-12 h-12 object-cover rounded-xs border border-[#3a383a] shrink-0" />
                        ) : (
                          <div className="w-12 h-12 bg-[#1c1b1c] border border-[#3a383a] flex items-center justify-center text-[#ff7a1a] shrink-0">
                            <Box className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <span className="text-[10px] text-[#ff7a1a] font-bold block uppercase tracking-wider">
                            REQ #{req.id} • SKU: {req.sku || 'N/A'}
                          </span>
                          <h4 className="text-sm font-bold text-white group-hover:text-[#ff7a1a] transition-colors">{req.partTitle}</h4>
                          <span className="text-xs text-[#a78b7d] block mt-0.5">
                            Customer: <strong className="text-white">{req.userName || 'Restorer Member'}</strong> ({req.userEmail || 'N/A'}) • <strong className="text-[#ff7a1a]">${req.price}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => setSelectedCustomerReq(req)}
                          className="bg-[#201f20] hover:bg-[#ff7a1a] hover:text-black border border-[#584236]/60 text-[#e0c0b1] px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-xs transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <User className="w-3.5 h-3.5" />
                          <span>Customer Details</span>
                        </button>

                        <select
                          value={req.status || 'Pending'}
                          onChange={(e) => onUpdateUserRequestStatus && onUpdateUserRequestStatus(req.id, e.target.value)}
                          className="bg-[#1c1b1c] border border-[#ff7a1a]/60 text-xs font-bold text-[#ff7a1a] p-1.5 rounded-xs focus:outline-none"
                        >
                          <option value="Pending">Pending Review</option>
                          <option value="Approved">Approved</option>
                          <option value="Reserved">Item Reserved</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 📌 CUSTOMER REQUEST DETAILS MODAL */}
          {selectedCustomerReq && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
              <div className="bg-[#131314] border border-[#ff7a1a]/60 text-white w-full max-w-xl rounded-xs shadow-[0_0_50px_rgba(255,122,26,0.25)] overflow-hidden my-8 animate-scale-up font-technical-data">
                
                {/* Modal Header */}
                <div className="bg-[#181719] px-6 py-4 border-b border-[#262426] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#ff7a1a] text-black font-bold flex items-center justify-center text-sm shadow-md">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Customer Request Details
                      </h3>
                      <span className="text-[10px] text-[#ff7a1a] font-mono font-bold block">
                        ID: #{selectedCustomerReq.id} • Date: {selectedCustomerReq.date || 'Today'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCustomerReq(null)}
                    className="p-1.5 text-[#a78b7d] hover:text-white hover:bg-[#201f20] rounded-xs transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                  
                  {/* Customer Profile Info Card */}
                  <div className="bg-[#181719] border border-[#584236]/40 p-4 rounded-xs space-y-3">
                    <div className="text-xs font-mono font-bold text-[#ff7a1a] uppercase tracking-wider border-b border-[#262426] pb-2 flex items-center justify-between">
                      <span>Customer Contact Profile</span>
                      <span className="text-[10px] bg-[#ff7a1a]/20 text-[#ff7a1a] px-2 py-0.5 rounded-xs border border-[#ff7a1a]/40">
                        VERIFIED MEMBER
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[#a78b7d] block text-[10px] uppercase font-bold">Full Name</span>
                        <strong className="text-white text-sm block mt-0.5">{selectedCustomerReq.userName || 'Restorer Member'}</strong>
                      </div>

                      <div>
                        <span className="text-[#a78b7d] block text-[10px] uppercase font-bold">Email Address</span>
                        <a 
                          href={`mailto:${selectedCustomerReq.userEmail}`} 
                          className="text-[#ff7a1a] hover:underline text-xs block mt-0.5 font-mono font-bold truncate"
                        >
                          {selectedCustomerReq.userEmail || 'customer@vintagemotors.com'}
                        </a>
                      </div>

                      <div>
                        <span className="text-[#a78b7d] block text-[10px] uppercase font-bold">Phone Number</span>
                        <span className="text-white block mt-0.5 font-mono">{selectedCustomerReq.userPhone || '+1 (555) 019-2834'}</span>
                      </div>

                      <div>
                        <span className="text-[#a78b7d] block text-[10px] uppercase font-bold">Location / City</span>
                        <span className="text-white block mt-0.5">{selectedCustomerReq.userCity || selectedCustomerReq.shippingAddress || 'Los Angeles, CA'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Info Card */}
                  <div className="bg-[#181719] border border-[#584236]/40 p-4 rounded-xs space-y-3">
                    <div className="text-xs font-mono font-bold text-[#ff7a1a] uppercase tracking-wider border-b border-[#262426] pb-2">
                      Requested Part Details
                    </div>

                    <div className="flex items-start gap-4">
                      {selectedCustomerReq.partImage ? (
                        <img 
                          src={selectedCustomerReq.partImage} 
                          alt={selectedCustomerReq.partTitle} 
                          className="w-20 h-20 object-cover rounded-xs border border-[#3a383a] shrink-0" 
                        />
                      ) : (
                        <div className="w-20 h-20 bg-[#1c1b1c] border border-[#3a383a] flex items-center justify-center text-[#ff7a1a] shrink-0">
                          <Box className="w-8 h-8" />
                        </div>
                      )}

                      <div className="space-y-1 overflow-hidden">
                        <span className="text-[10px] text-[#ff7a1a] font-bold block uppercase">
                          SKU / OEM: {selectedCustomerReq.sku || 'N/A'}
                        </span>
                        <h4 className="text-sm font-bold text-white leading-tight">{selectedCustomerReq.partTitle}</h4>
                        <p className="text-xs text-[#a78b7d]">Compatibility: <strong className="text-white">{selectedCustomerReq.compatibility || 'VW Vintage Range'}</strong></p>
                        <div className="text-sm font-bold text-[#ff7a1a] font-mono pt-1">
                          ${selectedCustomerReq.price}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Update Control */}
                  <div className="bg-[#181719] border border-[#584236]/40 p-4 rounded-xs space-y-3">
                    <div className="text-xs font-mono font-bold text-[#ff7a1a] uppercase tracking-wider border-b border-[#262426] pb-2 flex items-center justify-between">
                      <span>Manage Request Status</span>
                      <span className="text-xs text-[#a78b7d]">Current: <strong className="text-white">{selectedCustomerReq.status || 'Pending'}</strong></span>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={selectedCustomerReq.status || 'Pending'}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          setSelectedCustomerReq(prev => ({ ...prev, status: newStatus }));
                          if (onUpdateUserRequestStatus) {
                            onUpdateUserRequestStatus(selectedCustomerReq.id, newStatus);
                          }
                        }}
                        className="flex-1 bg-[#131314] border border-[#ff7a1a]/60 text-xs font-bold text-[#ff7a1a] p-2.5 rounded-xs focus:outline-none"
                      >
                        <option value="Pending">Pending Review</option>
                        <option value="Approved">Approved</option>
                        <option value="Reserved">Item Reserved</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>

                      <a
                        href={`mailto:${selectedCustomerReq.userEmail}?subject=Update regarding your request #${selectedCustomerReq.id}`}
                        className="bg-[#201f20] hover:bg-[#ff7a1a] hover:text-black border border-[#584236]/60 text-[#e0c0b1] px-4 py-2.5 text-xs font-mono font-bold uppercase rounded-xs transition-all flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Email Customer</span>
                      </a>
                    </div>
                  </div>

                </div>

                {/* Modal Footer */}
                <div className="bg-[#181719] px-6 py-3 border-t border-[#262426] flex justify-end">
                  <button
                    onClick={() => setSelectedCustomerReq(null)}
                    className="bg-[#ff7a1a] hover:bg-[#ffb68e] text-black font-mono font-bold px-5 py-2 text-xs uppercase rounded-xs transition-all shadow-md"
                  >
                    Done
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: MANAGE INVENTORY LIST */}
          {activeTab === 'parts-list' && (
            <div className="space-y-4 font-mono max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a78b7d]" />
                  <input
                    type="text"
                    placeholder="Search SKU, part name, category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#1c1b1c] border border-[#3a383a] pl-9 pr-3 py-2 text-xs text-white"
                  />
                </div>

                <button
                  onClick={fetchAdminData}
                  className="text-xs text-[#ff7a1a] flex items-center gap-1.5 bg-[#1c1b1c] px-4 py-2 border border-[#3a383a] hover:border-[#ff7a1a]"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Sync Database
                </button>
              </div>

              <div className="divide-y divide-[#262426] border border-[#262426] rounded-xs overflow-hidden bg-[#141416]">
                {filteredParts.length === 0 ? (
                  <div className="p-8 text-center text-[#a78b7d] text-xs">
                    No matching parts found in the catalog database. Use the "+ Add Item Form" above to post inventory!
                  </div>
                ) : (
                  filteredParts.map((part) => (
                    <div key={part.id} className="p-4 hover:bg-[#1c1b1c] flex items-center justify-between gap-4 transition-all">
                      <div className="flex items-center gap-4">
                        {part.image ? (
                          <img src={part.image} alt={part.title} className="w-12 h-12 object-cover rounded-xs border border-[#3a383a]" />
                        ) : (
                          <div className="w-12 h-12 bg-[#1c1b1c] border border-[#3a383a] flex items-center justify-center text-[#584236]">
                            <Package className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <span className="text-[10px] text-[#ff7a1a] font-bold block uppercase">
                            SKU: {part.sku || 'N/A'} • {part.systemCategory || part.partSystem || 'Part'}
                          </span>
                          <h4 className="text-sm font-bold text-white line-clamp-1">{part.title}</h4>
                          <div className="flex items-center gap-4 text-xs text-[#a78b7d] mt-1">
                            <span>PRICE: <strong className="text-green-400">${part.price}</strong></span>
                            <span>STOCK: <strong className="text-white">{part.stock || 1}</strong></span>
                            <span>STATUS: <strong className="text-[#ff7a1a]">{part.status || 'Available'}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditPart(part)}
                          className="bg-[#ff7a1a]/20 hover:bg-[#ff7a1a] text-[#ff7a1a] hover:text-black border border-[#ff7a1a]/40 text-xs px-3 py-1.5 rounded-xs flex items-center gap-1 transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit / Modify
                        </button>

                        <button
                          onClick={() => handleDeletePart(part.id, part.title)}
                          className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-black border border-red-500/40 text-xs px-3 py-1.5 rounded-xs flex items-center gap-1 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
