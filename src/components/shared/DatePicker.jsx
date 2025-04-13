import React, {useEffect, useState} from 'react';
import {
    Input,
    Select,
    SimpleGrid,
    GridItem,
} from "@chakra-ui/react";

const DatePicker = ({dateRange, setDateRange, period, setPeriod}) => {
    const {startDate, endDate} = dateRange;

    const handleDateChange = (key, value) => {
        setDateRange({...dateRange, [key]: new Date(value)});
    };

    const handlePeriodChange = (value) => {
        const newEndDate = new Date();
        let newStartDate = new Date();

        if (value === 'all') {
            newStartDate = new Date("2024-06-10"); // Example epoch date
        } else if (value !== 'custom') {
            newStartDate.setDate(newEndDate.getDate() - Number(value));
        }

        setDateRange({startDate: newStartDate, endDate: newEndDate});
        setPeriod(value);
    };

    return (
        <>
            <Select
                value={period}
                width="auto"
                onChange={(e) => handlePeriodChange(e.target.value)}
                mb={4}
            >
                <option value={7}>Últimos 7 dias</option>
                <option value={15}>Últimos 15 dias</option>
                <option value={30}>Últimos 30 dias</option>
                <option value={90}>Últimos 90 dias</option>
                <option value="all">Todos os dados</option>
                <option value="custom">Personalizado</option>
            </Select>
            {period === 'custom' && (
                <SimpleGrid columns={{sm: 2}} direction="row" spacing={4} mb={4}>
                    <GridItem>
                        <Input
                            type="date"
                            value={startDate.toISOString().split('T')[0]}
                            onChange={(e) => handleDateChange('startDate', e.target.value)}
                        />
                    </GridItem>
                    <GridItem>
                        <Input
                            type="date"
                            value={endDate.toISOString().split('T')[0]}
                            onChange={(e) => handleDateChange('endDate', e.target.value)}
                        />
                    </GridItem>
                </SimpleGrid>)
            }
        </>
    );
};

export default DatePicker;