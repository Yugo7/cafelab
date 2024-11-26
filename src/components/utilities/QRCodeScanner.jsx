import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { useZxing } from 'react-zxing';
import axios from 'axios';

const QRCodeScanner = () => {
  const navigate = useNavigate();

  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
        console.log('Scanned data:', result.getText());
      setResult(result.getText());
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
      <Box width="100%" maxWidth="500px">
        <video ref={ref} style={{ width: '100%' }} />
      </Box>
      {result && (
        <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
          <Text>Scanned Data: {result}</Text>
        </Box>
      )}
      <Button onClick={() => navigate('/')}>Voltar</Button>
    </Stack>
  );
};

export default QRCodeScanner;