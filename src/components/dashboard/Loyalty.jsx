import React from 'react';
import QRCodeScanner from '@/components/utilities/QRCodeScanner.jsx';
import {Box, Stack, Text, useBreakpointValue} from '@chakra-ui/react';
import SidebarWithHeader from "@/components/shared/SideBar.jsx";

export default function Loyalty() {

    const fontSize = useBreakpointValue({base: "5xl", md: "62px"});

    return (
        <SidebarWithHeader>
            <Box>
                <Stack justify="flex-start" align="center" my={6} mx={4} spacing="24px">
                    <Text className="cafelab" align="center" fontSize={fontSize} color="#000000">
                        FIDELIDADE
                    </Text>
                </Stack>

                <Text align="center" fontSize="2xl" fontWeight="bold">Escaneie o QR Code</Text>
                <QRCodeScanner />
            </Box>
        </SidebarWithHeader>
    );
}