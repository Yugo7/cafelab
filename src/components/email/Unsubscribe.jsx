import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Image,
    Input,
    Stack,
    Text,
    Textarea,
    RadioGroup,
    Radio,
    useToast
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import logo from '/assets/logo-natal.jpg';
import { unsubscribeEmail } from "@/services/emailService.js";
import { useNavigate } from "react-router-dom";

const Unsubscribe = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');
    const [comments, setComments] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await unsubscribeEmail(email, reason, comments);
            console.log('Unsubscribed:', response.data);
            toast({
                title: t('unsubscribe.toast.unsubscriptionSuccessTitle'),
                description: t('unsubscribe.toast.unsubscriptionSuccessDescription'),
                status: 'success',
                duration: 5000,
                isClosable: true,
                onCloseComplete: () => {
                    navigate('/');
                },
            });
        } catch (error) {
            console.error('Failed to unsubscribe:', error);
            toast({
                title: t('unsubscribe.toast.unsubscriptionFailedTitle'),
                description: t('unsubscribe.toast.unsubscriptionFailedDescription'),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box backgroundColor="white.800" m={8} p={8}>
            <Box justifySelf="center" p={4} maxW={"20vw"}>
                <Image src={logo} alt="Logo" />
            </Box>
            <Stack spacing={4} textAlign="center">
                <Text fontSize="2xl" fontWeight="bold">{t('unsubscribe.title')}</Text>
                <Text fontSize="lg" fontWeight="semibold">{t('unsubscribe.description')}</Text>
            </Stack>
            <form onSubmit={handleSubmit}>
                <FormControl id="email" isRequired mt={4}>
                    <FormLabel>{t('unsubscribe.emailLabel')}</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('unsubscribe.emailPlaceholder')}
                    />
                </FormControl>
                <FormControl id="reason" isRequired mt={4}>
                    <FormLabel>{t('unsubscribe.reasonLabel')}</FormLabel>
                    <RadioGroup onChange={setReason} value={reason}>
                        <Stack direction="column">
                            <Radio value="too_many_emails" colorScheme="gray">{t('unsubscribe.reason1')}</Radio>
                            <Radio value="not_relevant" colorScheme="gray">{t('unsubscribe.reason2')}</Radio>
                            <Radio value="other" colorScheme="gray">{t('unsubscribe.reason3')}</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
                <FormControl id="comments" mt={4}>
                    <FormLabel>{t('unsubscribe.commentsLabel')}</FormLabel>
                    <Textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder={t('unsubscribe.commentsPlaceholder')}
                    />
                </FormControl>
                <Button type="submit" colorScheme="gray" mt={4}>{t('unsubscribe.submitButton')}</Button>
            </form>
        </Box>
    );
};

export default Unsubscribe;