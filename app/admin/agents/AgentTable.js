"use client";
import { useState } from 'react';
import { 
  UserCheck, 
  Search, 
  Filter, 
  Edit, 
  Trash2,
  Camera,
  ChevronDown,
  X
} from 'lucide-react';

export default function AgentTable({ agents, onEdit, onDelete, onImageUpload }) {
  const [uploading, setUploading] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    specialty: 'all',
    experience: 'all'
  });

  const handleImageUpload = async (agentId, file) => {
    if (!file) return;
    
    setUploading(agentId);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('profileImage', file);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/${agentId}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (onImageUpload) {
          onImageUpload();
        }
      } else {
        alert(data.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(null);
    }
  };

  const getImageUrl = (profileImage) => {
    if (!profileImage) return null;
    
    console.log('Raw profileImage from DB:', profileImage);
    
    if (profileImage.startsWith('http')) {
      return profileImage;
    }
    
    if (profileImage.startsWith('/')) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace('/api', '');
      const fullUrl = `${baseUrl}${profileImage}`;
      console.log('Constructed image URL:', fullUrl);
      return fullUrl;
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace('/api', '');
    return `${baseUrl}/uploads/agents/${profileImage}`;
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      specialty: 'all',
      experience: 'all'
    });
  };

  const getUniqueSpecialties = () => {
    const specialties = new Set();
    agents.forEach(agent => {
      if (agent.agentProfile?.specialties) {
        agent.agentProfile.specialties.forEach(specialty => {
          specialties.add(specialty);
        });
      }
    });
    return Array.from(specialties);
  };

  const filteredAgents = agents.filter(agent => {
    // Search term filter
    const matchesSearch = agent.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.agentProfile?.licenseNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = filters.status === 'all' || 
      agent.agentProfile?.status === filters.status;

    // Specialty filter
    const matchesSpecialty = filters.specialty === 'all' || 
      agent.agentProfile?.specialties?.includes(filters.specialty);

    // Experience filter
    const matchesExperience = filters.experience === 'all' || 
      (filters.experience === 'junior' && (agent.agentProfile?.yearsOfExperience || 0) < 3) ||
      (filters.experience === 'mid' && (agent.agentProfile?.yearsOfExperience || 0) >= 3 && (agent.agentProfile?.yearsOfExperience || 0) < 10) ||
      (filters.experience === 'senior' && (agent.agentProfile?.yearsOfExperience || 0) >= 10);

    return matchesSearch && matchesStatus && matchesSpecialty && matchesExperience;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-remax-blue focus:border-transparent w-full sm:w-64"
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 ${showFilters ? 'bg-gray-50' : ''}`}
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {filteredAgents.length} of {agents.length} agents
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-remax-blue focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Specialty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <select
                  value={filters.specialty}
                  onChange={(e) => handleFilterChange('specialty', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-remax-blue focus:border-transparent"
                >
                  <option value="all">All Specialties</option>
                  {getUniqueSpecialties().map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <select
                  value={filters.experience}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-remax-blue focus:border-transparent"
                >
                  <option value="all">All Experience Levels</option>
                  <option value="junior">Junior (0-2 years)</option>
                  <option value="mid">Mid-level (3-9 years)</option>
                  <option value="senior">Senior (10+ years)</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                {(filters.status !== 'all' || filters.specialty !== 'all' || filters.experience !== 'all') && (
                  <>
                    <span className="text-sm text-gray-600">Active filters:</span>
                    {filters.status !== 'all' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Status: {filters.status}
                        <button
                          onClick={() => handleFilterChange('status', 'all')}
                          className="ml-1 hover:text-blue-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.specialty !== 'all' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Specialty: {filters.specialty}
                        <button
                          onClick={() => handleFilterChange('specialty', 'all')}
                          className="ml-1 hover:text-green-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.experience !== 'all' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Experience: {filters.experience}
                        <button
                          onClick={() => handleFilterChange('experience', 'all')}
                          className="ml-1 hover:text-purple-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                License & Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialties
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAgents.map((agent) => {
              const imageUrl = getImageUrl(agent.agentProfile?.profileImage);
              
              return (
                <tr key={agent._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative group">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center relative overflow-hidden bg-green-500">
                          {imageUrl ? (
                            <>
                              <img 
                                src={imageUrl}
                                alt={`${agent.firstName} ${agent.lastName}`}
                                className="h-12 w-12 rounded-full object-cover"
                                onError={(e) => {
                                  console.error('Image failed to load:', imageUrl);
                                  // Hide the image and show fallback
                                  e.target.style.display = 'none';
                                }}
                              />
                              <div className="fallback-icon absolute inset-0 bg-green-500 rounded-full items-center justify-center hidden">
                                <UserCheck className="w-6 h-6 text-white" />
                              </div>
                            </>
                          ) : (
                            <div className="fallback-icon absolute inset-0 bg-green-500 rounded-full flex items-center justify-center">
                              <UserCheck className="w-6 h-6 text-white" />
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center transition-all duration-200">
                            <Camera className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </div>
                          
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(agent._id, e.target.files[0])}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={uploading === agent._id}
                          />
                          
                          {uploading === agent._id && (
                            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            </div>
                          )}
                        </div>
                        
                        <div className="absolute -bottom-1 -right-1 bg-remax-blue text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Camera className="w-3 h-3" />
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {agent.firstName} {agent.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {agent.agentProfile?.office?.name || 'No office assigned'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{agent.email}</div>
                    <div>{agent.agentProfile?.contact?.officePhone || 'No phone'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>License: {agent.agentProfile?.licenseNumber || 'Not provided'}</div>
                    <div>Exp: {agent.agentProfile?.yearsOfExperience || 0} years</div>
                    <div>States: {agent.agentProfile?.licenseStates?.join(', ') || 'None'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {agent.agentProfile?.specialties?.slice(0, 3).map(specialty => (
                        <span key={specialty} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {specialty}
                        </span>
                      ))}
                      {agent.agentProfile?.specialties?.length > 3 && (
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          +{agent.agentProfile.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      agent.agentProfile?.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : agent.agentProfile?.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {agent.agentProfile?.status || 'inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => onEdit(agent)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="Edit Agent"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(agent._id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete Agent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredAgents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No agents found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}