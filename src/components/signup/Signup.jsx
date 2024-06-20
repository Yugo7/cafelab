import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {Flex, Heading, Image, Link, Stack, Text} from "@chakra-ui/react";
import CreateCustomerForm from "../shared/CreateCustomerForm.jsx";
import {useTranslation} from "react-i18next";

const Signup = () => {
    const { customer, setCustomerFromToken } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (customer) {
            navigate("/orders");
        }
    })

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} alignItems={'center'} justifyContent={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Stack spacing={4} w={'full'} maxW={'md'} align={'center'} mb={18}>
                        <Image
                            borderRadius='full'
                            boxSize='100px'
                            src='assets/logo.png'
                            alt='CAfeLab'
                            onClick={() => navigate('/')}
                        />
                        <Text className={"cafelab"} fontSize="3xl">
                            CAFELAB
                        </Text>
                    </Stack>
                    <Heading fontSize={'2xl'} mb={10}>{t('signup.register')}</Heading>
                    <CreateCustomerForm onSuccess={(token) => {
                        localStorage.setItem("access_token", token)
                        setCustomerFromToken()
                        navigate("/orders");
                    }} />
                    <Link color={"blue.500"} href={"/login"}>
                        {t('signup.haveAccount')}
                    </Link>
                </Stack>
            </Flex>
        </Stack>
    );
}

export default Signup;