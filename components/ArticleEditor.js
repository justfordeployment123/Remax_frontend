"use client";
import { useState, useEffect } from 'react';
import { FiX, FiPlus, FiTrash2, FiUpload, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function ArticleEditor({ article, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'BUY',
    metaDescription: '',
    summary: '',
    heroImage: '',
    heroImageCaption: '',
    body: '',
    tldrBullets: [],
    faqs: [],
    inlineCtas: [],
    relatedGuides: [],
    tags: [],
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    disclaimer: '',
    readTime: 5,
    status: 'draft',
    featured: false,
    sections: []
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [allArticles, setAllArticles] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    if (article) {
      setFormData(article);
    }
    fetchAllArticles();
  }, [article]);

  const fetchAllArticles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/guide-articles?limit=100`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await response.json();
      if (data.success) {
        setAllArticles(data.data.filter(a => a._id !== article?._id));
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title' && !article) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/guide-articles/upload-image`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formDataObj
        }
      );

      const data = await response.json();
      if (data.success) {
        handleInputChange('heroImage', data.data.url);
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  // Handle inline image upload in the editor
  const handleEditorImageUpload = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formDataObj = new FormData();
      formDataObj.append('image', file);

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/guide-articles/upload-image`,
          {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formDataObj
          }
        );

        const data = await response.json();
        if (data.success) {
          // Insert image into editor at cursor position
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', data.data.url);
            quill.setSelection(range.index + 1);
          }
        } else {
          alert('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image');
      }
    };
  };

  const addFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const updateFaq = (index, field, value) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index][field] = value;
    setFormData(prev => ({ ...prev, faqs: newFaqs }));
  };

  const removeFaq = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const addTldrBullet = () => {
    setFormData(prev => ({
      ...prev,
      tldrBullets: [...prev.tldrBullets, { icon: 'check', text: '' }]
    }));
  };

  const updateTldrBullet = (index, field, value) => {
    const newBullets = [...formData.tldrBullets];
    newBullets[index][field] = value;
    setFormData(prev => ({ ...prev, tldrBullets: newBullets }));
  };

  const removeTldrBullet = (index) => {
    setFormData(prev => ({
      ...prev,
      tldrBullets: prev.tldrBullets.filter((_, i) => i !== index)
    }));
  };

  // Section management
  const addSection = () => {
    const newSection = {
      type: 'content',
      title: '',
      subtitle: '',
      content: '',
      items: [],
      order: formData.sections.length
    };
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const updateSection = (index, field, value) => {
    const newSections = [...formData.sections];
    newSections[index][field] = value;
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const removeSection = (index) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i }))
    }));
  };

  const moveSection = (index, direction) => {
    const newSections = [...formData.sections];
    if (direction === 'up' && index > 0) {
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
    } else if (direction === 'down' && index < newSections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    }
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const addItemToSection = (sectionIndex) => {
    const newSections = [...formData.sections];
    if (!newSections[sectionIndex].items) {
      newSections[sectionIndex].items = [];
    }
    newSections[sectionIndex].items.push({ title: '', description: '' });
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const updateSectionItem = (sectionIndex, itemIndex, field, value) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].items[itemIndex][field] = value;
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const removeSectionItem = (sectionIndex, itemIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].items.splice(itemIndex, 1);
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const addRowToTable = (sectionIndex) => {
    const newSections = [...formData.sections];
    if (!newSections[sectionIndex].rows) {
      newSections[sectionIndex].rows = [];
    }
    newSections[sectionIndex].rows.push({ cells: ['', '', ''] });
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const updateTableRow = (sectionIndex, rowIndex, cellIndex, value) => {
    const newSections = [...formData.sections];
    if (!newSections[sectionIndex].rows) {
      newSections[sectionIndex].rows = [];
    }
    if (!newSections[sectionIndex].rows[rowIndex]) {
      newSections[sectionIndex].rows[rowIndex] = { cells: [] };
    }
    if (!newSections[sectionIndex].rows[rowIndex].cells) {
      newSections[sectionIndex].rows[rowIndex].cells = [];
    }
    newSections[sectionIndex].rows[rowIndex].cells[cellIndex] = value;
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const removeTableRow = (sectionIndex, rowIndex) => {
    const newSections = [...formData.sections];
    if (newSections[sectionIndex].rows) {
      newSections[sectionIndex].rows.splice(rowIndex, 1);
    }
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const addColumnToTable = (sectionIndex) => {
    const newSections = [...formData.sections];
    if (newSections[sectionIndex].rows) {
      newSections[sectionIndex].rows.forEach(row => {
        if (!row.cells) row.cells = [];
        row.cells.push('');
      });
    }
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const addInlineCta = () => {
    setFormData(prev => ({
      ...prev,
      inlineCtas: [...prev.inlineCtas, {
        type: 'text',
        position: prev.inlineCtas.length + 1,
        title: '',
        copy: '',
        buttonText: 'Share My Requirements',
        buttonAction: 'requirements',
        preselectedValue: prev.category
      }]
    }));
  };

  const updateInlineCta = (index, field, value) => {
    const newCtas = [...formData.inlineCtas];
    newCtas[index][field] = value;
    setFormData(prev => ({ ...prev, inlineCtas: newCtas }));
  };

  const removeInlineCta = (index) => {
    setFormData(prev => ({
      ...prev,
      inlineCtas: prev.inlineCtas.filter((_, i) => i !== index)
    }));
  };

  const toggleRelatedGuide = (guideId) => {
    setFormData(prev => ({
      ...prev,
      relatedGuides: prev.relatedGuides.includes(guideId)
        ? prev.relatedGuides.filter(id => id !== guideId)
        : [...prev.relatedGuides.slice(0, 2), guideId]
    }));
  };

  const generateBodyFromSections = () => {
    if (!formData.sections || formData.sections.length === 0) {
      return '<p>No content sections added.</p>';
    }

    let html = '';
    
    formData.sections.forEach((section, idx) => {
      switch (section.type) {
        case 'intro':
          html += `<div class="intro-section mb-6"><p>${section.content || ''}</p></div>`;
          break;
        
        case 'content':
          html += `<div class="content-section mb-6">
            ${section.title ? `<h2>${section.title}</h2>` : ''}
            <p>${section.content || ''}</p>
          </div>`;
          break;
        
        case 'step':
          html += `<div class="step-section mb-6">
            ${section.title ? `<h2>${section.title}</h2>` : ''}
            ${section.subtitle ? `<p class="text-gray-600 mb-4">${section.subtitle}</p>` : ''}
            <ol class="list-decimal list-inside space-y-3">
              ${(section.items || []).map(item => `
                <li><strong>${item.title || ''}</strong>
                  ${item.description ? `<p class="ml-6 mt-1 text-gray-700">${item.description}</p>` : ''}
                </li>
              `).join('')}
            </ol>
          </div>`;
          break;
        
        case 'checklist':
          html += `<div class="checklist-section mb-6">
            ${section.title ? `<h2>${section.title}</h2>` : ''}
            ${section.subtitle ? `<p class="text-gray-600 mb-4">${section.subtitle}</p>` : ''}
            <ul class="list-none space-y-2">
              ${(section.items || []).map(item => `
                <li class="flex items-start gap-3">
                  <span class="text-green-600 text-lg">✓</span>
                  <div>
                    <strong>${item.title || ''}</strong>
                    ${item.description ? `<p class="text-gray-700 ml-0">${item.description}</p>` : ''}
                  </div>
                </li>
              `).join('')}
            </ul>
          </div>`;
          break;
        
        case 'callout':
          const calloutIcon = {
            'info': 'ℹ️',
            'warning': '⚠️',
            'pro-tip': '⭐'
          }[section.calloutType || 'info'];
          html += `<div class="callout-section mb-6 p-4 rounded-lg ${
            section.calloutType === 'warning' ? 'bg-amber-50 border-l-4 border-amber-500' :
            section.calloutType === 'pro-tip' ? 'bg-blue-50 border-l-4 border-blue-500' :
            'bg-gray-50 border-l-4 border-gray-500'
          }">
            ${section.title ? `<h3 class="font-semibold mb-2">${calloutIcon} ${section.title}</h3>` : ''}
            <p>${section.content || ''}</p>
          </div>`;
          break;
        
        case 'timeline':
          html += `<div class="timeline-section mb-6">
            ${section.title ? `<h2>${section.title}</h2>` : ''}
            <div class="space-y-4 mt-4">
              ${(section.items || []).map((item, i) => `
                <div class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">${i + 1}</div>
                    ${i < (section.items.length - 1) ? '<div class="w-1 h-12 bg-blue-200"></div>' : ''}
                  </div>
                  <div class="pt-1">
                    <strong>${item.title || ''}</strong>
                    ${item.duration ? `<p class="text-sm text-gray-600">${item.duration}</p>` : ''}
                    ${item.description ? `<p class="text-gray-700 mt-1">${item.description}</p>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>`;
          break;
        
        case 'comparison':
        case 'cost-table':
          html += `<div class="table-section mb-6 overflow-x-auto">
            ${section.title ? `<h2>${section.title}</h2>` : ''}
            <table class="w-full border-collapse border border-gray-300">
              ${(section.rows || []).map(row => `
                <tr>
                  ${(row.cells || []).map(cell => `<td class="border border-gray-300 p-3">${cell}</td>`).join('')}
                </tr>
              `).join('')}
            </table>
          </div>`;
          break;
        
        default:
          html += `<p>${section.content || ''}</p>`;
      }
    });

    return html;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.slug || !formData.metaDescription || !formData.heroImage || formData.sections.length === 0) {
      alert('Please fill in all required fields (title, slug, meta description, hero image, and at least one section)');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      
      // Generate body HTML from sections
      const generatedBody = generateBodyFromSections();
      
      // Prepare submission data
      const submitData = {
        ...formData,
        body: generatedBody // Store generated HTML
      };

      const url = article 
        ? `${process.env.NEXT_PUBLIC_API_URL}/guide-articles/${article._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/guide-articles`;
      
      const response = await fetch(url, {
        method: article ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submitData)
      });

      const data = await response.json();
      if (data.success) {
        alert(`Article ${article ? 'updated' : 'created'} successfully!`);
        onSave();
        onClose();
      } else {
        alert(data.message || 'Failed to save article');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Error saving article');
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {article ? 'Edit Article' : 'Create New Article'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="BUY">Buy</option>
                    <option value="INVEST">Invest</option>
                    <option value="OFF-PLAN">Off-Plan</option>
                    <option value="COMMERCIAL">Commercial</option>
                    <option value="SELL & RENT">Sell & Rent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Read Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => handleInputChange('readTime', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description (140-160 chars) <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="2"
                  maxLength="160"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.metaDescription.length}/160 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary (max 300 chars)
                </label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  maxLength="300"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.summary.length}/300 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated, optional)
                </label>
                <input
                  type="text"
                  value={formData.tags?.join(', ') || ''}
                  onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(t => t.trim()))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Dubai Marina, First-time buyer, Off-plan"
                />
              </div>

              {/* SEO Fields */}
              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold text-gray-900 mb-3">SEO Fields (Optional)</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OG Title (max 60 chars)
                  </label>
                  <input
                    type="text"
                    value={formData.ogTitle}
                    onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength="60"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.ogTitle.length}/60</p>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OG Description (max 160 chars)
                  </label>
                  <textarea
                    value={formData.ogDescription}
                    onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                    maxLength="160"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.ogDescription.length}/160</p>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OG Image URL (optional - defaults to hero image)
                  </label>
                  <input
                    type="text"
                    value={formData.ogImage}
                    onChange={(e) => handleInputChange('ogImage', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disclaimer (optional)
                </label>
                <textarea
                  value={formData.disclaimer}
                  onChange={(e) => handleInputChange('disclaimer', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Information is general guidance and may change. Please confirm details with relevant authorities..."
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Article</span>
                </label>
              </div>
            </div>

            {/* Hero Image */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Hero Image</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="hero-image-upload"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="hero-image-upload"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                      uploading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <FiUpload className="w-4 h-4" />
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </label>
                  {uploading && (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      <span className="text-sm text-gray-600">Processing image...</span>
                    </div>
                  )}
                  {!uploading && formData.heroImage && (
                    <span className="text-sm text-green-600 font-medium">✓ Image uploaded successfully!</span>
                  )}
                </div>
                {formData.heroImage && (
                  <p className="text-xs text-gray-500 mt-2">
                    Image URL: {formData.heroImage.substring(0, 60)}...
                  </p>
                )}
              </div>

              {formData.heroImage && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Preview
                  </label>
                  <img
                    src={formData.heroImage}
                    alt="Hero preview"
                    className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Caption (optional)
                </label>
                <input
                  type="text"
                  value={formData.heroImageCaption}
                  onChange={(e) => handleInputChange('heroImageCaption', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="A modern Dubai apartment with marina views..."
                />
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Content Sections</h3>
                <button
                  type="button"
                  onClick={addSection}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
                >
                  <span>+ Add Section</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.sections.map((section, index) => (
                  <div key={index} className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-lg space-y-3">
                    {/* Section Header */}
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <select
                            value={section.type}
                            onChange={(e) => updateSection(index, 'type', e.target.value)}
                            className="px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 font-medium"
                          >
                            <option value="intro">Intro</option>
                            <option value="content">Content</option>
                            <option value="step">Step by Step</option>
                            <option value="checklist">Checklist</option>
                            <option value="callout">Callout</option>
                            <option value="cost-table">Cost Table</option>
                            <option value="timeline">Timeline</option>
                            <option value="comparison">Comparison</option>
                          </select>
                          <span className="text-xs text-gray-500">Section {index + 1} of {formData.sections.length}</span>
                        </div>

                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => updateSection(index, 'title', e.target.value)}
                          placeholder="Section Title"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => moveSection(index, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move up"
                        >
                          <FiChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection(index, 'down')}
                          disabled={index === formData.sections.length - 1}
                          className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move down"
                        >
                          <FiChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSection(index)}
                          className="p-1 text-gray-500 hover:text-red-600"
                          title="Delete section"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Optional Subtitle */}
                    {['step', 'checklist', 'timeline'].includes(section.type) && (
                      <input
                        type="text"
                        value={section.subtitle || ''}
                        onChange={(e) => updateSection(index, 'subtitle', e.target.value)}
                        placeholder="Optional subtitle/intro text"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    )}

                    {/* Content Textarea */}
                    {['intro', 'content', 'callout'].includes(section.type) && (
                      <textarea
                        value={section.content || ''}
                        onChange={(e) => updateSection(index, 'content', e.target.value)}
                        placeholder={`Enter ${section.type} content...`}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                        rows="3"
                      />
                    )}

                    {/* Callout Type Selector */}
                    {section.type === 'callout' && (
                      <select
                        value={section.calloutType || 'info'}
                        onChange={(e) => updateSection(index, 'calloutType', e.target.value)}
                        className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="info">ℹ️ Information</option>
                        <option value="warning">⚠️ Warning</option>
                        <option value="pro-tip">⭐ Pro Tip</option>
                      </select>
                    )}

                    {/* Items (for steps, checklists, timelines) */}
                    {['step', 'checklist', 'timeline'].includes(section.type) && (
                      <div className="space-y-2 pt-2 border-t border-gray-200">
                        {(section.items || []).map((item, itemIndex) => (
                          <div key={itemIndex} className="flex gap-2 bg-white p-2 rounded border border-gray-200">
                            <div className="flex-1 space-y-1">
                              <input
                                type="text"
                                value={item.title || ''}
                                onChange={(e) => updateSectionItem(index, itemIndex, 'title', e.target.value)}
                                placeholder={`${section.type === 'timeline' ? 'Timeline point' : 'Item title'}`}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 font-medium"
                              />
                              <textarea
                                value={item.description || ''}
                                onChange={(e) => updateSectionItem(index, itemIndex, 'description', e.target.value)}
                                placeholder="Description or details"
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                rows="2"
                              />
                              {section.type === 'timeline' && (
                                <input
                                  type="text"
                                  value={item.duration || ''}
                                  onChange={(e) => updateSectionItem(index, itemIndex, 'duration', e.target.value)}
                                  placeholder="Duration (e.g., 2-3 weeks)"
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                />
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeSectionItem(index, itemIndex)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addItemToSection(index)}
                          className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded text-gray-600 hover:border-blue-500 hover:text-blue-600 text-sm transition-colors"
                        >
                          + Add Item
                        </button>
                      </div>
                    )}

                    {/* Table (for cost-table and comparison) */}
                    {['cost-table', 'comparison'].includes(section.type) && (
                      <div className="space-y-2 pt-2 border-t border-gray-200">
                        <div className="overflow-x-auto bg-white rounded border border-gray-200">
                          {(section.rows || []).length > 0 ? (
                            <table className="w-full text-sm">
                              <tbody>
                                {section.rows.map((row, rowIndex) => (
                                  <tr key={rowIndex} className="border-b border-gray-200">
                                    {(row.cells || []).map((cell, cellIndex) => (
                                      <td key={cellIndex} className="border-r border-gray-200 last:border-r-0">
                                        <input
                                          type="text"
                                          value={cell || ''}
                                          onChange={(e) => updateTableRow(index, rowIndex, cellIndex, e.target.value)}
                                          className="w-full px-2 py-2 border-0 focus:ring-2 focus:ring-blue-500 text-xs"
                                          placeholder="Cell content"
                                        />
                                      </td>
                                    ))}
                                    <td className="p-1 bg-gray-50">
                                      <button
                                        type="button"
                                        onClick={() => removeTableRow(index, rowIndex)}
                                        className="text-red-600 hover:text-red-800 p-1"
                                        title="Delete row"
                                      >
                                        <FiTrash2 className="w-3 h-3" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">No rows yet. Click "Add Row" to start.</div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => addRowToTable(index)}
                            className="flex-1 px-3 py-2 border-2 border-dashed border-green-300 rounded text-green-600 hover:border-green-500 hover:text-green-700 text-sm font-medium transition-colors"
                          >
                            + Add Row
                          </button>
                          {(section.rows || []).length > 0 && (
                            <button
                              type="button"
                              onClick={() => addColumnToTable(index)}
                              className="flex-1 px-3 py-2 border-2 border-dashed border-blue-300 rounded text-blue-600 hover:border-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
                            >
                              + Add Column
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {formData.sections.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500 mb-4">No sections yet. Start by clicking "Add Section"</p>
                    <button
                      type="button"
                      onClick={addSection}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Create First Section
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 mt-32 pt-8">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">TL;DR Bullets (Optional, max 5)</h3>
                <button
                  type="button"
                  onClick={addTldrBullet}
                  disabled={formData.tldrBullets.length >= 5}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Bullet
                </button>
              </div>

              {formData.tldrBullets.map((bullet, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-700">Bullet #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeTldrBullet(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <select
                    value={bullet.icon}
                    onChange={(e) => updateTldrBullet(index, 'icon', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="check">✓ Check</option>
                    <option value="clock">⏱ Clock/Timeline</option>
                    <option value="dollar">$ Cost</option>
                    <option value="warning">⚠ Warning</option>
                  </select>

                  <textarea
                    value={bullet.text}
                    onChange={(e) => updateTldrBullet(index, 'text', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="2"
                    placeholder="e.g., Typically takes 20-30 days from offer to closing"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4 mt-8 pt-8 border-t">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">FAQs (Optional)</h3>
                <button
                  type="button"
                  onClick={addFaq}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                  Add FAQ
                </button>
              </div>

              {formData.faqs.map((faq, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-700">FAQ #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaq(index, 'question', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Question"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="Answer"
                  />
                </div>
              ))}
            </div>

            {/* Inline CTAs */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Inline CTAs (Optional)</h3>
                <button
                  type="button"
                  onClick={addInlineCta}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                  Add CTA
                </button>
              </div>

              {formData.inlineCtas.map((cta, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-700">CTA #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeInlineCta(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={cta.type}
                      onChange={(e) => updateInlineCta(index, 'type', e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="text">Text CTA</option>
                      <option value="card">Card CTA</option>
                    </select>
                    
                    <select
                      value={cta.buttonAction}
                      onChange={(e) => updateInlineCta(index, 'buttonAction', e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="requirements">Requirements Form</option>
                      <option value="consultation">Consultation</option>
                    </select>
                  </div>

                  {cta.type === 'card' && (
                    <input
                      type="text"
                      value={cta.title}
                      onChange={(e) => updateInlineCta(index, 'title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="CTA Title"
                    />
                  )}

                  <textarea
                    value={cta.copy}
                    onChange={(e) => updateInlineCta(index, 'copy', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="2"
                    placeholder="CTA Copy"
                  />

                  <input
                    type="text"
                    value={cta.buttonText}
                    onChange={(e) => updateInlineCta(index, 'buttonText', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Button Text"
                  />
                </div>
              ))}
            </div>

            {/* Related Guides */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Related Guides (Max 3)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                {allArticles.map(guide => (
                  <label key={guide._id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.relatedGuides.includes(guide._id)}
                      onChange={() => toggleRelatedGuide(guide._id)}
                      disabled={!formData.relatedGuides.includes(guide._id) && formData.relatedGuides.length >= 3}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{guide.title}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || uploading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : (article ? 'Update Article' : 'Create Article')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
