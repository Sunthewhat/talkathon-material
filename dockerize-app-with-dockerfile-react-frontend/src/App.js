import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [homeResponse, setHomeResponse] = useState(null);
  const [helloResponse, setHelloResponse] = useState(null);
  const [healthResponse, setHealthResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Backend URL - can be changed to point to your backend
  const BACKEND_URL = 'http://localhost:8080';

  const fetchHome = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/`);
      const data = await response.json();
      setHomeResponse(data);
    } catch (err) {
      setError('Failed to fetch home endpoint. Make sure the backend is running on port 8080.');
    }
    setLoading(false);
  };

  const fetchHello = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = name
        ? `${BACKEND_URL}/api/hello?name=${encodeURIComponent(name)}`
        : `${BACKEND_URL}/api/hello`;
      const response = await fetch(url);
      const data = await response.json();
      setHelloResponse(data);
    } catch (err) {
      setError('Failed to fetch hello endpoint. Make sure the backend is running on port 8080.');
    }
    setLoading(false);
  };

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/health`);
      const data = await response.json();
      setHealthResponse(data);
    } catch (err) {
      setError('Failed to fetch health endpoint. Make sure the backend is running on port 8080.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>React Docker Tutorial</h1>
        <p>Test your backend API endpoints</p>
      </div>

      <div className="container">
        <div className="section">
          <h2>GET / - Home Endpoint</h2>
          <button onClick={fetchHome}>Fetch Home</button>
          {homeResponse && (
            <div className="response-box">
              <pre>{JSON.stringify(homeResponse, null, 2)}</pre>
            </div>
          )}
        </div>

        <div className="section">
          <h2>GET /api/hello - Hello Endpoint</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={fetchHello}>Fetch Hello</button>
          </div>
          {helloResponse && (
            <div className="response-box">
              <pre>{JSON.stringify(helloResponse, null, 2)}</pre>
            </div>
          )}
        </div>

        <div className="section">
          <h2>GET /api/health - Health Check</h2>
          <button onClick={fetchHealth}>Check Health</button>
          {healthResponse && (
            <div className="response-box">
              <pre>{JSON.stringify(healthResponse, null, 2)}</pre>
            </div>
          )}
        </div>

        {loading && <p className="loading">Loading...</p>}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default App;
