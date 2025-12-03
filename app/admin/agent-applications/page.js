"use client";
import { useState, useEffect } from "react";
import { FiSearch, FiTrash2, FiEdit2, FiEye, FiX } from "react-icons/fi";

export default function AgentApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0, approved: 0, rejected: 0 });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [viewApplication, setViewApplication] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateNotes, setUpdateNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchApplications();
    fetchStats();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agent-applications/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();
      setApplications(data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to load applications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agent-applications/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setStats(data.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const deleteApplication = async (id) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agent-applications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete application");
      setApplications(applications.filter((a) => a._id !== id));
      fetchStats();
    } catch (err) {
      alert("Failed to delete application");
      console.error(err);
    }
  };

  const updateApplication = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agent-applications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: updateStatus || selectedApplication.status,
          notes: updateNotes || selectedApplication.notes,
        }),
      });

      if (!response.ok) throw new Error("Failed to update application");
      fetchApplications();
      fetchStats();
      setSelectedApplication(null);
      setUpdateStatus("");
      setUpdateNotes("");
    } catch (err) {
      alert("Failed to update application");
      console.error(err);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesTab = activeTab === "all" || app.status === activeTab;
    const matchesSearch = !searchTerm || 
      app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Agent Applications</h1>
          <p className="mt-2 text-gray-600">Manage and review agent application submissions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-medium">Total Applications</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-medium">Reviewed</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.reviewed}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-medium">Approved</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-medium">Rejected</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "all"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All ({applications.length})
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "pending"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Pending ({applications.filter((a) => a.status === "pending").length})
              </button>
              <button
                onClick={() => setActiveTab("reviewed")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "reviewed"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Reviewed ({applications.filter((a) => a.status === "reviewed").length})
              </button>
              <button
                onClick={() => setActiveTab("approved")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "approved"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Approved ({applications.filter((a) => a.status === "approved").length})
              </button>
              <button
                onClick={() => setActiveTab("rejected")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "rejected"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Rejected ({applications.filter((a) => a.status === "rejected").length})
              </button>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Position</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 border-b border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {app.firstName} {app.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.joinAs}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewApplication(app)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FiEye size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedApplication(app);
                            setUpdateStatus(app.status);
                            setUpdateNotes(app.notes || "");
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteApplication(app._id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No applications found</p>
              </div>
            )}
          </div>
        </div>

        {viewApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">{viewApplication.firstName} {viewApplication.lastName}</h3>
                  <p className="text-blue-100 mt-1">Application Details</p>
                </div>
                <button
                  onClick={() => setViewApplication(null)}
                  className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Status Badge */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Status</p>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(viewApplication.status)}`}>
                      {viewApplication.status.charAt(0).toUpperCase() + viewApplication.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Submitted</p>
                    <p className="text-gray-900 font-medium">{new Date(viewApplication.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="border-t pt-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">First Name</p>
                      <p className="text-gray-900">{viewApplication.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Last Name</p>
                      <p className="text-gray-900">{viewApplication.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Email</p>
                      <p className="text-gray-900 break-all">{viewApplication.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Phone</p>
                      <p className="text-gray-900">{viewApplication.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div className="border-t pt-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">License Status</p>
                      <p className="text-gray-900 font-medium">{viewApplication.licenseStatus}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Interest</p>
                      <p className="text-gray-900 font-medium">{viewApplication.interest}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Join As</p>
                      <p className="text-gray-900 font-medium">{viewApplication.joinAs}</p>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="border-t pt-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Message</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-900 whitespace-pre-wrap">{viewApplication.message || "No message provided"}</p>
                  </div>
                </div>

                {/* Admin Notes */}
                {viewApplication.notes && (
                  <div className="border-t pt-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Admin Notes</h4>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-gray-900 whitespace-pre-wrap">{viewApplication.notes}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="border-t pt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setViewApplication(null);
                      setSelectedApplication(viewApplication);
                      setUpdateStatus(viewApplication.status);
                      setUpdateNotes(viewApplication.notes || "");
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Edit Status & Notes
                  </button>
                  <button
                    onClick={() => setViewApplication(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Update Application</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                <textarea
                  value={updateNotes}
                  onChange={(e) => setUpdateNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add notes about this application..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateApplication(selectedApplication._id)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
