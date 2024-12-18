import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext.jsx";
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
    const { t } = useTranslation();
    const { resetPassword } = useAuth();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: t('resetPassword.passwordMismatch'),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);

        try {
            await resetPassword(password, token);
            toast({
                title: t('resetPassword.successMessage'),
                status: 'success',
                duration: 10000,
                isClosable: true,
                onCloseComplete: () => {
                    setPassword('');
                    setConfirmPassword('');
                    navigate('/login');
                },
            });
        } catch (error) {
            toast({
                title: t('resetPassword.errorMessage'),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md" boxShadow="lg">
            <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
                {t('resetPassword.title')}
            </Text>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <FormControl id="password" isRequired>
                        <FormLabel>{t('resetPassword.newPasswordLabel')}</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t('resetPassword.newPasswordPlaceholder')}
                        />
                    </FormControl>
                    <FormControl id="confirmPassword" isRequired>
                        <FormLabel>{t('resetPassword.confirmPasswordLabel')}</FormLabel>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder={t('resetPassword.confirmPasswordPlaceholder')}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="blue"
                        isLoading={isLoading}
                        loadingText={t('resetPassword.resetButton')}
                    >
                        {t('resetPassword.resetButton')}
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default ResetPassword;