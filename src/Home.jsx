import SidebarWithHeader from "./components/shared/SideBar.jsx";
import { Box, Button, Flex, Image, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { FiBook, FiCalendar, FiPackage, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ImagePanel from "./components/home/ImagePanel.jsx";

const Home = () => {
    const stackSpacing = useBreakpointValue({ base: "20px", md: "30px" });
    const boxPadding = useBreakpointValue({ base: "5px", md: "10px" });
    const fontSize = useBreakpointValue({ base: "6xl", md: "70px" });
    const fontHl = useBreakpointValue({ base: "5xl", md: "6xl" });
    const fontHl2 = useBreakpointValue({ base: "xl", md: "3xl" });
    const fontHl3 = useBreakpointValue({ base: "lg", md: "4xl" });
    const sectWidth = useBreakpointValue({ base: "100%", md: "50%" });
    const calendarioSectWidth = useBreakpointValue({ base: "90%", md: "35%" });

    const navigate = useNavigate();

    const { t } = useTranslation();
    return (
        <SidebarWithHeader>
            <Stack spacing={0}>
                <Stack paddingY="10px" align="center" maxWidth="100%" spacing="30px">
                    <Stack justify="flex-start" align="center" spacing={stackSpacing} width="100%" maxWidth="100%">
                        <Stack justify="flex-start" align="center" spacing="-20px">
                            <Text className="cafelab" fontSize={fontSize} color="#000000">
                                CAFELAB
                            </Text>
                            <Text fontFamily="Roboto" fontWeight="regular" fontSize={fontHl2} letterSpacing="tighter" color="#FFFFFF"
                                textAlign="center" mx={4}>
                                <Box as="span" color="#000000">
                                    {t('home.headlineText')}
                                </Box>
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack className={"main-panel"} height={"500px"} paddingY="20px" justify="flex-end" align="center" direction="column" maxWidth="100%"
                    mb={5} backgroundImage="url('assets/capa.png')" bgPosition={"75% 25%"} bgSize={"cover"} spacing="40px">

                    <Stack align={"center"} spacing={stackSpacing} width="759px" maxWidth="100%" mb={10}>
                        <Stack alignSelf="stretch" direction={['column', 'row']} justify="center" align="center" spacing="12px">

                            <Button leftIcon={<FiPackage />} onClick={() => navigate('/subscricao')} size='lg' height='48px' width='200px' border='2px'
                                variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                {t('home.subscriptionButton')}</Button>
                            <Button leftIcon={<FiShoppingBag />} onClick={() => navigate('/boutique')} size='lg' height='48px' width='200px' border='2px'
                                variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                {t('home.storeButton')}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={0} direction={['column', 'row']} width="100%" justify="center">
                    <Box width={{ base: '100%', md: '50%' }} p={10} display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
                        <Text className={"cafelab"} fontWeight="normal" align="center" fontSize={fontSize}
                            lineHeight={"95%"} letterSpacing="-0.08em"
                            color="#000000">
                            {t('home.checkOutOurSubscriptions')}
                        </Text>
                    </Box>

                    <ImagePanel backgroundColor='black' />
                </Stack>
                <Stack spacing={0} direction={['column', 'row']} width="100%" justify="center">
                    <ImagePanel imageUrl={"url('assets/menu.jpg')"} />
                    <Box flex="1" width={{ base: '100%', md: '50%' }} padding={10} display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
                        <Text className={"cafelab"} py={useBreakpointValue({ base: 0, md: 8 })} fontWeight="normal" align="center" fontSize={fontSize}
                            lineHeight={"95%"} letterSpacing="-0.08em"
                            color="#000000">
                            {t('home.checkOutOurCoffee')}
                        </Text>
                    </Box>
                </Stack>
                <Stack direction={['column', 'row']} width="100%" justify="center">

                    <ImagePanel imageUrl={"url('assets/ecobag.png')"} />

                    <Box flex="1" p={6} display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
                        <Text className={"cafelab"} mt={useBreakpointValue({ base: 0, md: 8 })} fontWeight="normal" align="center" fontSize={fontSize}
                            lineHeight={"80%"} letterSpacing="-0.08em"
                            color="#000000">
                            {t('home.checkOutOurBoutique')}
                        </Text>
                    </Box>
                </Stack>

                <Box
                    width={{ base: '100%', md: '50%' }}
                    height="400px"
                    backgroundImage="url('assets/menu.jpg')"
                    backgroundSize="cover"
                    backgroundPosition="center"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    textAlign="center"
                >
                    <Text fontSize="3xl" fontWeight="bold" mb={4}>
                        {t('home.springMenu')}
                    </Text>
                    <Text fontSize="xl" mb={8}>
                        {t('home.refreshingDrinks')}
                    </Text>
                    <Button
                        leftIcon={<FiBook />}
                        onClick={() => navigate('/menu')}
                        size="lg"
                        height="48px"
                        width="200px"
                        border="2px"
                        variant="solid"
                        backgroundColor="blackAlpha.800"
                        color="antiquewhite"
                    >
                        {t('home.menuButton')}
                    </Button>
                </Box>
                <Box
                    width={{ base: '100%', md: '50%' }}
                    height="400px"
                    backgroundImage="url('assets/menu.jpg')"
                    backgroundSize="cover"
                    backgroundPosition="center"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    textAlign="center"
                >
                    <Text fontSize="3xl" fontWeight="bold" mb={4}>
                        {t('home.springMenu')}
                    </Text>
                    <Text fontSize="xl" mb={8}>
                        {t('home.refreshingDrinks')}
                    </Text>
                    <Button
                        leftIcon={<FiBook />}
                        onClick={() => navigate('/menu')}
                        size="lg"
                        height="48px"
                        width="200px"
                        border="2px"
                        variant="solid"
                        backgroundColor="blackAlpha.800"
                        color="antiquewhite"
                    >
                        {t('home.menuButton')}
                    </Button>
                </Box>


                <Stack direction={["column", 'row']} spacing="4" align="center" justify="space-between">
                    <Stack spacing={stackSpacing} width={sectWidth} mt={8}>
                        <Text className={"cafelab"} mt={useBreakpointValue({ base: 0, md: 8 })} fontWeight="normal" align="center" fontSize={fontSize}
                            lineHeight={"80%"} letterSpacing="-0.08em"
                            color="#000000">
                            {t('home.visit')}
                        </Text>
                        <Stack className={"mainPanels"} mx={4} align="center" backgroundSize={"cover"} bgPosition={"75% 25%"}
                            backgroundColor="cornsilk" backgroundImage="url('assets/IMG_8054.JPG')">
                            <Stack justify="flex-start" height={"600px"} w={"100%"} mt={4} mb={10}>
                                <Flex direction="column" justify="space-between" align="center" width={"100%"} height="100%">
                                    <Button leftIcon={<FaMapMarkerAlt />} onClick={() => window.open("https://maps.app.goo.gl/XVfFfdvZ1USq2XjZ7", "_blank")}
                                        size='lg' height='48px' width='200px' border='2px'
                                        variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                        {t('home.openOnMaps')}
                                    </Button>

                                    <Stack justify="center" align="center" spacing={stackSpacing} my={4} width="60%" height="50%">
                                    </Stack>
                                    <Stack justify="center" align="center" width={"80%"} spacing={stackSpacing}>
                                        <Box mx={4} backgroundColor="rgba(0, 0, 0,0.7)" width={"100%"} align="center" padding={boxPadding}>
                                            <Text className={"cafelab-inner"} lineHeight="1.48" fontWeight="regular" fontSize={fontHl2} letterSpacing="-0.02em"
                                                color="#FFFFFF"
                                                alignSelf="stretch" textAlign="center" mx={4}>
                                                <Box as="span" color="#FFFFFF">
                                                    {t('home.firstCoffeeShop')}
                                                </Box>
                                            </Text>
                                        </Box>
                                        <Stack direction={['column', 'row']} justify="center" align="center" spacing={stackSpacing} mt={"20px"} mx={4}>
                                            <Box backgroundColor="rgba(0, 0, 0,0.7)" mx={2} padding={boxPadding} align="center">
                                                <Text className={"cafelab-inner"} fontSize={"2xl"} letterSpacing="-0.004em" color="#FFFFFF" mx={2}>
                                                    {t('home.petWorkFriendly')}
                                                </Text>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Flex>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack justify="center" align="center" width={sectWidth}>
                        <Stack className={"mainPanels main-panel"} p={4} backgroundSize={"cover"} height={"800px"}
                            backgroundColor="cornsilk" backgroundImage="url('assets/menu.jpg')" spacing={stackSpacing}>
                            <Stack justify="flex-end" w="100%" h={"100%"} paddingBottom={"30px"}>
                                <Box backgroundColor="rgba(0, 0, 0,0.7)" mx={"5%"} padding={boxPadding}>
                                    <Text className="cafelab text-center" fontWeight={"bold"} color="#FFFFFF" fontSize={fontHl3}>{t('home.springMenu')}</Text>
                                </Box>
                                <Box backgroundColor="rgba(0, 0, 0,0.7)" mt={"25%"} padding={boxPadding}>
                                    <Text className="cafelab-inner text-center" color="#FFFFFF" fontSize={"xl"}>{t('home.refreshingDrinks')}</Text>
                                </Box>
                                <Stack direction={"column"} justify="flex-end" align="center" style={{ marginTop: 'auto' }}>
                                    <Button hidden={true} leftIcon={<FiBook />} onClick={() => navigate('/menu')} size='lg' height='48px' width='200px' border='2px'
                                        variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                        {t('home.menuButton')}
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>

                <Box paddingY="10px">
                </Box>
                <Stack className={"mainPanels"} my={"10"} align='stretch' bgImage={"assets/cafelab_cultural.jpg"}
                    bgPosition={useBreakpointValue({ base: "60% 70%", md: "80% 50%" })} maxWidth="100%" backgroundSize={"cover"}
                    backgroundColor="cornsilk" spacing={stackSpacing} minH={"800px"} direction={["column", "column"]} justify="space-between" position="relative">
                    <Stack width={calendarioSectWidth} m={useBreakpointValue({ base: 6, md: 8 })}>
                        <Box backgroundColor="rgba(0, 0, 0,0.7)" width={"100%"} padding={boxPadding}>
                            <Text className="cafelab-inner text-center" color="#FFFFFF" fontSize={fontHl}>{t('home.culturalCalendar')}</Text>
                        </Box>
                        <Stack justify="flex-end" align="center" width={useBreakpointValue({ base: "90%", md: "100%" })} mt={8} position={useBreakpointValue({ base: "absolute", md: "" })} bottom={useBreakpointValue({ base: "2", md: "" })}>
                            <Box backgroundColor="rgba(0, 0, 0,0.7)" width={"100%"} padding={boxPadding}>
                                <Text className="cafelab-inner text-center" color="#FFFFFF" fontSize={"3xl"}>{t('home.discoverProjects')}</Text>
                            </Box>
                            <Button leftIcon={<FiCalendar />} onClick={() => navigate('/agenda')} size='lg' height='48px' width='200px' border='2px'
                                variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"}>
                                {t('home.agendaButton')}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack direction={['column', 'row']} spacing={8} width="100%" justify="center">
                    {/* Image Section */}
                    <Box flex="1">
                        <Image src="assets/menu.jpg" alt="Description" style={{ width: '100%', height: 'auto' }} />
                    </Box>

                    {/* Text Section */}
                    <Box flex="1" display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
                        <Text fontSize="2xl" fontWeight="bold">
                            {t('home.featureTitle')}
                        </Text>
                        <Text fontSize="lg">
                            {t('home.featureDescription')}
                        </Text>
                    </Box>
                </Stack>
                <Stack spacing={8} align="center" width="100%">

                    {/* Hero Section */}
                    <Box
                        width="100%"
                        height="600px"
                        backgroundImage="url('assets/hero.jpg')"
                        backgroundSize="cover"
                        backgroundPosition="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        textAlign="center"
                    >
                        <Text fontSize="4xl" fontWeight="bold">
                            {t('home.heroTitle')}
                        </Text>
                    </Box>

                    {/* Feature Highlights */}
                    <Stack direction={['column', 'row']} spacing={8} width="80%" justify="center">
                        <Box
                            backgroundColor="rgba(0, 0, 0, 0.7)"
                            padding={8}
                            borderRadius="md"
                            textAlign="center"
                            color="white"
                        >
                            <Text fontSize="2xl" fontWeight="bold">
                                {t('home.firstCoffeeShop')}
                            </Text>
                        </Box>
                        <Box
                            backgroundColor="rgba(0, 0, 0, 0.7)"
                            padding={8}
                            borderRadius="md"
                            textAlign="center"
                            color="white"
                        >
                            <Text fontSize="2xl" fontWeight="bold">
                                {t('home.petWorkFriendly')}
                            </Text>
                        </Box>
                    </Stack>

                    {/* Call-to-Action Section */}
                    <Box
                        width="100%"
                        height="400px"
                        backgroundImage="url('assets/menu.jpg')"
                        backgroundSize="cover"
                        backgroundPosition="center"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        textAlign="center"
                    >
                        <Text fontSize="3xl" fontWeight="bold" mb={4}>
                            {t('home.springMenu')}
                        </Text>
                        <Text fontSize="xl" mb={8}>
                            {t('home.refreshingDrinks')}
                        </Text>
                        <Button
                            leftIcon={<FiBook />}
                            onClick={() => navigate('/menu')}
                            size="lg"
                            height="48px"
                            width="200px"
                            border="2px"
                            variant="solid"
                            backgroundColor="blackAlpha.800"
                            color="antiquewhite"
                        >
                            {t('home.menuButton')}
                        </Button>
                    </Box>
                </Stack>
                <Box paddingY="10px">
                </Box>
            </Stack>
        </SidebarWithHeader >
    )
}

export default Home;
