import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {Stack, Text} from "@chakra-ui/react";
import ContactUsForm from "./components/shared/ContactUsForm.jsx";

const Contacts = () => {

    return (

        <SidebarWithHeader>
            <Text className="headline mt-5" fontSize={"3xl"}>Entre em contacto</Text>
            <Stack m={4} justify="flex-start" align="center" spacing="24px">
                <Stack className="grid">
                    <Stack className="grid__item medium-up--four-fifths medium-up--push-one-tenth">
                        <Stack direction={"row"} m={6} spacing={6}>
                            <Stack>
                                <strong>WhatsApp</strong>
                                <p>(+351) 214 420 636</p>
                            </Stack>
                            <Stack>
                                <strong>Email</strong>
                                <p>cafelabpt@gmail.com</p>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <ContactUsForm/>
            </Stack>
        </SidebarWithHeader>
    );
}

export default Contacts;