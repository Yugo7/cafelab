import {
    Box,
    Button,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text, useBreakpointValue,
    useDisclosure
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";

function ModalKit() {
    const modalSize = useBreakpointValue({base: "full", md: "xl"});
    const {isOpen: isOpenSecond, onOpen: onOpenSecond, onClose: onCloseSecond} = useDisclosure()
    const {addSubscription, emptyCart} = useShoppingCart();

    const kit = {
        id: 998,
        nome: "Kit Experiencia",
        preco: 7.00,
        imagem: "assets/bundle.png",
        descricao: "8 embalagens de 13g com as variedades de café do Cafelab."
    };

    useEffect(() => {
        onOpenSecond();
    }, [onOpenSecond]);

    function addKitToSubscription() {
        emptyCart(true);
        addSubscription(kit);
        onCloseSecond();
    }

    return (
        <Modal closeOnOverlayClick={false}
               motionPreset='slideInBottom' size={modalSize} isOpen={isOpenSecond} onClose={onCloseSecond}>
            <ModalOverlay/>
            <ModalContent style={{height: '90vh'}}>
                <ModalHeader>Novidade!</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Stack>
                        <Text>
                            Para os iniciantes, montamos um Kit Experiência Cafelab, com porções individuais de toda a nossa gama de cafés. Uma compra
                            única, que te permite conhecer e apreciar todos os diferentes sabores e especialidades da nossa marca.
                        </Text>
                    </Stack>

                    <Box
                        align='center'
                        mt={8}
                    >
                        <Image
                            src='assets/bundle.png'
                            alt="Kit Experiência Cafelab"
                            borderRadius='lg'
                            objectFit='contain'
                            maxHeight={"350px"}
                        />
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button justify={"center"} variant={"outline"} onClick={addKitToSubscription} mr={6}>Sim, por favor!</Button>
                    <Button justify={"center"} variant={"outline"} colorScheme={"red"} onClick={onCloseSecond}>Não, obrigado.</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalKit