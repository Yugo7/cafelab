import React, { useEffect, useState } from "react"
import { Box, Spinner, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import ProductCarouselItem from "./ProductCarouselItem.jsx";
import { getProductsBySection } from "../../services/productsService.jsx";
import { useTranslation } from "react-i18next";

const EuMeExpressoModal = () => {

    const [products, setProducts] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [activeProductId, setActiveProductId] = useState(null); 
    const [err, setError] = useState("");
    const padding = useBreakpointValue({ base: "0", md: "10%" });
    const { t } = useTranslation();

    useEffect(() => {
        setIsLoading(true);
        getProductsBySection("CAFE")
            .then(data => {
                setProducts(data);
                setActiveProductId(data.length > 0 ? data[0].id : null);
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
            <Box alignItems={"center"}>
                <Box id="cafeCarousel" className="carousel no-transition" data-ride="carousel">
                    <Stack className="carousel-inner" px={padding}>
                        {products.map((product, index) => (
                            <ProductCarouselItem
                                product={product}
                                imageNumber={index}
                                isActive={product.id === activeProductId}
                                key={product.id} 
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
                </Box>
            </Box>
    )
}

export default EuMeExpressoModal;