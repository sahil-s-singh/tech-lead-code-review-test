import { useEffect, useState } from 'react';

import { io } from 'socket.io-client';

export function useRealtimeData(endpoint: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    
    socket.on(endpoint, (newData) => {
      setData(newData);
      setLoading(false);
    });

    socket.on('error', (err) => {
      setError(err);
      setLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [endpoint]);

  return { data, loading, error };
}