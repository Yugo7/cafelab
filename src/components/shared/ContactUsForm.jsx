import {ErrorMessage, Field, Form, Formik, useField} from "formik";
import * as Yup from "yup";
import {Alert, AlertIcon, Box, Button, FormLabel, HStack, Input, Stack, Text, Textarea, useToast} from "@chakra-ui/react";
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    const { t } = useTranslation();
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{t(label)}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {t(meta.error)}
                </Alert>) : null}
        </Box>);
};

const MyTextarea = ({label, ...props}) => {
    const [field, meta] = useField(props);
    const { t } = useTranslation();
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{t(label)}</FormLabel>
            <Textarea className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {t(meta.error)}
                </Alert>) : null}
        </Box>);
};

const ContactUsForm = ({onSuccess}) => {
    const toast = useToast();
    const { t } = useTranslation();
    return (
        <>
            <p><strong>{t('contactForm.yourData')}</strong></p>
            <Formik
                initialValues={{
                    name: '', email: '', phone: '', description: '', consent: false
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(70, 'contactForm.nameMax')
                        .required('contactForm.required'),
                    email: Yup.string()
                        .email('contactForm.emailError')
                        .required('contactForm.required'),
                    phone: Yup.string()
                        .matches(
                            /^\d{9}$/,
                            'contactForm.phoneError'
                        )
                        .required('contactForm.required'),
                    description: Yup.string()
                        .min(20, 'contactForm.descriptionMin')
                        .max(1500, 'contactForm.descriptionMax')
                        .required('contactForm.required'),
                    consent: Yup.bool().oneOf([true], 'contactForm.consentRequired'),
                })}
                onSubmit={(values, {setSubmitting}) => {
                    axios.post(`${BASE_URL}contacts/`, values)
                        .then(response => {
                            // Handle success
                            setSubmitting(false);
                            if (onSuccess) {
                                onSuccess();
                            }
                            toast({
                                title: t('contactForm.successTitle'),
                                description: t('contactForm.successDescription'),
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                            });
                        })
                        .catch(error => {
                            setSubmitting(false);
                        });
                }}
            >
                {({isValid, isSubmitting, errors}) => {
                    return (
                        <Form>
                            <Stack isInline={true} mb={4}>
                                <MyTextInput
                                    label="contactForm.nameLabel"
                                    name="name"
                                    type="text"
                                    placeholder={t('contactForm.namePlaceholder')}
                                />

                                <MyTextInput
                                    label="contactForm.emailLabel"
                                    name="email"
                                    type="email"
                                    placeholder={t('contactForm.emailPlaceholder')}
                                />
                            </Stack>

                            <Stack mb={4}>
                                <MyTextInput
                                    label="contactForm.phoneLabel"
                                    name="phone"
                                    type="text"
                                    placeholder={t('contactForm.phonePlaceholder')}
                                />
                            </Stack>
                            <Stack>
                                <MyTextarea
                                    label="contactForm.descriptionLabel"
                                    name="description"
                                    type="text"
                                    placeholder={t('contactForm.descriptionPlaceholder')}
                                />
                            </Stack>
                            <Stack>
                                <Box>
                                    <HStack>
                                        <Field type="checkbox" name="consent"/><Text fontSize={"xs"}>{t('contactForm.consentText')}</Text>
                                    </HStack>
                                    <ErrorMessage name="consent">
                                        {errorMessage => (
                                            <Alert status="error" mt={2}>
                                                <AlertIcon/>
                                                {t(errorMessage)}
                                            </Alert>
                                        )}
                                    </ErrorMessage>
                                </Box>
                            </Stack>
                            <Button mt={6} disabled={!isValid || isSubmitting} type="submit">{t('contactForm.submitButton')}</Button>
                        </Form>
                    );
                }}
            </Formik>
        </>);
};

export default ContactUsForm;