import {Card, CardBody, Image, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import {Trans, useTranslation} from "react-i18next";
import React from "react";

const Resultado = ({exp, sabor, uso}) => {

    const {t} = useTranslation();

    return (
        <Stack>
            <Card
                direction={{base: 'column', sm: 'row'}}
            >
                <Image
                    objectFit='cover'
                    src='assets/subscricao_fenocafe.jpg'
                    alt='Fé no cafelab'
                    m={6}
                    maxWidth={"300px"}
                    maxH={useBreakpointValue({base: "250px", md: ""})}
                />
                <Stack>
                    <CardBody>
                        <Text py='2' className="ms-auto" fontSize={useBreakpointValue({base: "md", md: "xl"})}>
                            <Trans>
                            {((exp in [0, 1] && sabor === 0 && uso in [0, 1]) || (sabor === 0 && uso === 2)) ? (
                                t('results.explorer.intro') + ' <br />' +
                                t('results.explorer.lab01')
                            ) : ((sabor === 1 && uso in [0, 1]) || (sabor === 1 && uso === 2)) ? (
                                t('results.fullbody.intro') + ' <br />' +
                                t('results.fullbody.lab01')
                            ) : ((sabor === 2 && uso in [0, 1]) || (sabor === 2 && uso === 2)) ? (
                                t('results.sour.intro') + ' <br />' +
                                t('results.sour.lab01')
                            ) : (
                                t('results.aficionado.intro') + ' <br />' +
                                t('results.aficionado.lab01')
                            )
                            }
                        </Trans>
                        </Text>
                    </CardBody>
                </Stack>
            </Card>
        </Stack>
    )
}


export default Resultado;