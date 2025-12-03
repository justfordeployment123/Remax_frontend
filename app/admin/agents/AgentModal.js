"use client";
import { useState } from 'react';
import { X } from 'lucide-react';
import AgentForm from './AgentForm';

export default function AgentModal({ agent, onClose, onSave, onError }) {
  const [saving, setSaving] = useState(false);

  const handleSave = async (formData, selectedImage) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const url = agent 
        ? `${process.env.NEXT_PUBLIC_API_URL}/agents/${agent._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/agents`;
      
      const method = agent ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        const agentId = data.data.agent?._id || agent?._id;
        
        if (selectedImage && agentId) {
          const imageFormData = new FormData();
          imageFormData.append('profileImage', selectedImage);
          
          const imageResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/${agentId}/upload`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: imageFormData
          });
          
          const imageData = await imageResponse.json();
          if (!imageData.success) {
            onSave('Agent saved successfully, but image upload failed: ' + imageData.message);
            return;
          }
        }
        
        onSave(null, data.data.agent);
      } else {
        onError(data.message || `Failed to ${agent ? 'update' : 'create'} agent`);
      }
    } catch (error) {
      console.error('Error saving agent:', error);
      onError(`Failed to ${agent ? 'update' : 'create'} agent. Please try again.`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-6 border w-full max-w-4xl shadow-xl rounded-lg bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {agent ? 'Edit Agent' : 'Add New Agent'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={saving}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <AgentForm 
          agent={agent}
          onSave={handleSave}
          onCancel={onClose}
          saving={saving}
        />
      </div>
    </div>
  );
}