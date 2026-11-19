import React, { useState } from 'react';
import { initialFaqs } from '../../data/mockData';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

function FaqPage() {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [openId, setOpenId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="el-dashboard-content">
      {/* Header */}
      <div className="el-page-header">
        <div className="el-page-title-group">
          <h1>Frequently Asked Questions</h1>
          <p>Quick answers to common questions about EduLearn CRM administration and admissions workflows.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: '14px 20px',
          border: '1px solid var(--el-border-light)',
          boxShadow: 'var(--el-shadow-card)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          maxWidth: '860px',
        }}
      >
        <Search size={19} color="#64748b" />
        <input
          type="text"
          placeholder="Search FAQs by keywords, topic, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: '14px',
            fontFamily: 'var(--el-font)',
          }}
        />
      </div>

      {/* Accordion Container */}
      <div className="el-faq-container">
        {filtered.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="el-faq-item">
              <button
                type="button"
                className="el-faq-question-btn"
                onClick={() => toggleFaq(faq.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <HelpCircle size={18} color="var(--el-purple-main)" />
                  <span>{faq.question}</span>
                </div>
                {isOpen ? (
                  <ChevronUp size={18} color="var(--el-purple-main)" />
                ) : (
                  <ChevronDown size={18} color="#64748b" />
                )}
              </button>

              {isOpen && (
                <div className="el-faq-answer">
                  <div style={{ marginBottom: '6px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: 'var(--el-purple-main)',
                        background: '#ede6fe',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {faq.category}
                    </span>
                  </div>
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FaqPage;
