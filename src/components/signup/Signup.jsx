import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {Flex, Heading, Image, Link, Stack, Text} from "@chakra-ui/react";
import CreateCustomerForm from "../shared/CreateCustomerForm.jsx";

const Signup = () => {
    const { customer, setCustomerFromToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (customer) {
            navigate("/orders");
        }
    })

    return (
        <Stack minH={'100vh'} direction={{base: 'column', md: 'row'}}>
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
                        <Text className={"cafelab"}  fontSize="3xl">
                            CAFELAB
                        </Text>
                    </Stack>
                    <Heading fontSize={'2xl'} mb={10}>Register for an account</Heading>
                    <CreateCustomerForm onSuccess={(token) => {
                        localStorage.setItem("access_token", token)
                        setCustomerFromToken()
                        navigate("/orders");
                    }}/>
                    <Link color={"blue.500"} href={"/login"}>
                        Have an account? Login now.
                    </Link>
                </Stack>
            </Flex>

            <Flex
                flex={1}
                p={10}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                //TODO: Change the gradient to something usable
                bgGradient={{sm: 'linear(to-r, blue.600, purple.600)'}}
            >
                <Text fontSize={"6xl"} color={'white'} fontWeight={"bold"} mb={5}>
                    <Link href={"home"}>
                        Lets have a coffee
                    </Link>
                </Text>
                <Image
                    alt={'Login Image'}
                    objectFit={'scale-down'}
                    src={"https://picsum.photos/400/500"
                    }
                />
            </Flex>
        </Stack>
    );
}

export default Signup;