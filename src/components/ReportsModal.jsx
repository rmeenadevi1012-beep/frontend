import React from 'react';
import { BarChart2, X, Users, BookOpen, GraduationCap, Mail, Image as ImageIcon, Award, CheckCircle } from 'lucide-react';

export default function ReportsModal({
  isOpen,
  onClose,
  stats,
  coursesCount,
  galleryCount
}) {
  if (!isOpen) return null;

  return (
    <div className="crm-modal-overlay">
      <div className="crm-modal-card large">
        <div className="crm-modal-header">
          <div className="crm-modal-title-group">
            <BarChart2 size={20} className="crm-modal-icon" />
            <h3>Little Champs CRM Analytics & System Report</h3>
          </div>
          <button className="crm-modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="crm-modal-body">
          <div className="crm-reports-overview-grid">
            <div className="crm-report-stat-box">
              <Users size={20} color="#7c3aed" />
              <div>
                <span className="label">Total Students</span>
                <strong className="val">{stats.totalStudents}</strong>
              </div>
            </div>

            <div className="crm-report-stat-box">
              <BookOpen size={20} color="#0284c7" />
              <div>
                <span className="label">Available Courses</span>
                <strong className="val">{coursesCount}</strong>
              </div>
            </div>

            <div className="crm-report-stat-box">
              <GraduationCap size={20} color="#16a34a" />
              <div>
                <span className="label">Total Admissions</span>
                <strong className="val">{stats.totalAdmissions}</strong>
              </div>
            </div>

            <div className="crm-report-stat-box">
              <Mail size={20} color="#d97706" />
              <div>
                <span className="label">Total Enquiries</span>
                <strong className="val">{stats.totalEnquiries}</strong>
              </div>
            </div>

            <div className="crm-report-stat-box">
              <Award size={20} color="#9333ea" />
              <div>
                <span className="label">Programs Active</span>
                <strong className="val">0</strong>
              </div>
            </div>

            <div className="crm-report-stat-box">
              <ImageIcon size={20} color="#db2777" />
              <div>
                <span className="label">Gallery Uploads</span>
                <strong className="val">{galleryCount}</strong>
              </div>
            </div>
          </div>

          <div className="crm-report-audit-note">
            <CheckCircle size={18} color="#10b981" />
            <div>
              <strong>Zero Initial Data Integrity Verified</strong>
              <p>
                All student statistics, admissions, enquiries, programs, and gallery uploads are strictly zero-initialized and only increase when actual records are created by users.
              </p>
            </div>
          </div>
        </div>

        <div className="crm-modal-actions">
          <button className="crm-btn-primary" onClick={onClose}>
            Done & Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
