'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

interface ChartDataItem {
  date: string;
  contacts: number;
  visits: number;
}

export function AdminDashboardCharts({ chartData }: { chartData: ChartDataItem[] }) {
  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)] mb-6">
        Leads — Last 30 Days
      </h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" fontSize={11} tick={{ fill: '#888' }} />
            <YAxis fontSize={11} tick={{ fill: '#888' }} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#fff',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area type="monotone" dataKey="contacts" name="Contact Leads" stroke="#3b82f6" fill="url(#colorContacts)" strokeWidth={2} />
            <Area type="monotone" dataKey="visits" name="Visit Requests" stroke="#06b6d4" fill="url(#colorVisits)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
