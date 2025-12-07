"use client";
import { useState, useEffect } from "react";
import { FiSearch, FiTrash2, FiEdit2, FiEye, FiX } from "react-icons/fi";

export default function FitOutSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, 'in-progress': 0, completed: 0, archived: 0 });
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [viewSubmission, setViewSubmission] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateNotes, setUpdateNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSubmissions();
    fetchStats();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fit-outs/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch submissions");
      const data = await response.json();
      setSubmissions(data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to load submissions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fit-outs/stats`, {
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

  const deleteSubmission = async (id) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fit-outs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete submission");
      setSubmissions(submissions.filter((s) => s._id !== id));
      fetchStats();
    } catch (err) {
      alert("Failed to delete submission");
      console.error(err);
    }
  };

  const updateSubmission = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fit-outs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: updateStatus || selectedSubmission.status,
          adminNotes: updateNotes || selectedSubmission.adminNotes,
        }),
      });

      if (!response.ok) throw new Error("Failed to update submission");
      fetchSubmissions();
      fetchStats();
      setSelectedSubmission(null);
      setUpdateStatus("");
      setUpdateNotes("");
    } catch (err) {
      alert("Failed to update submission");
      console.error(err);
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    if (activeTab !== "all" && submission.status !== activeTab) return false;
    if (searchTerm) {
      return (
        submission.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (submission.companyName && submission.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Fit-Out Submissions</h1>
          <p className="text-gray-600">Manage commercial fit-out enquiries from clients</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-6 gap-4 mb-8">
          <div
            onClick={() => setActiveTab("all")}
            className={`p-4 rounded-lg cursor-pointer transition ${
              activeTab === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            <p className="text-sm font-medium mb-1">Total</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div
            onClick={() => setActiveTab("new")}
            className={`p-4 rounded-lg cursor-pointer transition ${
              activeTab === "new" ? "bg-red-600 text-white" : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            <p className="text-sm font-medium mb-1">New</p>
            <p className="text-3xl font-bold">{stats.new}</p>
          </div>
          <div
            onClick={() => setActiveTab("contacted")}
            className={`p-4 rounded-lg cursor-pointer transition ${
              activeTab === "contacted" ? "bg-yellow-600 text-white" : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            <p className="text-sm font-medium mb-1">Contacted</p>
            <p className="text-3xl font-bold">{stats.contacted}</p>
          </div>
          <div
            onClick={() => setActiveTab("in-progress")}
            className={`p-4 rounded-lg cursor-pointer transition ${
              activeTab === "in-progress" ? "bg-blue-600 text-white" : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            <p className="text-sm font-medium mb-1">In Progress</p>
            <p className="text-3xl font-bold">{stats["in-progress"]}</p>
          </div>
          <div
            onClick={() => setActiveTab("completed")}
            className={`p-4 rounded-lg cursor-pointer transition ${
              activeTab === "completed" ? "bg-green-600 text-white" : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            <p className="text-sm font-medium mb-1">Completed</p>
            <p className="text-3xl font-bold">{stats.completed}</p>
          </div>
          <div
            onClick={() => setActiveTab("archived")}
            className={`p-4 rounded-lg cursor-pointer transition ${
              activeTab === "archived" ? "bg-gray-600 text-white" : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            <p className="text-sm font-medium mb-1">Archived</p>
            <p className="text-3xl font-bold">{stats.archived}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex gap-2">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading submissions...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{error}</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name & Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Space Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Lease Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                      No submissions found
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <tr key={submission._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{submission.fullName}</div>
                        {submission.companyName && (
                          <div className="text-xs text-gray-500">{submission.companyName}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{submission.email}</div>
                        <div className="text-xs text-gray-500">{submission.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{submission.spaceType}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{submission.size}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{submission.leaseStatus}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            submission.status === "new"
                              ? "bg-red-100 text-red-800"
                              : submission.status === "contacted"
                              ? "bg-yellow-100 text-yellow-800"
                              : submission.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : submission.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm space-x-2 flex">
                        <button
                          onClick={() => setViewSubmission(submission)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View"
                        >
                          <FiEye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setUpdateStatus(submission.status);
                            setUpdateNotes(submission.adminNotes);
                          }}
                          className="text-yellow-600 hover:text-yellow-800"
                          title="Edit"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteSubmission(submission._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* View Modal */}
        {viewSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gray-50 p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Fit-Out Submission Details</h2>
                <button
                  onClick={() => setViewSubmission(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-900">{viewSubmission.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <p className="text-gray-900">{viewSubmission.companyName || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{viewSubmission.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">{viewSubmission.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lease Status</label>
                    <p className="text-gray-900">{viewSubmission.leaseStatus}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Space Type</label>
                    <p className="text-gray-900">{viewSubmission.spaceType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                    <p className="text-gray-900">{viewSubmission.size}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Handover Date</label>
                    <p className="text-gray-900">{viewSubmission.handoverDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                    <p className="text-gray-900">{viewSubmission.budget || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <p className="text-gray-900">{viewSubmission.status}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fit-Out Goals</label>
                  <p className="text-gray-900 whitespace-pre-wrap">{viewSubmission.fitoutGoals}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Submitted</label>
                  <p className="text-gray-900">{new Date(viewSubmission.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="sticky bottom-0 bg-gray-50 p-6 border-t border-gray-200 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setViewSubmission(null);
                    setSelectedSubmission(viewSubmission);
                    setUpdateStatus(viewSubmission.status);
                    setUpdateNotes(viewSubmission.adminNotes);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => setViewSubmission(null)}
                  className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full">
              <div className="bg-gray-50 p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Update Submission</h2>
                <button
                  onClick={() => {
                    setSelectedSubmission(null);
                    setUpdateStatus("");
                    setUpdateNotes("");
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="w-6 h-6" />
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
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
                  <textarea
                    value={updateNotes}
                    onChange={(e) => setUpdateNotes(e.target.value)}
                    placeholder="Add notes about this submission..."
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setSelectedSubmission(null);
                    setUpdateStatus("");
                    setUpdateNotes("");
                  }}
                  className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateSubmission(selectedSubmission._id)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
