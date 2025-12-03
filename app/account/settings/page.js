"use client";
import { useState, useEffect } from 'react';
import { User, Mail, MapPin, Phone, Bell, Edit2, Save, X, Plus, Home } from 'lucide-react';

export default function AccountSettings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contact');
  const [editingField, setEditingField] = useState(null);
  const [editData, setEditData] = useState({});
  const [newAddress, setNewAddress] = useState({});
  const [newPhone, setNewPhone] = useState({});
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddPhone, setShowAddPhone] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.data.user);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (field, value) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ [field]: value })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.data.user);
        setEditingField(null);
        setEditData({});
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const addAddress = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAddress)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.data.user);
        setNewAddress({});
        setShowAddAddress(false);
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const addPhoneNumber = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/phones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newPhone)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.data.user);
        setNewPhone({});
        setShowAddPhone(false);
      }
    } catch (error) {
      console.error('Error adding phone:', error);
    }
  };

  const updateNotification = async (field, value) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/notifications`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ [field]: value })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.data.user);
      }
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  const navigateToHome = () => {
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-remax-blue"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view account settings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={navigateToHome}
                className="flex items-center space-x-2 text-remax-blue hover:text-remax-dark-blue transition-colors"
              >
                <Home className="w-6 h-6" />
                <span className="font-semibold">Back to Home</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="w-10 h-10 bg-remax-blue rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your contact information and notification preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-4 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'contact'
                ? 'border-remax-blue text-remax-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            My Contact Info
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`pb-4 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'notifications'
                ? 'border-remax-blue text-remax-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Bell className="w-4 h-4 inline mr-2" />
            Notifications
          </button>
        </div>

        {/* Contact Info Tab */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">My Contact Info</h2>
              <p className="text-gray-600 text-sm mt-1">
                View, edit, or update your contact information and sign-in preferences.
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name*
                  </label>
                  <div className="flex items-center space-x-3">
                    {editingField === 'firstName' ? (
                      <div className="flex-1 flex space-x-2">
                        <input
                          type="text"
                          value={editData.firstName || user.firstName}
                          onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-remax-blue"
                        />
                        <button
                          onClick={() => updateProfile('firstName', editData.firstName)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingField(null)}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                        <span className="text-gray-900">{user.firstName}</span>
                        <button
                          onClick={() => setEditingField('firstName')}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name*
                  </label>
                  <div className="flex items-center space-x-3">
                    {editingField === 'lastName' ? (
                      <div className="flex-1 flex space-x-2">
                        <input
                          type="text"
                          value={editData.lastName || user.lastName}
                          onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-remax-blue"
                        />
                        <button
                          onClick={() => updateProfile('lastName', editData.lastName)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingField(null)}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                        <span className="text-gray-900">{user.lastName}</span>
                        <button
                          onClick={() => setEditingField('lastName')}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address*
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{user.email}</span>
                    </div>
                    <span className="text-xs text-gray-500">Cannot be changed</span>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Addresses</h3>
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="flex items-center space-x-2 text-remax-blue hover:text-remax-dark-blue"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Primary Address</span>
                  </button>
                </div>

                {showAddAddress && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Street"
                        value={newAddress.street || ''}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-remax-blue"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city || ''}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-remax-blue"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={newAddress.state || ''}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-remax-blue"
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={newAddress.zipCode || ''}
                        onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-remax-blue"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={addAddress}
                        className="bg-remax-blue text-white px-4 py-2 rounded-lg hover:bg-remax-dark-blue"
                      >
                        Save Address
                      </button>
                      <button
                        onClick={() => setShowAddAddress(false)}
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {user.addresses && user.addresses.length > 0 ? (
                  <div className="space-y-3">
                    {user.addresses.map((address, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-gray-900">{address.street}</p>
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {address.type}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No addresses added yet.</p>
                )}
              </div>

              {/* Phone Numbers */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Phone Numbers</h3>
                  <button
                    onClick={() => setShowAddPhone(true)}
                    className="flex items-center space-x-2 text-remax-blue hover:text-remax-dark-blue"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Primary Phone</span>
                  </button>
                </div>

                {showAddPhone && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="mb-4">
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={newPhone.number || ''}
                        onChange={(e) => setNewPhone({ ...newPhone, number: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-remax-blue"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={addPhoneNumber}
                        className="bg-remax-blue text-white px-4 py-2 rounded-lg hover:bg-remax-dark-blue"
                      >
                        Save Phone
                      </button>
                      <button
                        onClick={() => setShowAddPhone(false)}
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {user.phoneNumbers && user.phoneNumbers.length > 0 ? (
                  <div className="space-y-3">
                    {user.phoneNumbers.map((phone, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{phone.number}</span>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {phone.type}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No phone numbers added yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              <p className="text-gray-600 text-sm mt-1">
                Customize the frequency and types of subscriptions you want to receive.
              </p>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <p className="text-gray-700 mb-4">
                  Get notifications from REMAX so you can stay on top of your journey home. Turn off anytime.
                </p>
              </div>

              <div className="space-y-6">
                {/* REMAX Listing Alerts */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">REMAX Listing Alerts</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Updated property listings based on your searches
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.notifications?.listingAlerts || false}
                        onChange={(e) => updateNotification('listingAlerts', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-remax-blue"></div>
                    </label>
                  </div>
                </div>

                {/* Favorites */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Favorites</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Updated property listings based on your favorite homes
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.notifications?.favorites || false}
                        onChange={(e) => updateNotification('favorites', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-remax-blue"></div>
                    </label>
                  </div>
                </div>

                {/* REMAX Bring It Home Newsletter */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">REMAX Bring It Home Newsletter</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Informative articles, up-to-date real estate trends, contests, and curated listings tailored to your goals
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.notifications?.newsletter || false}
                        onChange={(e) => updateNotification('newsletter', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-remax-blue"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}