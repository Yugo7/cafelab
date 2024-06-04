import SidebarWithHeader from "../shared/SideBar.jsx";
import {Spinner, Stack, Text, useBreakpointValue, Wrap, WrapItem} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import CardWithImage from "./EventCard.jsx";
import {getNextEvents, getPastEvents} from '../../services/eventService.js';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PastEventCard from "./PastEventCard.jsx";

const Agenda = () => {

    const fontSize = useBreakpointValue({base: "5xl", md: "62px"});

    const [events, setEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");
    const responsive = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [])

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function fetchEvents() {
        setLoading(true);
        try {
            await delay(1000);
            const data = await getNextEvents(Date.now());
            setEvents(data);
            const pastData = await getPastEvents(Date.now());
            setPastEvents(pastData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <SidebarWithHeader>
                <Stack h={"60vh"} align="center" m={6} spacing={4}>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Stack>
            </SidebarWithHeader>
        )
    }

    if (err) {
        console.log(err)
        return (
            <SidebarWithHeader>
                <Stack h={"60vh"} align="center" m={6} spacing={4}>
                    <Text mt={5}>err</Text>
                </Stack>
            </SidebarWithHeader>
        )
    }

    if (events.length <= 0) {
        return (
            <SidebarWithHeader>
                <Stack h={"60vh"} align="center" m={6} spacing={4}>
                    <Text mt={5}>No events available</Text>
                </Stack>
            </SidebarWithHeader>
        )
    }
    console.log(pastEvents)
    return (
        <SidebarWithHeader>
            <Stack backgroundColor={"whiteAlpha.50"}>
                <Stack justify="flex-start" align="center" my={6} mx={4} spacing="24px">
                    <Text className="cafelab" align="center" fontSize={fontSize}  color="#000000">
                        PRÓXIMOS EVENTOS
                    </Text>
                </Stack>
                <Stack alignSelf={"center"} w={"90vw"}>
                    <Wrap justify={"center"}>
                        {events.map((event, index) => (
                            <WrapItem key={index}>
                                <CardWithImage
                                    {...event}
                                    imageNumber={index}
                                />
                            </WrapItem>
                        ))}
                    </Wrap>
                    <Stack justify="flex-start" align="center" my={6} mx={4} spacing="24px">
                        <Text className="cafelab" align="center" fontSize={fontSize}  color="#000000">
                            EVENTOS PASSADOS
                        </Text>
                    </Stack>
                    <Carousel responsive={responsive}>

                        {pastEvents.map((event, index) => (
                            <Stack key={index} >
                                <PastEventCard
                                    {...event}
                                    imageNumber={index}
                                    events={events}
                                />
                            </Stack>
                        ))}
                    </Carousel>
                </Stack>
            </Stack>
        </SidebarWithHeader>
    )
}

export default Agenda;