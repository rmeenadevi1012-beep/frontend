import { Calendar, MapPin } from 'lucide-react';

function UpcomingEvents({ events, onViewAll, onSelectEvent }) {
  // Primary event matching screenshot: 20 Nov Career Guidance Seminar
  const primaryEvent = events && events.length > 0 ? events[0] : null;

  return (
    <div className="el-dashboard-card">
      {/* Header */}
      <div className="el-card-header">
        <div className="el-card-header-left">
          <div className="el-card-header-icon">
            <Calendar size={19} strokeWidth={2.2} />
          </div>
          <h3 className="el-card-title">Upcoming Events</h3>
        </div>

        <button
          type="button"
          className="el-card-view-all"
          onClick={onViewAll}
        >
          View All <span style={{ marginLeft: '2px' }}>→</span>
        </button>
      </div>

      {/* Event Details Card Container matching screenshot */}
      {primaryEvent && (
        <div
          className="el-event-box"
          onClick={() => onSelectEvent && onSelectEvent(primaryEvent)}
          style={{ cursor: onSelectEvent ? 'pointer' : 'default' }}
        >
          {/* Left Date Badge */}
          <div className="el-event-date-badge">
            <span className="el-event-day">{primaryEvent.day}</span>
            <span className="el-event-month">{primaryEvent.month}</span>
          </div>

          {/* Right Event Information */}
          <div className="el-event-info">
            <h4 className="el-event-title">{primaryEvent.title}</h4>
            <span className="el-event-time">{primaryEvent.time}</span>
            <div className="el-event-location">
              <MapPin size={13} strokeWidth={2.5} />
              <span>{primaryEvent.location}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpcomingEvents;
