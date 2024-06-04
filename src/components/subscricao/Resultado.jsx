import {Card, CardBody, Image, Stack, Text, useBreakpointValue} from "@chakra-ui/react";

const Resultado = ({exp, sabor, uso}) => {

    const fontSize = useBreakpointValue({base: "6xl", md: "52px"});
    const fontSize2 = useBreakpointValue({base: "3xl", md: "32px"});

    return (
        <Stack>
            <Card
                direction={{base: 'column', sm: 'row'}}
            >
                <Image
                    objectFit='cover'
                    maxW={{base: '100%', sm: '200px'}}
                    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                    alt='Caffe Latte'
                />

                <Stack>
                    <CardBody>
                        {((exp in [0, 1] && sabor === 0 && uso in [0, 1]) || (sabor === 0 && uso === 2)) ? (
                            <Text py='2'>Para você, nosso cliente explorador do mundo das especialidades, o convidamos a experimentar nossos cafés aromatizados
                                que proporcionarão uma experiência sensorial e apresentar novas possibilidades e aromas no seu dia-a-dia.
                                Destaque especial para o nosso blend exclusivo, Lab 01. Prepare-se para uma experiência intensa e profundamente aromática que
                                certamente irá surpreendê-lo.
                                Este café foi meticulosamente elaborado para despertar sua curiosidade e satisfazer seu paladar mais exigente.
                            </Text>
                        ) : ((sabor === 1 && uso in [0, 1]) || (sabor === 1 && uso === 2)) ? (
                            <Text py='2'>Para você, nosso cliente explorador do mundo das especialidades, o convidamos a experimentar nossos cafés mais
                                encorpados, adequados especialmente ao seu método de preparo,
                                que permitirá extrair o máximo de sabor dos nossos grãos.
                                Indicamos também saborear o nosso especial blend, Lab 01 que resulta em uma experiência aromática e intensa. Com certeza te
                                surpreenderá.
                            </Text>
                        ) : ((sabor === 2 && uso in [0, 1]) || (sabor === 2 && uso === 2)) ? (
                            <Text py='2'>Para você, nosso cliente explorador do mundo das especialidades, o convidamos a experimentar nossos cafés que de acordo
                                com seu método de preparo, permitem extrair o máximo de aroma e a acidez, possibilitando apreciar as notas complexas de nossos
                                grãos.
                                Indicamos também saborear o nosso especial blend, Lab 01 que resulta em uma experiência aromática e intensa. Com certeza te
                                surpreenderá.
                            </Text>
                        ) : (
                            <Text py='2'>Para você, nosso cliente aficionado pela arte do café, o convidamos a experimentar uma variedade incomparável de grãos,
                                de origens diversas como África e América. Indicamos também saborear o nosso especial blend, Lab 01 que resulta em uma
                                experiência aromática e intensa. Com certeza te surpreenderá.
                            </Text>)
                        }
                    </CardBody>
                </Stack>
            </Card>
        </Stack>
    )
}


export default Resultado;