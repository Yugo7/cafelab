import React from 'react';
import QRCodeScanner from '@/components/utilities/QRCodeScanner.jsx';
import { Box } from '@chakra-ui/react';

export default function Loyalty() {
    return (
        <Box>
            <h1>Loyalty</h1>
            <QRCodeScanner />
        </Box>
    );
}