import React from 'react';
import {Text, Image, Link, Button, Stack, SimpleGrid, Spacer} from '@chakra-ui/react';
import {FiInstagram} from "react-icons/fi";
import dayjs from 'dayjs';

const EventList = ({events, onEdit, onDelete, onOpen}) => {
    const now = dayjs();

    const pastEvents = events.filter(event => dayjs(event.date).isBefore(now));
    const nextEvents = events.filter(event => dayjs(event.date).isAfter(now));

    const renderEvents = (events) => (
        <SimpleGrid minChildWidth="300px" spacing={4}>
            {events.map((event, index) => (
                <Stack key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} display="flex" flexDirection="column" height="100%" maxW={"450px"}>
                    <Text fontSize="xl" fontWeight="bold">Título: {event.name}</Text>
                    <Text maxWidth="300px" whiteSpace="normal" wordBreak="break-word">Descrição: {event.description}</Text>
                    <Text>Local: {event.local}</Text>
                    <Text>Data: {event.date}</Text>

                    <Text>Imagem promoção:</Text>
                    <Image
                        src={event?.imagePromotion?.startsWith('assets/') ? `/${event.imagePromotion}` : event?.imagePromotion || 'defaultImagePath'}
                        alt="Promo" boxSize="200px" overflow={"hidden"} />
                    <Text>Imagem fim do evento:</Text>
                    <Image
                        src={event?.imageFinish?.startsWith('assets/') ? `/${event.imageFinish}` : event?.imageFinish || 'defaultImagePath'}
                           alt="Post" boxSize="200px"  overflow={"hidden"}/>
                    <Stack>
                        <Link href={event.instagramUrl} isExternal>
                            <Button
                                bg={'red.400'}
                                color={'white'}
                                rounded={'lg'}
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg'
                                }}
                                _focus={{
                                    bg: 'green.500'
                                }}
                                onClick={onOpen}
                                leftIcon={<FiInstagram />}
                                isDisabled={!event.instagramUrl}
                            >
                                Instagram
                            </Button>
                        </Link>
                    </Stack>
                    <Spacer />
                    <Stack direction="row" spacing={4} mt={4}>
                        <Button colorScheme="yellow" onClick={() => onEdit(event)}>Edit</Button>
                        <Button colorScheme="red" onClick={() => onDelete(event)}>Delete</Button>
                    </Stack>
                </Stack>
            ))}
        </SimpleGrid>
    );

    return (
        <>
            <Text fontSize="2xl" fontWeight="bold">Proximos eventos</Text>
            {renderEvents(nextEvents)}
            <Text fontSize="2xl" fontWeight="bold" mt={8}>Eventos passados</Text>
            {renderEvents(pastEvents)}
        </>
    );
};

export default EventList;