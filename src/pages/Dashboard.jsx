import { useState, useEffect } from 'react';
import HomeDashboard from '../components/pages/HomeDashboard';
import { dashboardAPI } from '../services/api';
import {
  initialStats,
  userOverviewChartData,
  initialEnrollments,
  initialMessages,
  initialEvents,
} from '../data/mockData';

export default function Dashboard() {
  const [stats, setStats] = useState(initialStats);
  const [chartData, setChartData] = useState(userOverviewChartData);
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [messages, setMessages] = useState(initialMessages);
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    let isMounted = true;
    const fetchDashboard = async () => {
      try {
        const [overviewRes, eventsRes, enrollmentsRes] = await Promise.allSettled([
          dashboardAPI.getOverview(),
          dashboardAPI.getUpcomingEvents(),
          dashboardAPI.getRecentEnrollments(),
        ]);

        if (!isMounted) return;

        if (overviewRes.status === 'fulfilled' && overviewRes.value) {
          const data = overviewRes.value.data || overviewRes.value;
          if (data.stats) setStats(data.stats);
          if (Array.isArray(data.chartData)) setChartData(data.chartData);
          if (Array.isArray(data.messages)) setMessages(data.messages);
        }

        if (eventsRes.status === 'fulfilled' && eventsRes.value) {
          const evData = eventsRes.value.data || eventsRes.value;
          if (Array.isArray(evData)) setEvents(evData);
        }

        if (enrollmentsRes.status === 'fulfilled' && enrollmentsRes.value) {
          const enData = enrollmentsRes.value.data || enrollmentsRes.value;
          if (Array.isArray(enData)) setEnrollments(enData);
        }
      } catch {
        // Keep initial mock data if backend is unreachable
      }
    };

    fetchDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <HomeDashboard
      stats={stats}
      chartData={chartData}
      enrollments={enrollments}
      messages={messages}
      events={events}
    />
  );
}
