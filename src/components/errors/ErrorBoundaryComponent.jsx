import {Card, CardBody, CardFooter, CardHeader, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from "../../../public/assets/animations/alert.json";
import React from "react";
import {Button} from "react-bootstrap";
import SidebarWithHeader from "../shared/SideBar.jsx";

export function ErrorBoundaryComponent({ error, resetErrorBoundary }) {

    return (
        <SidebarWithHeader>
            <Stack align={"center"} justify={"center"} p={10}>
                <Card outline={"green"} mt={4} outlineColor={"green"}>
                    <CardHeader align={"center"}>
                        <Text>
                            Error!!
                        </Text>
                    </CardHeader>
                    <CardBody>
                        <Stack maxWidth={"50%"} mx={"auto"} mb={10}>
                            <Text className="font-headline text-center" fontSize={useBreakpointValue({base: "lg", md: "2xl"})}>{error.message}</Text>
                            <Lottie options={{animationData}}/>
                        </Stack>
                    </CardBody>
                    <CardFooter alignSelf={"center"}>
                        <Button className="mt-4" variant={"outline-dark"} onClick={resetErrorBoundary}>
                            Reload Page
                        </Button>
                    </CardFooter>
                </Card>
            </Stack>
        </SidebarWithHeader>
    )
        ;
}