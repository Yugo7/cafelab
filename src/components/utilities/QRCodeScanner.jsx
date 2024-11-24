import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { useZxing } from 'react-zxing';
import axios from 'axios';

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  const { ref } = useZxing({
    onResult(result) {
      setScanResult(result.getText());
      //sendPayloadToBackend(result.getText());
    },
  });

  const sendPayloadToBackend = async (payload) => {
    try {
      const response = await axios.post('/api/scan', { payload });
      console.log('Response from backend:', response.data);
      navigate('/success');
    } catch (error) {
      console.error('Error sending payload to backend:', error);
    }
  };

  return (
    <Stack align="center" spacing={4} p={4}>
      <Text fontSize="2xl" fontWeight="bold">Scan QR Code</Text>
      <Box width="100%" maxWidth="500px">
        <video ref={ref} style={{ width: '100%' }} />
      </Box>
      {scanResult && (
        <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
          <Text>Scanned Data: {scanResult}</Text>
        </Box>
      )}
      <Button onClick={() => navigate('/')}>Go Back</Button>
    </Stack>
  );
};

export default QRCodeScanner;