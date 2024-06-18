import {Alert, AlertIcon, Box, Button, Flex, FormLabel, Heading, Image, Input, Link, Stack, Text,} from '@chakra-ui/react';
import {Form, Formik, useField} from "formik";
import * as Yup from 'yup';
import {useAuth} from "../context/AuthContext.jsx";
import {errorNotification} from "../../services/notification.js";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';

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

const LoginForm = () => {
    const {signin} = useAuth();
    const { t } = useTranslation();

    return (
        <Formik
            validateOnMount={true}
            validationSchema={
                Yup.object({
                    username: Yup.string()
                        .email("Must be valid email")
                        .required("Email is required"),
                    password: Yup.string()
                        .max(20, "Password cannot be more than 20 characters")
                        .required("Password is required")
                })
            }
            initialValues={{username: '', password: ''}}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                signin(values).then(res => {
                    console.log("Successfully logged in");
                }).catch(err => {
                    errorNotification(
                        err.code,
                        "Usuario e senha não encontrados ou email pendente de ativação",
                    );
                }).finally(() => {
                    setSubmitting(false);
                })
            }}>

            {({isValid, isSubmitting}) => (
                <Form>
                    <Stack mt={15} spacing={15}>
                        <MyTextInput
                            label={t('login.emailLabel')}
                            name={"username"}
                            type={"email"}
                            placeholder={t('login.emailPlaceholder')}
                        />
                        <MyTextInput
                            label={t('login.passwordLabel')}
                            name={"password"}
                            type={"password"}
                            placeholder={t('login.passwordPlaceholder')}
                        />

                        <Button
                            type={"submit"}
                            disabled={!isValid || isSubmitting}>
                            {t('login.loginButton')}
                        </Button>
                    </Stack>
                </Form>
            )}

        </Formik>
    )
}

const Login = () => {

    const {customer} = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (customer) {
            navigate("/");
        }
    })

    return (
        <Stack minH={'100vh'} direction={{base: 'column', md: 'row'}}>
            <Flex p={8} flex={1} alignItems={'center'} justifyContent={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'} justifyContent={'center'}>
                    <Stack spacing={4} w={'full'} maxW={'md'} align={'center'} mb={18}>
                        <Image
                            mt={20}
                            borderRadius='full'
                            boxSize='100px'
                            src='assets/logo.png'
                            alt='CAfeLab'
                            onClick={() => navigate('/')}
                        />
                        <Text className={"cafelab"}  fontSize="3xl">
                            CAFELAB
                        </Text>
                    </Stack>
                    <Heading fontSize={'2xl'} mb={15}>Sign in to your account</Heading>
                    <LoginForm/>
                    <Link color={"blue.500"} href={"/signup"}>
                        {t('login.noAccountText')}
                    </Link>
                </Stack>
            </Flex>
        </Stack>
    );
}

export default Login;