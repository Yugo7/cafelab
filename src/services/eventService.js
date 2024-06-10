import EventService from "./EventService.jsx";

const getEvents = async () => {
    return EventService.getAllEvents();
}

 const getNextEvents = async (filterDate) => {
    try {
        const events = await getEvents();
        return filterDate ? events.filter(event => new Date(event.date) >= Date.now()) : events;
    } catch (e) {
        throw e;
    }
}

 const getPastEvents = async (filterDate) => {
    try {
        const events = await getEvents();
        const filterAndOrdered = filterDate ? events.filter(event => new Date(event.date) < Date.now()).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10) : events;
        console.log(filterAndOrdered)
        return filterAndOrdered;
    } catch (e) {
        throw e;
    }
}

const eventService = {
    getEvents,
    getNextEvents,
    getPastEvents,
};

export default eventService;