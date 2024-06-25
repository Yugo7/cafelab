import {Card, CardBody, Image, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import {Trans, useTranslation} from "react-i18next";
import React, {useEffect} from "react";
import {useSubscription} from "../context/SubscriptionContext.jsx";

const Resultado = ({exp, sabor, uso}) => {
    const {emptyCoffee, addCoffee, } = useSubscription()

    useEffect(() => {
        emptyCoffee();
        finishSubscription();
    }, []);

    const finishSubscription = () => {
        addCoffee("LAB 01")
        if (exp in [0, 1] && sabor === 0 && uso in [0, 1]) {
            addCoffee("Brasil")
        }
        if (exp === 2 && sabor === 0 && uso in [0, 1]) {
            addCoffee("Etiópia")
        }
        if ([0, 2].includes(sabor) && uso in [0, 1]) {
            addCoffee("Nicarágua")
        }
        if ((sabor === 0 && uso === 2) || (sabor === 1 && uso in [0, 1])) {
            addCoffee("Etiópia")
        }
        if ((sabor === 1 && uso in [0, 1]) || (sabor === 2 && uso in [0, 1])) {
            addCoffee("Angola")
        }
        if ((sabor === 1 && uso === 2)) {
            addCoffee("Tanzania")
        }
        if (sabor === 2 && uso === 2) {
            addCoffee("Vietnam")
        }
        if (uso === 2) {
            addCoffee("Colombia")
        }
    }

    const {t} = useTranslation();

    return (<Stack>
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
                                {((exp in [0, 1] && sabor === 0 && uso in [0, 1]) || (sabor === 0 && uso === 2)) ? (t('results.explorer.intro') + ' <br />' + t('results.explorer.lab01')) : ((sabor === 1 && uso in [0, 1]) || (sabor === 1 && uso === 2)) ? (t('results.fullbody.intro') + ' <br />' + t('results.fullbody.lab01')) : ((sabor === 2 && uso in [0, 1]) || (sabor === 2 && uso === 2)) ? (t('results.sour.intro') + ' <br />' + t('results.sour.lab01')) : (t('results.aficionado.intro') + ' <br />' + t('results.aficionado.lab01'))}
                            </Trans>
                        </Text>
                    </CardBody>
                </Stack>
            </Card>
        </Stack>)
}


export default Resultado;