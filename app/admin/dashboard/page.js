"use client";
import { useState, useEffect } from 'react';
import { FiBarChart2, FiHome, FiTrendingUp, FiDollarSign, FiEye, FiUsers, FiActivity } from 'react-icons/fi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalRevenue: 0,
    pageViews: 0,
    activeListings: 0,
    conversions: 0
  });
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data.stats);
        setAnalytics(data.data.recentUsers || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Primary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiUsers size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Properties</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProperties}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FiHome size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Listings</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeListings}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FiActivity size={24} className="text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FiDollarSign size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Page Views</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pageViews}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <FiEye size={24} className="text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Conversions</p>
                <p className="text-3xl font-bold text-gray-900">{stats.conversions}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <FiTrendingUp size={24} className="text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Analytics */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Revenue Breakdown</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Revenue</span>
                <span className="font-bold text-gray-900">${stats.totalRevenue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Per Property</span>
                <span className="font-bold text-gray-900">${stats.totalProperties > 0 ? Math.round(stats.totalRevenue / stats.totalProperties) : 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conversion Value</span>
                <span className="font-bold text-gray-900">${stats.conversions > 0 ? Math.round(stats.totalRevenue / stats.conversions) : 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Listing Performance</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Properties</span>
                <span className="font-bold text-gray-900">{stats.totalProperties}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Listings</span>
                <span className="font-bold text-gray-900">{stats.activeListings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Activity Rate</span>
                <span className="font-bold text-gray-900">{stats.totalProperties > 0 ? Math.round((stats.activeListings / stats.totalProperties) * 100) : 0}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">User Engagement</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Page Views</span>
                <span className="font-bold text-gray-900">{stats.pageViews}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Conversions</span>
                <span className="font-bold text-gray-900">{stats.conversions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="font-bold text-gray-900">{stats.pageViews > 0 ? ((stats.conversions / stats.pageViews) * 100).toFixed(2) : 0}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}