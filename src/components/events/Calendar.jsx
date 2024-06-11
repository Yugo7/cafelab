import { useEffect, useRef, useState } from 'react';
import { google, ics, office365, outlook, yahoo } from "calendar-link";
import { Button, Select } from '@chakra-ui/react';
import { FiCalendar } from "react-icons/fi";

const AddToCalendarButton = ({event}) => {
    const buttonRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCalendar, setSelectedCalendar] = useState('google');

    const calendarUrls = {
        google: google(event),
        outlook: outlook(event),
        office365: office365(event),
        yahoo: yahoo(event),
        ics: ics(event),
    };

    function handleOnClick(event) {
        if (buttonRef.current && !event.composedPath().includes(buttonRef.current)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOnClick);
        return () => {
            document.body.removeEventListener('click', handleOnClick);
        }
    }, []);

    const handleAddToCalendar = () => {
        const calendarUrl = calendarUrls[selectedCalendar];
        window.open(calendarUrl, '_blank');
    };

    return (
        <>
            <Select onChange={(e) => setSelectedCalendar(e.target.value)}>
                <option value="google">Google Calendar</option>
                <option value="outlook">Outlook</option>
                <option value="office365">Office 365</option>
                <option value="yahoo">Yahoo</option>
                <option value="ics">Apple (iCal)</option>
            </Select>
            <Button
                bg={'facebook.600'}
                color={'white'}
                rounded={'lg'}
                _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg'
                }}
                _focus={{
                    bg: 'green.500'
                }}
                leftIcon={<FiCalendar />}
                onClick={handleAddToCalendar}
            >
                Add to calendar
            </Button>
        </>
    )
}

export default AddToCalendarButton;