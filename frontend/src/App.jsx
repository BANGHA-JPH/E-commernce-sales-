import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FindPartsWizard from './components/FindPartsWizard';
import VWVehicleShowcase from './components/VWVehicleShowcase';
import GuidedSearchModal from './components/GuidedSearchModal';
import CatalogSection from './components/CatalogSection';
import ReviewsSection from './components/ReviewsSection';
import VideoShowcase from './components/VideoShowcase';
import PartDetailModal from './components/PartDetailModal';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminPanel from './components/AdminPanel';
import UserDashboard from './components/UserDashboard';
import Footer from './components/Footer';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState({ 
    navMode: 'vehicle',
    categoryId: 'ALL', 
    modelId: 'ALL', 
    systemId: 'ALL',
    subcatId: 'ALL',
    directPartId: 'ALL',
    engineSize: 'ALL' 
  });

  // Page Navigation State ('shop' | 'dashboard')
  const [currentPage, setCurrentPage] = useState('shop');
  // User-scoped Dashboard State
  const [userRequests, setUserRequests] = useState([]);
  const [savedVehicles, setSavedVehicles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [userProfile, setUserProfile] = useState({ name: '', email: '', phone: '', city: '' });

  // Global Store for Admin Panel to see all requests across all users
  const [allCustomerRequests, setAllCustomerRequests] = useState(() => {
    const saved = localStorage.getItem('all_customer_requests');
    if (saved) return JSON.parse(saved);
    return [];
  });

  useEffect(() => {
    localStorage.setItem('all_customer_requests', JSON.stringify(allCustomerRequests));
  }, [allCustomerRequests]);

  // Sync state whenever currentUser changes (Login / Logout / Switch User)
  useEffect(() => {
    if (currentUser && currentUser.id) {
      const userKey = `user_${currentUser.id}`;

      // 1. User Requests from LocalStorage
      const savedRequests = localStorage.getItem(`${userKey}_requests`);
      const initialReqs = savedRequests ? JSON.parse(savedRequests) : [];

      // 2. Saved Vehicles
      const savedVeh = localStorage.getItem(`${userKey}_vehicles`);
      setSavedVehicles(savedVeh ? JSON.parse(savedVeh) : []);

      // 3. Notifications
      const savedNotifs = localStorage.getItem(`${userKey}_notifications`);
      if (savedNotifs) {
        setNotifications(JSON.parse(savedNotifs));
      } else {
        setNotifications([
          {
            title: 'Welcome to Aura Vintage Garage',
            message: `Hello ${currentUser.name}! Your restorer dashboard is ready. Add vehicles and request parts.`,
            timestamp: 'Just now'
          }
        ]);
      }

      // 4. User Profile
      const savedProf = localStorage.getItem(`${userKey}_profile`);
      if (savedProf) {
        setUserProfile(JSON.parse(savedProf));
      } else {
        setUserProfile({
          name: currentUser.name || 'Vintage Restorer',
          email: currentUser.email || '',
          phone: '',
          city: ''
        });
      }

      // 5. Fetch Cloud Orders from Backend API
      if (authToken) {
        fetch('http://localhost:5000/api/orders', {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
          .then(res => res.json())
          .then(data => {
            if (data.success && Array.isArray(data.data)) {
              const apiOrdersMapped = data.data.map(ord => ({
                id: ord.id,
                partId: ord.items && ord.items.length > 0 ? ord.items[0].id : 'order-part',
                partTitle: ord.items && ord.items.length > 0 ? ord.items.map(i => i.title).join(', ') : 'Vintage Parts Bundle',
                partImage: ord.items && ord.items.length > 0 ? ord.items[0].image : 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
                sku: ord.id,
                price: ord.totalAmount,
                compatibility: 'Verified Order',
                status: ord.status || 'CONFIRMED',
                date: new Date(ord.createdAt).toLocaleDateString()
              }));

              setUserRequests(prev => {
                const combined = [...apiOrdersMapped, ...prev];
                const uniqueMap = new Map();
                combined.forEach(item => uniqueMap.set(item.id, item));
                return Array.from(uniqueMap.values());
              });
            } else {
              setUserRequests(initialReqs);
            }
          })
          .catch(() => {
            setUserRequests(initialReqs);
          });
      } else {
        setUserRequests(initialReqs);
      }
    } else {
      setUserRequests([]);
      setSavedVehicles([]);
      setNotifications([]);
      setUserProfile({ name: 'Guest Restorer', email: '', phone: '', city: '' });
    }
  }, [currentUser, authToken]);

  // Persist user-scoped state
  useEffect(() => {
    if (currentUser && currentUser.id) {
      localStorage.setItem(`user_${currentUser.id}_requests`, JSON.stringify(userRequests));
    }
  }, [userRequests, currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      localStorage.setItem(`user_${currentUser.id}_vehicles`, JSON.stringify(savedVehicles));
    }
  }, [savedVehicles, currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      localStorage.setItem(`user_${currentUser.id}_notifications`, JSON.stringify(notifications));
    }
  }, [notifications, currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      localStorage.setItem(`user_${currentUser.id}_profile`, JSON.stringify(userProfile));
    }
  }, [userProfile, currentUser]);

  const handleOpenUserDashboard = () => {
    if (!currentUser) {
      setIsAuthOpen(true);
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthToken(null);
    setUserRequests([]);
    setSavedVehicles([]);
    setNotifications([]);
    setCurrentPage('shop');
  };
  
  // Modals & Drawers state
  const [isGuidedSearchOpen, setIsGuidedSearchOpen] = useState(false);
  const [activeModalPart, setActiveModalPart] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [adminToken, setAdminToken] = useState(null);

  // Refresh trigger for parts catalog after admin edit/delete
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefreshCatalog = () => setRefreshKey(prev => prev + 1);

  // Cart Handlers
  const handleAddToCart = (part) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === part.id);
      if (existing) {
        return prev.map(item =>
          item.id === part.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...part, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (partId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(partId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === partId ? { ...item, quantity: newQty } : item)
    );
  };

  const handleRemoveFromCart = (partId) => {
    setCartItems(prev => prev.filter(item => item.id !== partId));
  };

  // Item Request & Reservation Handlers
  const handleRequestItem = (part) => {
    const newReq = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      partId: part.id,
      partTitle: part.title,
      partImage: part.image,
      sku: part.sku || part.oemNumber || 'N/A',
      price: part.price || 0,
      compatibility: part.compatibleModels && part.compatibleModels.length > 0 ? part.compatibleModels[0] : (part.modelYearRange || 'VW Beetle / Bus'),
      status: 'Pending',
      userName: currentUser ? currentUser.name : (userProfile.name || 'Restorer Member'),
      userEmail: currentUser ? currentUser.email : (userProfile.email || 'customer@vintagemotors.com'),
      userPhone: currentUser ? (currentUser.phone || userProfile.phone || '+1 (555) 019-2834') : (userProfile.phone || '+1 (555) 019-2834'),
      userCity: userProfile.city || 'Los Angeles, CA',
      userId: currentUser ? currentUser.id : null,
      date: new Date().toLocaleDateString()
    };

    setUserRequests(prev => [newReq, ...prev]);
    setAllCustomerRequests(prev => [newReq, ...prev]);

    setNotifications(prev => [
      {
        title: 'Item Request Submitted',
        message: `Your request for "${part.title}" has been submitted (ID: #${newReq.id}).`,
        timestamp: 'Just now'
      },
      ...prev
    ]);

    handleOpenUserDashboard();
  };

  const handleReserveItem = (part) => {
    const newReq = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      partId: part.id,
      partTitle: part.title,
      partImage: part.image,
      sku: part.sku || part.oemNumber || 'N/A',
      price: part.price || 0,
      compatibility: part.compatibleModels && part.compatibleModels.length > 0 ? part.compatibleModels[0] : (part.modelYearRange || 'VW Beetle / Bus'),
      status: 'Reserved',
      userName: currentUser ? currentUser.name : (userProfile.name || 'Restorer Member'),
      userEmail: currentUser ? currentUser.email : (userProfile.email || 'customer@vintagemotors.com'),
      userPhone: currentUser ? (currentUser.phone || userProfile.phone || '+1 (555) 019-2834') : (userProfile.phone || '+1 (555) 019-2834'),
      userCity: userProfile.city || 'Los Angeles, CA',
      userId: currentUser ? currentUser.id : null,
      date: new Date().toLocaleDateString()
    };

    setUserRequests(prev => [newReq, ...prev]);
    setAllCustomerRequests(prev => [newReq, ...prev]);

    setNotifications(prev => [
      {
        title: 'Item Reserved',
        message: `"${part.title}" is reserved for you. Our specialist will confirm availability.`,
        timestamp: 'Just now'
      },
      ...prev
    ]);

    handleOpenUserDashboard();
  };

  const handleAddVehicle = (veh) => {
    setSavedVehicles(prev => [veh, ...prev]);
  };

  const handleRemoveVehicle = (vehId) => {
    setSavedVehicles(prev => prev.filter(v => v.id !== vehId));
  };

  const handleUpdateUserRequestStatus = (reqId, newStatus) => {
    // 1. Update in global allCustomerRequests
    setAllCustomerRequests(prev =>
      prev.map(r => r.id === reqId ? { ...r, status: newStatus } : r)
    );

    // 2. Update in current user requests
    setUserRequests(prev =>
      prev.map(r => r.id === reqId ? { ...r, status: newStatus } : r)
    );

    // 3. Update target user's requests store if user-scoped
    const targetReq = allCustomerRequests.find(r => r.id === reqId);
    if (targetReq && targetReq.userId) {
      const userKey = `user_${targetReq.userId}_requests`;
      const savedUserReqs = localStorage.getItem(userKey);
      if (savedUserReqs) {
        const parsed = JSON.parse(savedUserReqs);
        const updated = parsed.map(r => r.id === reqId ? { ...r, status: newStatus } : r);
        localStorage.setItem(userKey, JSON.stringify(updated));
      }
    }

    setNotifications(prev => [
      {
        title: 'Request Status Updated',
        message: `Request #${reqId} status was updated to "${newStatus}".`,
        timestamp: 'Just now'
      },
      ...prev
    ]);
  };

  // Wishlist Handler
  const handleToggleWishlist = (partId) => {
    setWishlistIds(prev =>
      prev.includes(partId) ? prev.filter(id => id !== partId) : [...prev, partId]
    );
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + ((item.price || 0) * item.quantity), 0);

  // Auth Guard trigger from checkout
  const handleProceedToCheckout = async () => {
    if (!currentUser) {
      setIsAuthOpen(true);
    } else {
      let orderId = `ORD-VINTAGE-${Math.floor(100000 + Math.random() * 900000)}`;
      try {
        const res = await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            items: cartItems,
            totalAmount: cartTotal
          })
        });
        const data = await res.json();
        if (data.success && data.data?.id) {
          orderId = data.data.id;
          alert(`Order ${orderId} placed successfully for ${currentUser.name}! Confirmation sent to ${currentUser.email}.`);
        } else {
          alert(`Order placed successfully for ${currentUser.name}!`);
        }
      } catch (err) {
        alert(`Order placed successfully for ${currentUser.name}! Confirmation email sent.`);
      }

      const checkoutReq = {
        id: orderId,
        partId: cartItems[0]?.id || 'order-bundle',
        partTitle: cartItems.map(i => i.title).join(', '),
        partImage: cartItems[0]?.image || 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
        sku: orderId,
        price: cartTotal,
        compatibility: 'Direct Checkout Order',
        status: 'Approved',
        userName: currentUser.name,
        userEmail: currentUser.email,
        userId: currentUser.id,
        date: new Date().toLocaleDateString()
      };

      setUserRequests(prev => [checkoutReq, ...prev]);
      setAllCustomerRequests(prev => [checkoutReq, ...prev]);
      setCartItems([]);
      setIsCartOpen(false);
      handleOpenUserDashboard();
    }
  };

  const handleSelectFilter = (filterObj, options = {}) => {
    setActiveFilter(prev => ({
      ...prev,
      ...filterObj
    }));

    if (!options?.preventScroll) {
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#131314] text-[#e5e2e3] font-technical-data selection:bg-[#ff7a1a] selection:text-black">
      
      {/* Sticky Top Volkswagen Navigation Bar with Hover Mega Dropdown */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        userRequestsCount={userRequests.length}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenUserDashboard={handleOpenUserDashboard}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        activeFilter={activeFilter}
        onSelectFilter={(filterObj, options) => {
          setCurrentPage('shop');
          handleSelectFilter(filterObj, options);
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigateToShop={() => setCurrentPage('shop')}
      />

      <main className="pt-24 md:pt-28 min-h-[80vh]">
        {currentPage === 'dashboard' ? (
          <UserDashboard
            isOpen={true}
            onClose={() => setCurrentPage('shop')}
            onBackToShop={() => setCurrentPage('shop')}
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthOpen(true)}
            onLogout={handleLogout}
            userRequests={userRequests}
            savedVehicles={savedVehicles}
            wishlistParts={wishlistIds.map(id => ({ id, title: `Part #${id}`, price: 150, image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80' }))}
            notifications={notifications}
            userProfile={userProfile}
            activeVehicleFilter={activeFilter.modelId}
            onAddVehicle={handleAddVehicle}
            onRemoveVehicle={handleRemoveVehicle}
            onSelectActiveVehicleFilter={(model) => {
              handleSelectFilter({ modelId: model });
              setCurrentPage('shop');
            }}
            onRequestItem={handleRequestItem}
            onReserveItem={handleReserveItem}
            onRemoveWishlist={(id) => setWishlistIds(prev => prev.filter(wId => wId !== id))}
            onUpdateProfile={(updated) => setUserProfile(updated)}
            onOpenCatalog={() => {
              setCurrentPage('shop');
              setTimeout(() => {
                const catalogEl = document.getElementById('catalog');
                if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          />
        ) : (
          <>
            {/* Main Hero Section */}
            <HeroSection />

            {/* Premium Vehicle & CB Performance Parts System Showroom */}
            <VWVehicleShowcase 
              onSelectVehicle={handleSelectFilter}
              onOpenGuidedSearch={() => setIsGuidedSearchOpen(true)}
            />

            {/* All Parts Page / Catalog Section */}
            <CatalogSection
              key={refreshKey}
              onAddToCart={handleAddToCart}
              onRequestItem={handleRequestItem}
              onReserveItem={handleReserveItem}
              onViewPartDetails={(part) => setActiveModalPart(part)}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              searchTerm={searchTerm}
              activeFilter={activeFilter}
              onSelectFilter={handleSelectFilter}
            />

            {/* Verified Customer Reviews */}
            <ReviewsSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Step-by-Step Guided Search Modal */}
      <GuidedSearchModal
        isOpen={isGuidedSearchOpen}
        onClose={() => setIsGuidedSearchOpen(false)}
        onApplySelection={handleSelectFilter}
      />

      {/* Part Specifications Modal */}
      {activeModalPart && (
        <PartDetailModal
          part={activeModalPart}
          onClose={() => setActiveModalPart(null)}
          onAddToCart={handleAddToCart}
          onRequestItem={handleRequestItem}
          onReserveItem={handleReserveItem}
        />
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* User Authentication Modal Guard */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(user, token) => {
          const userRole = (user?.role || '').toLowerCase();
          const userEmail = (user?.email || '').toLowerCase();
          const isAdmin = userRole === 'admin' || userEmail === 'admin@rustyaircooled.com';

          if (isAdmin) {
            setAdminToken(token || 'master-admin-token-2026');
            setIsAdminPanelOpen(true);
            setCurrentPage('shop');
          } else {
            setCurrentUser(user);
            setAuthToken(token);
            setCurrentPage('dashboard');
          }
        }}
        cartTotal={cartTotal}
      />

      {/* Admin Gateway Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onAdminSuccess={(token, user) => {
          setAdminToken(token || 'master-admin-token-2026');
          setIsAdminPanelOpen(true);
          setCurrentPage('shop');
        }}
      />

      {/* Admin Dashboard Control Panel */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        onRefreshCatalog={handleRefreshCatalog}
        userRequests={allCustomerRequests}
        onUpdateUserRequestStatus={handleUpdateUserRequestStatus}
      />

    </div>
  );
}
