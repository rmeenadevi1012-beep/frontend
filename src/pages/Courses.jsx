import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen, Clock, Star, Users, Search, ArrowRight, Layers } from 'lucide-react';
import { initialCoursesData, courseCategories } from '../data/courses';

export default function Courses() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return initialCoursesData.filter((course) => {
      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;
      const matchesSearch =
        !query ||
        course.name.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        (course.technologies &&
          course.technologies.some((tech) => tech.toLowerCase().includes(query)));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-2">
          <BookOpen size={26} className="text-primary" />
          <div>
            <h2 className="mb-0 fw-bold">Courses</h2>
            <p className="text-muted mb-0 small">
              Explore {initialCoursesData.length} industry-ready programs
            </p>
          </div>
        </div>

        <div className="position-relative" style={{ minWidth: '260px', maxWidth: '360px' }}>
          <Search
            size={18}
            className="text-muted position-absolute top-50 translate-middle-y"
            style={{ left: '12px' }}
          />
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search courses or technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {courseCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={`btn btn-sm ${
              selectedCategory === category ? 'btn-primary' : 'btn-outline-secondary'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5 text-muted">
            <BookOpen size={40} className="mb-2 opacity-50" />
            <p className="mb-2">No courses match your search.</p>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="col-12 col-md-6 col-xl-4">
              <div
                className="card h-100 border-0 shadow-sm overflow-hidden"
                style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div className="position-relative" style={{ height: '180px' }}>
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-100 h-100 object-fit-cover"
                  />
                  <span
                    className="badge bg-primary position-absolute top-0 start-0 m-3"
                  >
                    {course.category}
                  </span>
                  <span
                    className="badge bg-dark bg-opacity-75 position-absolute top-0 end-0 m-3 d-flex align-items-center gap-1"
                  >
                    <Star size={12} fill="currentColor" className="text-warning" />
                    {course.rating || '4.9'}
                  </span>
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold mb-2">{course.name}</h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {course.description}
                  </p>

                  <div className="d-flex flex-wrap gap-1 mb-3">
                    {(course.technologies || []).slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="badge bg-light text-dark border fw-normal"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="d-flex align-items-center justify-content-between text-muted small pt-2 border-top">
                    <span className="d-flex align-items-center gap-1">
                      <Clock size={14} />
                      {course.duration}
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <Layers size={14} />
                      {course.lessons} Lessons
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <Users size={14} />
                      {course.level}
                    </span>
                  </div>
                </div>

                <div className="card-footer bg-transparent border-0 pt-0 pb-3 px-3">
                  <button
                    type="button"
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/courses/${course.id}`);
                    }}
                  >
                    <span>View Course Details</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
