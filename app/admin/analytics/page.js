"use client";
import { useState, useEffect } from "react";
import { FiBarChart2, FiTrendingUp, FiUsers, FiHome, FiEye, FiDollarSign } from "react-icons/fi";

export default function AdminAnalytics() {
  const [analyticsData, setAnalyticsData] = useState({
    userGrowth: [],
    propertyStats: { total: 0, active: 0, sold: 0, rented: 0 },
    conversionRate: 0,
    avgPageViewsPerUser: 0,
    topPages: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAnalyticsData({
        userGrowth: [
          { month: "Jan", users: 250 },
          { month: "Feb", users: 420 },
          { month: "Mar", users: 680 },
          { month: "Apr", users: 890 },
          { month: "May", users: 1200 },
          { month: "Jun", users: 1540 }
        ],
        propertyStats: { total: 2450, active: 1890, sold: 380, rented: 180 },
        conversionRate: 3.2,
        avgPageViewsPerUser: 8.5,
        topPages: [
          { name: "Property Search", views: 4520 },
          { name: "Agent Directory", views: 3210 },
          { name: "Buying Guide", views: 2890 },
          { name: "Contact Us", views: 2340 },
          { name: "Selling Guide", views: 1980 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Analytics</h1>
              <p className="text-blue-100 text-sm mt-1">Platform performance and user insights</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-3xl font-bold text-gray-900">{analyticsData.propertyStats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiHome size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-900">{analyticsData.conversionRate}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FiTrendingUp size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Page Views</p>
                <p className="text-3xl font-bold text-gray-900">{analyticsData.avgPageViewsPerUser}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FiEye size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                <p className="text-3xl font-bold text-gray-900">{analyticsData.propertyStats.active}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FiBarChart2 size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiTrendingUp size={20} className="text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">User Growth</h2>
            </div>
            <div className="overflow-x-auto">
              <div className="flex items-end gap-2 h-48">
                {analyticsData.userGrowth.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="bg-blue-500 rounded-t w-full transition-all hover:bg-blue-600" style={{ height: `${(data.users / 1600) * 160}px` }}></div>
                    <p className="text-xs text-gray-600 mt-2">{data.month}</p>
                    <p className="text-xs font-semibold text-gray-900">{data.users}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiHome size={20} className="text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Property Stats</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Active</span>
                  <span className="text-sm font-bold text-gray-900">{analyticsData.propertyStats.active}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(analyticsData.propertyStats.active / analyticsData.propertyStats.total) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Sold</span>
                  <span className="text-sm font-bold text-gray-900">{analyticsData.propertyStats.sold}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(analyticsData.propertyStats.sold / analyticsData.propertyStats.total) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Rented</span>
                  <span className="text-sm font-bold text-gray-900">{analyticsData.propertyStats.rented}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(analyticsData.propertyStats.rented / analyticsData.propertyStats.total) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FiBarChart2 size={20} className="text-orange-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Top Pages</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Page Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Page Views</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analyticsData.topPages.map((page, idx) => {
                  const totalViews = analyticsData.topPages.reduce((sum, p) => sum + p.views, 0);
                  const percentage = ((page.views / totalViews) * 100).toFixed(1);
                  return (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{page.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{page.views.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}