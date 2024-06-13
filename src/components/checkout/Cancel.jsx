import {useNavigate} from "react-router-dom";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import React, {useEffect} from "react";
import {Card, CardBody, CardFooter, CardHeader, Image, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from "../../animations/cancel.json";


function Cancel() {
    const navigate = useNavigate();
    const { emptyCart } = useShoppingCart()

    useEffect(() => {
        const timer = setTimeout(() => {
            emptyCart();
            navigate('/checkout');
            // specify the path you want to redirect to
        }, 7000); // time in milliseconds

        // Cleanup function to clear the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <Stack align={"center"} justify={"center"} p={10}>
            <Card outline={"green"} outlineColor={"green"}>
                <CardHeader align={"center"}>
                    <Image
                        borderRadius='full'
                        src='assets/CafeLabLogo.png'
                        alt='CafeLab'
                        onClick={() => navigate('/')}
                    />
                    <Text className={"cafelab"} fontSize="3xl">
                        CAFELAB
                    </Text>
                </CardHeader>
                <CardBody>
                    <Stack maxWidth={"50%"} mx={"auto"} mb={10}>
                        <Text className="font-headline text-center" fontSize={useBreakpointValue({base: "lg", md: "2xl"})}>Não foi cobrado</Text>
                        <Lottie options={{animationData}} />
                    </Stack>
                </CardBody>
                <CardFooter alignSelf={"center"}>Será redirecionado em breve...</CardFooter>
            </Card>
        </Stack>
    );
}

export default Cancel;