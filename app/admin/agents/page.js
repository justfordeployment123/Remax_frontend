"use client";
import { useState, useEffect } from 'react';
import AgentTable from './AgentTable';
import AgentModal from './AgentModal';
import { Plus, RefreshCcw } from 'lucide-react';

export default function AdminAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAgents(data.data.agents);
      } else {
        setError(data.message || 'Failed to fetch agents');
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
      setError('Failed to fetch agents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (agentId) => {
    if (!confirm('Are you sure you want to delete this agent?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/${agentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess('Agent deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
        fetchAgents();
      } else {
        setError(data.message || 'Failed to delete agent');
      }
    } catch (error) {
      console.error('Error deleting agent:', error);
      setError('Failed to delete agent. Please try again.');
    }
  };

  const handleEdit = (agent) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedAgent(null);
    setShowModal(true);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setSuccess(null);
    
    setTimeout(() => {
      setError(null);
    }, 7000);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAgent(null);
    setError(null);
    setSuccess(null);
  };

  const handleSaveSuccess = () => {
    setShowModal(false);
    setSelectedAgent(null);
    setSuccess(selectedAgent ? 'Agent updated successfully!' : 'Agent created successfully!');
    setError('');
    fetchAgents();
    
    setTimeout(() => {
      setSuccess('');
    }, 5000);
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchAgents();
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Agents Management</h1>
              <p className="text-gray-800 mt-2 font-medium">Manage all real estate agents in the system</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleRefresh}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 font-semibold flex items-center space-x-2 transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button 
                onClick={handleAdd}
                className="bg-remax-blue text-white px-4 py-2 rounded-lg hover:bg-remax-dark-blue font-semibold flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Agent</span>
              </button>
            </div>
          </div>
        </div>

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-green-800 font-medium">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        <AgentTable 
          agents={agents}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onImageUpload={fetchAgents}
        />

        {showModal && (
          <AgentModal
            agent={selectedAgent}
            onClose={handleModalClose}
            onSave={handleSaveSuccess}
            onError={handleError}
          />
        )}
      </div>
    </div>
  );
}