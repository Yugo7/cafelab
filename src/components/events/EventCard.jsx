import {
    AlertDialog,
    AlertDialogBody, AlertDialogContent,
    AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Stack,
    Tag,
    Text,
    useColorModeValue, useDisclosure,
} from '@chakra-ui/react';

import {FiCalendar} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import AddToCalendarButton from "./Calendar.jsx";

export default function CardWithImage({id, date, name, description, local, imageFinish, imagePromotion}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { t } = useTranslation();

    const event = {
        title: name,
        description: description,
        start: date + ' 16:00:00 +0000',
        duration: [2, 'hour'],
        location: local
    };

    return (
        <Center py={6}>
            <Box
                width={'300px'}
                m={2}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'lg'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                    h={'250px'}
                    w={'full'}
                    src={imagePromotion}
                    objectFit={'cover'}
                />

                <Box p={6}>
                    <Stack spacing={2} align={'center'} >
                        <Tag borderRadius={"full"}>{date}</Tag>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {name}
                        </Heading>
                        <Text color={'gray.500'}>{description}</Text>
                        <Text color={'gray.500'}>Local: {local}</Text>
                    </Stack>
                </Box>
                <Stack direction={'row'} justify={'center'} spacing={6} p={4}>
                    <Stack overflow={"visible"}>
                        <AddToCalendarButton event={event}></AddToCalendarButton>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    );
}