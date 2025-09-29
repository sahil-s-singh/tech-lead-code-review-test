import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import React, { useEffect, useState } from 'react';

import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function RealtimeDashboard() {
  const [pageViews, setPageViews] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [recentEdits, setRecentEdits] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to WebSocket
    socket.connect();
    
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    socket.on('pageView', (data) => {
      setPageViews(prev => [...prev, data]);
      updateChartData(data);
    });

    socket.on('activeUsers', (count) => {
      setActiveUsers(count);
    });

    socket.on('recentEdit', (edit) => {
      setRecentEdits(prev => [edit, ...prev]);
    });

    // Fetch initial data
    fetch('/api/analytics/realtime')
      .then(res => res.json())
      .then(data => {
        setPageViews(data.pageViews);
        setActiveUsers(data.activeUsers);
        setRecentEdits(data.recentEdits);
      });
  }, []);

  const updateChartData = (newData) => {
    setChartData(prev => {
      const updated = [...prev, {
        time: new Date().toLocaleTimeString(),
        views: newData.count
      }];
      return updated;
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Real-time Analytics</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Active Users</h2>
          <p className="text-4xl">{activeUsers}</p>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Page Views (Last Hour)</h2>
          <p className="text-4xl">{pageViews.length}</p>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Connection Status</h2>
          <p className={isConnected ? 'text-green-500' : 'text-red-500'}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Live Page Views</h2>
        <LineChart width={800} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#8884d8" />
        </LineChart>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Edits</h2>
        <div className="space-y-2">
          {recentEdits.map((edit, index) => (
            <div key={index} className="border-b pb-2">
              <p className="font-medium">{edit.pageTitle}</p>
              <p className="text-sm text-gray-600">
                Edited by {edit.user} at {edit.timestamp}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}