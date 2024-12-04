import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    Grid,
    GridItem,
    Checkbox,
    Link,
    useToast
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { subscribeEmail } from "@/services/emailService.js";

const MailMarketing = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (consent) {
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
        } else {
            toast({
                title: t('toast.consentRequiredTitle'),
                description: t('toast.consentRequiredDescription'),
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box backgroundColor="blackAlpha.800" m={8} boxShadow="md">
            <Grid p={8} m={6} textAlign={"center"} templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} alignItems="center">
                <GridItem m={6} maxW={"500px"}>
                    <Stack spacing={4}>
                        <Text fontSize="2xl" fontWeight="bold" color={"white"}>{t('newsletter.title').toUpperCase()}</Text>
                        <Text fontSize="lg" fontWeight="semibold" color={"white"}>{t('newsletter.description')}</Text>
                    </Stack>
                </GridItem>
                <GridItem maxW={"500px"} alignContent={"flex-start"}>
                    <form onSubmit={handleSubmit}>
                        <FormControl id="email" isRequired>
                            <FormLabel color={"white"}>{t('newsletter.emailLabel')}</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                maxW={"500px"}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('newsletter.emailPlaceholder')}
                                color={"white"}
                            />
                        </FormControl>
                        <FormControl id="consent" isRequired mt={4}>
                            <Checkbox
                                isChecked={consent}
                                color={"white"}
                                onChange={(e) => setConsent(e.target.checked)}
                            >
                                {t('newsletter.consentText')}
                                <Link href="/privacidade" color="blue.500" isExternal>
                                    {t('newsletter.consentLinkText')}
                                </Link>
                            </Checkbox>
                        </FormControl>
                        <Button type="submit" colorScheme="gray" mt={4}>{t('newsletter.subscribeButton')}</Button>
                    </form>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default MailMarketing;