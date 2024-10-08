import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Input, Stack, Text} from "@chakra-ui/react";
import {createCustomer} from "../../services/client.js";
import {errorNotification} from "../../services/notification.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as PropTypes from "prop-types";
import StripeService from "../../services/stripeService.jsx";
import {useTranslation} from "react-i18next";

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

function SignupSuccess(props) {
    return null;
}

SignupSuccess.propTypes = {
    onClose: PropTypes.func,
    isOpen: PropTypes.bool
};

const CreateCustomerForm = ({onSuccess}) => {
    const navigate = useNavigate();
    const [isSignupSuccessOpen, setIsSignupSuccessOpen] = useState(false);
    const { t } = useTranslation();

    const handleSignupSuccessClose = () => {
        setIsSignupSuccessOpen(false);
    };
    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    age: '',
                    password: '',
                    address: '',
                    zipCode: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(70, t('signup.validation.nameMax'))
                        .required(t('signup.validation.required')),
                    email: Yup.string()
                        .email(t('signup.validation.emailError'))
                        .required(t('signup.validation.required')),
                    password: Yup.string()
                        .min(6, t('signup.validation.passwordMin'))
                        .required(t('signup.validation.required')),
                    address: Yup.string()
                        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s\d,]+$/, t('signup.validation.invalidAddress')),
                    zipCode: Yup.string()
                        .matches(/^\d{4}-\d{3}$/, t('signup.validation.invalidZipCode')),
                })}
                onSubmit={async (customer, {setSubmitting}) => {
                    setSubmitting(true);
                    const stripeData = await createCustomer(customer)
                        .then(res => {
                            setIsSignupSuccessOpen(true);
                            navigate("/");
                        }).catch(err => {
                        errorNotification(
                            "Error creating customer"
                        )
                    }).finally(() => {
                        setSubmitting(false);
                    })
                }}
            >
                {({isValid, isSubmitting}) => (
                    <Form>
                        <Stack spacing={"24px"}>
                            <MyTextInput
                                label={t('signup.nameLabel')}
                                name="name"
                                type="text"
                                placeholder={t('signup.namePlaceholder')}
                            />
                            <MyTextInput
                                label={t('signup.emailLabel')}
                                name="email"
                                type="email"
                                placeholder={t('signup.emailPlaceholder')}
                            />
                            <MyTextInput
                                label={t('signup.passwordLabel')}
                                name="password"
                                type="password"
                                placeholder={t('signup.passwordPlaceholder')}
                            />
                            <Box>
                                <MyTextInput
                                    label={t('signup.addressLabel')}
                                    name="address"
                                    type="text"
                                    placeholder={t('signup.addressPlaceholder')}
                                />
                                <Text fontSize="sm" color="gray.500">{t('signup.optional')}</Text>
                            </Box>
                            <Box>
                                <MyTextInput
                                    label={t('signup.zipCodeLabel')}
                                    name="zipCode"
                                    type="text"
                                    placeholder={t('signup.zipCodePlaceholder')}
                                />
                                <Text fontSize="sm" color="gray.500">{t('signup.optional')}</Text>
                            </Box>
                            <Button disabled={!isValid || isSubmitting} type="submit">{t('signup.submitButton')}</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
            <SignupSuccess isOpen={isSignupSuccessOpen} onClose={handleSignupSuccessClose}/>
        </>
    );
};

export default CreateCustomerForm;