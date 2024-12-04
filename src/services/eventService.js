import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getNextEvents = async (filterDate) => {
    try {
        const events = await getAllEvents();
        return filterDate ? events.filter(event => new Date(event.date) >= Date.now()) : events;
    } catch (e) {
        throw e;
    }
}

const getPastEvents = async (filterDate) => {
    try {
        const events = await getAllEvents();
        return filterDate ? events.filter(event => new Date(event.date) < Date.now()).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10) : events;
    } catch (e) {
        throw e;
    }
}

const getAllEvents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}events/`);
        return response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
        console.error('Error fetching all events:', error);
        throw error;
    }
}

const getEventById = async (eventId) => {
    try {
        const response = await axios.get(`${BASE_URL}events/${eventId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching event with ID ${eventId}:`, error);
        throw error;
    }
}

const createEvent = async (eventData) => {
    try {
        const formData = new FormData();
        formData.append('name', eventData.name);
        formData.append('date', eventData.date);
        formData.append('description', eventData.description);
        formData.append('local', eventData.local);
        if (eventData.promoImageFile) {
            formData.append('promoImage', eventData.promoImageFile);
        }
        if (eventData.postImageFile) {
            formData.append('postImage', eventData.postImageFile);
        }
        if (eventData.instagramUrl) {
            formData.append('instagramUrl', eventData.instagramUrl);
        }

        console.log('Creating event:', Object.fromEntries(formData.entries()));

        const response = await axios.post(`${BASE_URL}events`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
}

const updateEvent = async (eventData) => {
    try {
        const formData = new FormData();
        formData.append('event_id', eventData.id);
        formData.append('name', eventData.name);
        formData.append('date', eventData.date);
        formData.append('description', eventData.description);
        formData.append('local', eventData.local);
        if (eventData.promoImageFile) {
            formData.append('promoImage', eventData.promoImageFile);
        }
        if (eventData.postImageFile) {
            formData.append('postImage', eventData.postImageFile);
        }
        if (eventData.instagramUrl) {
            formData.append('instagramUrl', eventData.instagramUrl);
        }

        const response = await axios.put(`${BASE_URL}events/${eventData.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
};

const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(`${BASE_URL}events/${eventId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting event with ID ${eventId}:`, error);
        throw error;
    }
}

const eventService = {
    getAllEvents,
    getNextEvents,
    getPastEvents,
    getEventById,
    createEvent,
    deleteEvent,
    updateEvent
};

export default eventService;