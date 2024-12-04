import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Stack, Text, Select, Input } from '@chakra-ui/react';
import AnalyticsService from '../../services/AnalyticsService';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsChart = ({ accesses }) => {
    const [chartData, setChartData] = useState({});
    const [period, setPeriod] = useState(30); // Default to last 30 days
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            const endDate = customEndDate ? new Date(customEndDate) : new Date();
            let startDate = customStartDate ? new Date(customStartDate) : new Date();

            if (period === 'all') {
                startDate = new Date(0); // Set to epoch time to get all data
            } else if (period !== 'custom') {
                startDate.setDate(endDate.getDate() - period);
            }

            console.log(`Fetching data from ${startDate.toISOString()} to ${endDate.toISOString()}`);

            try {
                const data = await AnalyticsService.getWebsiteAccessData(startDate.toISOString(), endDate.toISOString());
                console.log('Fetched data:', data);
                if (data) {
                    const formattedData = formatChartData(data);
                    setChartData(formattedData);
                } else {
                    console.error('No data received from AnalyticsService');
                }
            } catch (error) {
                console.error('Failed to fetch analytics data:', error);
            }
        };

        fetchAnalyticsData();
    }, [period, customStartDate, customEndDate]);

    const formatChartData = (data) => {
        if (!data) return {};

        const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        const labels = sortedData.map(item => new Date(item.date).toLocaleDateString());
        const accesses = sortedData.map(item => item.accesses);
        const visitors = sortedData.map(item => item.visitors);

        console.log('Formatted labels:', labels);
        console.log('Formatted accesses:', accesses);
        console.log('Formatted visitors:', visitors);

        return {
            labels,
            datasets: [
                {
                    label: 'Accesses',
                    data: accesses,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false,
                },
                {
                    label: 'Visitors',
                    data: visitors,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    fill: false,
                },
            ],
        };
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Website Accesses and Visitors by Period',
            },
        },
    };

    console.log('Chart data:', chartData);

    return (
        <Box>
            <Stack h={"5vh"} align="center" m={6} spacing={4}>
                <Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
                    Website Analytics
                </Text>
            </Stack>
            <Select
                width="auto"
                value={period}
                onChange={(e) => setPeriod(e.target.value === 'custom' || e.target.value === 'all' ? e.target.value : Number(e.target.value))}
                mb={4}
            >
                <option value={7}>Last 7 days</option>
                <option value={15}>Last 15 days</option>
                <option value={30}>Last 30 days</option>
                <option value="all">All data</option>
                <option value="custom">Custom</option>
            </Select>
            {period === 'custom' && (
                <Stack direction="row" spacing={4} mb={4}>
                    <Input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                    />
                    <Input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                    />
                </Stack>
            )}
            {chartData.labels ? <Line data={chartData} options={options} /> : <Text>Loading...</Text>}
        </Box>
    );
};

export default AnalyticsChart;