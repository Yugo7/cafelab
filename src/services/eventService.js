import SupabaseClientUtil from "../components/utilities/SupabaseClientUtil.jsx";
import {getProducts} from "./productsService.jsx";

const supabase = SupabaseClientUtil.supabaseClient

export const getEvents = async () => {
    try {
        const cachedData = localStorage.getItem('events');
        const cachedTime = localStorage.getItem('eventsTime');

        if (cachedData && cachedTime && new Date().getTime() - cachedTime < 360 * 60 * 1000) {
            return JSON.parse(cachedData);
        } else {
            const {data} = await supabase
                .from('events')
                .select();

            localStorage.setItem('events', JSON.stringify(data));
            localStorage.setItem('eventsTime', new Date().getTime());

            return data;
        }
    } catch (e) {
        throw e;
    }
}

export const getNextEvents = async (filterDate) => {
    try {
        const events = await getEvents();
        return filterDate ? events.filter(event => new Date(event.date) >= Date.now()) : events;
    } catch (e) {
        throw e;
    }
}

export const getPastEvents = async (filterDate) => {
    try {
        const events = await getEvents();
        console.log(events)
        console.log(new Date(events[2].date) < new Date(filterDate))
        return filterDate ? events.filter(event => new Date(event.date) < Date.now()).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 10) : events;
    } catch (e) {
        throw e;
    }
}