import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {Stack, Text} from "@chakra-ui/react";

const AboutUs = () => {

    return (

        <SidebarWithHeader>
            <Text className="headline mt-5" fontSize={"3xl"}>Nossa origem</Text>
            <Stack  minHeight={"60vh"} justify={"center"} m={4} align="center" spacing="24px">
                <Text width='90%' >
                    A origem de todas as coisas começa pela paixão.
                    <br/>
                    A paixão pelo café da tarde, o sabor matinal, do cheiro da casa da avó, o café com bolo e até o expresso da reunião. Em cada um a paixão
                    nasce de forma individual, mas nada é tão coletivo como compartilhar um café.
                    <br/>
                    O Cafelab é a origem da nossa paixão, que veio para compartilhar os sabores dos grãos torrados de vários continentes.
                    <br/>
                    Somos uma loja de café de especialidade, onde os grãos são importados ainda verdes de vários países. A torrefação dos grãos de cafés é feita
                    como nos anos 1950, em forno a lenha, preservando e mantendo seus paladares originais.
                    <br/>
                    A venda do nosso café e acessórios é feita na nossa loja física ou online, com toda segurança, qualidade e comodidade. Oferecemos cafés de
                    diferentes países, aromas e intensidades, e os consumidores podem escolher o café em grão ou moído.
                </Text>
            </Stack>
        </SidebarWithHeader>
    );
}

export default AboutUs;