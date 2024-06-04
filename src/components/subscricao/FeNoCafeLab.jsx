import SidebarWithHeader from "../shared/SideBar.jsx";
import {Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import Carousel from "../products/ProductsCarousel.jsx";
import {FaBoxOpen} from "react-icons/fa";
import ModalQuiz from "./ModalQuiz.jsx";

const FeNoCafeLab = () => {

    const fontSize = useBreakpointValue({base: "6xl", md: "52px"});
    const fontSize2 = useBreakpointValue({base: "3xl", md: "32px"});

    return (
        <SidebarWithHeader>
            <Stack justify="flex-start" align="center" spacing="24px">
                <Text className="font-headline" align="center" fontWeight="extrabold" fontSize={fontSize} letterSpacing="-0.08em" color="#000000">
                    Subscrição Fé no CafeLab
                </Text>
            </Stack>

            <Stack justify="flex-start" align="center" spacing="24px">
                <Text className="font-headline" fontWeight="extrabold" fontSize={fontSize2} letterSpacing="-0.08em" color="#000000">

                    <Stack direction={['row']} spacing="4" align="center" justify="space-between">
                        <Text>0/3</Text> <FaBoxOpen/><FaBoxOpen/><FaBoxOpen/>
                    </Stack>
                </Text>
            </Stack>
        </SidebarWithHeader>
    );
}

export default FeNoCafeLab