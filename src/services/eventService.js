import SupabaseClientUtil from "../components/utilities/SupabaseClientUtil.jsx";
import {getProducts} from "./productsService.jsx";
import EventService from "./EventService.tsx";

const supabase = SupabaseClientUtil.supabaseClient

const getEvents = async () => {
    return EventService.getAllEvents();
}

/* const getEvents2 = async () => {
    try {
        const cachedData = localStorage.getItem('events');
        const cachedTime = localStorage.getItem('eventsTime');

        if (cachedData && cachedTime && new Date().getTime() - cachedTime < 360 * 60 * 1000) {
            return JSON.parse(cachedData);
        } else {
            const {data} = EventService.getAllEvents();

            localStorage.setItem('events', JSON.stringify(data));
            localStorage.setItem('eventsTime', new Date().getTime());

            return data;
        }
    } catch (e) {
        throw e;
    }
}*/

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
        console.log(events)
        console.log(new Date(events[2].date) < new Date(filterDate))
        return filterDate ? events.filter(event => new Date(event.date) < Date.now()).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 10) : events;
    } catch (e) {
        throw e;
    }
}

const eventService = {
    getEvents,
    getNextEvents,
    getPastEvents,
    // Add other functions here...
};

export default eventService;