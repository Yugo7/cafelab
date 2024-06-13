import {Card, CardBody, Image, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import {useSubscription} from "../context/SubscriptionContext.jsx";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

const Resultado = ({exp, sabor, uso}) => {

    const { t } = useTranslation();
    const {
        addCoffee,
        emptyBox
    } = useSubscription();

    useEffect(() => {
        console.log(exp, sabor, uso)
        emptyBox();
        addCoffee("Lab 01")
        if (exp in [0, 1] && sabor === 0 && uso in [0, 1]) {
            addCoffee("Brasil")
            addCoffee("Nicarágua")
        } else if((sabor === 0 && uso === 2) || (sabor === 1 && uso in [0, 1])){
            addCoffee("Angola")
            addCoffee("Etiópia")
        } else if(sabor === 1 && uso === 2){
            addCoffee("Angola")
            addCoffee("Tanazânia")
        } else if(sabor === 2 && uso in [0, 1]){
            addCoffee("Colômbia")
            addCoffee("Nicarágua")
        } else if(sabor === 2 && uso === 2){
            addCoffee("Colômbia")
            addCoffee("Vietnam")
        } else {
            addCoffee("Nicarágua")
            addCoffee("Etiópia")
        }
    }, []);

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
                            <Text py='2'>
                                {t('results.explorer.intro')}
                                {t('results.explorer.lab01')}
                            </Text>
                        ) : ((sabor === 1 && uso in [0, 1]) || (sabor === 1 && uso === 2)) ? (
                            <Text py='2'>
                                {t('results.fullbody.intro')}
                                {t('results.fullbody.lab01')}
                            </Text>
                        ) : ((sabor === 2 && uso in [0, 1]) || (sabor === 2 && uso === 2)) ? (
                            <Text py='2'>
                                {t('results.sour.intro')}
                                {t('results.sour.lab01')}
                            </Text>
                        ) : (
                            <Text py='2'>
                                {t('results.aficionado.intro')}
                                {t('results.aficionado.lab01')}
                            </Text>)
                        }
                    </CardBody>
                </Stack>
            </Card>
        </Stack>
    )
}


export default Resultado;