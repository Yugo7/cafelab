import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {HStack, Stack, Text, VStack} from "@chakra-ui/react";
import ContactUsForm from "./components/shared/ContactUsForm.jsx";

const Contacts = () => {

    return (

        <SidebarWithHeader>
            <Stack m={4} justify="flex-start" align="center" spacing="24px">
                <Text className="headline mt-5" fontSize={"3xl"}>Entre em contacto</Text>
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