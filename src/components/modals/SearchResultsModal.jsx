import { Search, X, User, BookOpen, Settings } from 'lucide-react';

function SearchResultsModal({
  isOpen,
  onClose,
  searchTerm,
  students,
  courses,
  services,
  onSelectStudent,
  onSelectCourse,
  onSelectService,
}) {
  if (!isOpen || !searchTerm) return null;

  const term = searchTerm.toLowerCase();

  const filteredStudents = students.filter(
    (s) =>
      s.studentName.toLowerCase().includes(term) ||
      s.course.toLowerCase().includes(term)
  );

  const filteredCourses = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(term) ||
      c.code.toLowerCase().includes(term) ||
      c.department.toLowerCase().includes(term)
  );

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(term) ||
      s.category.toLowerCase().includes(term)
  );

  const totalResults =
    filteredStudents.length + filteredCourses.length + filteredServices.length;

  return (
    <div className="el-modal-overlay" onClick={onClose}>
      <div
        className="el-modal-container"
        style={{ maxWidth: '600px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="el-modal-header">
          <h3 className="el-modal-title">
            <Search size={18} color="var(--el-purple-main)" />
            Search Results for "{searchTerm}" ({totalResults} found)
          </h3>
          <button type="button" className="el-modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="el-modal-body" style={{ maxHeight: '450px', overflowY: 'auto' }}>
          {totalResults === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: '#94a3b8' }}>
              No matching records found for "{searchTerm}".
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirected: 'column', gap: '16px' }}>
              {/* Students Section */}
              {filteredStudents.length > 0 && (
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#6e34e2', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Students ({filteredStudents.length})
                  </div>
                  {filteredStudents.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        onSelectStudent(s);
                        onClose();
                      }}
                      style={{
                        padding: '10px 12px',
                        background: '#f8fafc',
                        borderRadius: '6px',
                        marginBottom: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User size={16} color="#6e34e2" />
                        <span style={{ fontWeight: 600, fontSize: '13.5px' }}>{s.studentName}</span>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>({s.course})</span>
                      </div>
                      <span className={`el-status-badge ${s.status === 'Confirmed' ? 'confirmed' : 'pending'}`}>
                        {s.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Courses Section */}
              {filteredCourses.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e88e5', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Courses ({filteredCourses.length})
                  </div>
                  {filteredCourses.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        onSelectCourse(c);
                        onClose();
                      }}
                      style={{
                        padding: '10px 12px',
                        background: '#f8fafc',
                        borderRadius: '6px',
                        marginBottom: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <BookOpen size={16} color="#1e88e5" />
                        <span style={{ fontWeight: 600, fontSize: '13.5px' }}>{c.name}</span>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>[{c.code}]</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#6e34e2', fontWeight: 600 }}>{c.fee}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Services Section */}
              {filteredServices.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Campus Services ({filteredServices.length})
                  </div>
                  {filteredServices.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => {
                        onSelectService(srv);
                        onClose();
                      }}
                      style={{
                        padding: '10px 12px',
                        background: '#f8fafc',
                        borderRadius: '6px',
                        marginBottom: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Settings size={16} color="#10b981" />
                        <span style={{ fontWeight: 600, fontSize: '13.5px' }}>{srv.title}</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>{srv.category}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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

export default SearchResultsModal;
