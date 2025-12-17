"use client";
import { useState, useEffect } from "react";
import { FiSearch, FiTrash2, FiEdit2, FiEye, FiX } from "react-icons/fi";
import { toast, Toaster } from "sonner";

export default function ConsultationsManagement() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 });
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [viewConsultation, setViewConsultation] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateNotes, setUpdateNotes] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchConsultations();
    fetchStats();
  }, []);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch consultations");
      const data = await response.json();
      setConsultations(data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to load consultations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      const allConsultations = data.data || [];

      setStats({
        total: allConsultations.length,
        pending: allConsultations.filter(c => c.status === "pending").length,
        confirmed: allConsultations.filter(c => c.status === "confirmed").length,
        completed: allConsultations.filter(c => c.status === "completed").length,
        cancelled: allConsultations.filter(c => c.status === "cancelled").length,
      });
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const deleteConsultation = async (id) => {
    if (!confirm("Are you sure you want to delete this consultation?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete consultation");
      setConsultations(consultations.filter((c) => c._id !== id));
      fetchStats();
    } catch (err) {
      toast.error("Failed to delete consultation");
      console.error(err);
    }
  };

  const updateConsultation = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: updateStatus || selectedConsultation.status,
          assigned_to: assignedTo || selectedConsultation.assigned_to,
          notes_internal: updateNotes || selectedConsultation.notes_internal,
        }),
      });

      if (!response.ok) throw new Error("Failed to update consultation");
      fetchConsultations();
      fetchStats();
      setSelectedConsultation(null);
      setUpdateStatus("");
      setUpdateNotes("");
      setAssignedTo("");
    } catch (err) {
      toast.error("Failed to update consultation");
      console.error(err);
    }
  };

  const filteredConsultations = consultations.filter((con) => {
    const matchesTab = activeTab === "all" || con.status === activeTab;
    const matchesSearch = !searchTerm || 
      con.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      con.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      con.topic.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
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
          <h1 className="text-3xl font-bold text-gray-900">Consultation Requests</h1>
          <p className="mt-2 text-gray-600">Manage and track consultation bookings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-medium">Total Requests</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-medium">Confirmed</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.confirmed}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-medium">Completed</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-medium">Cancelled</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{stats.cancelled}</p>
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
                All ({consultations.length})
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "pending"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Pending ({consultations.filter((c) => c.status === "pending").length})
              </button>
              <button
                onClick={() => setActiveTab("confirmed")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "confirmed"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Confirmed ({consultations.filter((c) => c.status === "confirmed").length})
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "completed"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Completed ({consultations.filter((c) => c.status === "completed").length})
              </button>
              <button
                onClick={() => setActiveTab("cancelled")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "cancelled"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Cancelled ({consultations.filter((c) => c.status === "cancelled").length})
              </button>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, or topic..."
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
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Topic</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredConsultations.map((con) => (
                  <tr key={con._id} className="hover:bg-gray-50 border-b border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{con.full_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{con.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{con.topic}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{con.consultation_type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(con.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(con.status)}`}>
                        {con.status.charAt(0).toUpperCase() + con.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewConsultation(con)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FiEye size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedConsultation(con);
                            setUpdateStatus(con.status);
                            setUpdateNotes(con.notes_internal || "");
                            setAssignedTo(con.assigned_to || "");
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteConsultation(con._id)}
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

            {filteredConsultations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No consultations found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {viewConsultation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Consultation Details</h2>
              <button
                onClick={() => setViewConsultation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="text-lg font-semibold text-gray-900">{viewConsultation.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{viewConsultation.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-lg font-semibold text-gray-900">{viewConsultation.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Topic</p>
                  <p className="text-lg font-semibold text-gray-900">{viewConsultation.topic}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Consultation Type</p>
                    <p className="text-lg font-semibold text-gray-900">{viewConsultation.consultation_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Preferred Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(viewConsultation.preferred_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Preferred Time</p>
                    <p className="text-lg font-semibold text-gray-900">{viewConsultation.preferred_time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget Range</p>
                    <p className="text-lg font-semibold text-gray-900">{viewConsultation.budget_range || "Not specified"}</p>
                  </div>
                </div>
              </div>

              {viewConsultation.notes && (
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-600 mb-2">Additional Notes</p>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{viewConsultation.notes}</p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Consent to Contact</p>
                  <p className={`font-semibold ${viewConsultation.consent_consultation ? "text-green-600" : "text-red-600"}`}>
                    {viewConsultation.consent_consultation ? "✓ Yes" : "✗ No"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Marketing Consent</p>
                  <p className={`font-semibold ${viewConsultation.consent_marketing ? "text-green-600" : "text-red-600"}`}>
                    {viewConsultation.consent_marketing ? "✓ Yes" : "✗ No"}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 mb-2">Current Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(viewConsultation.status)}`}>
                  {viewConsultation.status.charAt(0).toUpperCase() + viewConsultation.status.slice(1)}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-6 text-sm text-gray-500">
                <p>Submitted: {new Date(viewConsultation.created_at).toLocaleString()}</p>
                {viewConsultation.updated_at && (
                  <p>Last Updated: {new Date(viewConsultation.updated_at).toLocaleString()}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {selectedConsultation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Update Consultation</h2>
              <button
                onClick={() => setSelectedConsultation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                <input
                  type="text"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Agent name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Internal Notes</label>
                <textarea
                  value={updateNotes}
                  onChange={(e) => setUpdateNotes(e.target.value)}
                  placeholder="Add internal notes..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => updateConsultation(selectedConsultation._id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setSelectedConsultation(null)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-right" richColors />
    </div>
  );
}
