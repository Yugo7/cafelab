import React, { useEffect, useState } from "react";
import SidebarWithHeader from "../shared/SideBar.jsx";
import OurPicks from "./OurPicks.jsx";
import { Button, Spinner, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import ProductList from "./ProductList.jsx";
import { getProductsBySection, Sections } from "../../services/productsService.jsx";
import { useTranslation } from 'react-i18next';

export default function Boutique() {

    const fontHeadlineSize = useBreakpointValue({ base: "lg", md: "2xl" });
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [section, setSection] = useState();
    const fontSize = useBreakpointValue({ base: "5xl", md: "62px" });
    const { t } = useTranslation();

    useEffect(() => {
        setIsLoading(true);
        getProductsBySection(section)
            .then(data => {
                const sortedProducts = data.sort((a, b) => {
                    if (a.secao > b.secao) return -1;
                    if (a.secao < b.secao) return 1;
                    return 0;
                });
                setProducts(sortedProducts);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, [section]);

    return (
        <SidebarWithHeader>
            <Stack justify="flex-start" align="center" my={6} mx={4} spacing="24px">
                <Text className="cafelab" align="center" fontSize={fontSize} color="#000000">
                    {t('boutique.title').toUpperCase()}
                </Text>
                <Text maxW={"800px"} fontFamily="Roboto" fontWeight="regular" fontSize={fontHeadlineSize} letterSpacing="tighter" color="black"
                    textAlign="center" mx={4}>
                    {t('boutique.description')}
                </Text>
            </Stack>
            <Stack backgroundColor={"whiteAlpha.50"}>
                <Stack justify="flex-start" align="center" my={6} mx={4} spacing="24px">

                    <Stack direction={'row'}>
                        <Button variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"} onClick={(event) => {
                            setSection(prevSection => prevSection === Sections.CAFE ? null : Sections.CAFE);
                            event.currentTarget.blur();
                        }}>
                            {t('boutique.coffeeButton').toUpperCase()}
                        </Button>
                        <Button variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"} onClick={(event) => {
                            setSection(prevSection => prevSection === Sections.BOUTIQUE ? null : Sections.BOUTIQUE);
                            event.currentTarget.blur();
                        }}>
                            {t('boutique.boutiqueButton').toUpperCase()}
                        </Button>
                    </Stack>
                </Stack>

                {isLoading ? (
                    <Spinner />
                ) : (
                    <ProductList products={products} />
                )}

            </Stack>
            <Stack align={"center"} mx={10} p={10}>
                <OurPicks />
            </Stack>
        </SidebarWithHeader>
    );
}