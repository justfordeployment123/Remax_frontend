"use client";
import { useState, useEffect } from "react";
import { FiSearch, FiTrash2, FiEdit2, FiEye, FiX } from "react-icons/fi";
import { toast, Toaster } from "sonner";

export default function RequirementsManagement() {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, qualified: 0, converted: 0, lost: 0 });
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [viewRequirement, setViewRequirement] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateNotes, setUpdateNotes] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRequirements();
    fetchStats();
  }, []);

  const fetchRequirements = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requirements`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch requirements");
      const data = await response.json();
      setRequirements(data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to load requirements");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requirements`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      const allRequirements = data.data || [];

      setStats({
        total: allRequirements.length,
        new: allRequirements.filter(r => r.status === "new").length,
        contacted: allRequirements.filter(r => r.status === "contacted").length,
        qualified: allRequirements.filter(r => r.status === "qualified").length,
        converted: allRequirements.filter(r => r.status === "converted").length,
        lost: allRequirements.filter(r => r.status === "lost").length,
      });
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const deleteRequirement = async (id) => {
    if (!confirm("Are you sure you want to delete this requirement?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requirements/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete requirement");
      setRequirements(requirements.filter((r) => r._id !== id));
      fetchStats();
    } catch (err) {
      toast.error("Failed to delete requirement");
      console.error(err);
    }
  };

  const updateRequirement = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requirements/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: updateStatus || undefined,
          assigned_to: assignedTo || undefined,
          notes_internal: updateNotes || undefined,
        }),
      });

      if (!response.ok) throw new Error("Failed to update requirement");
      fetchRequirements();
      fetchStats();
      setSelectedRequirement(null);
      setUpdateStatus("");
      setUpdateNotes("");
      setAssignedTo("");
    } catch (err) {
      toast.error("Failed to update requirement");
      console.error(err);
    }
  };

  const filteredRequirements = requirements.filter((r) => {
    let matchesTab = activeTab === "all" || r.status === activeTab;
    let matchesSearch = 
      r.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.intent?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "contacted": return "bg-yellow-100 text-yellow-800";
      case "qualified": return "bg-purple-100 text-purple-800";
      case "converted": return "bg-green-100 text-green-800";
      case "lost": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const intentBadgeColor = (intent) => {
    switch (intent) {
      case "Buy": return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Rent": return "bg-green-50 text-green-700 border border-green-200";
      case "Invest": return "bg-purple-50 text-purple-700 border border-purple-200";
      case "Sell": return "bg-orange-50 text-orange-700 border border-orange-200";
      default: return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Requirements Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <StatCard label="Total" value={stats.total} color="bg-gray-50" />
        <StatCard label="New" value={stats.new} color="bg-blue-50" />
        <StatCard label="Contacted" value={stats.contacted} color="bg-yellow-50" />
        <StatCard label="Qualified" value={stats.qualified} color="bg-purple-50" />
        <StatCard label="Converted" value={stats.converted} color="bg-green-50" />
        <StatCard label="Lost" value={stats.lost} color="bg-red-50" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "new", "contacted", "qualified", "converted", "lost"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
              activeTab === tab
                ? "bg-[#00458b] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or intent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]"
          />
        </div>
      </div>

      {/* Requirements Table */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : filteredRequirements.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No requirements found</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Intent</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequirements.map((req) => (
                <tr key={req._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{req.full_name}</td>
                  <td className="px-6 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${intentBadgeColor(req.intent)}`}>
                      {req.intent}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{req.email}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{req.phone}</td>
                  <td className="px-6 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm space-x-2">
                    <button
                      onClick={() => setViewRequirement(req)}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                      title="View Details"
                    >
                      <FiEye size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRequirement(req);
                        setUpdateStatus(req.status);
                        setUpdateNotes(req.notes_internal || "");
                        setAssignedTo(req.assigned_to || "");
                      }}
                      className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 font-semibold transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteRequirement(req._id)}
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-semibold transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Details Modal */}
      {viewRequirement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Requirement Details</h2>
              <button
                onClick={() => setViewRequirement(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">{viewRequirement.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{viewRequirement.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{viewRequirement.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Intent</p>
                  <p className="font-semibold text-gray-900">{viewRequirement.intent}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Property Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Property Type</p>
                    <p className="font-semibold text-gray-900">{viewRequirement.property_type || "—"}</p>
                  </div>
                  {viewRequirement.intent !== "Sell" ? (
                    <>
                      <div>
                        <p className="text-gray-600">Budget Range</p>
                        <p className="font-semibold text-gray-900">
                          {viewRequirement.budget_min ? `AED ${viewRequirement.budget_min}` : "—"} 
                          {" to "}
                          {viewRequirement.budget_max ? `AED ${viewRequirement.budget_max}` : "Open"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Areas</p>
                        <p className="font-semibold text-gray-900">{viewRequirement.areas || "—"}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-gray-600">Area</p>
                        <p className="font-semibold text-gray-900">{viewRequirement.area || "—"}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Community</p>
                        <p className="font-semibold text-gray-900">{viewRequirement.community_building || "—"}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Size (sq ft)</p>
                        <p className="font-semibold text-gray-900">{viewRequirement.size_sqft || "—"}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Expected Price</p>
                        <p className="font-semibold text-gray-900">
                          {viewRequirement.expected_price ? `AED ${viewRequirement.expected_price}` : "—"}
                        </p>
                      </div>
                    </>
                  )}
                  <div>
                    <p className="text-gray-600">Bedrooms</p>
                    <p className="font-semibold text-gray-900">{viewRequirement.bedrooms || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Timeline</p>
                    <p className="font-semibold text-gray-900">{viewRequirement.timeline || "—"}</p>
                  </div>
                </div>
              </div>

              {viewRequirement.requirements_extra && (
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">Additional Requirements</p>
                  <p className="text-gray-900">{viewRequirement.requirements_extra}</p>
                </div>
              )}

              {viewRequirement.notes && (
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">Notes</p>
                  <p className="text-gray-900">{viewRequirement.notes}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-2">Consent</p>
                <p className="font-semibold text-gray-900">
                  {viewRequirement.consent_requirements ? "✓ Yes" : "✗ No"}
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs text-gray-500">
                  <strong>Submitted:</strong> {new Date(viewRequirement.created_at).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  <strong>Source:</strong> {viewRequirement.page_source}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {selectedRequirement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="border-b p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Edit Requirement</h2>
              <button
                onClick={() => setSelectedRequirement(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Assigned To</label>
                <input
                  type="text"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Agent name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Internal Notes</label>
                <textarea
                  value={updateNotes}
                  onChange={(e) => setUpdateNotes(e.target.value)}
                  placeholder="Add internal notes..."
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b] resize-none"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setSelectedRequirement(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateRequirement(selectedRequirement._id)}
                  className="flex-1 px-4 py-2 bg-[#00458b] text-white rounded-lg font-semibold hover:bg-[#003366] transition-colors"
                >
                  Save Changes
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

function StatCard({ label, value, color }) {
  return (
    <div className={`${color} p-4 rounded-lg border border-gray-200`}>
      <p className="text-xs text-gray-600 font-semibold mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
