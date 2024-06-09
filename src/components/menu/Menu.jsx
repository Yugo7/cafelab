import SidebarWithHeader from "../shared/SideBar.jsx";
import {Button, Image, Spinner, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {getMenuItems, Sections} from "../../services/MenuService.jsx";
import MenuList from "./MenuList.jsx";

const Menu = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const fontSize = useBreakpointValue({base: "5xl", md: "62px"});
    const [section, setSection] = useState();
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);

    useEffect( () => {
        setIsLoading(true);
        getMenuItems(section)
            .then(data => {
                setMenuItems(data);
                setFilteredMenuItems(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, [section]);

    return (
        <SidebarWithHeader>
            <Stack justify="flex-start" align="center" my={6} mx={4} spacing="24px">
                <Text className="cafelab" align="center" fontSize={fontSize}  color="#000000">
                    MENU PRIMAVERA CAFELAB
                </Text>
            </Stack>
            <Stack backgroundColor={"whiteAlpha.50"}  m={8}>
                <Stack justify="flex-start" align="center" my={6} mx={4} spacing="24px">

                    <Stack direction={'row'}>
                        <Button variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"} onClick={(event) => {
                            setSection(prevSection => prevSection === Sections.QUENTE ? null : Sections.QUENTE);
                            event.currentTarget.blur();
                        }}>
                            Bebidas quentes
                        </Button>
                        <Button variant={"solid"} backgroundColor={"blackAlpha.800"} color={"antiquewhite"} onClick={(event) => {
                            setSection(prevSection => prevSection === Sections.FRIO ? null : Sections.FRIO);
                            event.currentTarget.blur();
                        }}>
                            Bebidas frias
                        </Button>
                    </Stack>
                </Stack>

                <Stack>
                {isLoading ? (
                    <Spinner/>
                ) : (
                    <MenuList menuItems={filteredMenuItems}/>
                )}
                </Stack>
            </Stack>
        </SidebarWithHeader>
    );
}

export default Menu;