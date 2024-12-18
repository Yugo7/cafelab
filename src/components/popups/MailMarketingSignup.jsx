import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Text, useBreakpoint, useBreakpointValue,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { subscribeEmail } from "@/services/emailService.js";
import {useTranslation} from "react-i18next";

const MailMarketingSignup = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [email, setEmail] = useState('');
    const toast = useToast();
    const { t } = useTranslation();

    const widthModal = useBreakpointValue({ base: "95vw", md: "50vw" , lg: "30vw" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast({
                title: t('toast.emptyEmailTitle'),
                description: t('toast.emptyEmailTitle'),
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        try {
            const data = await subscribeEmail(email);
            console.log('Subscribed with email:', data);
            toast({
                title: t('toast.subscriptionSuccessTitle'),
                description: t('toast.subscriptionSuccessDescription'),
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Failed to subscribe:', error);
            toast({
                title: t('toast.subscriptionFailedTitle'),
                description: t('toast.subscriptionFailedDescription'),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    React.useEffect(() => {
        // Automatically open the modal after a delay (e.g., 5 seconds)
        const timer = setTimeout(onOpen, 5000);
        return () => clearTimeout(timer);
    }, [onOpen]);

    return (
        <>
            {isOpen && (
                <Box
                    position="fixed"
                    bottom="20px"
                    width={widthModal}
                    backgroundColor="gray.100"
                    p={4}
                    zIndex={1000}
                >
                    <Text mb={4} fontWeight={"semibold"}>{t('newsletter.title')}</Text>
                    <Text mb={4} fontSize={"sm"}>{t('newsletter.coupon')}</Text>
                    <form onSubmit={handleSubmit}>
                        <Input
                            placeholder="Enter your email"
                            mb={4}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button type="submit" backgroundColor={"black.700"} mr={3}>
                            Submit
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Close</Button>
                    </form>
                </Box>
            )}
        </>
    );
};

export default MailMarketingSignup;