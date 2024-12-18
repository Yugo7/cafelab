import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import {Box, Stack, Text} from '@chakra-ui/react';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import AnalyticsService from "../../services/AnalyticsService.jsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Origins = ({dateRange}) => {
    const [countryData, setCountryData] = useState([]);
    const [deviceData, setDeviceData] = useState([]);
    const [osData, setOsData] = useState([]);
    const [originData, setOriginData] = useState([]);

    useEffect(() => {
        const fetchOriginsData = async () => {
            try {
                const data = await AnalyticsService.getWebsiteAccessStatistics(dateRange.startDate.toISOString(), dateRange.endDate.toISOString());
                console.log('Fetched data:', data);
                setCountryData(data.countries.data);
                setDeviceData(data.devices.data);
                setOsData(data.os.data);
                setOriginData(data.referrers.data);
            } catch (error) {
                console.error('Failed to fetch origins data:', error);
            }
        };
        console.log("dateRange", dateRange)
        fetchOriginsData();
    }, [dateRange]);

    const transformData = (data) => {
        if (!Array.isArray(data)) {
            return {labels: [], values: []};
        }
        const labels = data.map(item => item.key);
        const values = data.map(item => item.total);
        return {labels, values};
    };

    const getChartData = (labels, values, label) => ({
        labels: labels,
        datasets: [
            {
                label: label,
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

    const {labels: countryLabels, values: countryValues} = transformData(countryData);
    const {labels: deviceLabels, values: deviceValues} = transformData(deviceData);
    const {labels: osLabels, values: osValues} = transformData(osData);
    const {labels: originLabels, values: originValues} = transformData(originData); // Transform origin data

    const countryChartData = getChartData(countryLabels, countryValues, 'Accessos por país');
    const deviceChartData = getChartData(deviceLabels, deviceValues, 'Accessos por dispositivos/Browser');
    const osChartData = getChartData(osLabels, osValues, 'Accessos por OS');
    const originChartData = getChartData(originLabels, originValues, 'Accessos por origem'); // Create chart data for origin

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '',
            },
        },
    };

    return (
        <Stack alignSelf={"center"} w={"85vw"} maxW={"1000px"} spacing={8}>
            <Box>
                <Text fontSize="2xl" mb={4}>Accessos por país</Text>
                <Bar data={countryChartData}
                     options={{...options, plugins: {...options.plugins, title: {text: 'Accesses per Country'}}}}/>
            </Box>
            <Box>
                <Text fontSize="2xl" mb={4}>Accessos por dispositivos/Browser</Text>
                <Bar data={deviceChartData} options={{
                    ...options,
                    plugins: {...options.plugins, title: {text: 'Accesses per Device/Browser'}}
                }}/>
            </Box>
            <Box>
                <Text fontSize="2xl" mb={4}>Accessos por OS</Text>
                <Bar data={osChartData}
                     options={{...options, plugins: {...options.plugins, title: {text: 'Accesses per OS'}}}}/>
            </Box>
            <Box>
                <Text fontSize="2xl" mb={4}>Origem do acessos</Text>
                <Bar data={originChartData}
                     options={{...options, plugins: {...options.plugins, title: {text: 'Accesses per Origin'}}}}/>
            </Box>
        </Stack>
    );
};

export default Origins;