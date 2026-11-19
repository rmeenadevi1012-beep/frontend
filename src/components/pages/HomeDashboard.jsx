import React from 'react';
import WelcomeBanner from '../WelcomeBanner';
import StatCards from '../StatCards';
import UserOverviewChart from '../UserOverviewChart';
import RecentEnrollments from '../RecentEnrollments';
import RecentMessages from '../RecentMessages';
import UpcomingEvents from '../UpcomingEvents';
import QuickActions from '../QuickActions';

function HomeDashboard({
  stats,
  chartData,
  enrollments,
  messages,
  events,
  onAddCourse,
  onAddStudent,
  onViewReports,
  onManageUsers,
  onViewAllOverview,
  onViewAllEnrollments,
  onViewAllMessages,
  onViewAllEvents,
  onSelectStudent,
  onSelectMessage,
  onSelectEvent,
}) {
  return (
    <div className="el-dashboard-content">
      {/* 1. Welcome Banner */}
      <WelcomeBanner />

      {/* 2. Four Statistics Cards */}
      <StatCards stats={stats} />

      {/* 3. Middle Section: User Overview Chart (Left) & Recent Enrollments (Right) */}
      <div className="el-middle-grid">
        <UserOverviewChart
          data={chartData}
          onViewAll={onViewAllOverview}
        />
        <RecentEnrollments
          enrollments={enrollments}
          onViewAll={onViewAllEnrollments}
          onSelectStudent={onSelectStudent}
        />
      </div>

      {/* 4. Bottom Section: Recent Messages (Left), Upcoming Events (Center), Quick Actions (Right) */}
      <div className="el-bottom-grid">
        <RecentMessages
          messages={messages}
          onViewAll={onViewAllMessages}
          onSelectMessage={onSelectMessage}
        />
        <UpcomingEvents
          events={events}
          onViewAll={onViewAllEvents}
          onSelectEvent={onSelectEvent}
        />
        <QuickActions
          onAddCourse={onAddCourse}
          onAddStudent={onAddStudent}
          onViewReports={onViewReports}
          onManageUsers={onManageUsers}
        />
      </div>
    </div>
  );
}

export default HomeDashboard;
