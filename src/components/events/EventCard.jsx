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

import {useRef} from 'react'
import {customerProfilePictureUrl, deleteCustomer} from "../../services/client.js";
import {errorNotification, successNotification} from "../../services/notification.js";
import {FiCalendar, FiPackage} from "react-icons/fi";

export default function CardWithImage({id, date, name, description, local, imageFinish, imagePromotion}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    return (
        <Center py={6}>
            <Box
                minW={'300px'}
                w={'full'}
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
                    <Stack>
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
                            onClick={onOpen}
                            leftIcon={<FiCalendar/>}
                        >
                            Add to calendar
                        </Button>
                        // TODO: Implement google calendar integration
                    </Stack>
                </Stack>
            </Box>
        </Center>
    );
}