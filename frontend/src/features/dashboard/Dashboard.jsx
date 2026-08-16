import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFarmProfile } from '../../context/FarmProfileContext';
import { getWeatherApi } from '../../services/api';
import { 
  FaCloudSun, FaExclamationTriangle, FaLeaf, 
  FaChartLine, FaRobot, FaStore, FaArrowRight, FaSpinner 
} from 'react-icons/fa';
import { GiWheat } from 'react-icons/gi';

function Dashboard() {
  const { profile } = useFarmProfile();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Combine district and state for better geocoding if available
        const location = profile.district ? `${profile.district}, ${profile.state}` : profile.state;
        const weatherData = await getWeatherApi(null, null, location);
        
        if (weatherData && weatherData.weather) {
          setWeather(weatherData.weather);
          
          // Generate simple mock alerts based on weather
          const newAlerts = [];
          if (weatherData.weather.current_temp > 35) {
            newAlerts.push({ type: 'warning', message: 'High temperature alert. Ensure adequate irrigation.' });
          }
          if (weatherData.weather.monthly_rainfall_estimate > 25) {
            newAlerts.push({ type: 'info', message: 'Heavy rainfall expected. Check field drainage.' });
          }
          setAlerts(newAlerts);
        }
      } catch (err) {
        console.error("Failed to load dashboard data", err);
        setAlerts([{ type: 'error', message: 'Could not load current weather data.' }]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [profile.state, profile.district]);

  const quickActions = [
    {
      title: 'Disease Detector',
      icon: <FaLeaf className="text-3xl text-green-500" />,
      desc: 'Scan plants for diseases',
      path: '/disease',
      color: 'bg-green-50 border-green-100 hover:border-green-300'
    },
    {
      title: 'Yield Predictor',
      icon: <FaChartLine className="text-3xl text-amber-500" />,
      desc: 'Estimate harvest output',
      path: '/yield',
      color: 'bg-amber-50 border-amber-100 hover:border-amber-300'
    },
    {
      title: 'Market Prices',
      icon: <FaStore className="text-3xl text-blue-500" />,
      desc: 'Check live mandi rates',
      path: '/market',
      color: 'bg-blue-50 border-blue-100 hover:border-blue-300'
    },
    {
      title: 'KrishiMitra AI',
      icon: <FaRobot className="text-3xl text-purple-500" />,
      desc: 'Get expert farming advice',
      path: '/chat',
      color: 'bg-purple-50 border-purple-100 hover:border-purple-300'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-green-100 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
             <GiWheat className="text-9xl text-green-800" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Namaste, {profile.farmerName || 'Farmer'}! 🌾
          </h1>
          <p className="text-gray-600">
            Welcome back to KrishiMitra. Here is the latest overview for your {profile.primaryCrop} farm in {profile.district || profile.state}.
          </p>
        </div>

        {/* Alerts Center */}
        {alerts.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaExclamationTriangle className="mr-2 text-amber-500" />
              Alert Center
            </h2>
            {alerts.map((alert, idx) => (
              <div key={idx} className={`p-4 rounded-lg flex items-start shadow-sm border ${
                alert.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                alert.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                'bg-blue-50 border-blue-200 text-blue-800'
              }`}>
                <FaExclamationTriangle className="mt-1 mr-3 flex-shrink-0" />
                <p>{alert.message}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weather Summary Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaCloudSun className="mr-2 text-blue-500" /> Current Weather
            </h3>
            {loading ? (
              <div className="flex-1 flex justify-center items-center text-gray-400">
                <FaSpinner className="animate-spin text-2xl" />
              </div>
            ) : weather ? (
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {Math.round(weather.current_temp)}°C
                </div>
                <div className="text-gray-600 capitalize text-lg mb-4">
                  {weather.current_conditions}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mt-auto">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <span className="block text-gray-500">Humidity</span>
                    <span className="font-semibold text-gray-800">{weather.current_humidity}%</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <span className="block text-gray-500">Rain Est.</span>
                    <span className="font-semibold text-gray-800">{weather.monthly_rainfall_estimate.toFixed(1)} cm</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex justify-center items-center text-gray-500">
                Weather data unavailable
              </div>
            )}
          </div>

          {/* Quick Actions Grid */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, idx) => (
                <Link 
                  key={idx} 
                  to={action.path}
                  className={`p-5 rounded-xl border transition-all duration-300 hover:shadow-md flex flex-col justify-between group ${action.color}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    {action.icon}
                    <FaArrowRight className="text-gray-400 group-hover:text-gray-800 transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">{action.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{action.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
