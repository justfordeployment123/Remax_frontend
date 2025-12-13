"use client";
import { useState, useEffect } from 'react';

export default function AgentForm({ agent, onSave, onCancel, saving }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    licenseNumber: '',
    licenseStates: [],
    yearsOfExperience: 0,
    specialties: [],
    languages: [],
    expertise: 'Residential',
    office: {
      name: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      phone: ''
    },
    bio: '',
    contact: {
      officePhone: '',
      mobilePhone: '',
      website: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [languageInput, setLanguageInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (agent) {
      setFormData({
        firstName: agent.firstName || '',
        lastName: agent.lastName || '',
        email: agent.email || '',
        password: '',
        licenseNumber: agent.agentProfile?.licenseNumber || '',
        licenseStates: agent.agentProfile?.licenseStates || [],
        yearsOfExperience: agent.agentProfile?.yearsOfExperience || 0,
        specialties: agent.agentProfile?.specialties || [],
        languages: agent.agentProfile?.languages || [],
        expertise: agent.agentProfile?.expertise || 'Residential',
        office: agent.agentProfile?.office || { 
          name: '', 
          address: { street: '', city: '', state: '', zipCode: '' }, 
          phone: '' 
        },
        bio: agent.agentProfile?.bio || '',
        contact: agent.agentProfile?.contact || { officePhone: '', mobilePhone: '', website: '' }
      });
      setLanguageInput(agent.agentProfile?.languages?.join(', ') || '');
    }
  }, [agent]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!agent && !formData.password) newErrors.password = 'Password is required for new agents';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!agent && formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (formData.contact.officePhone && !phoneRegex.test(formData.contact.officePhone)) {
      newErrors.officePhone = 'Please enter a valid phone number';
    }
    if (formData.contact.mobilePhone && !phoneRegex.test(formData.contact.mobilePhone)) {
      newErrors.mobilePhone = 'Please enter a valid phone number';
    }

    if (formData.contact.website && !isValidUrl(formData.contact.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name.includes('.')) {
      const [parent, child, subChild] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: subChild ? {
            ...prev[parent][child],
            [subChild]: value
          } : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    setLanguageInput(value);
    
    const languagesArray = value.split(',')
      .map(lang => lang.trim())
      .filter(lang => lang.length > 0);
    
    setFormData(prev => ({
      ...prev,
      languages: languagesArray
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: 'Please select a valid image file (JPEG, PNG, or GIF)' }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }
      
      setSelectedImage(file);
      setErrors(prev => ({ ...prev, image: null }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setErrors(prev => ({ ...prev, image: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData, selectedImage);
    }
  };

  const states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

  const specialties = ['Rentals', 'Auctions', 'Business Opportunities', 'Buyer Brokerage', 'Condominiums', 'Development Land', 'Farm Land', 'Farm/Ranch', 'First Time Buyers', 'Foreclosure Property', 'Historic Property', 'Horse Property', 'Hospitality', 'Industrial', 'International', 'Investments', 'Lake/Beach Property', 'Land', 'Luxury Homes', 'Military', 'Multi-Family', 'New Construction', 'None', 'Office', 'Power of Sale', 'Property Management', 'RE/MAX Other', 'Relocation', 'Residential Acreages', 'Retail', 'Senior Communities', 'Short Sales', 'Time Share', 'Vacation and Resorts', 'Vineyards'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-96 overflow-y-auto pr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className={`mt-1 block w-full border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue ${
              errors.firstName ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className={`mt-1 block w-full border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue ${
              errors.lastName ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={`mt-1 block w-full border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        {!agent && (
          <div>
            <label className="block text-sm font-semibold text-gray-800">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className={`mt-1 block w-full border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Profile Image</label>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <svg className="w-8 h-8 text-gray-500 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p className="text-xs text-gray-600">Add Photo</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-remax-blue file:text-white hover:file:bg-remax-dark-blue"
            />
            <p className="mt-1 text-xs text-gray-600">
              Upload a profile image (JPEG, PNG, or GIF, max 5MB)
            </p>
            {imagePreview && (
              <button
                type="button"
                onClick={removeImage}
                className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Remove Image
              </button>
            )}
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800">License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800">Years of Experience</label>
          <input
            type="number"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleInputChange}
            min="0"
            max="50"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Licensed States</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto">
          {states.map(state => (
            <label key={state} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.licenseStates.includes(state)}
                onChange={(e) => handleArrayChange('licenseStates', state, e.target.checked)}
                className="rounded border-gray-400 text-remax-blue focus:ring-remax-blue"
              />
              <span className="text-sm text-gray-800">{state}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800">Expertise</label>
        <select
          name="expertise"
          value={formData.expertise}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue"
        >
          <option value="Commercial">Commercial</option>
          <option value="Commercial / Residential">Commercial / Residential</option>
          <option value="Residential">Residential</option>
          <option value="Residential / Commercial">Residential / Commercial</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800">Languages</label>
        <input
          type="text"
          placeholder="Enter languages separated by commas (English, Spanish, French)"
          value={languageInput}
          onChange={handleLanguageChange}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue"
        />
        <p className="mt-1 text-sm text-gray-700">
          Current languages: {formData.languages.join(', ') || 'None'}
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Specialties</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
          {specialties.map(specialty => (
            <label key={specialty} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.specialties.includes(specialty)}
                onChange={(e) => handleArrayChange('specialties', specialty, e.target.checked)}
                className="rounded border-gray-400 text-remax-blue focus:ring-remax-blue"
              />
              <span className="text-sm text-gray-800">{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Office Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800">Office Name</label>
            <input
              type="text"
              name="office.name"
              value={formData.office.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800">Office Phone</label>
            <input
              type="text"
              name="office.phone"
              value={formData.office.phone}
              onChange={handleInputChange}
              className={`mt-1 block w-full border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue ${
                errors.officePhone ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.officePhone && <p className="mt-1 text-sm text-red-600">{errors.officePhone}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800">Street</label>
            <input
              type="text"
              name="office.address.street"
              value={formData.office.address.street}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800">City</label>
            <input
              type="text"
              name="office.address.city"
              value={formData.office.address.city}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800">State</label>
            <input
              type="text"
              name="office.address.state"
              value={formData.office.address.state}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800">ZIP Code</label>
            <input
              type="text"
              name="office.address.zipCode"
              value={formData.office.address.zipCode}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800">Office Phone</label>
            <input
              type="text"
              name="contact.officePhone"
              value={formData.contact.officePhone}
              onChange={handleInputChange}
              className={`mt-1 block w-full border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue ${
                errors.officePhone ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.officePhone && <p className="mt-1 text-sm text-red-600">{errors.officePhone}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800">Mobile Phone</label>
            <input
              type="text"
              name="contact.mobilePhone"
              value={formData.contact.mobilePhone}
              onChange={handleInputChange}
              className={`mt-1 block w-full border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue ${
                errors.mobilePhone ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.mobilePhone && <p className="mt-1 text-sm text-red-600">{errors.mobilePhone}</p>}
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-800">Website</label>
          <input
            type="url"
            name="contact.website"
            value={formData.contact.website}
            onChange={handleInputChange}
            className={`mt-1 block w-full border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue ${
              errors.website ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows="4"
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-remax-blue focus:border-remax-blue"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 border border-gray-400 rounded-md text-gray-800 hover:bg-gray-100 disabled:opacity-50 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-remax-blue text-white rounded-md hover:bg-remax-dark-blue disabled:opacity-50 flex items-center space-x-2 font-semibold"
        >
          {saving && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          <span>{agent ? 'Update Agent' : 'Create Agent'}</span>
        </button>
      </div>
    </form>
  );
}