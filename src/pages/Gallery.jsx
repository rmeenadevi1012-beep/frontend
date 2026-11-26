<<<<<<< HEAD
import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  FolderOpen,
  X,
  Upload,
  Sparkles,
  Eye
} from 'lucide-react';

export default function Gallery({ galleryUploads, onAddUpload, onDeleteUpload }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Campus & Facilities',
    imageUrl: ''
  });
  const [formError, setFormError] = useState('');

  const categories = [
    'All',
    'Campus & Facilities',
    'Computer Labs',
    'Classroom Activities',
    'Events & Seminars',
    'Student Achievements'
  ];

  const handleOpenModal = () => {
    setFormData({
      title: '',
      category: 'Computer Labs',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80'
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.imageUrl.trim()) {
      setFormError('Please provide a Photo Title and Image URL.');
      return;
    }

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')} ${today.toLocaleString('en-US', { month: 'short' })} ${today.getFullYear()}`;

    const newPhoto = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      category: formData.category,
      imageUrl: formData.imageUrl.trim(),
      uploadDate: formattedDate
    };

    onAddUpload(newPhoto);
    setIsModalOpen(false);
  };

  const filteredUploads = galleryUploads.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="crm-gallery-page">
      {/* 1. Header */}
      <div className="crm-page-header-row">
        <div>
          <div className="crm-header-badge">
            <Sparkles size={14} />
            <span>Visual Media Repository</span>
          </div>
          <h2 className="crm-page-title">
            School Gallery <span className="crm-count-badge">({galleryUploads.length})</span>
          </h2>
          <p className="crm-page-subtitle">
            Manage media highlights, coding workshop photos, campus events, and student lab activities.
          </p>
        </div>
        <button className="crm-btn-primary" onClick={handleOpenModal}>
          <Plus size={18} />
          <span>Upload Photo</span>
        </button>
      </div>

      {/* 2. Categories Filter */}
      <div className="crm-gallery-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`crm-gallery-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Media Grid */}
      {filteredUploads.length === 0 ? (
        <div className="crm-card crm-empty-state large">
          <FolderOpen size={48} className="crm-empty-icon" />
          <h3 className="crm-empty-title">Gallery Uploads: 0</h3>
          <p className="crm-empty-desc">
            {galleryUploads.length === 0
              ? 'Initially, all gallery uploads start at ZERO. Click "Upload Photo" to add your first photo record to the school CRM.'
              : `No photos uploaded under category "${selectedCategory}".`}
          </p>
          <button className="crm-btn-primary" onClick={handleOpenModal}>
            <Upload size={16} />
            <span>Upload Photo Now</span>
          </button>
        </div>
      ) : (
        <div className="crm-gallery-grid">
          {filteredUploads.map((item) => (
            <div key={item.id} className="crm-gallery-card">
              <div className="crm-gallery-thumb-wrap">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="crm-gallery-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <span className="crm-gallery-cat-pill">{item.category}</span>
                <div className="crm-gallery-overlay">
                  <button
                    className="crm-gallery-action-btn view"
                    onClick={() => setPreviewImage(item)}
                    title="View Full Size"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className="crm-gallery-action-btn delete"
                    onClick={() => onDeleteUpload && onDeleteUpload(item.id)}
                    title="Delete Image"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="crm-gallery-meta">
                <h4 className="crm-gallery-item-title">{item.title}</h4>
                <span className="crm-gallery-date">Uploaded: {item.uploadDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Upload Modal */}
      {isModalOpen && (
        <div className="crm-modal-overlay">
          <div className="crm-modal-card">
            <div className="crm-modal-header">
              <div className="crm-modal-title-group">
                <Upload size={20} className="crm-modal-icon" />
                <h3>Upload School Photo</h3>
              </div>
              <button
                className="crm-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="crm-modal-form">
              {formError && (
                <div className="crm-form-error-alert">
                  <span>{formError}</span>
                </div>
              )}

              <div className="crm-form-group">
                <label className="crm-label">Photo Title *</label>
                <input
                  type="text"
                  required
                  className="crm-input"
                  placeholder="e.g. Advanced AI & Robotics Lab Session"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="crm-form-group">
                <label className="crm-label">Category *</label>
                <select
                  className="crm-select"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {categories
                    .filter((c) => c !== 'All')
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              <div className="crm-form-group">
                <label className="crm-label">Image URL *</label>
                <input
                  type="url"
                  required
                  className="crm-input"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                />
              </div>

              <div className="crm-modal-actions">
                <button
                  type="button"
                  className="crm-btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="crm-btn-primary">
                  Save & Increment Count
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Full-Size Image Preview Modal */}
      {previewImage && (
        <div
          className="crm-modal-overlay"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="crm-modal-card image-preview"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="crm-modal-header">
              <h3>{previewImage.title}</h3>
              <button
                className="crm-modal-close-btn"
                onClick={() => setPreviewImage(null)}
              >
                <X size={20} />
              </button>
            </div>
            <img
              src={previewImage.imageUrl}
              alt={previewImage.title}
              className="crm-full-preview-img"
            />
          </div>
        </div>
      )}
    </div>
  );
}
=======
import GalleryPage from '../components/pages/GalleryPage';
export default GalleryPage;
>>>>>>> 43fe63ed57b74819d8462964507dc5759d388f46
