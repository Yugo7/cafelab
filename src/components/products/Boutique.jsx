import React, {useEffect, useState} from "react";
import SidebarWithHeader from "../shared/SideBar.jsx";
import OurPicks from "./OurPicks.jsx";
import {Button, Image, Spinner, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import ProductList from "./ProductList.jsx";
import {getProductsBySection, Sections} from "../../services/productsService.jsx";
import {FiPackage, FiShoppingBag} from "react-icons/fi";
import * as url from "url";

export default function Boutique() {

    const fontTitleSize = useBreakpointValue({base: "60px", md: "62px"});
    const fontHeadlineSize = useBreakpointValue({base: "lg", md: "2xl"});
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [section, setSection] = useState();
    const spacingTitle = useBreakpointValue({base: "70px", md: "100px"});
    const fontSize = useBreakpointValue({base: "5xl", md: "62px"});

    useEffect(() => {
        setIsLoading(true);
        getProductsBySection(section)
            .then(data => {
                setProducts(data);
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
                <Text className="cafelab" align="center" fontSize={fontSize}  color="#000000">
                    BOUTIQUE CAFELAB
                </Text>
                <Text maxW={"800px"} fontFamily="Roboto" fontWeight="regular" fontSize={fontHeadlineSize} letterSpacing="tighter" color="black"
                      textAlign="center" mx={4}>
                    Além dos cafés especiais e acessórios, trazemos agora uma coleção exclusiva de Ecobags, Aventais, Chávenas e muito mais!
                </Text>
            </Stack>

            <Stack className={"main-panel"} Width="100wv"
                   >
                <Image
                    alignSelf="center"
                    src='assets/capa_boutique.jpeg'
                    alt='Chakra UI'
                />
                {/*<Stack align={"center"} maxWidth="100%" mb={10} ml={useBreakpointValue({md: 20})}>*/}
                {/*    <Stack alignSelf="stretch" direction={['column', 'row']}  justify="center" align="center" spacing="12px" >*/}
                {/*        <Text className="font-headline" align="center" fontWeight="extrabold"*/}
                {/*              fontSize={fontTitleSize} letterSpacing="-0.08em"*/}
                {/*              style={{ WebkitTextStroke: "3px white" }}*/}
                {/*              color="#000000">*/}
                {/*            CAFELAB BOUTIQUE*/}
                {/*        </Text>*/}
                {/*    </Stack>*/}
                {/*</Stack>*/}
            </Stack>
            <Stack backgroundColor={"whiteAlpha.50"}>
                <Stack justify="flex-start" align="center" my={6} mx={4} spacing="24px">

                    <Stack direction={'row'}>
                        <Button variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"} onClick={(event) => {
                            setSection(prevSection => prevSection === Sections.CAFE ? null : Sections.CAFE);
                            event.currentTarget.blur();
                        }}>
                            Café
                        </Button>
                        <Button variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"} onClick={(event) => {
                            setSection(prevSection => prevSection === Sections.BOUTIQUE ? null : Sections.BOUTIQUE);
                            event.currentTarget.blur();
                        }}>
                            Boutique
                        </Button>
                    </Stack>
                </Stack>

                {isLoading ? (
                    <Spinner/>
                ) : (
                    <ProductList products={products}/>
                )}

                <Stack align={"center"} mx={10} p={10}>
                    <OurPicks />
                </Stack>
            </Stack>
        </SidebarWithHeader>
    );
}