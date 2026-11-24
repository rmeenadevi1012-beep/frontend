import React, { useState, useEffect } from 'react';
import { initialGallery } from '../../data/mockData';
import {
  Image as GalleryIcon,
  X,
  ZoomIn,
  Plus,
  Trash2,
  Upload,
  Calendar,
  Tag,
  CheckCircle2,
  FileImage
} from 'lucide-react';

function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Gallery items state with localStorage persistence
  const [galleryItems, setGalleryItems] = useState(() => {
    try {
      const stored = localStorage.getItem('edulearn_gallery_items');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return initialGallery;
  });

  useEffect(() => {
    try {
      localStorage.setItem('edulearn_gallery_items', JSON.stringify(galleryItems));
    } catch {
      // ignore
    }
  }, [galleryItems]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // New photo form state
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Campus',
    tag: 'Campus Infrastructure',
    description: '',
    imageUrl: '',
    previewUrl: '',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  });

  const categories = ['All', 'Events', 'Campus', 'Competitions', 'Seminars', 'Cultural'];

  // Filtered gallery items
  const filtered =
    filter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  // Handle local file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto((prev) => ({
          ...prev,
          imageUrl: reader.result,
          previewUrl: reader.result,
          title: prev.title || file.name.replace(/\.[^/.]+$/, ""),
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleAddPhotoSubmit = (e) => {
    e.preventDefault();
    const finalUrl = newPhoto.previewUrl || newPhoto.imageUrl;
    if (!finalUrl) {
      alert('Please upload an image file or provide an Image URL.');
      return;
    }
    if (!newPhoto.title.trim()) {
      alert('Please enter a title for the picture.');
      return;
    }

    const createdItem = {
      id: Date.now(),
      title: newPhoto.title.trim(),
      category: newPhoto.category,
      tag: newPhoto.tag || newPhoto.category,
      date: newPhoto.date,
      description: newPhoto.description || 'Captured at EduLearn Campus.',
      subtitle: newPhoto.description || 'Captured at EduLearn Campus.',
      imageUrl: finalUrl,
      image: finalUrl,
    };

    setGalleryItems((prev) => [createdItem, ...prev]);
    setIsAddModalOpen(false);
    setNewPhoto({
      title: '',
      category: 'Campus',
      tag: 'Campus Infrastructure',
      description: '',
      imageUrl: '',
      previewUrl: '',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    });
    showToast(`✓ Picture "${createdItem.title}" added to gallery!`);
  };

  // Handle photo deletion
  const handleDeletePhoto = (e, id, title) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove "${title}" from the gallery?`)) {
      setGalleryItems((prev) => prev.filter((item) => item.id !== id));
      if (selectedImage?.id === id) {
        setSelectedImage(null);
      }
      showToast(`Photo "${title}" removed.`);
    }
  };

  return (
    <div className="el-dashboard-content">
      {/* Toast Alert */}
      {toastMessage && <div className="el-toast">{toastMessage}</div>}

      {/* Header */}
      <div className="el-page-header">
        <div className="el-page-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ margin: 0 }}>Campus & Life Gallery</h1>
            <span style={{
              background: '#ede6fe',
              color: '#6e34e2',
              fontWeight: 800,
              fontSize: '13px',
              padding: '3px 10px',
              borderRadius: '20px'
            }}>
              {galleryItems.length} Photos
            </span>
          </div>
          <p>
            Memorable milestones, modern infrastructure, and student activities across EduLearn campus.
          </p>
        </div>

        <button
          type="button"
          className="el-btn el-btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px' }}
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={18} />
          <span>Add Picture</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '22px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`el-btn ${filter === cat ? 'el-btn-primary' : 'el-btn-secondary'}`}
            style={{ borderRadius: '20px', padding: '7px 18px', fontSize: '13px', fontWeight: 600 }}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filtered.length === 0 ? (
        <div className="el-empty-state-box" style={{ background: '#ffffff', padding: '50px 20px', borderRadius: '16px', border: '1px solid var(--el-border-light)' }}>
          <div className="el-empty-state-icon purple">
            <GalleryIcon size={32} />
          </div>
          <h4 className="el-empty-state-title">No Pictures in "{filter}"</h4>
          <p className="el-empty-state-desc">
            No photos found under this category. Click "Add Picture" to upload photos.
          </p>
          <button
            type="button"
            className="el-btn el-btn-primary"
            style={{ marginTop: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} />
            <span>Add Picture Now</span>
          </button>
        </div>
      ) : (
        <div className="el-gallery-grid">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="el-gallery-item"
              onClick={() => setSelectedImage(item)}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <div className="el-gallery-image-box">
                <img
                  src={item.imageUrl || item.image}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.65)',
                    backdropFilter: 'blur(4px)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <ZoomIn size={12} /> View
                </div>

                {/* Quick Delete Icon */}
                <button
                  type="button"
                  title="Delete Picture"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(239, 68, 68, 0.85)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s'
                  }}
                  onClick={(e) => handleDeletePhoto(e, item.id, item.title)}
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div className="el-gallery-info">
                <span className="el-gallery-tag">{item.tag || item.category} • {item.date || 'Recent'}</span>
                <h3 className="el-gallery-title">{item.title}</h3>
                <p className="el-gallery-desc">{item.description || item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="el-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div
            className="el-modal-container"
            style={{ maxWidth: '800px', background: '#0f172a', color: '#ffffff', padding: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 22px',
                borderBottom: '1px solid #1e293b',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#f8fafc' }}>
                  {selectedImage.title}
                </h3>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {selectedImage.tag || selectedImage.category} • {selectedImage.date || 'Recent'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '4px' }}
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ maxHeight: '520px', overflow: 'hidden', display: 'flex', justifyContent: 'center', background: '#020617' }}>
              <img
                src={selectedImage.imageUrl || selectedImage.image}
                alt={selectedImage.title}
                style={{ maxWidth: '100%', maxHeight: '520px', objectFit: 'contain' }}
              />
            </div>

            <div style={{ padding: '18px 22px', color: '#cbd5e1', fontSize: '14px', lineHeight: 1.5, background: '#0f172a' }}>
              {selectedImage.description || selectedImage.subtitle}
            </div>
          </div>
        </div>
      )}

      {/* Add Photo Modal */}
      {isAddModalOpen && (
        <div className="el-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div
            className="el-modal-container"
            style={{ maxWidth: '580px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="el-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GalleryIcon size={20} color="var(--el-purple-main)" />
                <h3 className="el-modal-title">Add Picture to Campus Gallery</h3>
              </div>
              <button
                type="button"
                className="el-modal-close-btn"
                onClick={() => setIsAddModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit}>
              <div className="el-modal-body" style={{ maxHeight: '72vh', overflowY: 'auto' }}>
                {/* Title */}
                <div className="el-form-group">
                  <label className="el-form-label">Picture Title *</label>
                  <input
                    type="text"
                    className="el-form-input"
                    placeholder="e.g. AI Hackathon Grand Finale or Campus Garden"
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                    required
                  />
                </div>

                {/* Category & Tag */}
                <div className="el-form-row">
                  <div className="el-form-group">
                    <label className="el-form-label">Category</label>
                    <select
                      className="el-form-select"
                      value={newPhoto.category}
                      onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value, tag: e.target.value })}
                    >
                      <option value="Campus">Campus</option>
                      <option value="Events">Events</option>
                      <option value="Competitions">Competitions</option>
                      <option value="Seminars">Seminars</option>
                      <option value="Cultural">Cultural</option>
                    </select>
                  </div>

                  <div className="el-form-group">
                    <label className="el-form-label">Tag / Sub-Label</label>
                    <input
                      type="text"
                      className="el-form-input"
                      placeholder="e.g. Student Lab"
                      value={newPhoto.tag}
                      onChange={(e) => setNewPhoto({ ...newPhoto, tag: e.target.value })}
                    />
                  </div>
                </div>

                {/* File Upload from Device */}
                <div className="el-form-group">
                  <label className="el-form-label">Upload Image from Laptop</label>
                  <div style={{
                    border: '2px dashed #cbd5e1',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    background: '#f8fafc',
                    cursor: 'pointer',
                    position: 'relative'
                  }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                    />
                    <Upload size={28} color="#6e34e2" style={{ margin: '0 auto 8px auto', display: 'block' }} />
                    <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                      Click to choose an image file from your device
                    </p>
                    <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                      Supports PNG, JPG, JPEG, WEBP
                    </span>
                  </div>
                </div>

                {/* OR Image URL */}
                <div className="el-form-group">
                  <label className="el-form-label">Or Paste Image URL</label>
                  <input
                    type="url"
                    className="el-form-input"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newPhoto.imageUrl}
                    onChange={(e) =>
                      setNewPhoto({ ...newPhoto, imageUrl: e.target.value, previewUrl: e.target.value })
                    }
                  />
                </div>

                {/* Image Live Preview */}
                {newPhoto.previewUrl && (
                  <div style={{ marginBottom: '16px' }}>
                    <label className="el-form-label" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <CheckCircle2 size={13} color="#10b981" /> Preview Selected Picture
                    </label>
                    <div style={{
                      height: '160px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: '1px solid #e2e8f0',
                      background: '#000'
                    }}>
                      <img
                        src={newPhoto.previewUrl}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="el-form-group">
                  <label className="el-form-label">Description / Caption</label>
                  <textarea
                    className="el-form-input"
                    rows="2"
                    placeholder="Brief description of the event or campus facility..."
                    value={newPhoto.description}
                    onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="el-modal-footer">
                <button
                  type="button"
                  className="el-btn el-btn-outline"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="el-btn el-btn-primary">
                  Add Picture to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
