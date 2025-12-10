"use client";
import { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { FiX, FiPlus, FiTrash2, FiUpload } from 'react-icons/fi';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import '../app/admin/guide-articles/editor.css';

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
    faqs: [],
    inlineCtas: [],
    relatedGuides: [],
    readTime: 5,
    status: 'draft',
    featured: false
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [allArticles, setAllArticles] = useState([]);
  const quillRef = useRef(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.slug || !formData.metaDescription || !formData.heroImage || !formData.body) {
      alert('Please fill in all required fields (title, slug, meta description, hero image, body)');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const url = article 
        ? `${process.env.NEXT_PUBLIC_API_URL}/guide-articles/${article._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/guide-articles`;
      
      const response = await fetch(url, {
        method: article ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
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

  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [2, 3, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: () => handleEditorImageUpload()
      }
    }
  }), []);

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

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Article Body</h3>
              <div className="rounded-lg">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={formData.body}
                  onChange={(value) => handleInputChange('body', value)}
                  modules={quillModules}
                  className="h-96"
                />
              </div>
            </div>

            <div className="space-y-4 mt-32 pt-8">
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
