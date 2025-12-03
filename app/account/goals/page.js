"use client";
import { useState, useEffect } from 'react';
import { Target, Home, TrendingUp, CheckCircle, ArrowLeft } from 'lucide-react';

export default function MyGoals() {
  const [goals, setGoals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    buying: {
      goal: 'none',
      timeline: 'none'
    },
    selling: {
      goal: 'none'
    },
    educational: {
      goal: 'none'
    }
  });

  useEffect(() => {
    fetchUserGoals();
    fetchUserProfile();
  }, []);

  const fetchUserGoals = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setGoals(data.data.goals);
        // Safely set form data with fallbacks
        setFormData({
          buying: {
            goal: data.data.goals?.buying?.goal || 'none',
            timeline: data.data.goals?.buying?.timeline || 'none'
          },
          selling: {
            goal: data.data.goals?.selling?.goal || 'none'
          },
          educational: {
            goal: data.data.goals?.educational?.goal || 'none'
          }
        });
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

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
    }
  };

  const handleInputChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setGoals(data.data.goals);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error updating goals:', error);
    } finally {
      setSaving(false);
    }
  };

  const navigateToHome = () => {
    window.location.href = '/';
  };

  const navigateToAccount = () => {
    window.location.href = '/account/settings';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-remax-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={navigateToHome}
                className="flex items-center space-x-2 text-remax-blue hover:text-remax-dark-blue transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Home</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <button
                onClick={navigateToAccount}
                className="text-gray-600 hover:text-remax-blue transition-colors"
              >
                Account Settings
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {user ? `${user.firstName} ${user.lastName}` : 'My Goals'}
                </p>
                <p className="text-sm text-gray-600">
                  {user ? user.email : 'Set your real estate objectives'}
                </p>
              </div>
              <div className="w-10 h-10 bg-remax-blue rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user ? `${user.firstName?.[0]}${user.lastName?.[0]}` : <Target className="w-5 h-5 text-white" />}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-8 h-8 text-remax-blue" />
            <h1 className="text-3xl font-bold text-gray-900">My Goals</h1>
          </div>
          <p className="text-gray-600">
            Set your real estate goals to help us provide you with personalized recommendations and insights.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Goals updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Buying Goals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-2">
                <Home className="w-5 h-5 text-remax-blue" />
                <h2 className="text-xl font-semibold text-gray-900">Buying Goals</h2>
              </div>
              <p className="text-gray-600">Tell us about your home buying plans</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Buying Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  My buying goal is:
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'first-home', label: 'I am buying my first home' },
                    { value: 'next-home', label: 'I am finding my next home' },
                    { value: 'right-sizing', label: 'I am right sizing my home' },
                    { value: 'moving-to-us', label: 'I am moving to the United States' },
                    { value: 'just-browsing', label: 'None, I\'m just browsing' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="buying-goal"
                        value={option.value}
                        checked={formData.buying?.goal === option.value}
                        onChange={(e) => handleInputChange('buying', 'goal', e.target.value)}
                        className="w-4 h-4 text-remax-blue border-gray-300 focus:ring-remax-blue"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buying Timeline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  My timeline to buy is:
                </label>
                <div className="space-y-3">
                  {[
                    { value: '3-months', label: '3 months or less' },
                    { value: '3-6-months', label: '3-6 months' },
                    { value: '6-plus-months', label: '6+ months or more' },
                    { value: 'none', label: 'None of the above' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="buying-timeline"
                        value={option.value}
                        checked={formData.buying?.timeline === option.value}
                        onChange={(e) => handleInputChange('buying', 'timeline', e.target.value)}
                        className="w-4 h-4 text-remax-blue border-gray-300 focus:ring-remax-blue"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Selling Goals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="w-5 h-5 text-remax-blue" />
                <h2 className="text-xl font-semibold text-gray-900">Selling Goals</h2>
              </div>
              <p className="text-gray-600">Tell us about your home selling plans</p>
            </div>

            <div className="p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  My selling goal is:
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'sell-home', label: 'To sell my home' },
                    { value: 'sell-for-larger', label: 'To sell my home for a larger home' },
                    { value: 'sell-for-smaller', label: 'To sell my home for a smaller home' },
                    { value: 'none', label: 'None of the above' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="selling-goal"
                        value={option.value}
                        checked={formData.selling?.goal === option.value}
                        onChange={(e) => handleInputChange('selling', 'goal', e.target.value)}
                        className="w-4 h-4 text-remax-blue border-gray-300 focus:ring-remax-blue"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Educational Goals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-2">
                <Target className="w-5 h-5 text-remax-blue" />
                <h2 className="text-xl font-semibold text-gray-900">Educational Goals</h2>
              </div>
              <p className="text-gray-600">Tell us what you'd like to learn about</p>
            </div>

            <div className="p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  My educational goal is:
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'learn-news', label: 'To learn about Real Estate news' },
                    { value: 'learn-trends', label: 'To learn about market trends' },
                    { value: 'none', label: 'None of the above' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="educational-goal"
                        value={option.value}
                        checked={formData.educational?.goal === option.value}
                        onChange={(e) => handleInputChange('educational', 'goal', e.target.value)}
                        className="w-4 h-4 text-remax-blue border-gray-300 focus:ring-remax-blue"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-remax-blue text-white px-8 py-3 rounded-lg hover:bg-remax-dark-blue font-semibold shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Goals</span>
              )}
            </button>
          </div>
        </form>

        {/* Current Goals Summary */}
        {goals && (
          <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Goals Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Buying Summary */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Buying</h4>
                <p className="text-sm text-blue-700">
                  {goals.buying?.goal !== 'none' ? 
                    `Goal: ${getGoalLabel('buying', goals.buying?.goal)}` : 
                    'No buying goal set'
                  }
                </p>
                {goals.buying?.timeline && goals.buying.timeline !== 'none' && (
                  <p className="text-sm text-blue-700 mt-1">
                    Timeline: {getTimelineLabel(goals.buying.timeline)}
                  </p>
                )}
              </div>

              {/* Selling Summary */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Selling</h4>
                <p className="text-sm text-green-700">
                  {goals.selling?.goal !== 'none' ? 
                    `Goal: ${getGoalLabel('selling', goals.selling?.goal)}` : 
                    'No selling goal set'
                  }
                </p>
              </div>

              {/* Educational Summary */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">Educational</h4>
                <p className="text-sm text-purple-700">
                  {goals.educational?.goal !== 'none' ? 
                    `Goal: ${getGoalLabel('educational', goals.educational?.goal)}` : 
                    'No educational goal set'
                  }
                </p>
              </div>
            </div>
            {goals.lastUpdated && (
              <p className="text-xs text-gray-500 mt-4">
                Last updated: {new Date(goals.lastUpdated).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper functions to get display labels
function getGoalLabel(category, value) {
  const labels = {
    buying: {
      'first-home': 'Buying first home',
      'next-home': 'Finding next home',
      'right-sizing': 'Right sizing home',
      'moving-to-us': 'Moving to United States',
      'just-browsing': 'Just browsing',
      'none': 'None'
    },
    selling: {
      'sell-home': 'Sell my home',
      'sell-for-larger': 'Sell for larger home',
      'sell-for-smaller': 'Sell for smaller home',
      'none': 'None'
    },
    educational: {
      'learn-news': 'Learn Real Estate news',
      'learn-trends': 'Learn market trends',
      'none': 'None'
    }
  };
  return labels[category]?.[value] || value;
}

function getTimelineLabel(value) {
  const labels = {
    '3-months': '3 months or less',
    '3-6-months': '3-6 months',
    '6-plus-months': '6+ months',
    'none': 'None'
  };
  return labels[value] || value;
}