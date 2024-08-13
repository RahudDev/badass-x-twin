// src/components/LineChart.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter
import axios from 'axios'; // Import axios for API calls
import './linechart.css'; // Import the CSS file

// Register components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const LineChart = () => {
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Daily earn $CUAN',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  const API_URL_I = 'https://server-x-rho.vercel.app';

  const fetchHistoryData = async (days) => {
    try {
      const response = await axios.get(`${API_URL_I}/api/history?days=${days}`);
      const historyData = response.data.map(entry => ({
        date: new Date(entry.date).toISOString().split('T')[0], // Format date as YYYY-MM-DD
        points: entry.points,
      }));

      const labels = historyData.map(entry => entry.date);
      const data = historyData.map(entry => entry.points);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Daily earn $CUAN',
            data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };

  useEffect(() => {
    fetchHistoryData(days);
  }, [days]);

  const saveUserPointsHistory = async (userId, points) => {
    try {
      await axios.post(`${API_URL_I}/api/save-history`, {
        userId,
        points,
      });
      fetchHistoryData(days); // Refresh the chart data after saving points
    } catch (error) {
      console.error('Error saving points history:', error);
    }
  };

  const handleUserEarnPoints = async (userId, points) => {
    // Logic for user earning points
    // ...

    // Save points to history
    await saveUserPointsHistory(userId, points);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Points: ${context.raw}`;
          },
        },
        bodyFont: {
          size: 16,
        },
        titleFont: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: '$CUAN',
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <div className="select-wrapper">
          <label htmlFor="timeRange">Select Time Range: </label>
          <select
            id="timeRange"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value, 10))}
          >
            <option value={7}>7 Days</option>
            <option value={14}>14 Days</option>
            <option value={21}>21 Days</option>
            <option value={30}>30 Days</option>
          </select>
        </div>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
