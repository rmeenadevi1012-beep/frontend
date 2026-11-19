import React, { useState } from 'react';
import { X, Users, UserCheck, Shield, Plus } from 'lucide-react';
import { initialUsers } from '../../data/mockData';

function ManageUsersModal({ isOpen, onClose }) {
  const [userList, setUserList] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Instructor' });
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isOpen) return null;

  const handleToggleStatus = (id) => {
    setUserList((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
          : u
      )
    );
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    setUserList((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: 'Active',
        lastLogin: 'Just registered',
      },
    ]);
    setNewUser({ name: '', email: '', role: 'Instructor' });
    setShowAddForm(false);
  };

  return (
    <div className="el-modal-overlay" onClick={onClose}>
      <div
        className="el-modal-container"
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="el-modal-header">
          <h3 className="el-modal-title">
            <Users size={20} color="var(--el-purple-main)" />
            CRM User & Role Management
          </h3>
          <button type="button" className="el-modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="el-modal-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
              Authorized Staff & Administrators ({userList.length})
            </span>
            <button
              type="button"
              className="el-btn el-btn-primary"
              style={{ padding: '6px 12px', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <Plus size={14} />
              {showAddForm ? 'Cancel' : 'Add Staff User'}
            </button>
          </div>

          {showAddForm && (
            <form
              onSubmit={handleCreateUser}
              style={{
                background: '#f8fafc',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                marginBottom: '16px',
              }}
            >
              <div className="el-form-row">
                <div className="el-form-group">
                  <label className="el-form-label">Full Name</label>
                  <input
                    type="text"
                    className="el-form-input"
                    placeholder="Staff name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                  />
                </div>
                <div className="el-form-group">
                  <label className="el-form-label">Email</label>
                  <input
                    type="email"
                    className="el-form-input"
                    placeholder="staff@edulearn.edu"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="el-form-row">
                <div className="el-form-group">
                  <label className="el-form-label">Access Role</label>
                  <select
                    className="el-form-select"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <option value="Instructor">Instructor</option>
                    <option value="Academic Advisor">Academic Advisor</option>
                    <option value="Department Head">Department Head</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
                <div className="el-form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button type="submit" className="el-btn el-btn-primary" style={{ width: '100%' }}>
                    Save User
                  </button>
                </div>
              </div>
            </form>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {userList.map((user) => (
              <div
                key={user.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: '#ffffff',
                  border: '1px solid #edf2f7',
                  borderRadius: '8px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#1e202e' }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {user.email} • <span style={{ color: '#6e34e2', fontWeight: 600 }}>{user.role}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    className={`el-status-badge ${
                      user.status === 'Active' ? 'confirmed' : 'pending'
                    }`}
                  >
                    {user.status}
                  </span>
                  <button
                    type="button"
                    style={{
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleToggleStatus(user.id)}
                  >
                    {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="el-modal-footer">
          <button type="button" className="el-btn el-btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageUsersModal;
