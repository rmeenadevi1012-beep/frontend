import HomeDashboard from '../components/pages/HomeDashboard';
import {
  initialStats,
  userOverviewChartData,
  initialEnrollments,
  initialMessages,
  initialEvents,
} from '../data/mockData';

export default function Dashboard() {
  return (
    <HomeDashboard
      stats={initialStats}
      chartData={userOverviewChartData}
      enrollments={initialEnrollments}
      messages={initialMessages}
      events={initialEvents}
    />
  );
}
