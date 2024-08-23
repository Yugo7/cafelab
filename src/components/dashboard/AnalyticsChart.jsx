import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const AnalyticsChart = ({ accesses }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  if (!Array.isArray(accesses)) {
	return <p>No data available</p>;
  }

  // Sort accesses by date
  const sortedAccesses = accesses.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = sortedAccesses.map(access => new Date(access.date).toLocaleDateString());
  const accessesData = sortedAccesses.map(access => access.accesses);
  const visitorsData = sortedAccesses.map(access => access.visitors);

  useEffect(() => {
	const ctx = chartRef.current.getContext('2d');

	// Destroy previous chart instance if it exists
	if (chartInstanceRef.current) {
	  chartInstanceRef.current.destroy();
	}

	chartInstanceRef.current = new Chart(ctx, {
	  type: 'line',
	  data: {
		labels,
		datasets: [
		  {
			label: 'Accesses',
			data: accessesData,
			backgroundColor: 'rgba(75, 192, 192, 0.2)',
			borderColor: 'rgba(75, 192, 192, 1)',
			borderWidth: 1,
			fill: false,
		  },
		  {
			label: 'Visitors',
			data: visitorsData,
			backgroundColor: 'rgba(153, 102, 255, 0.2)',
			borderColor: 'rgba(153, 102, 255, 1)',
			borderWidth: 1,
			fill: false,
		  },
		],
	  },
	  options: {
		responsive: true,
		scales: {
		  // Your scales configuration here
		},
	  },
	});
  }, [accesses]);

  return <canvas style={{ margin: '50px', maxWidth: '1000px' }} ref={chartRef}></canvas>;
};

export default AnalyticsChart;