import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {Stack, Text} from "@chakra-ui/react";

const Refunds = () => {

    return (

        <SidebarWithHeader>
            <Text className="headline mt-5" fontSize={"3xl"}>Política de reembolso</Text>
            <Stack minHeight={"60vh"} justify={"center"} m={4} align="center" spacing="24px">
                <Text width='80%'>
                    Temos uma política de devolução de 30 dias, o que significa que você tem 30 dias após o recebimento do item para solicitar a devolução.
                    <br/>
                    Para ter direito a uma devolução, seu item deve estar nas mesmas condições em que você o recebeu, sem usar ou sem usar, com etiquetas e em
                    sua embalagem original. Você também precisará do recibo ou comprovante de compra.
                    <br/>
                    Para iniciar uma devolução, pode contactar-nos em cafelabpt@gmail.com. Se sua devolução for aceita, enviaremos uma etiqueta de envio de
                    devolução, bem como instruções sobre como e para onde enviar seu pacote. Itens enviados de volta para nós sem primeiro solicitar uma
                    devolução não serão aceitos.
                    <br/>
                    Você sempre pode nos contatar para qualquer pergunta de retorno em cafelabpt@gmail.com.

                    <br/>
                    Danos e problemas
                    Por favor, inspecione seu pedido no momento do recebimento e entre em contato conosco imediatamente se o item estiver com defeito,
                    danificado ou se você receber o item errado, para que possamos avaliar o problema e corrigi-lo.
                    <br/>
                    Exceções / itens não retornáveis
                    Certos tipos de itens não podem ser devolvidos, como produtos perecíveis (como alimentos, flores ou plantas), produtos personalizados (como
                    pedidos especiais ou itens personalizados) e produtos de higiene pessoal (como produtos de beleza). Também não aceitamos devoluções de
                    materiais perigosos, líquidos inflamáveis ​​ou gases. Por favor, entre em contato se você tiver dúvidas ou preocupações sobre seu item
                    específico.
                    <br/>
                    Infelizmente, não podemos aceitar devoluções de itens em promoção ou cartões-presente.
                    <br/>

                    Intercâmbios
                    A maneira mais rápida de garantir que você obtenha o que deseja é devolvendo o item que você possui e, assim que a devolução for aceita,
                    faça uma compra separada para o novo item.
                    <br/>

                    Reembolsos
                    Notificaremos você assim que recebermos e inspecionarmos sua devolução e informaremos se o reembolso foi aprovado ou não. Se aprovado, você
                    será reembolsado automaticamente em sua forma de pagamento original. Lembre-se de que pode levar algum tempo para que seu banco ou
                    administradora de cartão de crédito processe e publique o reembolso.
                </Text>
            </Stack>
        </SidebarWithHeader>
    );
}

export default Refunds;