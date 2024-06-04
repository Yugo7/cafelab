import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {Text} from "@chakra-ui/react";
import ContactUsForm from "./components/shared/ContactUsForm.jsx";

const Menu = () => {

    return (

        <SidebarWithHeader>
            <Text className="headline mt-5" fontSize={"3xl"}>Menu</Text>
        </SidebarWithHeader>
    );
}

export default Menu;