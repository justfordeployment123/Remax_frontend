"use client";
import { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, Trash2, RefreshCcw, User, Building2, Users, Briefcase } from 'lucide-react';

export default function AdminPlaybookSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [viewSubmission, setViewSubmission] = useState(null);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [profileFilter, setProfileFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchSubmissions();
  }, [statusFilter, profileFilter, searchTerm, currentPage]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (profileFilter !== 'all') params.append('profileType', profileFilter);
      if (searchTerm) params.append('search', searchTerm);
      params.append('page', currentPage);
      params.append('limit', 20);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/playbook/submissions?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      const data = await response.json();
      
      if (data.success) {
        setSubmissions(data.data);
        setStats(data.stats);
      } else {
        setError(data.message || 'Failed to fetch submissions');
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError('Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus, notes) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/playbook/submissions/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: newStatus, notes })
        }
      );
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess('Status updated successfully');
        setTimeout(() => setSuccess(''), 3000);
        fetchSubmissions();
        setViewSubmission(null);
      } else {
        setError(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/playbook/submissions/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess('Submission deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
        fetchSubmissions();
        setViewSubmission(null);
      } else {
        setError(data.message || 'Failed to delete submission');
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
      setError('Failed to delete submission');
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Country', 'Profile Type', 'Budget', 'Timeframe', 'Status', 'Date'];
    const rows = submissions.map(sub => [
      sub.name,
      sub.email,
      sub.country,
      sub.profileType,
      sub.budget || 'N/A',
      sub.timeframe || 'N/A',
      sub.status,
      new Date(sub.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `playbook-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      sent: 'bg-green-100 text-green-800',
      contacted: 'bg-purple-100 text-purple-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getProfileIcon = (profileType) => {
    if (profileType === 'End-user / Homebuyer') return <User className="w-4 h-4" />;
    if (profileType === 'Investor') return <Briefcase className="w-4 h-4" />;
    if (profileType === 'Family office / Institutional') return <Building2 className="w-4 h-4" />;
    if (profileType === 'Agent / Advisor') return <Users className="w-4 h-4" />;
    return <User className="w-4 h-4" />;
  };

  if (loading && submissions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00458b]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Playbook Submissions</h1>
          <p className="text-gray-600">Manage 2026-2035 Playbook download requests</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Downloads</span>
              <Download className="w-5 h-5 text-[#00458b]" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.total || 0}</p>
            <p className="text-sm text-gray-500 mt-1">
              {stats.thisMonth || 0} this month
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Investors</span>
              <Briefcase className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.investors || 0}</p>
            <p className="text-sm text-gray-500 mt-1">
              {stats.familyOffices || 0} family offices
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">End Users</span>
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.endUsers || 0}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Agents</span>
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.agents || 0}</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="sent">Sent</option>
                <option value="contacted">Contacted</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Profile Filter */}
            <div>
              <select
                value={profileFilter}
                onChange={(e) => {
                  setProfileFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30"
              >
                <option value="all">All Profiles</option>
                <option value="End-user / Homebuyer">End-user</option>
                <option value="Investor">Investor</option>
                <option value="Family office / Institutional">Family Office</option>
                <option value="Agent / Advisor">Agent</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={fetchSubmissions}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-[#00458b] rounded-lg hover:bg-[#003366] transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Profile
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Timeframe
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No submissions found
                    </td>
                  </tr>
                ) : (
                  submissions.map((submission) => (
                    <tr key={submission._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{submission.name}</p>
                          <p className="text-sm text-gray-500">{submission.email}</p>
                          <p className="text-xs text-gray-400">{submission.country}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getProfileIcon(submission.profileType)}
                          <span className="text-sm text-gray-700">{submission.profileType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {submission.budget || <span className="text-gray-400">Not specified</span>}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {submission.timeframe || <span className="text-gray-400">Not specified</span>}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setViewSubmission(submission)}
                            className="p-2 text-[#00458b] hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(submission._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Submission Details</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Name</p>
                  <p className="text-gray-900">{viewSubmission.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Email</p>
                  <p className="text-gray-900">{viewSubmission.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Country</p>
                  <p className="text-gray-900">{viewSubmission.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Profile Type</p>
                  <p className="text-gray-900">{viewSubmission.profileType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Budget</p>
                  <p className="text-gray-900">{viewSubmission.budget || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Timeframe</p>
                  <p className="text-gray-900">{viewSubmission.timeframe || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(viewSubmission.status)}`}>
                    {viewSubmission.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Submitted</p>
                  <p className="text-gray-900">{new Date(viewSubmission.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {viewSubmission.notes && (
                <div>
                  <p className="text-sm text-gray-600 font-medium">Notes</p>
                  <p className="text-gray-900 whitespace-pre-wrap">{viewSubmission.notes}</p>
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-600 font-medium mb-2">Update Status</label>
                <select
                  value={viewSubmission.status}
                  onChange={(e) => handleStatusUpdate(viewSubmission._id, e.target.value, viewSubmission.notes)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30"
                >
                  <option value="new">New</option>
                  <option value="sent">Sent</option>
                  <option value="contacted">Contacted</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 font-medium mb-2">Notes</label>
                <textarea
                  value={viewSubmission.notes || ''}
                  onChange={(e) => setViewSubmission({ ...viewSubmission, notes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30"
                  placeholder="Add internal notes..."
                />
                <button
                  onClick={() => handleStatusUpdate(viewSubmission._id, viewSubmission.status, viewSubmission.notes)}
                  className="mt-2 px-4 py-2 bg-[#00458b] text-white rounded-lg hover:bg-[#003366] transition-colors"
                >
                  Save Notes
                </button>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setViewSubmission(null)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleDelete(viewSubmission._id)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
