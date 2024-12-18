import React, {useState} from 'react';
import SidebarWithHeader from "../shared/SideBar.jsx";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Box
} from '@chakra-ui/react';
import EventForm from './events/EventsForm.jsx';
import EventList from './events/EventsList.jsx';
import {useEffect} from 'react';
import eventService from '../../services/eventService.js';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const fetchEvents = async () => {
        try {
            const data = await eventService.getAllEvents();
            setEvents(data);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSave = async (event) => {
        try {
            if (currentEvent) {
                await eventService.updateEvent({ ...currentEvent, ...event });
                setEvents(events.map(e => e.id === currentEvent.id ? { ...currentEvent, ...event } : e));
            } else {
                const newEvent = await eventService.createEvent(event);
                setEvents([...events, newEvent]);
            }
            setCurrentEvent(null);
            onClose();
        } catch (error) {
            console.error('Failed to save event:', error);
        }
    };

    const handleEdit = (event) => {
        setCurrentEvent(event);
        onOpen();
    };

    const handleDelete = async (event) => {
        try {
            await eventService.deleteEvent(event.id);
            fetchEvents();
        } catch (error) {
            console.error('Failed to delete event:', error);
        }
    };

    const handleAddEvent = () => {
        setCurrentEvent(null);
        onOpen();
    };

    return (
        <SidebarWithHeader>
            <Box m={8}>
                <h1>Painel eventos</h1>
                <Button my={4} colorScheme="blue" onClick={handleAddEvent}>Add Event</Button>
                <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} onOpen={onOpen}/>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>{currentEvent ? 'Edit Event' : 'Add Event'}</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <EventForm event={currentEvent} onSave={handleSave} onClose={onClose}/>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </SidebarWithHeader>
    );
};

export default Events;