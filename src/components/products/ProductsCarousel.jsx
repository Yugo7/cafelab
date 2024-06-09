import React, {useEffect, useState} from "react"
import {Button, Select, Spinner, Stack, Text, useBreakpointValue, useToast} from "@chakra-ui/react";
import ProductCarouselItem from "./ProductCarouselItem.jsx";
import {getProductsBySection} from "../../services/productsService.jsx";
import {useSubscription} from "../context/SubscriptionContext.jsx";
import {FaCheck} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Carousel = () => {

    const [products, setProducts] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [err, setError] = useState("");
    const padding = useBreakpointValue({base: "0", md: "10%"});
    const {boxQuantity, createEuMeExpresso} = useSubscription();
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState('');
    const toast = useToast();

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        setIsLoading(true);
        getProductsBySection("CAFE")
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, []);

    function euMeExpresso() {
        if (selectedValue === '') {
            toast({
                title: 'Erro',
                description: "Falta especificar como quer seu café.",
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
        } else {
            createEuMeExpresso(selectedValue);
            navigate('/checkout-subscricao');
        }
    }

    if (loading) {
        return (
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        )
    }

    if (err) {
        return (
            <Text mt={5}>Ooops there was an error</Text>
        )
    }

    if (products.length <= 0) {
        return (
            <Text mt={5}>No products available</Text>
        )
    }

    return (
        <Stack alignItems={"center"}>
            <Stack>
                <Stack my={4}>
                    <Select placeholder='Como quer seu café?' value={selectedValue} onChange={handleChange}>
                        <option value='beans'>Grãos</option>
                        <option value='expresso'>Moído para expresso</option>
                        <option value='frenchpress'>Moído para prensa francesa/ italiana</option>
                    </Select>
                </Stack>
                <Stack direction={"row"} my={4}>
                    <Text className={"cafelab"} fontWeight={"bold"} fontSize={"xl"}>
                        SUA SUBSCRIÇÃO: {boxQuantity}/3
                    </Text>
                    {boxQuantity === 3 ? (
                        <Stack px={4}>
                            <Button leftIcon={<FaCheck/>} onClick={() => euMeExpresso()} size='sm' border='2px'
                                    variant='outline' colorScheme='#FEEBC8'>
                                Pronto
                            </Button>
                        </Stack>
                    ) : ""}
                </Stack>
            </Stack>
            <Stack id="cafeCarousel" className="carousel no-transition" data-ride="carousel">
                <Stack maxHeight={"100%"} className="carousel-inner" px={padding}>
                    {products.map((product, index) => (
                        <ProductCarouselItem
                            {...product}
                            imageNumber={index}
                            allProducts={products}
                        />
                    ))}
                </Stack>
                //TODO: convert these buttons into IconButtons
                <button className="carousel-control-prev" type="button" data-bs-target="#cafeCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#cafeCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </Stack>
        </Stack>
    )
}

export default Carousel;