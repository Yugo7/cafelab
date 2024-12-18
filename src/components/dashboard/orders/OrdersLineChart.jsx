import React from 'react';
import { Line } from 'react-chartjs-2';
import {Stack, Card, CardHeader, Heading, Box, Text} from '@chakra-ui/react';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const OrdersLineChart = ({ orders }) => {

	if (!Array.isArray(orders)) {
		return <p>No orders available</p>;
	}
	
	const ordersByMonth = (orders) => {
		return orders.reduce((acc, order) => {
			const date = new Date(order.created_at);
			
			// Check if the date is valid
			if (isNaN(date)) {
				console.error(`Invalid date: ${order.created_at}`);
				return acc;
			}
			
			const month = date.getMonth();
			
			if (!acc[month]) {
				acc[month] = 0;
			}
			
			acc[month]++;
			
			return acc;
		}, {});
	};

	// Call the ordersByMonth function and store the result
	const ordersByMonthData = ordersByMonth(orders);

	// Generate labels and data for the chart
	const data = {
		labels: Object.keys(ordersByMonthData).map(month => new Date(0, month).toLocaleString('default', { month: 'long' })),
		datasets: [
			{
				label: 'Orders',
				data: Object.values(ordersByMonthData),
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
				fill: false,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Orders by Month',
			},
		},
	};

	return (
		<Stack m={6} maxW={"1000px"}>

			<Stack h={"5vh"} align="center" m={6} spacing={4}>
				<Text className="cafelab" fontWeight={"medium"} fontSize={"5xl"} align={"center"} mb={4}>
					Pedidos por mês
				</Text>
			</Stack>
			<Card>
				<CardHeader>
					<Heading size='md'>Orders by Month</Heading>
				</CardHeader>
				<Box p={4}>
					<Line data={data} options={options} />
				</Box>
			</Card>
		</Stack>
	);
};

export default OrdersLineChart;