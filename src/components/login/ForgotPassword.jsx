import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext.jsx";
import Lottie from "react-lottie";
import animationData from '/src/animations/forgotpassword.json';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
    const { t, i18n } = useTranslation();
    const { requestResetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await requestResetPassword(email);
            toast({               
                title: t('forgotPassword.successMessage'),
                status: 'success',
                duration: 10000,
                isClosable: true,
                onCloseComplete: () => {
                    setEmail('');
                    navigate('/login');
                },
            });
        } catch (error) {
            toast({
                title: t('forgotPassword.errorMessage'),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={10} p={6}>
            <Box p={8}>
                <Lottie options={{ animationData }} />
            </Box>
            <Text fontSize="lg" fontWeight="semibold" mb={4} textAlign="center">
                {t('forgotPassword.description')}
            </Text>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <FormControl id="email" isRequired>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('forgotPassword.emailLabel')}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        loadingText={t('forgotPassword.sendButton')}
                        variant={"solid"} backgroundColor={"black"} color={"white"}
                    >
                        {t('forgotPassword.sendButton')}
                    </Button>
                    <Button
                        variant="link"
                        colorScheme="blue"
                        onClick={() => navigate('/login')}
                    >
                        {t('forgotPassword.backToLogin')}
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default ForgotPassword;