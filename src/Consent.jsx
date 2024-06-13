import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {Box, Stack, Text} from "@chakra-ui/react";
import {Trans, useTranslation} from "react-i18next";

const text = `
Cafelab Política de privacidade

Esta Política de privacidade descreve como suas informações pessoais são coletadas, usadas e compartilhadas quando você visita ou faz uma compra no www.cafelab.pt (o "Site").

INFORMAÇÕES PESSOAIS QUE COLETAMOS

Quando você visita o Site, coletamos automaticamente determinadas informações sobre o seu dispositivo, incluindo informações sobre seu navegador da web, endereço IP, fuso horário e de alguns dos cookies instalados no seu dispositivo. Além disso, à medida que você navega no Site, coletamos informações sobre as páginas da web ou produtos individuais que você visualiza, quais sites ou termos de pesquisa que indicaram o Site a você e informações sobre como você interage com o Site. Referimo-nos a essa informação coletada automaticamente como "Informações do dispositivo".

    Coletamos Informações do dispositivo usando as seguintes tecnologias:

    COOKIES

- “Arquivos de log” rastreiam ações que ocorrem no Site e coletam dados, incluindo seu endereço IP, tipo de navegador, provedor de serviços de Internet, páginas de referência/saída e registros de data/hora.
- “Beacons da web”, “tags” e “pixels” são arquivos eletrônicos usados para registrar informações sobre como você navega no Site.

Além disso, quando você faz uma compra ou tenta fazer uma compra no Site, nós coletamos algumas informações suas, incluindo seu nome, endereço de faturamento, endereço de entrega, informações de pagamento (incluindo números de cartão de crédito [[INSERIR QUALQUER OUTRO TIPO DE PAGAMENTO ACEITO]]), endereço de e-mail e número de telefone.  Nós chamamos essas informações de “Informações do pedido”.

Quando falamos sobre “Informações pessoais” nesta Política de privacidade, estamos falando sobre Informações do dispositivo e Informações do pedido.

    COMO USAMOS SUAS INFORMAÇÕES PESSOAIS?

    Em geral, nós usamos as Informações do pedido que coletamos para processar quaisquer pedidos feitos por meio do Site (incluindo o processamento das suas informações de pagamento, a organização do frete e o fornecimento de faturas e/ou confirmações de pedidos).  Além disso, usamos essas Informações do pedido para:
nos comunicarmos com você;
rastrear nossos pedidos para identificar possíveis riscos ou fraudes; e
quando de acordo com as preferências que você compartilhou conosco, para fornecer informações ou publicidade relacionadas aos nossos produtos ou serviços.

Além disso, é possível desativar alguns desses serviços acessando o portal de descadastramento da Digital Advertising Alliance em http://optout.aboutads.info/.

    NÃO RASTREAR
Por favor, observe que nós não alteramos a coleta de dados e as práticas de uso do nosso Site quando vemos um sinal de Não rastrear no seu navegador.

SEUS DIREITOS
Se você é um residente europeu, tem o direito de acessar as informações pessoais que mantemos sobre você e de solicitar que suas informações pessoais sejam corrigidas, atualizadas ou excluídas. Se você quiser exercer esse direito, entre em contato conosco usando as informações de contato abaixo.
    Além disso, se você for um residente europeu, observe que estamos processando suas informações para cumprir os contratos que podemos ter com você (por exemplo, se você fizer um pedido pelo Site) ou para proteger nossos interesses comerciais legítimos listados acima.  Além disso, observe que suas informações serão transferidas para fora da Europa, inclusive para o Canadá e os Estados Unidos.


    RETENÇÃO DE DADOS
Ao fazer um pedido no Site, nós manteremos suas Informações do pedido em nossos registros a menos e até que você nos peça para excluir essas informações.

    MUDANÇAS
Nós podemos atualizar esta Política de privacidade periodicamente para refletir, por exemplo, mudanças em nossas práticas ou por outros motivos operacionais, legais ou regulamentares.
    FALE CONOSCO
Para saber mais sobre nossas práticas de privacidade, caso tenha dúvidas ou se quiser fazer uma reclamação, entre em contato conosco por e-mail em cafelab86@gmail.com ou pelo correio usando as informações abaixo:

    Av. Moçambique 14 A, Oeiras, PT-11, 2780-027, Portugal
`
const Consent = () => {
    const { t } = useTranslation();

    return (
        <SidebarWithHeader>
            <Stack m={4} justify="flex-start" align="center" spacing="24px">
                <Text className="headline mt-5" fontSize={"3xl"}>{t('consent.title')}</Text>
            </Stack>
            <Stack minHeight={"60vh"} justify={"center"} m={4}  pb={8}  align="center" spacing="24px">
                <Box width='80%' as="pre" className={"cafelab-inner"} style={{ whiteSpace: "pre-wrap" }}>
                    <Trans>{t('consent.content')}</Trans>
                </Box>
            </Stack>
        </SidebarWithHeader>
    );
}
export default Consent;