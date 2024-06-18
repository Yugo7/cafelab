import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {HStack, Image, Stack, Text, VStack} from "@chakra-ui/react";
import ContactUsForm from "./components/shared/ContactUsForm.jsx";
import React from "react";

const Contacts = () => {

    return (

        <SidebarWithHeader>
            <Stack m={4} pb={6} justify="flex-start" align="center" spacing="24px">
                <Text className="headline mt-5" fontSize={"3xl"}>Entre em contacto</Text>
            </Stack>

            <Stack className={"main-panel"} Width="100wv" textAlign={"center"}

            >
                <Text className="headline mt-5" fontSize={"xl"}>
                    Av. Moçambique 14 A, 2780-027 Oeiras
                </Text>

                <Image
                    alignSelf="center"
                    src='assets/untitled.png'
                    alt='Chakra UI'
                    onClick={() => window.open("https://maps.app.goo.gl/XVfFfdvZ1USq2XjZ7", "_blank")}
                />
            </Stack>
            <Stack m={4} justify="flex-start" align="center" spacing="24px">
                <Stack className="grid" mb={6}>
                    <HStack spacing={8}>
                        <VStack textAlign={"center"}>
                            <Text className="headline mt-5" fontSize={"xl"}>WhatsApp</Text>
                            <Text>(+351) 214 420 636</Text>
                        </VStack>
                        <VStack textAlign={"center"}>
                            <Text className="headline mt-5" fontSize={"xl"}>Email</Text>
                            <Text>cafelabpt@gmail.com</Text>
                        </VStack>
                    </HStack>
                </Stack>
                <Stack p={4}>
                    <ContactUsForm/>
                </Stack>
            </Stack>
        </SidebarWithHeader>
    );
}

export default Contacts;