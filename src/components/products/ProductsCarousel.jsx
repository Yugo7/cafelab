import React, {useEffect, useState} from "react"
import {Spinner, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import ProductCarouselItem from "./ProductCarouselItem.jsx";
import {getProductsBySection} from "../../services/productsService.jsx";

const EuMeExpressoModal = () => {

    const [products, setProducts] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [err, setError] = useState("");
    const padding = useBreakpointValue({base: "0", md: "10%"});

    useEffect(() => {
        setIsLoading(true);
        getProductsBySection("CAFE")
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

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
            <Text mt={5}>{t('boutique.notAvailable')}</Text>
        )
    }

    if (products.length <= 0) {
        return (
            <Text mt={5}>{t('boutique.notAvailable')}</Text>
        )
    }

    return (
        <Stack alignItems={"center"}>
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

export default EuMeExpressoModal;