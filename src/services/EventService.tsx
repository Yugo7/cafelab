import axios from 'axios';

const BASE_URL = 'https://cafelab-api.vercel.app/';

const EventService = {
  getAllEvents: async () => {
    try {
      const response = await axios.get(`${BASE_URL}events/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all events:', error);
      throw error;
    }
  },

  getEventById: async (eventId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event with ID ${eventId}:`, error);
      throw error;
    }
  },

  createEvent: async (eventData) => {
    try {
      const response = await axios.post(`${BASE_URL}/events`, {
        title: eventData.title,
        date: eventData.date,
        description: eventData.description,
        picture: eventData.picture
      });
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  updateEvent: async ( eventData) => {
    try {
      const response = await axios.put(`${BASE_URL}/events`, {
        event_id: eventData.id,
        title: eventData.title,
        date: eventData.date,
        description: eventData.description,
        picture: eventData.picture
      });
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  deleteEvent: async (eventId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting event with ID ${eventId}:`, error);
      throw error;
    }
  }
};

export default EventService;
