import React, { useState } from 'react';
import { initialGallery } from '../../data/mockData';
import { Image, X, ZoomIn } from 'lucide-react';

function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['All', 'Events', 'Campus', 'Competitions', 'Seminars', 'Cultural'];

  const filtered =
    filter === 'All'
      ? initialGallery
      : initialGallery.filter((item) => item.category === filter);

  return (
    <div className="el-dashboard-content">
      {/* Header */}
      <div className="el-page-header">
        <div className="el-page-title-group">
          <h1>Campus & Life Gallery</h1>
          <p>Memorable milestones, modern infrastructure, and student activities across EduLearn campus.</p>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`el-btn ${filter === cat ? 'el-btn-primary' : 'el-btn-secondary'}`}
            style={{ borderRadius: '20px', padding: '6px 16px', fontSize: '13px' }}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="el-gallery-grid">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="el-gallery-item"
            onClick={() => setSelectedImage(item)}
            style={{ cursor: 'pointer' }}
          >
            <div className="el-gallery-image-box">
              <img src={item.imageUrl} alt={item.title} loading="lazy" />
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <ZoomIn size={12} /> View
              </div>
            </div>

            <div className="el-gallery-info">
              <span className="el-gallery-tag">{item.tag} • {item.date}</span>
              <h3 className="el-gallery-title">{item.title}</h3>
              <p className="el-gallery-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="el-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div
            className="el-modal-container"
            style={{ maxWidth: '750px', background: '#0f172a', color: '#ffffff' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: '1px solid #334155',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#f8fafc' }}>{selectedImage.title}</h3>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{selectedImage.tag} • {selectedImage.date}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ maxHeight: '480px', overflow: 'hidden', display: 'flex', justifyContent: 'center', background: '#020617' }}>
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                style={{ maxWidth: '100%', maxHeight: '480px', objectFit: 'contain' }}
              />
            </div>

            <div style={{ padding: '16px 20px', color: '#cbd5e1', fontSize: '13.5px' }}>
              {selectedImage.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
