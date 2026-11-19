import React from 'react';
import { MessageSquare, Mail } from 'lucide-react';

function RecentMessages({ messages, onViewAll, onSelectMessage }) {
  return (
    <div className="el-dashboard-card">
      {/* Header */}
      <div className="el-card-header">
        <div className="el-card-header-left">
          <div className="el-card-header-icon">
            <MessageSquare size={19} strokeWidth={2.2} />
          </div>
          <h3 className="el-card-title">Recent Messages</h3>
          {messages && messages.length > 0 && (
            <span className="el-badge-count orange">{messages.length}</span>
          )}
        </div>

        <button
          type="button"
          className="el-card-view-all"
          onClick={onViewAll}
        >
          View All <span style={{ marginLeft: '2px' }}>→</span>
        </button>
      </div>

      {/* Messages Table */}
      <div className="el-table-responsive">
        {!messages || messages.length === 0 ? (
          <div className="el-empty-state-box">
            <div className="el-empty-state-icon orange">
              <Mail size={26} />
            </div>
            <h4 className="el-empty-state-title">No inquiries yet</h4>
            <p className="el-empty-state-desc">
              Messages submitted through the Contact Helpdesk will arrive here.
            </p>
          </div>
        ) : (
          <table className="el-messages-table">
            <thead>
              <tr>
                <th style={{ width: '32%' }}>From</th>
                <th style={{ width: '48%' }}>Subject</th>
                <th style={{ width: '20%' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg.id}
                  onClick={() => onSelectMessage && onSelectMessage(msg)}
                  style={{ cursor: onSelectMessage ? 'pointer' : 'default' }}
                >
                  <td>
                    <div className="el-msg-sender">
                      <div className="el-msg-avatar">{msg.avatarChar}</div>
                      <span className="el-msg-name">{msg.from}</span>
                    </div>
                  </td>
                  <td>
                    <div className="el-msg-subject" title={msg.subject}>
                      {msg.subject}
                    </div>
                  </td>
                  <td>
                    <span className="el-msg-date">{msg.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RecentMessages;
