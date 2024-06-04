import {Button, Grid, GridItem, Image, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import {FiPackage} from "react-icons/fi";
import {useNavigate} from "react-router-dom";

const ProductCard = ({id, nome, descricao, origem, variedade, grao, preco, imagem, alt}) => {
    const stackSpacing = useBreakpointValue({base: "20px", md: "40px"});
    const fontHl = useBreakpointValue({base: "2xl", md: "6xl"});
    const fontHl2 = useBreakpointValue({base: "lg", md: "2xl"});
    const sectionHeight = useBreakpointValue({base: "820px", md: "800px"});
    const gridValue = useBreakpointValue({base: "repeat(2, 1fr)", md: "repeat(2, 1fr)"});

    const sectWidth = useBreakpointValue({base: "100%", md: "50%"});
    const navigate = useNavigate();
    return (
        <Stack alignItems="center" align="center" >
            <Stack className={"mainPanels"} m={"8"}  p={6} align='stretch' maxWidth="100%" backgroundSize={"cover"}
                   backgroundColor="white">
                <Stack
                    m={4}
                    direction={["column", 'row']} spacing="6" align="center" justify="space-between">
                    <Stack mx={stackSpacing} width={sectWidth}>
                        <Image src={imagem} alt={alt} objectFit="cover"/>
                    </Stack>
                    <Stack spacing={stackSpacing} width={sectWidth}>
                        <Stack justify="flex-end" maxWidth="100%" mt={4}>
                            <Text className="font-headline text-center" fontSize={fontHl}>{nome}</Text>
                            <Text className="font-headline text-center" fontSize={fontHl2}>Origem:{origem}</Text>
                        </Stack>
                        <Stack justify="flex-end" maxWidth="100%" mt={5}>
                            <Text className="font-headline text-left" fontSize={"xl"}>{descricao}</Text>
                        </Stack>
                        <Stack justify="flex-end" maxWidth="100%">
                            <Text className="font-headline text-left" fontSize={"xl"}>Variedade: {variedade}</Text>
                        </Stack>

                        <Stack p={8} align={'center'}>
                            <Button leftIcon={<FiPackage/>} onClick={() => navigate('/agenda')} size='lg' height='48px' border='2px' variant='outline'
                                    colorScheme='#FEEBC8'>
                                Adicionar a subscrição
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
export default ProductCard;

